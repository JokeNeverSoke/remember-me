import { characters } from "@/constants/characters";
import { atom, useRecoilValue } from "recoil";

export const currentSceneState = atom<Scene>({
  key: "currentSceneState",
  default: {
    width: 3100,
    characters: [],
    initX: 10,
  },
});

export const useCurrentScene = (): Scene => {
  const scene = useRecoilValue(currentSceneState);
  return scene;
};
