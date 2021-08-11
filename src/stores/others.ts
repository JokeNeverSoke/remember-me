import { atom } from "recoil";

export const waitingState = atom<boolean>({
  key: "waitingState",
  default: false,
});
