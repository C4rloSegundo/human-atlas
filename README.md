# Human Atlas — Atlas Humano (pt-BR)

> **Versão em português.** A interface e os 5.090 nomes anatômicos foram traduzidos para o português do Brasil, seguindo a Terminologia Anatômica (ex.: *Left femoral artery* → *Artéria femoral esquerda*). A busca aceita português, com ou sem acentos, e também os nomes originais em inglês.
>
> - Tradução dos nomes: `scripts/i18n/names-pt.tsv` (uma linha por modelo de nome; `{Sm}`/`{Sf}` fazem a concordância de esquerdo/esquerda e direito/direita).
> - Para regenerar `public/models/names-pt.json` depois de editar o TSV: `node scripts/i18n/build-names-pt.mjs`.
> - O app carrega `names-pt.json` junto com `atlas.json` e mantém o nome em inglês em `nameEn` para busca e para as explicações.
>
> **Ocultar estruturas.** Selecione uma peça e toque em **Ocultar** (ou tecle `H`/`Delete`) para tirá-la da frente e ver ou clicar o que está embaixo. Um aviso acima da barra inferior mostra quantas peças estão ocultas, com **Desfazer** e **Mostrar todas**. As peças ocultas ficam salvas no navegador, separadas por modelo, até você usar **Redefinir**. Os arquivos do atlas não são alterados.
>
> **Anatomia feminina.** Este fork restaura o modelo feminino que existia nas primeiras versões do projeto (Human Reference Atlas / HuBMAP, *3D Reference Organ Set for Female v1.5*, CC BY 4.0): 888 malhas e 1.073 estruturas, escolhidas no seletor abaixo do título. A cobertura de esqueleto e músculos é parcial; a superfície do corpo começa visível e as 8 peças de referência de gestação ficam numa camada própria, oculta por padrão. Validação: `node scripts/validate-atlas.mjs atlas-female.json`.


An interactive 3D anatomy explorer built with React, Three.js, and shadcn/ui. Take the BodyParts3D adult male reference apart into **2,234 individually selectable meshes**, explore **15 anatomical systems**, and search **3,432 named concepts**.

**[Explore the live demo](https://human-atlas-seven.vercel.app)**

## Explore

- Orbit, zoom, and select structures directly on the body.
- Toggle individual systems or use skeleton and organ presets.
- Move from assembled anatomy to a spaced inventory of every visible piece.
- Search anatomical names and source identifiers.
- Isolate a selected structure and read its details.
- Use compact controls and detail panels on mobile.

## Run locally

Requires Node.js 22.13 or newer. No API keys or accounts are needed.

```sh
npm ci
npm run dev
```

Open http://localhost:3016. To build the static site, run `npm run build`; the output is in `dist/`.

## Validate

```sh
npm run check
node scripts/validate-atlas.mjs
node scripts/validate-interactions.mjs
npm run build
```

Validation covers mesh buffers, names and concept membership, nonoverlapping exploded layouts at desktop and mobile aspect ratios, search and inspection contracts, and tap-versus-drag handling. Browser interaction checks have exercised selection, system controls, search, isolation, rotation, and 390×844, 320×568, and 844×390 layouts. Phone controls stay clear of the exploded inventory, and isolated structures fit the space above or beside the detail panel. Physical-device performance and real multitouch hardware have not been tested.

## Anatomy data

The current viewer uses **BodyParts3D 4.0**, an adult male reference anatomy, licensed **CC BY 4.0**. It does not represent every human structure or variation. Individual source meshes are distinct from named concepts, which may group multiple meshes. Descriptions distinguish general system context from individual organ explanations.

Geometry is simplified for browser performance while retaining every source mesh. The packaged model contains 2,288,268 triangles and downloads approximately 33 MB of compressed geometry. Full credits, source links, and adaptation details are in [ATTRIBUTION.md](public/ATTRIBUTION.md).

This is an educational explorer, not a diagnostic or surgical tool.

## How it works

Geometry is merged into batches. Per-structure GPU textures control translation, visibility, and selection, while component geometry supports accurate picking. Exploded layouts pack only the visible pieces. Rendering updates when the scene changes; orbit controls remain responsive without thousands of separate draw calls.

The optional WebMCP tools expose anatomy search and inspection in compatible browsers. The visible interface works without them.

## Rebuilding geometry

The repository includes browser-ready geometry. Rebuilding it is optional: obtain the official BodyParts3D OBJ archive and English metadata tables, prepare the joined concepts and display-system mappings, run `scripts/convert-anatomy.py`, then `node scripts/optimize-anatomy.mjs` and `node scripts/compress-models.mjs`. Simplification uses a 0.2% relative error limit per structure.

## Deploy

Import this repository into Vercel as a Vite project. The included `vercel.json` configures `npm ci`, `npm run build`, and the `dist` output directory. It can also be served by a static host.

## License

Original application code is released under the [MIT License](LICENSE). **The anatomy data has its own CC BY 4.0 license**; preserve the attribution when redistributing it. Third-party dependencies retain their respective licenses.

Issues and pull requests are welcome. Please include reproduction steps and browser/device details for interaction problems.
