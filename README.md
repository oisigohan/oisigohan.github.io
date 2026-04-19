# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



```
[
  {
    "slug": "lighting-practice-2026",
    "title": "Lighting Practice",
    "thumbnail": "2026-01.png",
    "description": "A cinematic flythrough of a rain-soaked cyberpunk cityscape, built entirely in Houdini and rendered with Redshift. Procedural buildings, volumetric fog, and dynamic rain simulation.",
    "year": 2025,
    "category": "Personal",
    "tags": ["Houdini", "Redshift", "Motion"],
    "images": ["2026-01.png"],
    "vimeoId": "76979871"
  },
  {
    "slug": "botanical",
    "title": "Botanical",
    "thumbnail": "thumbnail.jpg",
    "description": "Still-life series exploring organic growth. Modeled in ZBrush, textured in Substance Painter, final renders in Arnold.",
    "year": 2024,
    "category": "Personal",
    "tags": ["ZBrush", "Arnold", "Still Life"],
    "images": ["img-1.jpg", "img-2.jpg"],
    "vimeoId": null
  },
  {
    "slug": "abstract-loop",
    "title": "Abstract Loop",
    "thumbnail": "thumbnail.jpg",
    "description": "Looping abstract animation exploring color and form through Blender geometry nodes.",
    "year": 2024,
    "category": "Client Work",
    "tags": ["Blender", "Geometry Nodes", "Loop"],
    "images": ["img-1.jpg", "img-2.jpg", "img-3.jpg"],
    "youtubeId": "dQw4w9WgXcQ",
    "links": [
      { "label": "Client Website", "url": "https://example.com" }
    ]
  }
]

```