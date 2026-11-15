import { Button } from "@heroui/react";
import { useGameStore } from "../../store/useGameStore";

interface HomeButtonProps {
  /** Dentro do fluxo, em vez do canto fixo da tela. */
  inline?: boolean;
}

export function HomeButton({ inline = false }: HomeButtonProps) {
  const goHome = useGameStore((state) => state.goHome);

  return (
    <div
      className={
        inline
          ? "z-40"
          : "fixed left-4 top-4 z-40 md:left-6 md:top-6"
      }
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
    >
      <Button
        variant="outline"
        size="sm"
        onPress={goHome}
        className="cursor-pointer rounded-sm border border-primary bg-transparent px-4 py-2 text-primary transition-colors duration-200 hover:bg-primary hover:text-primary-foreground data-[hovered=true]:bg-primary data-[hovered=true]:text-primary-foreground"
        aria-label="Back to home"
      >
        Home
      </Button>
    </div>
  );
}
