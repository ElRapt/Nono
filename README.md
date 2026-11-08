# À toi, Noémie.

Une lettre Art nouveau, en français côté soleil et en anglais côté lune. Papier crème, verts sourds, rose fané, ornements botaniques dessinés en SVG et typographie locale. **Aucune illustration générée par IA.**

## Mettre les photos

1. Déposer les photos dans `assets/photos/` (JPG, PNG, WebP ou AVIF).
2. Ouvrir [`memories.js`](memories.js).
3. Renseigner `src` pour le souvenir concerné, par exemple :

```js
crepes: {
  src: "assets/photos/crepes.jpg",
  position: "50% 40%",
  fr: "Crêpes",
  en: "Crêpes",
},
```

`position` règle le cadrage. Les deux langues utilisent la même photo. Les 13 expressions en capitales ont leur emplacement. Une rosace vectorielle occupe les emplacements vides ; la photo de l’affiche fournie est déjà affectée à MUCHA. Les photos manquantes ou introuvables reviennent à la rosace. Employer des noms de fichiers sans espaces simplifie les chemins. Les chemins sont relatifs pour fonctionner dans `/Nono/` sur Pages.

Sur ordinateur : survol ou focus au clavier. Sur téléphone : toucher le mot. Échap, la croix, un clic à l’extérieur ou le défilement hors champ referment le souvenir. L’image apparaît et s’agrandit progressivement, sans modifier la mise en page de la lettre.

## La lettre

- Le billet « À toi, » ouvre la page.
- Le bouton **Noémie.** retourne la palette, les placements et les ornements, puis bascule la langue. Un second clic revient au français. Le texte ne s’affiche jamais en miroir.
- `content.js` contient le français fourni et sa traduction. Terres Latines, les Puys, Despe et les noms de pâtisseries sont conservés. « TO PREPARE FOR TROUBLE » reprend le clin d’œil anglophone à la Team Rocket.
- Les animations respectent `prefers-reduced-motion`. La lettre française reste lisible sans JavaScript.
- La composition s’adapte aux petits écrans, sans bibliothèque ni dépendance npm.

## Musique

La vidéo demandée (`_Utq0ce_YU4`) est intégrée avec le lecteur YouTube officiel, visible et contrôlable. L’ouverture du billet demande sa lecture à 35 % du volume, en boucle. Certains navigateurs exigent une pression supplémentaire sur lecture. La croix et le bouton « En musique » arrêtent la lecture et ferment le lecteur. En cas de blocage réseau ou d’intégration interdite par YouTube, un lien permet d’écouter la vidéo sur YouTube. Aucun téléchargement ou extraction audio n’est effectué.

## Publication GitHub Pages

Le workflow [`.github/workflows/pages.yml`](.github/workflows/pages.yml) vérifie le JavaScript, construit `dist/` et publie à chaque envoi sur `main`.

Pour la première activation : **Settings → Pages → Build and deployment → Source → GitHub Actions**. Ensuite relancer le workflow « Publish the letter to GitHub Pages » depuis **Actions** si nécessaire.

Le dépôt peut rester privé si le forfait GitHub autorise Pages sur les dépôts privés. Le site publié via Pages est destiné à être accessible avec son URL ; ne déposer que les photos destinées à ce site.

## Développement

Node.js 22 ou supérieur, aucune installation de dépendances :

```sh
npm run check
npm run build
python3 -m http.server 8080 --directory dist
```

Ouvrir `http://localhost:8080`. Les modules JavaScript nécessitent un serveur HTTP ; ne pas ouvrir `index.html` directement en `file://`.

Les formes décoratives sont dans `ornaments.js`, le style dans `styles.css`, les interactions dans `app.js`. Les polices Cormorant Garamond et Italianno sont distribuées sous SIL Open Font License (licences dans `assets/fonts/`). Aucune police ou image ne dépend d’un CDN.
