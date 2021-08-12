import { atom } from "recoil";

export const positionState = atom<number>({
  key: "positionState",
  default: 0,
});

export const movingState = atom<
  "idleLeft" | "idleRight" | "talking" | "walkLeft" | "walkRight"
>({
  key: "movingState",
  default: "idleRight",
});
