import React, { useRef } from "react";
import { AnimatedSprite, Sprite } from "@inlet/react-pixi";
import { AnimatedSprite as VanillaAnimatedSprite } from "pixi.js";
import { useRecoilValue } from "recoil";
import { useCurrentScene } from "@/stores/scene";
import { useDisplacement } from "@/utils/scene";
import { movingState } from "@/stores/position";
import { usePlayer } from "@/constants/characters";

export const Renderer = () => {
  const scene = useCurrentScene();
  const { charX, sceneX } = useDisplacement();
  const playerState = useRecoilValue(movingState);
  const player = usePlayer();
  const playerSpriteRef = useRef<VanillaAnimatedSprite>(null);

  const NPCList = scene.characters;

  return (
    <>
      {/* Background */}
      {scene.image ? (
        <Sprite
          image={scene.image}
          width={scene.width}
          height={window.innerHeight}
          tint={scene.bgTint}
          x={sceneX}
          zIndex={-1}
        />
      ) : null}

      {/* NPCs */}
      {NPCList.map(({ character, x }) => {
        return (
          <Sprite
            key={character.name}
            image={character.image}
            scale={0.175}
            tint={scene.tint ?? 0xffffff}
            y={window.innerHeight - 18}
            anchor={[0.5, 0.9]}
            x={x + sceneX}
            zIndex={0}
          />
        );
      })}

      {/* Player */}
      {["walkRight", "walkLeft"].includes(playerState) ? (
        <AnimatedSprite
          isPlaying={true}
          animationSpeed={0.1}
          images={player.animations}
          scale={{
            y: 0.125,
            x: ["walkRight", "idleRight"].includes(playerState)
              ? -0.125
              : 0.125,
          }}
          y={window.innerHeight - 10}
          x={charX}
          tint={scene.tint ?? 0xffffff}
          anchor={[0.5, 0.9]}
          ref={playerSpriteRef}
          zIndex={1}
        />
      ) : (
        <Sprite
          image={playerState === "talking" ? player.talking : player.idle}
          scale={{
            y: 0.125,
            x: ["walkRight", "idleRight"].includes(playerState)
              ? -0.125
              : 0.125,
          }}
          y={window.innerHeight - 10}
          x={charX}
          tint={scene.tint ?? 0xffffff}
          anchor={[0.5, 0.9]}
          ref={playerSpriteRef}
          zIndex={1}
        />
      )}
    </>
  );
};
