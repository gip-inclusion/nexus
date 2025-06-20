# Nexus

Nexus est une application web qui a pour but de centraliser la gestion des structures de l'insertion concernées par tous les autres produits de la Plateforme de l'inclusion.

## Développement

### 1. Prérequis

**1/** Les programmes suivants doivent être installés, configurés et opérationnels sur votre poste : 
* Git
* Node.js / npm 

**2/** Par ailleurs, vous devez avoir accès au(x) document(s) Grist, qui ser(ven)t de base de données au projet.

**3/** Enfin, pour pouvoir déployer l'application sur les environnements exposés sur Internet, vous devez être contributeurs de la / des application(s) Scalingo concernées. 

### 2. Installation de l'environnement local

```
# 1. Récupérer le code source
git clone git@github.com:gip-inclusion/nexus.git

# 2. Se placer dans le répertoire
cd nexus

# 3.Installer les dépendances
npm install

# 4. Créer le fichier .env à partir du fichier .env.example et l'éditer
cp .env.example .env

# 5. Exécuter les tests
npm test

# 6. Lancer l'application
npm run dev

# 7. Accéder à l'application dans son navigateur
open http://localhost:5173
```

### 3. Standards, bonnes pratiques et règles d'usage 

*TODO*

## Infogérance

### Déploiement

```
scalingo --region [osc-fr1|osc-secnum-fr1] --app [nexus-prod|nexus-staging] https://github.com/gip-inclusion/nexus/archive/refs/heads/main.tar.gz
```

> ⚠️ Assurez-vous d'avoir au préalable correctement défini les variables d'environnement nécessaires à la bonne excéution de l'application sur Scalingo.

## Architecture

À date (20/06/2025), le projet n'en est qu'à ses prémices, en phase d'investigation. Tout est mis en œuvre pour pouvoir tester différentes hypothèses métier dans les meilleures conditions, les plus brefs délais et avec le plus large panel d'évolution possible.

Dans un premier temps, l'architecture est "simplement" constitué des composants suivants : 
* un document Grist qui sert de base de données maléable et sécurisée
* une application web front-end Sveltekit

Cette architecture a vocation à fortement évoluer dans le temps, avec une très probable migration des données depuis Grist vers une instance PostgreSQL, accédées et gérées via une seconde application Web back-end (vraisemblablement Python/FastAPI, afin d'être cohérent et consistant avec la majorité des autres produits de la Plateforme de l'inclusion).

Pour info, Svelte/Sveltekit a été retenue comme technologie front-end car il s'agit de la technologie utilisée sur DORA, que le framework est léger, simple et très accessible et que Sveltekit ajoute les fonctionnalités pratiques et nécessaires pour un bon SEO ou une bonne UX (dynamic-SSR). 

L'objectif d'une application prioritairement front-end est de permettre d'effectuer du maquettage rapide et pouvoir mener des tests utilisateurs en condition au plus proche du réel, tout en maximisant l'expérience utilisateur ou le ressenti perçu lors des expérimentations.

