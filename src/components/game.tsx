import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatedSprite, Sprite, useTick } from "@inlet/react-pixi";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { AnimatedSprite as AnimatedSpriteType } from "pixi.js";

import { useMovementControl } from "../utils/movementControl";
import { Renderer } from "./renderer";
import { storyQueueState } from "@/stores/currentD";
import { useAppendChat } from "@/stores/chatbox";
import { currentSceneState } from "@/stores/scene";
import { useDim } from "@/utils/dim";
import { positionState } from "@/stores/position";
import { characters } from "@/constants/characters";

// export const Game = () => {
//   const [x, setX] = useRecoilState(positionState);
//   const isMoving = useRecoilValue(movingState);
//   const [lastD, setLastD] = useState("right");
//   const charRef = useRef<AnimatedSpriteType>(null);
//   const [chars, setChars] = useState<{ character: Character; x: number }[]>([]);
//   const cQList = useRecoilValue(chatboxQueueState);
//   const c = characters.traveler;
//   const currentScene = useCurrentScene();
//   const setScene = useSetRecoilState(currentSceneIdx);
//   const appendChat = useAppendChat();
//   const [currentD, setCurrentD] = useRecoilState(currentDState);
//   const [blocked, setBlocked] = useState(false);
//   const chatTo = useChatTo();
//   const { x: charX, sceneX } = getDisplacement({
//     x,
//     width: currentScene.width,
//     windowW: window.innerWidth,
//   });
//   useEffect(() => {
//     if (cQList.length) return;
//     if (isMoving) {
//       setLastD(isMoving);
//     } else {
//       if (charRef.current) {
//         charRef.current.gotoAndStop(0);
//       }
//     }
//   }, [isMoving]);

//   useEffect(() => {
//     // initilize dialouge list and scene
//     const u = dialogues[currentD];
//     setScene(u.scene);
//     u.chats.forEach((c, i) => {
//       const v = c[1];
//       // @ts-ignore
//       const source = characters[v] ?? v;
//       appendChat({
//         source,
//         text: c[2],
//         onComplete:
//           i === u.chats.length - 1
//             ? () => {
//                 if (u.next) {
//                   setCurrentD(u.next);
//                 }
//               }
//             : undefined,
//       });
//     });
//     setX(scenes[u.scene].initX);
//     setChars(scenes[u.scene].characters);
//   }, [currentD]);
//   useEffect(() => {
//     function downHandler({ key }: { key: string }) {
//       if (key !== " ") return;
//       const u = chars
//         .filter(({ x: cx }) => Math.abs(cx - x) < 50)
//         .filter(({ character }) => character.name !== "旅人")
//         .sort((a, b) => a.x - b.x);
//       if (u.length && !blocked) {
//         const ccc = u[0];
//         setBlocked(true);
//         chatTo({ c: ccc.character, chapter: 1 }).then(() => {
//           console.log("resolved");
//           setBlocked(false);
//         });
//       }
//     }
//     window.addEventListener("keydown", downHandler);
//     return () => window.removeEventListener("keydown", downHandler);
//   }, [chars, x, blocked]);
//   return (
//     <>
//       <KeyboardListenerF />
//       <Sprite
//         image={currentScene.image}
//         width={currentScene.width}
//         height={window.innerHeight}
//         tint={currentScene.bgTint}
//         x={sceneX}
//         zIndex={-1}
//       />

//       {chars.map(({ character, x: cX }) => {
//         return (
//           <Sprite
//             key={character.name}
//             image={character.image}
//             scale={0.175}
//             tint={currentScene.tint}
//             y={window.innerHeight - 18}
//             anchor={[0.5, 0.9]}
//             x={cX + sceneX}
//             zIndex={0}
//           />
//         );
//       })}

//       <AnimatedSprite
//         isPlaying={!!isMoving}
//         animationSpeed={0.1}
//         images={c.animations}
//         scale={{ y: 0.125, x: lastD === "right" ? -0.125 : 0.125 }}
//         y={window.innerHeight - 10}
//         x={charX}
//         tint={currentScene.tint}
//         anchor={[0.5, 0.9]}
//         ref={charRef}
//         zIndex={1}
//       />
//     </>
//   );
// };

export const Game = () => {
  useMovementControl();
  const appendChat = useAppendChat();
  const { toDim } = useDim();
  const [currentStoryQ, setCurrentStoryQ] = useRecoilState(storyQueueState);
  const setScene = useSetRecoilState(currentSceneState);
  const setX = useSetRecoilState(positionState);
  const cS = currentStoryQ[0];
  const popQ = () => setCurrentStoryQ((u) => u.slice(1));

  useEffect(() => {
    if (cS.type === "talk") {
      appendChat({
        // @ts-ignore because characters index
        source: characters[cS.source] ?? cS.source,
        text: cS.text,
      }).then(popQ);
    } else if (cS.type === "scene") {
      const half = cS.duration / 2;
      toDim({ duration: half, opacity: 1 });
      setTimeout(() => {
        setScene(cS.scene);
        setX(cS.scene.initX);
        toDim({ duration: half, opacity: 0 });
        popQ();
      }, half * 1000);
    } else if (cS.type === "title") {
    }
  }, [cS]);

  return (
    <>
      <Renderer />
    </>
  );
};
