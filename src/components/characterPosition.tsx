import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatedSprite, Sprite, useTick } from "@inlet/react-pixi";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { AnimatedSprite as AnimatedSpriteType } from "pixi.js";

import { characters } from "@/constants/characters";
import { scenes } from "@/constants/scenes";
import { movingState, positionState } from "@/stores/position";
import { useKeyPress } from "@/utils/keyListener";
import { getDisplacement } from "@/utils/scene";

import walk1 from "@/assets/characters/traveler/walk1.png";
import walk2 from "@/assets/characters/traveler/walk2.png";
import walk3 from "@/assets/characters/traveler/walk3.png";
import { currentSceneIdx, useCurrentScene } from "@/stores/scene";
import { dialogues } from "@/constants/dialogues";
import { chatboxQueueState, useAppendChat } from "@/stores/chatbox";
import { currentDState } from "@/stores/currentD";
import { useChatTo } from "@/services/talkTo";

const KeyboardListenerF = () => {
  const [x, setX] = useRecoilState(positionState);
  const [isMoving, setIsMoving] = useRecoilState(movingState);
  const cQList = useRecoilValue(chatboxQueueState);
  const rightPress = useKeyPress("ArrowRight");
  const leftPress = useKeyPress("ArrowLeft");
  const scene = useCurrentScene();
  useTick((delta) => {
    if (cQList.length) return;
    if (rightPress) setX((c) => Math.min(c + delta * 5, scene.width));
    if (leftPress) setX((c) => Math.max(c - delta * 5, 0));
  });
  const isM = rightPress === leftPress ? false : rightPress ? "right" : "left";
  useEffect(() => {
    if (cQList.length) {
      setIsMoving(false);
      return;
    }
    setIsMoving(isM);
  }, [isM]);

  return null;
};

export const CharacterPosition = () => {
  const [x, setX] = useRecoilState(positionState);
  const isMoving = useRecoilValue(movingState);
  const [lastD, setLastD] = useState("right");
  const charRef = useRef<AnimatedSpriteType>(null);
  const [chars, setChars] = useState<{ character: Character; x: number }[]>([]);
  const cQList = useRecoilValue(chatboxQueueState);
  const c = characters.traveler;
  const currentScene = useCurrentScene();
  const setScene = useSetRecoilState(currentSceneIdx);
  const appendChat = useAppendChat();
  const [currentD, setCurrentD] = useRecoilState(currentDState);
  const [blocked, setBlocked] = useState(false);
  const chatTo = useChatTo();
  const { x: charX, sceneX } = getDisplacement({
    x,
    width: currentScene.width,
    windowW: window.innerWidth,
  });
  useEffect(() => {
    if (cQList.length) return;
    if (isMoving) {
      setLastD(isMoving);
    } else {
      if (charRef.current) {
        charRef.current.gotoAndStop(0);
      }
    }
  }, [isMoving]);

  useEffect(() => {
    // initilize dialouge list and scene
    const u = dialogues[currentD];
    setScene(u.scene);
    u.chats.forEach((c, i) => {
      const v = c[1];
      // @ts-ignore
      const source = characters[v] ?? v;
      appendChat({
        source,
        text: c[2],
        onComplete:
          i === u.chats.length - 1
            ? () => {
                if (u.next) {
                  setCurrentD(u.next);
                }
              }
            : undefined,
      });
    });
    setX(scenes[u.scene].initX);
    setChars(scenes[u.scene].characters);
  }, [currentD]);
  useEffect(() => {
    function downHandler({ key }: { key: string }) {
      if (key !== " ") return;
      const u = chars
        .filter(({ x: cx }) => Math.abs(cx - x) < 50)
        .filter(({ character }) => character.name !== "旅人")
        .sort((a, b) => a.x - b.x);
      if (u.length && !blocked) {
        const ccc = u[0];
        setBlocked(true);
        chatTo({ c: ccc.character, chapter: 1 }).then(() => {
          console.log("resolved");
          setBlocked(false);
        });
      }
    }
    window.addEventListener("keydown", downHandler);
    return () => window.removeEventListener("keydown", downHandler);
  }, [chars, x, blocked]);
  return (
    <>
      <KeyboardListenerF />
      <Sprite
        image={currentScene.image}
        width={currentScene.width}
        height={window.innerHeight}
        tint={currentScene.bgTint}
        x={sceneX}
        zIndex={-1}
      />

      {chars.map(({ character, x: cX }) => {
        return (
          <Sprite
            key={character.name}
            image={character.image}
            scale={0.175}
            tint={currentScene.tint}
            y={window.innerHeight - 18}
            anchor={[0.5, 0.9]}
            x={cX + sceneX}
            zIndex={0}
          />
        );
      })}

      <AnimatedSprite
        isPlaying={!!isMoving}
        animationSpeed={0.1}
        images={c.animations}
        scale={{ y: 0.125, x: lastD === "right" ? -0.125 : 0.125 }}
        y={window.innerHeight - 10}
        x={charX}
        tint={currentScene.tint}
        anchor={[0.5, 0.9]}
        ref={charRef}
        zIndex={1}
      />
    </>
  );
};
