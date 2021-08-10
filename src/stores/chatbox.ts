import { atom } from "recoil";

type ChatboxItem = {
  source?: string | { name: string; color: string };
  text: string;
};

export const chatboxState = atom<ChatboxItem[]>({
  key: "chatboxState",
  default: [],
});
