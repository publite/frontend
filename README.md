# Publite Frontend

<p align="center">
  <img src="https://github.com/publite/frontend/raw/main/logo.svg" alt="Publite logo" width="150px">
</p>

## Overview

Frontend for Publite service — E-Books reader

## Deploy

Dev environment setup:

```bash
npm i

# Run with watch
npm run dev

# Build to test prod
npm run build
npm exec serve -s build
```

Simple docker deployment

```bash
# build docker image
docker build . -t publite_frontend

# run it with docker
docker run -p <port>:80 publite_frontend
```

Dokku deployment with image from Docker Hub

```bash
dokku apps:create publitefrontend

dokku git:from-image publitefrontend publite/frontend:latest
```

# TODO

- Create ServiceWorker (make it PWA)
- Migrate from LocalStorage to IndexedDB
- Add page position persistance
- Add menu with book view setting
- Add move to page by number
- Optimize page spliting algorythm (rewrite it)
- Fix css modules bundling
