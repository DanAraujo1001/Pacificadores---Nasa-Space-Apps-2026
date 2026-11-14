import { Button } from "@heroui/react";

interface ChoiceButtonProps {
  label: string;
  onPress: () => void;
}

export function ChoiceButton({ label, onPress }: ChoiceButtonProps) {
  return (
    <Button
      variant="primary"
      size="sm"
      onPress={onPress}
      className="h-auto w-full min-w-[200px] cursor-pointer rounded-sm border-0 bg-primary/35 px-5 py-2 text-center text-sm font-medium text-white shadow-none hover:bg-primary data-[hovered=true]:bg-primary data-[pressed=true]:bg-primary"
    >
      {label}
    </Button>
  );
}
