# Mesures

## Ce que l'on mesure sur chaque spectre

| Mesure | Raie | Ce qu'elle apporte |
|---|---|---|
| Largeur équivalente (EW) | Hα | Quantité de gaz dans le disque (contrôle de stabilité) |
| Rapport V/R | Hα | Asymétrie du disque (déformation par le compagnon ?) |
| Séparation des pics | Hα | Rayon de la zone émettrice (relation de Huang) |
| Vitesse des ailes (bissecteur) | Hα | Mouvement orbital de la Be (±12 km/s) |
| **Vitesse du pic** | **He I 6678** | **Mouvement de la zone chauffée (±180 km/s)** |
| **EW** | **He I 6678** | **Intensité de la zone chauffée selon la phase** |

## Pic He I 6678

- Position par **ajustement gaussien ou centroïde**, avec λ₀ = **6678,15 Å** (air).
- À cette longueur d'onde, **1 Å = 44,9 km/s**.
- **Près des conjonctions**, notez « pic non séparé » plutôt qu'une vitesse douteuse, et donnez un poids faible au point.
- L'absorption photosphérique He I forme un **fond non plat**. La soustraction d'un profil de référence (spectre synthétique ou étoile B non-Be de même type) reste à décider dans le protocole.
- Notez toute **absorption « shell » transitoire**.

## Largeur équivalente (EW)

$$
EW = \int \left(1 - \frac{F(\lambda)}{F_c}\right) d\lambda
$$

Sur un spectre normalisé (\(F_c = 1\)), une raie en émission donne une **EW négative**, selon la convention BeSS.

- Utilisez des **bornes d'intégration et des fenêtres de continu identiques** pour tous les spectres d'une même cible.
- Une mauvaise normalisation du continu est la première source d'erreur.

## Rapport V/R et séparation des pics

- V/R est le rapport des intensités du pic violet (V) et du pic rouge (R), mesurées au-dessus du continu.
- La séparation des pics donne le rayon de la zone émettrice par la relation de Huang : R / R★ ≈ (2 v sin i / Δv_pics)².

## Calcul de la phase orbitale

$$
\varphi = \mathrm{frac}\left(\frac{JD - T_0}{P}\right)
$$

Exemple : 59 Cyg, le 18/10/2026 à 20 h UT. JD = 2 461 332,333 ; JD − T0 = 15 654,733 j ; divisé par 28,1871, on obtient 555,386, donc **φ = 0,386**.

Le principe est de **replier le temps** sur une orbite : des spectres pris à des dates éparses, par plusieurs observateurs, se rangent sur une seule courbe dès qu'ils sont classés par phase.

L'écart entre JD et HJD (≤ 8 min) est négligeable pour la phase, mais pas pour les vitesses, d'où la correction barycentrique.

## Ajustement de la courbe de vitesse

Dans l'approximation circulaire, la courbe se linéarise :

$$
v = a + b\cos(2\pi\varphi) + c\sin(2\pi\varphi)
$$

On en déduit γ = a, K = √(b² + c²) et φ₀ = atan2(c, b) / 2π, par une simple régression linéaire (DROITEREG dans Excel). Pour l'orbite excentrique de 59 Cyg, comparez aussi directement à la courbe prédite.

**Données nécessaires** : au moins 4 à 5 spectres bien répartis en phase, idéalement 8 à 10, en privilégiant les quadratures.

**Interprétation** : un écart Δφ entre φ₀ mesuré et prédit correspond à un décalage de T0 de Δφ × P (0,02 en phase ≈ 0,6 j pour 59 Cyg). Un écart net et reproductible serait publiable : éphéméride à corriger, ou décalage physique de la zone émettrice.

## Formules utiles

| Relation | Formule | Ordre de grandeur |
|---|---|---|
| Effet Doppler | v = c · Δλ / λ | 1 Å = 44,9 km/s à 6678 Å ; 45,7 km/s à 6563 Å |
| Élément de résolution | Δv = c / R | ≈ 30 km/s pour R ≈ 10 000 |
| Précision de centroïde | ≈ 1/10 à 1/20 de l'élément de résolution | 2 à 5 km/s avec un bon SNR |
| Largeur équivalente | EW = ∫ (1 − F/Fc) dλ | négative pour une émission |
| Rayon du disque (Huang) | R / R★ ≈ (2 v sin i / Δv_pics)² | — |
| Phase orbitale | φ = frac((JD − T0) / P) | — |
| Décalage de T0 | ΔT0 = Δφ × P | 0,02 en phase ≈ 0,6 j pour 59 Cyg |
| JD depuis une date Excel | JD = date + 2 415 018,5 | — |

## Pièges courants

- Telluriques mal corrigées autour de Hα.
- Correction de vitesse oubliée ou appliquée deux fois.
- Bornes d'intégration ou fenêtres de continu qui changent d'une mesure à l'autre.
- Définition de φ = 0 différente d'une cible à l'autre.
