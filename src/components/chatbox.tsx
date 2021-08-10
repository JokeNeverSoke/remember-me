import React, { useCallback, useRef, useState } from "react";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import getCaretCoordinates from "textarea-caret";
import ReactMarkdown from "react-markdown";

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
  const [isInputting, setIsInputting] = useState(true);
  const [input, setInput] = useState("");
  const { ref, getCaret } = useCaretPosition();

  return (
    <Box
      position="absolute"
      bottom="0"
      right="0"
      w="100%"
      color="white"
      px={6}
      py={4}
    >
      <Flex
        border={2}
        borderColor="black"
        borderStyle="solid"
        borderRadius="lg"
        bg="rgba(0,0,0,0.5)"
        px={3}
        py={2}
        minH="16vh"
      >
        <Box w={36} mx={2} px={3} textAlign="right">
          Roy Li Jiashio
        </Box>
        <Box flexGrow={1}>
          {isInputting ? (
            <Input
              value={input}
              ref={ref}
              onChange={(e) => {
                setInput(e.target.value);
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
              sx={
                {
                  // caretColor: "transparent",
                }
              }
              _focus={{
                outline: "none",
              }}
            />
          ) : (
            <Text>
              <ReactMarkdown>I'm an _idiot_</ReactMarkdown>
            </Text>
          )}
        </Box>
      </Flex>
    </Box>
  );
};
