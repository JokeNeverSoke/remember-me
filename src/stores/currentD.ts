import { atom } from "recoil";

export const storyQueueState = atom<StoryEvent[]>({
  key: "storyQueueState",
  default: [{ type: "free" }],
});
