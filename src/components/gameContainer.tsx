import { Box } from "@chakra-ui/react";
import React from "react";
import { useRef, useEffect } from "react";

export const GameContainer: React.FC<{ fullscreen: boolean }> = ({
  children,
  fullscreen,
  ...boxProps
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
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
      position="relative"
      w="full"
      minW="100vw"
      h="full"
      minH="100vh"
      ref={containerRef}
      bg="gray.400"
      {...boxProps}
    >
      {children}
    </Box>
  );
};
