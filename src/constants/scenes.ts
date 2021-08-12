import mountains from "@/assets/scenes/mountains.jpg";
import forest from "@/assets/scenes/forest.jpg";
import bed from "@/assets/scenes/bed.png";
import market from "@/assets/scenes/market.png";
import { CSSProperties } from "react";

declare global {
  type Scene = {
    initX: number;
    width: number;
    characters: Array<{ character: Character; x: number }>;
    image?: string;
    tint?: number;
    bgTint?: number;
    onComplete?: () => void;
    left?: () => void;
    right?: () => void;
  };
}
