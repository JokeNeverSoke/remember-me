import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Box, Flex, Input, Text, Image } from "@chakra-ui/react";
import getCaretCoordinates from "textarea-caret";
import ReactMarkdown from "react-markdown";
import { useRecoilState, useRecoilValue } from "recoil";
import { chatboxHistoryState, chatboxQueueState } from "@/stores/chatbox";

import { dirLogger } from "./_logger";
import { useKeyPress } from "@/utils/keyListener";
import { waitingState } from "@/stores/others";
const log = dirLogger.extend("chatbox");

const useCaretPosition = () => {
  const ref = useRef<HTMLInputElement>(null);
  const getCaret = () => {
    if (ref.current) {
      return getCaretCoordinates(ref.current, ref.current.selectionEnd!);
    }
    return null;
  };
  return { ref, getCaret };
};

export const Chatbox = () => {
  const [input, setInput] = useState("");
  const [qState, setQState] = useRecoilState(chatboxQueueState);
  const [historyState, setHistoryState] = useRecoilState(chatboxHistoryState);
  const isWaiting = useRecoilValue(waitingState);
  const currentChat = qState.length ? qState[0] : null;
  useEffect(() => {
    if (currentChat?.type === "input") {
      setInput(currentChat.text);
    }
  }, [currentChat]);
  const isInputting = currentChat?.type === "input";
  useKeyPress(" ", () => {
    if (!isInputting) onComplete();
  });

  if (!currentChat) return null;
  function onComplete() {
    if (!currentChat) return;
    if (currentChat?.onComplete) {
      currentChat.onComplete(
        currentChat.type === "input" ? input : currentChat.text
      );
    }
    setQState((l) => l.slice(1));
    setHistoryState((l) => {
      // @ts-ignore
      const { onPop, onComplete, ...item } = currentChat;
      return [
        ...l,
        { ...item, text: item.type === "input" ? input : item.text },
      ];
    });
  }
  console.log({ isWaiting });

  return (
    <Box position="absolute" bottom="0" right="0" w="100%" px={6} py={4}>
      <Flex
        border={4}
        borderColor="gray.900"
        borderStyle="solid"
        borderRadius="lg"
        bg="rgba(20,20,20,0.8)"
        color="white"
        px={3}
        py={3}
        minH="16vh"
        onClick={currentChat.type === "output" ? onComplete : undefined}
        cursor={currentChat.type === "output" ? "pointer" : undefined}
      >
        {isWaiting ? (
          "Waiting..."
        ) : (
          <>
            <Box w={36} mx={2} px={3} textAlign="right">
              {typeof currentChat.source === "object" ? (
                <>
                  {currentChat.source.head ? (
                    <Image
                      src={currentChat.source?.head}
                      sx={{
                        maskImage:
                          "linear-gradient(180deg, black 80%, transparent 100%)",
                      }}
                    />
                  ) : null}
                  {currentChat.source.name}
                </>
              ) : (
                currentChat?.source ?? null
              )}
            </Box>
            <Box flexGrow={1}>
              {isInputting ? (
                <Input
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                  ref={(node) => {
                    setTimeout(() => node?.focus());
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      onComplete();
                    }
                  }}
                  border="none"
                  outline="none"
                  paddingInlineStart="0"
                  paddingInlineEnd="0"
                  height={6}
                  margin={0}
                  lineHeight={1}
                  borderBottomColor="gray.300"
                  borderBottomStyle="solid"
                  borderBottomWidth={2}
                  borderRadius="0"
                  px={2}
                  _focus={{
                    outline: "none",
                  }}
                />
              ) : (
                <Text as="div">
                  <ReactMarkdown>{currentChat.text}</ReactMarkdown>
                </Text>
              )}
            </Box>
          </>
        )}
      </Flex>
    </Box>
  );
};
