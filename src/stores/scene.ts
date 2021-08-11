import { scenes } from "@/constants/scenes";
import { atom, useRecoilValue } from "recoil";

export const currentSceneIdx = atom<keyof typeof scenes | null>({
  key: "currentSceneIdx",
  default: null,
});

export const useCurrentScene = () => {
  const idx = useRecoilValue(currentSceneIdx);
  if (idx) return scenes[idx];
  return scenes.forest1;
};
