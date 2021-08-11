import hunterBody from "@/assets/characters/hunter/body.png";
import hunterHead from "@/assets/characters/hunter/head.png";
import kasBody from "@/assets/characters/kas/body.png";
import kasHead from "@/assets/characters/kas/head.png";
import madeleineBody from "@/assets/characters/madeleine/body.png";
import madeleineHead from "@/assets/characters/madeleine/head.png";
import travelerBody from "@/assets/characters/traveler/body.png";
import travelerHead from "@/assets/characters/traveler/head.png";

import walk1 from "@/assets/characters/traveler/walk1.png";
import walk2 from "@/assets/characters/traveler/walk2.png";
import walk3 from "@/assets/characters/traveler/walk3.png";

declare global {
  type Character = {
    name: string;
    id: string;
    image?: string;
    head?: string;
    /** first as idle state */
    animations?: string[];
  };
}

export const characters = {
  traveler: {
    name: "旅人",
    image: travelerBody,
    head: travelerHead,
    animations: [walk2, walk3, walk2, walk1],
    id: "traveler",
  } as Character,
  hunter: {
    name: "猎人",
    image: hunterBody,
    head: hunterHead,
    id: "hunter",
  } as Character,
  kas: { name: "卡斯", image: kasBody, head: kasHead, id: "kas" } as Character,
  mad: {
    name: "玛德琳",
    image: madeleineBody,
    head: madeleineHead,
    id: "mad",
  } as Character,
};
