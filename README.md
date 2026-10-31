# Be binaires

Site du projet amateur de suivi spectroscopique des étoiles Be binaires à compagnon sdO (59 Cyg, φ Per).

Site publié : https://gilgamir.github.io/be-binaries/

## Travailler en local

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve          # prévisualisation sur http://127.0.0.1:8000
```

## Organisation

- `docs/` : contenu du site en Markdown.
- `docs/data/ephemerides.json` : **source unique** des éphémérides (utilisée par le site et les scripts).
- `docs/data/` : sinon, uniquement des fichiers générés (mesures, graphiques).
- `scripts/` : récupération BeSS, mesures, graphiques.
- `.github/workflows/` : publication du site et mise à jour des données.

## Publication

À chaque push sur `main`, le site est construit et publié sur GitHub Pages.
Dans les paramètres du dépôt : *Settings → Pages → Source : GitHub Actions*.

## Contribuer

Ouvrez une *issue* ou une *pull request*. Les discussions scientifiques ont lieu sur le forum ARAS.
