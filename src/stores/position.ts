import { atom } from "recoil";

export const positionState = atom<number>({
  key: "positionState",
  default: 0,
});

export const movingState = atom<false | "left" | "right">({
  key: "movingState",
  default: false,
});
