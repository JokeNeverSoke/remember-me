import { characters } from "./characters";
import { scenes } from "./scenes";

/** Type, Source, Text */
type Talk = ["talk", keyof typeof characters | string, string];

type Story = {
  chats: Talk[];
  scene: keyof typeof scenes;
  next?: keyof typeof dialogues;
};

export const dialogues:{[key:number]:Story} = {
  0: {
    scene: "forest1",
    chats: [
      ["talk", "？？？", "... ..."],
      ["talk", "traveler", "这里是哪？"],
      ["talk", "？？？", "你在我们快乐城邦边的一片森林里"],
      ["talk", "traveler", "你是谁"],
      ["talk", "hunter", "我是这里的猎人，这块森林，是我平时打猎的地方"],
    ],
    next: 1
  },
  1: {
    scene: 'room1',
    chats: [
      ["talk", "traveler", "发生了什么？"],
      ["talk", "hunter", "我在森林里打猎遇到了被野兽追赶的你，把你救下，带回来，"],
      ["talk", "traveler", "多谢你救我来这里，这个城市正是我一直想找的，其他的居民在哪里呢"],
      ["talk", "hunter", "这里是城邦的最西边，大多数居民都在城区，城市中心的集市是最繁华的地方"],
      ["talk", "traveler", "我的行李... ...城市中心有旅馆吗... ..."],
      ["talk", "hunter", "估计你身上的钱也不多了，这样，先在我这里住下，在集市里找到一份工作赚些钱吧"],
      ["talk", "hunter", "这里的人都很友善试试看和他们聊聊天，看看有没有工作可做吧"],
    ],
    next: 2
  }
};
