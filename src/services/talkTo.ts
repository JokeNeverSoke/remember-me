import { useAppendChat } from "@/stores/chatbox";
import { waitingState } from "@/stores/others";
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
  const setWaiting = useSetRecoilState(waitingState);
  return async ({ c, chapter }: { c: Character; chapter: number }) => {
    await appendChat({ type: "input", source: "traveler", text: "" }).then(
      async (text) => {
        // setWaiting(true);
        const u = await talkTo({
          text,
          npc_id: c.id,
          patience: 1,
          state: { chap: chapter, npc_state: 0 },
        });
        await Promise.all(
          u.data.reply_text.map(async (t: string) => {
            await appendChat({ source: c, text: t });
          })
        );
        setWaiting(false);
      }
    );
  };
};
