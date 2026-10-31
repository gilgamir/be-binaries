# Chaîne de réduction

Logiciels recommandés : **SpecINTI** (Star'Ex, LHIRES) ou **ISIS**. Les étapes sont les mêmes.

## Étapes

1. **Prétraitement** : offset (bias), noir (dark), plage de lumière (flat).
2. **Extraction** du profil spectral, avec suppression des rayons cosmiques.
3. **Étalonnage en longueur d'onde** à partir de la lampe, avec le modèle polynomial adapté au réseau.
4. **Réponse instrumentale** à partir de l'étoile de référence.
5. **Correction tellurique**, indispensable autour de Hα, où les raies de H₂O sont nombreuses.
6. **Normalisation** du continuum à 1.
7. **Correction de vitesse** héliocentrique ou barycentrique (renseigner la valeur appliquée dans l'en-tête).

## Contrôles qualité

- Les raies telluriques résiduelles sont bien faibles.
- La position d'une raie connue (par exemple une raie interstellaire ou tellurique avant correction) est cohérente avec la précision d'étalonnage annoncée.
- Le continuum est plat et normalisé, sans ondulation résiduelle.

!!! note "À compléter"
    Paramètres SpecINTI recommandés (fichier de configuration type) pour Star'Ex 2400.
