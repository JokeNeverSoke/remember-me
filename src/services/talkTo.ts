import { characters } from "@/constants/characters";
import { chatboxLockedState, useAppendChat } from "@/stores/chatbox";
import axios from "axios";
import { useSetRecoilState } from "recoil";

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
  const lock = () => l(true);
  const unlock = () => l(false);
  return async ({ c, chapter }: { c: Character; chapter: number }) => {
    const text = await appendChat({
      type: "input",
      source: characters.traveler,
      text: "",
    });
    lock();
    const u = await talkTo({
      text,
      npc_id: c.id,
      patience: 1,
      state: { chap: chapter, npc_state: 0 },
    });
    unlock();
    if (typeof u.data.reply_text === "string") {
      await await appendChat({ source: c, text: u.data.reply_text });
    } else {
      await Promise.all(
        u.data.reply_text.map(async (t: string) => {
          if (/^set_/.test(t)) {
            const [, name, value] = t.split("_");
          } else {
            await appendChat({ source: c, text: t });
          }
        })
      );
    }
  };
};
