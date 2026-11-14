# Steering & Context Guidelines

Este workspace é governado pelos arquivos mestres localizados na raiz do projeto:
1. **`AGENTS.md`**: Contém a stack (React, Vite, HeroUI com `radius="sm"`), os temas dinâmicos por planeta (`space-default`, `space-moon`, `space-mars`) e as regras de desenvolvimento do jogo.
2. **`LORE_DATA.md`**: É a fonte absoluta da verdade histórica e de personalidades para os robôs da NASA (Apollo 11, Opportunity, Ingenuity).

## Regras de Atuação do Agente:
- **Zero Alucinação Histórica:** Nunca invente dados técnicos ou datas. Consulte o `LORE_DATA.md`.
- **UI Consistente:** Utilize sempre componentes do HeroUI com `radius="sm"`. Nunca use botões HTML nativos nus ou classes de estilo soltas que violem o Design System.
- **Client-Side First:** O projeto não utiliza banco de dados externo ou APIs de IA gerativa em tempo real. Toda a lore e diálogos rodam localmente estruturados em módulos tipados.