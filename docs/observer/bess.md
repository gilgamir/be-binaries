# Dépôt sur BeSS

Tous les spectres du projet sont déposés dans la base **[BeSS](https://basebe.obspm.fr/)** (Be Star Spectra). Elle reste la référence : ce site ne fait que recenser et mesurer.

## Prérequis

- Un **compte observateur BeSS**, avec son site et son instrument déclarés.
- Un spectre **1D au format FITS**, étalonné, corrigé de la réponse instrumentale et normalisé.

## En-têtes FITS

Les mots-clés ci-dessous sont ceux couramment exigés. **Reportez-vous à la documentation BeSS en vigueur**, qui fait foi.

| Mot-clé | Contenu |
|---|---|
| `OBJNAME` | Nom de la cible (ex. `59 Cyg`, `phi Per`) |
| `DATE-OBS` | Date et heure UTC du milieu de pose |
| `EXPTIME` | Temps de pose total (s) |
| `OBSERVER` | Nom de l'observateur |
| `BSS_INST` | Instrument déclaré dans BeSS |
| `BSS_SITE` | Site déclaré dans BeSS |
| `BSS_VHEL` | Correction de vitesse appliquée (km/s) |
| `BSS_TELL` | Méthode de correction tellurique |
| `BSS_COSM` | Méthode de suppression des cosmiques |
| `CRVAL1`, `CDELT1`, `CRPIX1` | Échelle en longueur d'onde |

## Après le dépôt

Indiquez votre spectre sur le fil ARAS du projet. Il sera intégré automatiquement aux [résultats](../resultats/index.md) à la prochaine mise à jour.
