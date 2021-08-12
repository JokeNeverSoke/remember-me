import { characters } from "@/constants/characters";
import { gameState } from "@/stores/game";
import { chatboxLockedState, useAppendChat } from "@/stores/chatbox";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { storyQueueState } from "@/stores/currentD";
import { stories } from "@/constants/story";

export const talkTo = async (data: {
  text: string;
  npc_id: string;
  patience: number;
  state: { chap: number; npc_state: number };
}) => {
  return await axios.post("http://1.117.193.66:5000/", data);
};

export const useChatTo = () => {
  const appendChat = useAppendChat();
  const l = useSetRecoilState(chatboxLockedState);
  const [gState, setGState] = useRecoilState(gameState);
  const setStoryQState = useSetRecoilState(storyQueueState);

  const lock = () => l(true);
  const unlock = () => l(false);

  return async ({ c }: { c: Character }) => {
    const text = await appendChat({
      type: "input",
      source: characters.traveler,
      text: "",
    });
    lock();
    const u = await talkTo({
      text,
      npc_id: c.id,
      // @ts-ignore
      patience: gState.patience[c.id] ?? 1,
      state: { chap: gState.chapter, npc_state: gState[c.id] ?? 0 },
    });
    setGState(({ patience, ...p }) => ({
      ...p,
      [c.id]: u.data.state.npc_state,
      patience: { ...patience, [c.id]: u.data.patience },
    }));
    unlock();
    if (typeof u.data.reply_text === "string") {
      await await appendChat({ source: c, text: u.data.reply_text });
    } else {
      await Promise.all(
        u.data.reply_text.map(async (t: string) => {
          if (/^\/set_/.test(t)) {
            const [, name, value] = t.split("_");
          } else if (/^\/next_/.test(t)) {
            const [, ...k] = t.split("_");
            const kk = k.join("_");
            setStoryQState((v) => [...v.slice(1), ...stories[kk]]);
          } else {
            await appendChat({ source: c, text: t });
          }
        })
      );
    }
  };
};
