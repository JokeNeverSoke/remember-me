import mountains from "@/assets/scenes/mountains.jpg";
import forest from "@/assets/scenes/forest.jpg";
import bed from "@/assets/scenes/bed.png";
import market from "@/assets/scenes/market.png";
import butch from "@/assets/scenes/butch.png";
import book from "@/assets/scenes/book.png";
import mnight from "@/assets/scenes/mnight.png";
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
const m = (text: string) => ({
  type: "talk" as "talk",
  source: "mad",
  text,
});
const k = (text: string) => ({
  type: "talk" as "talk",
  source: "kas",
  text,
});
const p = (text: string) => ({
  type: "talk" as "talk",
  source: "pum",
  text,
});
const hint = (text: string) => ({
  type: "talk" as "talk",
  source: "提示",
  text,
});

export const stories: { [key: string]: StoryEvent[] } = {
  "1": [
    {
      type: "scene",
      scene: {
        initX: 1000,
        width: 1600,
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
  get_job: [
    {
      type: "scene",
      scene: {
        width: 1600,
        initX: 700,
        characters: [{ character: cs.hunter, x: 800 }],
        image: bed,
      },
      duration: 2,
    },
    t("嘿，最近夜晚打猎的时间变多了啊"),
    h("是啊，是有重要的事要发生了，需要更多的猎物储备"),
    t("话说你的猎物都在哪儿啊，怎么没看到"),
    h("啊，在另一个屋子里，平时不是很想和那么多猎物在一起生活"),
    {
      type: "scene",
      scene: {
        width: 2000,
        initX: 900,
        characters: [{ character: cs.mad, x: 1000 }],
        image: market,
      },
      duration: 2,
    },
    m("嗨！今天也来工作啦？在这里待了半个月感觉怎么样"),
    t(
      "感觉真的很好呢，大家都很友善，在这里一点悲伤都不会感觉到，这里果然名不虚传是快乐之城呢"
    ),
    m("是吧，来，给你一朵花，今天早上刚刚摘的"),
    t("话说最近花的品种变多了呢"),
    m("是啊，马上就要到一年一度的节日了呢"),
    t("在每天都像节日一样的地方的节日吗，真期待"),
    m("诶，是给城市降下永远快乐祝福的节日呢"),
    t("怎么降下祝福？"),
    m(
      "时间过的有点久了，上次节日细节已经记不清楚了，想要知道更多细节去问问卡斯吧，如果他看过更多书的话应该知道的更多呢"
    ),
    t("谢谢，那我先走了"),
    {
      type: "scene",
      scene: {
        width: 2000,
        initX: 1500,
        characters: [{ character: cs.pum, x: 1600 }],
        image: butch,
      },
      duration: 1,
    },
    p("呦，小伙子，来工作啦"),
    {
      type: "talk",
      source: "提示",
      text: "普米，肉店的员工，肉店在去书店的必经之路上，所以总能聊到天",
    },
    t("听说最近有节日啊"),
    p("可不是，最近可要忙一阵啦，哈哈"),
    {
      type: "scene",
      scene: {
        width: 2000,
        initX: 400,
        characters: [{ character: cs.kas, x: 500 }],
        image: book,
      },
      duration: 1,
    },
    k("哦！嗨！你来啦"),
    hint("问问老板有没有关于节日的书或是知道些什么好了"),
    { type: "free" },
  ],
  night1: [
    {
      type: "scene",
      scene: {
        width: 2000,
        initX: 400,
        characters: [{ character: cs.kas, x: 500 }],
        image: mnight,
      },
      duration: 1.8,
    },
  ],
};
