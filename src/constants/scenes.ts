import mountains from "@/assets/scenes/mountains.jpg";
import forest from "@/assets/scenes/forest.jpg";
import bed from "@/assets/scenes/bed.png";
import market from "@/assets/scenes/market.png";
import { characters as cs } from "./characters";

declare global {
  type Scene = {
    image: string;
    width: number;
    characters: Array<{ character: Character; x: number }>;
    tint?: number;
    bgTint?: number;
    onComplete?: () => void;
    initX: number;
  };
}

export const scenes = {
  forest1: {
    image: forest,
    width: 1800,
    characters: [{ character: cs.hunter, x: 1000 }],
    tint: 0xbbbbbb,
    bgTint: 0xbbbbbb,
    initX: 900,
  } as Scene,
  room1: {
    image: bed,
    width: 2000,
    characters: [{ character: cs.hunter, x: 1000 }],
    initX: 800,
  } as Scene,
  market1: {
    image: market,
    width: 2200,
    characters: [
      { character: cs.mad, x: 1800 },
      { character: cs.kas, x: 1000 },
    ],
    initX: 50,
  } as Scene,
};
