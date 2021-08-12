import React from "react";
import { Box } from "@chakra-ui/react";
import { useRef, useEffect } from "react";
import { useDim } from "@/utils/dim";

export const GameContainer: React.FC<{ fullscreen: boolean }> = ({
  children,
  fullscreen,
  ...boxProps
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { Overlay } = useDim();
  useEffect(() => {
    if (fullscreen && containerRef.current?.requestFullscreen) {
      containerRef.current.requestFullscreen();
    } else if (
      !fullscreen &&
      document.fullscreenElement &&
      document.exitFullscreen
    ) {
      document.exitFullscreen();
    }
  }, [fullscreen, containerRef]);

  return (
    <Box
      id="game-container"
      position="relative"
      w="full"
      minW="100vw"
      h="full"
      minH="100vh"
      ref={containerRef}
      bg="gray.400"
      {...boxProps}
    >
      <Overlay />
      {children}
    </Box>
  );
};
