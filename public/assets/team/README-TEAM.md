# Fotos da equipe (tela Team)

Coloque as fotos nesta pasta (`public/assets/team/`) com o **nome exato** abaixo.
Os caminhos estão centralizados em `src/config/teamAssets.ts` — nenhum código
precisa mudar. Enquanto o arquivo não existir, a moldura fica **vazia**, sem erro
e sem mudar o layout (o espaço já é reservado).

| Integrante | Arquivo esperado | Pasta | Formato |
| --- | --- | --- | --- |
| Arthur de Góis França | `arthur.jpeg` | `public/assets/team/` | `.jpeg` (já ok) |
| Danilo Costa Araujo | `danilo.jpeg` | `public/assets/team/` | `.jpeg` (já ok) |
| Lucas Gabriel Brandi Dantas | `lucas.jpeg` | `public/assets/team/` | `.jpeg` (pendente) |
| Victor Gabriel Dias dos Santos | `victor.jpeg` | `public/assets/team/` | `.jpeg` (já ok) |

- **Proporção recomendada:** quadrada (1:1), ex.: **512×512**. A moldura é
  quadrada; a imagem é recortada com `object-cover` + `object-top` (preenche,
  sem distorcer, enquadrando o rosto na parte de cima).
- O nome/extensão do arquivo deve bater com o caminho em
  `src/config/teamAssets.ts` (`TEAM_PHOTOS`). Para usar `.png`/`.webp`, ajuste lá.
