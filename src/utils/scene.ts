import { useRecoilValue } from "recoil";
import { positionState } from "@/stores/position";
import { useCurrentScene } from "@/stores/scene";

export const useDisplacement = () => {
  const x = useRecoilValue(positionState);
  const width = useCurrentScene().width;
  return {
    charX: (x / width) * window.innerWidth,
    sceneX: (x / width) * (width - window.innerWidth) * -1,
  };
};
