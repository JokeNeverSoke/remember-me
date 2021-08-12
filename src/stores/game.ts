import { characters } from "@/constants/characters";
import { atom } from "recoil";

type Characters = keyof typeof characters;

type GameState = {
  [key in Characters]?: number;
} & {
  patience: {

    [key in Characters]?: number;
  }
  chapter: number;
  [key: string]: any;
};

export const gameState = atom<GameState>({
  key: "gameState",
  default: {
    patience: {},
    chapter: 1,
  },
});
