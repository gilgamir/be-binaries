"""Récupération des spectres BeSS des cibles du projet.

À IMPLÉMENTER : choisir la méthode d'accès à BeSS (service VO / SSAP ou export)
en suivant la documentation BeSS, puis enregistrer les FITS dans data_cache/<cible>/.
Ne pas versionner data_cache/ (voir .gitignore).
"""
from __future__ import annotations

CIBLES = {"59-cyg": "59 Cyg", "phi-per": "phi Per"}


def main() -> None:
    raise SystemExit("fetch_bess.py : accès BeSS pas encore implémenté.")


if __name__ == "__main__":
    main()
