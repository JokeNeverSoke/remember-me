import { atom } from "recoil";
import { dialogues } from "@/constants/dialogues";

export const currentDState = atom<keyof typeof dialogues>({
  key: "currentDState",
  default: 0,
});
