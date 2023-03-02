# 3D Visualization

This repository contains the 3D Visualization presentation and accompanying code samples that were shown at the Esri Developer Summit 2022. The presentation is created with reveal-md, featuring interactive samples for which the source code can be found in this repository.

## Presentation

[Live presentation: 3D Visualization](https://esridevevents.github.io/arcgis-js-api-for-javascript-3d-visualization/)

- Arno Fiva, Esri R&D Center Zürich
- Lisa Staehli, Esri R&D Center Zürich
- Jesse van den Kieboom, Esri R&D Center Zürich

## Local setup

After cloning the repo, we need to install all the dependencies:

```bash
npm install
git submodule update --init --recursive
```

To compile everything and serve the files:

```bash
npm start
```

Vite will then start up and prepare itself for serving the presentatio at http://localhost:3000/.
