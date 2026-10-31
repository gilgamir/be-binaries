"""Éphémérides des cibles : lecture de la source unique docs/data/ephemerides.json et calcul de phase."""
from __future__ import annotations

import json
import math
from pathlib import Path

EPHEM_PATH = Path(__file__).resolve().parent.parent / "docs" / "data" / "ephemerides.json"


def charger() -> dict:
    data = json.loads(EPHEM_PATH.read_text(encoding="utf-8"))
    return {k: v for k, v in data.items() if not k.startswith("_")}


def phase(cible: str, jd: float, ephem: dict | None = None) -> float:
    """Phase orbitale dans [0, 1) pour une date julienne (même échelle de temps que T0)."""
    e = (ephem or charger())[cible]
    if e["t0_jd"] is None:
        raise ValueError(f"T0 non renseigné pour {cible} ({e['reference']}) dans {EPHEM_PATH}")
    cycles = (jd - e["t0_jd"]) / e["periode_j"]
    return cycles - math.floor(cycles)


if __name__ == "__main__":
    import time

    jd = time.time() / 86400 + 2440587.5
    for cle, e in charger().items():
        try:
            print(f"{e['nom']:8s} phase = {phase(cle, jd):.3f}")
        except ValueError as err:
            print(f"{e['nom']:8s} {err}")
