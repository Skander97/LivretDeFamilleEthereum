
# Livret de Famille Ethereum

Ce projet est une application basée sur la blockchain Ethereum qui permet de gérer un livret de famille numérique. Il utilise la technologie Ethereum pour stocker de manière sécurisée les informations liées au mariage et à la famille.

## React client

This react project is unopinionated with only `web3.js` as an added dependency, so nothing stands in your way.

## Getting started

Run `npm start` to start the dev server, and `npm build` to create a production build.

## Fonctionnalités

- Création et mise à jour d'un livret de famille.
- Ajout d'enfants à la famille.
- Divorce entre les époux.
- Gestion du décès d'un conjoint (réservé au propriétaire du contrat).

## Technologie utilisée

- **Smart Contract Solidity:** Le contrat intelligent Ethereum définit la logique métier et les règles du livret de famille.
- **React:** L'interface utilisateur est construite en utilisant React pour interagir avec le contrat intelligent.
- **Web3.js:** Bibliothèque JavaScript pour interagir avec Ethereum à partir du navigateur.

## Configuration du Projet

1. Cloner le projet : `git clone [URL_DU_PROJET]`
2. Installer les dépendances : `npm install`

## Exécution du Projet

1. Démarrer le serveur Ethereum local ou se connecter à un réseau Ethereum.
2. Mettre à jour l'adresse du contrat dans `contracts/LivretDeFamille.json`.
3. Exécuter l'application React : `npm start`

## Instructions d'Utilisation

1. Connectez-vous à MetaMask ou à tout autre portefeuille Ethereum compatible.
2. Assurez-vous que l'adresse Ethereum connectée a été ajoutée en tant que propriétaire du contrat.
3. Utilisez l'application pour créer, mettre à jour, ajouter des enfants, divorcer ou signaler un décès.

