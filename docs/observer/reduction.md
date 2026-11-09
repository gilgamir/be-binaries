# Chaîne de réduction

Logiciel : **SpecINTI**, avec **les mêmes réglages pour tous les observateurs**.

## Étapes

1. **Prétraitement** : offset (bias), noir (dark), plage de lumière (flat).
2. **Extraction** du profil spectral, avec suppression des rayons cosmiques.
3. **Étalonnage en longueur d'onde** à partir des poses néon encadrant la cible.
4. **Réponse instrumentale** à partir de l'étoile de référence.
5. **Correction des raies telluriques** (eau), indispensable avant les mesures d'EW de Hα.
6. **Correction barycentrique** (jusqu'à ±30 km/s selon la saison). Indiquez la valeur appliquée dans l'en-tête.
7. **Normalisation du continu** sur des **fenêtres communes**, fixées ensemble pour tout le projet, de part et d'autre de chaque raie.
8. **Dépôt BeSS** au format standard (voir [Dépôt sur BeSS](bess.md)).

## Contrôles qualité

- Les raies telluriques de l'eau servent de contrôle d'étalonnage : précision visée ≈ ±0,03 Å, soit ±1,5 km/s.
- Les raies telluriques résiduelles sont bien faibles après correction.
- Le continu est plat et normalisé, sans ondulation résiduelle.

!!! note "À fixer collectivement"
    - Les fenêtres de continu communes pour Hα et He I 6678.
    - La méthode de traitement du fond photosphérique He I (voir [Mesures](../apprendre/mesures.md)).
    - Le fichier de configuration SpecINTI de référence pour Star'Ex 2400.
