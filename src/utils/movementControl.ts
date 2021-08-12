import { useEffect, useState } from "react";
import { useTick } from "@inlet/react-pixi";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { chatboxLockedState, chatboxQueueState } from "@/stores/chatbox";
import { positionState, movingState } from "@/stores/position";
import { currentSceneState, useCurrentScene } from "@/stores/scene";
import { useKeyPress } from "@/utils/keyListener";
import { useChatTo } from "@/services/talkTo";
import { storyQueueState } from "@/stores/currentD";
import { characters } from "@/constants/characters";
import { stories } from "@/constants/story";

export const useMovementControl = () => {
  const [x, setX] = useRecoilState(positionState);
  const [mState, setMState] = useRecoilState(movingState);
  const cQList = useRecoilValue(chatboxQueueState);
  const setStoryList = useSetRecoilState(storyQueueState);
  const isLocked = useRecoilValue(chatboxLockedState);
  const scene = useCurrentScene();
  const setScene = useSetRecoilState(currentSceneState);
  const chatTo = useChatTo();
  const [isPrologue, setIsPrologue] = useState(true);

  const rightPress = useKeyPress("ArrowRight");
  const leftPress = useKeyPress("ArrowLeft");
  useKeyPress(" ", () => {
    if (isLocked || cQList.length) return;
    const close = scene.characters
      .filter(({ x: cx }) => Math.abs(x - cx) < 48)
      .filter((c) => c.character.name !== "旅人");
    if (close.length === 1) {
      const target = close[0];
      chatTo({ c: target.character, chapter: 1 });
    }
  });

  useTick((delta) => {
    // disable movement when chatbox has item
    if (cQList.length || isLocked) return;

    if (isPrologue) {
      setScene((s) => ({
        ...s,
        tint: 0xffffff - 0x080808 * Math.floor(x / 100),
      }));
    }
    if (x + delta * 5 > scene.width && isPrologue) {
      setIsPrologue(false);
      console.log("?");
      setStoryList(stories["1"]);
    }
    if (x + delta * 5 > scene.width && scene.right) {
      scene.right();
    }
    if (x + delta * 5 < 0 && scene.left) scene.left();

    if (rightPress) {
      setX((c) => Math.min(c + delta * 5, scene.width));
      setMState("walkRight");
    }
    if (leftPress && !isPrologue) {
      setX((c) => Math.max(c - delta * 5, 0));
      setMState("walkLeft");
    }

    if (
      !rightPress &&
      !leftPress &&
      ["walkRight", "walkLeft"].includes(mState)
    ) {
      setMState((p) => (p === "walkLeft" ? "idleLeft" : "idleRight"));
    }
  });
};
