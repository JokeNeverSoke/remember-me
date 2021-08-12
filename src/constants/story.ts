import mountains from "@/assets/scenes/mountains.jpg";
import forest from "@/assets/scenes/forest.jpg";
import bed from "@/assets/scenes/bed.png";
import market from "@/assets/scenes/market.png";
import { characters as cs } from "./characters";

declare global {
  type TalkEvent = {
    type: "talk";
    source: string | Character;
    text: string;
  };

  type TitleEvent = {
    type: "title";
    title: string;
    subtitle?: string;
  };

  type SceneEvent = {
    type: "scene";
    scene: Scene;
    duration: number;
  };

  type FreeEvent = {
    type: "free";
  };

  type StoryEvent = TalkEvent | TitleEvent | SceneEvent | FreeEvent;
}

// utility shorthands
const t = (text: string) => ({
  type: "talk" as "talk",
  source: "traveler",
  text,
});
const h = (text: string) => ({
  type: "talk" as "talk",
  source: "hunter",
  text,
});

export const stories: { [key: string]: StoryEvent[] } = {
  "1": [
    {
      type: "scene",
      scene: {
        initX: 1000,
        width: 1800,
        characters: [{ character: cs.hunter, x: 1200 }],
        image: forest,
      },
      duration: 1,
    },
    {
      type: "talk",
      source: "？？？",
      text: "... ...",
    },
    t("这里是哪儿？"),
    {
      type: "talk",
      source: "？？？",
      text: "你在我们快乐城邦边的一片森林里",
    },
    t("你是谁？"),
    h("我是这里的猎人，这块森林，是我平时打猎的地方"),
    {
      type: "scene",
      scene: {
        width: 1800,
        initX: 800,
        characters: [{ character: cs.hunter, x: 1000 }],
        image: bed,
      },
      duration: 1,
    },
    t("发生了什么？"),
    h("我在森林里打猎遇到了被野兽追赶的你，把你救下，带了回来。"),
    t("多谢你救我来这里，这个城市正是我一直想找的，其他的居民在哪里呢？"),
    h("这里是城邦的最西边，大多数居民都在城区，城市中心的集市是最繁华的地方"),
    t("我的行李... ...城市中心有旅馆吗... ..."),
    h(
      "估计你身上的钱也不多了，这样，先在我这里住下，在集市里找到一份工作赚些钱吧"
    ),
    h("这里的人都很友善试试看和他们聊聊天，看看有没有工作可做吧"),
    {
      type: "scene",
      scene: {
        width: 2000,
        initX: 100,
        characters: [
          { character: cs.mad, x: 1000 },
          { character: cs.kas, x: 1600 },
        ],
        image: market,
      },
      duration: 1.1,
    },
    t("*走到人物面前按下空格键进行对话。*"),
    { type: "free" },
  ],
};
