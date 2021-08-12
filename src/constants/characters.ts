import hunterBody from "@/assets/characters/hunter/body.png";
import hunterHead from "@/assets/characters/hunter/head.png";
import kasBody from "@/assets/characters/kas/body.png";
import kasHead from "@/assets/characters/kas/head.png";
import madeleineBody from "@/assets/characters/madeleine/body.png";
import madeleineHead from "@/assets/characters/madeleine/head.png";
import travelerBody from "@/assets/characters/traveler/body.png";
import travelerHead from "@/assets/characters/traveler/head.png";
import pumBody from "@/assets/characters/pum/body.png";
import pumHead from "@/assets/characters/pum/head.png";
import charBody from "@/assets/characters/char/body.png";
import charHead from "@/assets/characters/char/head.png";

import walk1 from "@/assets/characters/traveler/walk1.png";
import walk2 from "@/assets/characters/traveler/walk2.png";
import walk3 from "@/assets/characters/traveler/walk3.png";
import talk from "@/assets/characters/traveler/talk.png";

declare global {
  type Character = {
    name: string;
    id: string;
    image?: string;
    head?: string;
  };
  interface PlayerCharacter extends Character {
    animations: string[];
    idle: string;
    talking: string;
  }
}

export const characters = {
  traveler: {
    name: "旅人",
    image: travelerBody,
    head: travelerHead,
    animations: [walk3, walk2, walk1, walk2],
    idle: walk2,
    talking: talk,
    id: "traveler",
  } as PlayerCharacter,
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
  pum: {
    name: "普米",
    image: pumBody,
    head: pumHead,
    id: "pum",
  } as Character,
  char: {
    name: "查理",
    image: charBody,
    head: charHead,
    id: "char",
  } as Character,
};

export const usePlayer = () => characters.traveler;
