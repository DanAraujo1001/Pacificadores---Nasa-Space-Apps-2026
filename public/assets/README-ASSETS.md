# Assets pendentes — Ato 0 (Prólogo)

Os caminhos abaixo estão centralizados em `src/config/sceneAssets.ts`.
Para "ativar" um asset, basta colocar o arquivo final na pasta indicada com o
**nome exato** listado. Nenhum código precisa mudar.

Enquanto o arquivo não existir, a cena usa um **placeholder automático**
(silhueta/cor sólida com o nome do asset visível) — o jogo não quebra.

## Background

| Asset             | Pasta                      | Arquivo esperado  | Formato      |
| ----------------- | -------------------------- | ----------------- | ------------ |
| Sótão (Ato 0)     | `public/assets/backgrounds/` | `act0-attic.png`  | `.png`/`.webp` |

Recomendado: imagem horizontal (ex.: 1920×1080), `object-cover`.

## Sprites de personagem

Convenção de pastas: `public/assets/sprites/{character_id}/`.

| Personagem    | Pasta                                 | Arquivo esperado     | Formato        |
| ------------- | ------------------------------------- | -------------------- | -------------- |
| Eco           | `public/assets/sprites/eco/`          | `eco-normal.png`     | `.png` (fundo transparente) |
| Avô Tadeu     | `public/assets/sprites/grandpa-tadeu/`| `grandpa-normal.png` | `.png` (fundo transparente) |
| Protagonista  | `public/assets/sprites/player/`       | `player-normal.png`  | **já existe**  |

Recomendado para sprites: PNG vertical com fundo transparente, personagem
alinhado à base (pés no rodapé da imagem), pois o palco ancora todos os sprites
pela mesma linha de base.

## Posicionamento (não mexer no código)

Lados e nomes dos personagens ficam em `src/config/characters.ts`:

- Protagonista → **esquerda** (sempre).
- Personagens novos (Avô Tadeu, Eco) → **direita**.
