import { TEAM_PHOTOS, type TeamPhotoKey } from "../config/teamAssets";

/**
 * Integrantes da equipe (tela TEAM). Dados separados do componente para facilitar
 * a edição: nome, chave da foto (ver `config/teamAssets.ts`) e links sociais.
 *
 * `linkedin`/`github` vazios (`""`) significam URL pendente: o ícone
 * correspondente aparece desabilitado (sem link quebrado) até ser preenchido.
 */
export interface TeamMember {
  id: string;
  /** Nome exibido, exatamente como deve aparecer (acentos/capitalização). */
  name: string;
  photoKey: TeamPhotoKey;
  linkedin: string;
  github: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "arthur",
    name: "Arthur de Góis França",
    photoKey: "arthur",
    linkedin: "https://www.linkedin.com/in/arthur-de-góis-frança/",
    github: "https://github.com/Arthurgoisfranca",
  },
  {
    id: "danilo",
    name: "Danilo Costa Araujo",
    photoKey: "danilo",
    linkedin: "https://www.linkedin.com/in/danilocadev",
    github: "https://github.com/DanAraujo1001",
  },
  {
    id: "lucas",
    name: "Lucas Gabriel Brandi Dantas",
    photoKey: "lucas",
    linkedin: "https://www.linkedin.com/in/lucas-gabriel-brandi-dantas-1b358224b",
    github: "https://github.com/Lucas-Brandi",
  },
  {
    id: "victor",
    name: "Victor Gabriel Dias dos Santos",
    photoKey: "victor",
    linkedin:
      "https://www.linkedin.com/in/victor-g-dias?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    github: "https://github.com/Victor-dias96",
  },
];

/** Caminho da foto de um integrante (a partir da config central). */
export function getTeamPhoto(member: TeamMember): string {
  return TEAM_PHOTOS[member.photoKey];
}
