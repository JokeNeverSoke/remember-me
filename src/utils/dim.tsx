import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const overlayState = atom({ key: "overlayState", default: { d: 0.5, o: 0 } });

export const useDim = () => {
  const setOS = useSetRecoilState(overlayState);
  return {
    Overlay: () => {
      const { o, d } = useRecoilValue(overlayState);
      return (
        <Box
          transitionProperty="opacity"
          transitionTimingFunction="ease-in-out"
          transitionDuration={`${d}s`}
          pointerEvents="none"
          opacity={o}
          position="fixed"
          w="100vw"
          h="100vh"
          top={0}
          right={0}
          bg="black"
        />
      );
    },
    toDim: ({ duration, opacity }: { duration: number; opacity: number }) => {
      setOS({ o: opacity, d: duration });
    },
  };
};
