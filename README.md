# Projet Ether Faucet
## Description
Ce projet est un faucet pour la cryptomonnaie Ether. 
Il permet de distribuer des ethers à des utilisateurs qui en font la demande. 
Le projet est composé de deux parties : un smart contract et une interface web. Le smart contract est déployé sur le réseau de test Etherscan.

## Informations supplémentaires
### La documentation
Les étapes à utiliser pour créer le smart contract et l'interface web sont détaillées sur le lien redirigeant vers [la page Notion](https://thuillier-colin.notion.site/Blockchaine-866f59f31c544c9a9ae8a045f5a7f7cb?pvs=4).

### Complexité
Ce projet fut complexe à mettre en oeuvre car il a fallu apprendre à utiliser le framework Next.js et le langage Solidity.
Le smart contract a été écrit en Solidity et déployé sur le réseau de test Etherscan (sepolia).
L'interface web a été écrite en React.js avec le framework Next.js. Elle permet de se connecter à un portefeuille Ethereum et de demander des ethers.
Le plus difficile a été de comprendre comment lier le smart contract et l'interface web.
L'utilisation de Wagmi a permis de lier les deux parties plus facilement.

## Installation
### Prérequis
- Node.js
- Forge
- npm

### Installation
1. Cloner le projet
2. Installer les dépendances
```
npm i
```
3. Lancer le serveur
```
npm run dev
```
4. Ouvrir un navigateur et aller à l'adresse affichée dans la console

## Utilisation
### Création d'un compte
Pour utiliser le faucet, il faut avoir un compte sur un portefeuille Ethereum. Pour cela, vous pouvez installer l'extension RabbitWallet sur votre navigateur. Une fois l'extension installée, vous pouvez créer un compte en cliquant sur l'icône de l'extension puis sur "Create account". Une fois le compte créé, vous pouvez récupérer l'adresse de votre compte en cliquant sur l'icône de l'extension puis sur "Copy address".

### Demande d'ether
Pour demander des ethers, il faut cliquer sur le bouton "Connect" en haut à droite puis se connecter avec RabbitWallet. 
Une fois connecté, vous pouvez demander des ethers en cliquant sur le bouton "Request ether" au centre.
Vous pouvez demander des ethers toutes les heures.
