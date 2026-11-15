import type { MemoryItem } from "../types/memory";
import type { StageId } from "../types/novel";

export const MEMORIES: MemoryItem[] = [
  {
    id: "memory-eagle",
    stageId: "eagle",
    title: "Tranquility Base Plaque",
    description:
      "Eagle memory: the plaque declaring that humankind came in peace, and stayed on the Moon.",
  },
  {
    id: "memory-lrv",
    stageId: "lrv",
    title: "LRV Wire-Mesh Wheel",
    description:
      "LRV memory: the woven steel wheel that expanded how far explorers could roam.",
  },
  {
    id: "memory-spirit",
    stageId: "spirit",
    title: "Spirit Solar Panel",
    description:
      "Spirit memory: years past design life, still searching for water and pressing onward.",
  },
  {
    id: "memory-phoenix",
    stageId: "phoenix",
    title: "Phoenix Arctic Ice",
    description:
      "Phoenix memory: water ice evidence from the Martian arctic, under polar quiet.",
  },
];

export function getMemoryByStageId(stageId: StageId): MemoryItem | undefined {
  return MEMORIES.find((memory) => memory.stageId === stageId);
}

export function getMemoryById(id: string): MemoryItem | undefined {
  return MEMORIES.find((memory) => memory.id === id);
}