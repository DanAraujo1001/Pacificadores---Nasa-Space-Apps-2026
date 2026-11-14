import type { StageId } from "./novel";

export interface MemoryItem {
  id: string;
  stageId: StageId;
  title: string;
  description: string;
  thumbnail?: string;
}
