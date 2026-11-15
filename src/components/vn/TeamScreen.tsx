import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { useGameStore } from "../../store/useGameStore";
import { TEAM_MEMBERS, getTeamPhoto } from "../../data/team";
import { PhotoFrame } from "./PhotoFrame";
import { SocialLink } from "./SocialLink";

const enterContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const enterItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/**
 * TELA TEAM — página da equipe. Aberta pelo botão "Team" do menu, volta ao menu
 * pelo botão de voltar (fade existente, sem resetar o estado do jogo).
 *
 * Quatro molduras (`PhotoFrame` tamanho `lg`, maiores que as de Memories),
 * vazias até a foto existir em `public/assets/team/`. Nome fixo abaixo (espaço
 * reservado, quebra em 2 linhas sem empurrar o layout) e links de LinkedIn/GitHub.
 */
export function TeamScreen() {
  const fadeToScreen = useGameStore((state) => state.fadeToScreen);

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-6 py-16 text-foreground">
      <div className="fixed left-4 top-4 z-40 md:left-6 md:top-6">
        <Button
          variant="outline"
          size="sm"
          onPress={() => fadeToScreen("menu")}
          aria-label="Back to home"
          className="cursor-pointer rounded-sm border border-primary bg-transparent px-4 py-2 text-primary transition-colors duration-200 hover:bg-primary hover:text-primary-foreground data-[hovered=true]:bg-primary data-[hovered=true]:text-primary-foreground"
        >
          Back
        </Button>
      </div>

      <motion.div
        className="flex w-full max-w-5xl flex-col items-center gap-10"
        variants={enterContainer}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          variants={enterItem}
          className="font-display text-3xl font-bold uppercase tracking-wide text-primary md:text-4xl lg:text-5xl"
        >
          Team
        </motion.h1>

        {/* 4 em uma linha em telas largas; 2x2 quando não couber. Sem scroll-x. */}
        <motion.ul
          variants={enterItem}
          className="grid w-full grid-cols-2 justify-items-center gap-6 lg:grid-cols-4 lg:gap-8"
        >
          {TEAM_MEMBERS.map((member) => (
            <li
              key={member.id}
              className="flex w-full flex-col items-center gap-3"
            >
              <PhotoFrame src={getTeamPhoto(member)} alt={member.name} size="lg" />

              {/* Altura reservada p/ o nome (até 2 linhas), alinhando os 4 cards. */}
              <p className="flex h-11 items-center justify-center text-center text-sm font-medium leading-tight text-foreground md:text-base">
                {member.name}
              </p>

              <div className="flex items-center justify-center gap-3">
                <SocialLink
                  iconSrc="/assets/icons/icon-linkedin.svg"
                  href={member.linkedin}
                  label={`LinkedIn de ${member.name}`}
                />
                <SocialLink
                  iconSrc="/assets/icons/icon-github.svg"
                  href={member.github}
                  label={`GitHub de ${member.name}`}
                />
              </div>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
