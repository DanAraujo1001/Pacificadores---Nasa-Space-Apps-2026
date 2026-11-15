# Assets pendentes — Ato 0 (Prólogo) e Ato 1 (Hub + estágios)

Os caminhos abaixo estão centralizados em `src/config/sceneAssets.ts`
(backgrounds, sprites e ícones de equipamento). Para "ativar" um asset, basta
colocar o arquivo final na pasta indicada com o **nome exato** listado. Nenhum
código precisa mudar.

Enquanto o arquivo não existir, a cena usa um **placeholder automático**
(silhueta/cor sólida com o nome do asset visível) — o jogo não quebra.

## Backgrounds

| Asset                   | Pasta                        | Arquivo esperado                 | Formato        |
| ----------------------- | ---------------------------- | -------------------------------- | -------------- |
| Sótão (Ato 0)           | `public/assets/backgrounds/` | `act0-attic.png`                 | `.png`/`.webp` |
| Hub na nave (Ato 1)     | `public/assets/backgrounds/` | `act1-hub-ship.png`              | `.png`/`.webp` |
| Estágio Eagle           | `public/assets/backgrounds/` | `stage-eagle-tranquility.png`    | `.png`/`.webp` |
| Estágio LRV             | `public/assets/backgrounds/` | `stage-lrv-plain.png`            | `.png`/`.webp` |
| Estágio Spirit          | `public/assets/backgrounds/` | `stage-spirit-gusev.png`         | `.png`/`.webp` |
| Estágio Phoenix         | `public/assets/backgrounds/` | `stage-phoenix-arctic.png`       | `.png`/`.webp` |

Recomendado: imagem horizontal (ex.: 1920×1080), `object-cover`.

## Sprites de personagem

Convenção de pastas: `public/assets/sprites/{character_id}/`.

| Personagem    | Pasta                                   | Arquivo esperado     | Formato        |
| ------------- | --------------------------------------- | -------------------- | -------------- |
| Protagonista  | `public/assets/sprites/player/`         | `player-normal.png`  | **já existe**  |
| Eco           | `public/assets/sprites/eco/`            | `eco-normal.png`     | `.png` transp. |
| Avô Tadeu     | `public/assets/sprites/grandpa-tadeu/`  | `grandpa-normal.png` | `.png` transp. |
| Eagle         | `public/assets/sprites/eagle/`          | `eagle-normal.png`   | `.png` transp. |
| LRV           | `public/assets/sprites/lrv/`            | `lrv-normal.png`     | `.png` transp. |
| Spirit        | `public/assets/sprites/spirit/`         | `spirit-normal.png`  | `.png` transp. |
| Phoenix       | `public/assets/sprites/phoenix/`        | `phoenix-normal.png` | `.png` transp. |

Recomendado para sprites: PNG vertical com fundo transparente, personagem
alinhado à base (pés no rodapé da imagem), pois o palco ancora todos os sprites
pela mesma linha de base.

## Ícones de equipamento (hub do Ato 1)

| Equipamento | Pasta                             | Arquivo esperado | Formato |
| ----------- | --------------------------------- | ---------------- | ------- |
| Eagle       | `public/assets/icons/equipment/`  | `eagle.svg`      | `.svg`/`.png` |
| LRV         | `public/assets/icons/equipment/`  | `lrv.svg`        | `.svg`/`.png` |
| Spirit      | `public/assets/icons/equipment/`  | `spirit.svg`     | `.svg`/`.png` |
| Phoenix     | `public/assets/icons/equipment/`  | `phoenix.svg`    | `.svg`/`.png` |

## Posicionamento (não mexer no código)

Lados e nomes dos personagens ficam em `src/config/characters.ts`; os destinos
e seus equipamentos em `src/config/destinations.ts`:

- Protagonista → **esquerda** (sempre).
- Personagens novos (Avô Tadeu, Eco, Eagle, LRV, Spirit, Phoenix) → **direita**.
- Lua: Eagle, LRV · Marte: Spirit, Phoenix.
