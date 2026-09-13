# Site PNBC — Popenguine Ndayane Basket Club

Site statique généré avec **Eleventy**, contenu géré via **Decap CMS**, hébergé sur **Netlify**
avec **Netlify Identity + Git Gateway** pour l'authentification des admins — même principe que
le site de la mairie de Popenguine-Ndayane et le site vitrine de Keurnjom Multiservices.

## Comment ça marche

- Chaque joueur est un fichier JSON dans `src/_data/players-src/`
- Le réglage "code d'accès club partenaire" est dans `src/_data/settings.json`
- Decap CMS (`/admin`) permet de modifier ces fichiers depuis un navigateur, sans toucher au code :
  ajout/suppression de joueur, upload de photo, ajout de liens vidéo, changement du code d'accès
- Chaque modification enregistrée dans Decap CMS crée un commit Git → Netlify reconstruit et
  republie automatiquement le site (30 secondes à 1-2 minutes)

## Mise en ligne — étapes

### 1. Créer le dépôt GitHub
Créez un dépôt (ex. `site-pnbc-basketball`) et poussez-y tout ce dossier.

### 2. Connecter le dépôt à Netlify
- Netlify → **Add new site → Import an existing project** → choisissez GitHub → sélectionnez le dépôt
- Build command et Publish directory sont déjà définis dans `netlify.toml` (rien à changer)
- Cliquez sur Déployer

### 3. Activer Netlify Identity (authentification admin)
- Sur le site Netlify → onglet **Identity** → **Enable Identity**
- Dans **Registration**, choisissez **Invite only** (pour que seules les personnes invitées par vous puissent créer un compte admin)
- Dans **Identity → Services**, activez **Git Gateway** (c'est ce qui permet à Decap CMS d'enregistrer les modifications dans GitHub)

### 4. Vous créer votre propre compte admin
- Identity → **Invite users** → entrez votre propre e-mail
- Vous recevrez un e-mail pour définir votre mot de passe
- Rendez-vous ensuite sur `https://votre-site.netlify.app/admin/` pour vous connecter

### 5. Inviter le deuxième admin
- Identity → **Invite users** → entrez l'e-mail de la personne à inviter
- Elle reçoit un e-mail, définit son mot de passe, et peut se connecter sur `/admin/` depuis n'importe quel téléphone ou ordinateur

### 6. Nom de domaine (plus tard, si besoin)
Site → **Domain settings** → **Add a domain**, puis pointez le DNS chez votre registrar (comme pour le site de la mairie).

## Développement local (optionnel)

```
npm install
npm run serve
```
Site visible sur `http://localhost:8080`. Notez que `/admin` (Decap CMS) a besoin d'être connecté
à Netlify Identity pour fonctionner pleinement — le plus simple est de tester directement une fois
en ligne.

## Structure

```
src/
  _data/
    players-src/*.json   fichiers joueurs (gérés par Decap CMS)
    players.js             agrège les fichiers joueurs en tableau pour les templates
    settings.json           code d'accès club partenaire (géré par Decap CMS)
  _includes/base.njk       gabarit commun (header, footer)
  index.njk                page d'accueil (effectif inclus)
  player.njk                génère une page par joueur (pagination Eleventy)
  styles.css / app.js
admin/
  index.html, config.yml   Decap CMS
images/players/            photos uploadées par Decap CMS
netlify.toml                config de build Netlify
```
