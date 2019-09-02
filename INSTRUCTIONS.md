# INSTRUCTIONS

# Architecture

### Backend
- writen in node.js
- mysql database
- comments: i have created a win table to store all the wins per user but i cant implementing well because time, the user and win are linked with a foreing key and the routing is made with express

### Frontend
- writen in React
- comments: i have created a leader board but it only add users (i cant add the update functionality, so the winner ever insert 1 win) i need more time to finish my css

## Requirements

- docker
- node v 10


## Installation

### 1. Up the server

#### if you have yarn
```
cd api
yarn
docker-compose up -d

```

#### if you don't
```
cd api
npm install
docker-compose up -d

```

### 2. Up the front

```
cd front
cd app

```

#### if you have yarn
```
yarn
yarn start

```

#### if you don't
```
npm install
npm start

```