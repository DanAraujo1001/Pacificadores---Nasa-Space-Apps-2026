import { useState } from "react";
import { Button } from "@heroui/react";

interface EquipmentButtonProps {
  label: string;
  /** Ícone do equipamento (pode não existir ainda → placeholder). */
  iconSrc: string | null;
  completed: boolean;
  onSelect: () => void;
}

/**
 * Botão de equipamento do hub. Mostra o ícone (ou placeholder nomeado) e, se o
 * estágio já foi concluído, fica esmaecido, marcado com ✓ e não clicável.
 *
 * O bloqueio é garantido por `isDisabled` + guarda no `onPress`, para que não
 * haja caminho de reentrada num estágio concluído.
 */
export function EquipmentButton({
  label,
  iconSrc,
  completed,
  onSelect,
}: EquipmentButtonProps) {
  const [iconFailed, setIconFailed] = useState(false);
  const showIcon = iconSrc !== null && !iconFailed;

  return (
    <Button
      variant="outline"
      size="lg"
      isDisabled={completed}
      onPress={() => {
        if (completed) return;
        onSelect();
      }}
      aria-label={completed ? `${label} (completed)` : label}
      className="group flex h-auto cursor-pointer flex-col items-center gap-3 rounded-sm border border-primary bg-content1/60 px-6 py-5 text-primary transition-colors hover:bg-primary/15 data-[hovered=true]:bg-primary/15 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-40"
    >
      <span
        className="relative flex size-20 items-center justify-center rounded-sm border border-primary/40 bg-background/40"
        aria-hidden={showIcon ? undefined : true}
      >
        {showIcon ? (
          <img
            src={iconSrc}
            alt=""
            className="size-14 object-contain"
            draggable={false}
            onError={() => setIconFailed(true)}
          />
        ) : (
          <span className="px-1 text-center font-mono text-[10px] uppercase tracking-widest text-primary/70">
            {label}
          </span>
        )}
        {completed ? (
          <span
            className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-sm border border-primary bg-background font-mono text-xs text-primary"
            aria-hidden="true"
          >
            ✓
          </span>
        ) : null}
      </span>
      <span className="font-display text-sm font-bold uppercase tracking-wide">
        {label}
        {completed ? " · done" : ""}
      </span>
    </Button>
  );
}
