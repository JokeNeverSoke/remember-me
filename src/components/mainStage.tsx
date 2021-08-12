import React, { useEffect, useState } from "react";
import { Sprite, Stage, useTick } from "@inlet/react-pixi";
import { positionState } from "@/stores/position";
import { useKeyPress } from "@/utils/keyListener";
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilState,
} from "recoil";
import { Game } from "./game";

export const MainStage = () => {
  const [{ x, y }, setDim] = useState({ x: 600, y: 600 });
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
  useEffect(() => {
    function onResize() {
      setDim({ x: window.innerWidth, y: window.innerHeight });
    }
    window.addEventListener("resize", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return (
    <Stage width={x} height={y} options={{ backgroundColor: 0x000000 }}>
      <RecoilBridge>
        <Game />
      </RecoilBridge>
    </Stage>
  );
};
