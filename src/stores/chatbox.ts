import { atom, useSetRecoilState } from "recoil";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type ChatboxItem = {
  type: "input" | "output";
  source?: string | { name: string; head?: string };
  text: string;
};

interface QueuedChatboxItem extends ChatboxItem {
  onPop?: () => void;
  onComplete?: (value: string) => void;
}

export const chatboxHistoryState = atom<ChatboxItem[]>({
  key: "chatboxHistoryState",
  default: [],
});

export const chatboxQueueState = atom<QueuedChatboxItem[]>({
  key: "chatboxQueueState",
  default: [],
});

export const useAppendChat = () => {
  const setQueue = useSetRecoilState(chatboxQueueState);
  const appendQueue = (i: QueuedChatboxItem) => {
    setQueue((current) => {
      return [...current, i];
    });
  };
  return async (i: Optional<QueuedChatboxItem, "type">) => {
    const { onComplete: usrOnComplete, type, ...item } = i;
    return await new Promise<string>((resolve, reject) => {
      appendQueue({
        onComplete: (value: typeof i.text) => {
          if (usrOnComplete) {
            const t = usrOnComplete as (value: string | null) => void;
            t(value);
          }
          resolve(value);
        },
        type: type ?? "output",
        ...item,
      });
    });
  };
};

export const chatboxLockedState = atom({
  key: "chatboxLockedState",
  default: false,
});
