"""Mesures sur spectres 1D normalisés (FITS BeSS) : EW, V/R, séparation des pics.

Usage : python scripts/measure.py chemin/vers/spectre.fits
"""
from __future__ import annotations

import sys

import numpy as np
from astropy.io import fits

C_KMS = 299_792.458

# Fenêtres d'intégration par raie (Å) — à figer avec les participants et à ne plus changer ensuite
FENETRES = {
    "Ha": (6545.0, 6580.0, 6562.81),
    "HeI6678": (6670.0, 6686.0, 6678.15),
}


def lire_spectre(chemin: str) -> tuple[np.ndarray, np.ndarray, fits.Header]:
    with fits.open(chemin) as hdul:
        h = hdul[0].header
        flux = hdul[0].data.astype(float)
    pix = np.arange(flux.size) + 1
    lam = h["CRVAL1"] + (pix - h.get("CRPIX1", 1)) * h["CDELT1"]
    return lam, flux, h


def ew(lam: np.ndarray, flux: np.ndarray, l1: float, l2: float) -> float:
    """Largeur équivalente (Å), négative pour une émission."""
    m = (lam >= l1) & (lam <= l2)
    return float(np.trapezoid(1.0 - flux[m], lam[m]))


def pics(lam: np.ndarray, flux: np.ndarray, l1: float, l2: float, l0: float) -> dict:
    """Pics violet et rouge de part et d'autre du centre : V/R et séparation en km/s."""
    m = (lam >= l1) & (lam <= l2)
    x, y = lam[m], flux[m]
    bleu, rouge = x < l0, x > l0
    if not bleu.any() or not rouge.any():
        return {}
    iv, ir = np.argmax(y[bleu]), np.argmax(y[rouge])
    lv, fv = x[bleu][iv], y[bleu][iv]
    lr, fr = x[rouge][ir], y[rouge][ir]
    return {
        "V_sur_R": (fv - 1.0) / (fr - 1.0) if fr != 1.0 else float("nan"),
        "separation_kms": (lr - lv) / l0 * C_KMS,
    }


def mesurer(chemin: str) -> dict:
    lam, flux, h = lire_spectre(chemin)
    res = {"fichier": chemin, "objet": h.get("OBJNAME"), "date_obs": h.get("DATE-OBS")}
    for raie, (l1, l2, l0) in FENETRES.items():
        if lam.min() <= l1 and lam.max() >= l2:
            res[f"EW_{raie}"] = ew(lam, flux, l1, l2)
            res.update({f"{k}_{raie}": v for k, v in pics(lam, flux, l1, l2, l0).items()})
    return res


if __name__ == "__main__":
    for f in sys.argv[1:]:
        print(mesurer(f))
