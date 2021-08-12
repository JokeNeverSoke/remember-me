import { atom } from "recoil";

export const storyQueueState = atom<StoryEvent[]>({
  key: "storyQueueState",
  default: [
    {
      type: "scene",
      scene: { width: 3100, initX: 100, characters: [] },
      duration: 7,
    },
    { type: "free" },
  ],
});
