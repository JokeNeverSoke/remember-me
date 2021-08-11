import { Box } from "@chakra-ui/react";
import { Sprite } from "@inlet/react-pixi";
import React from "react";

export const DevTools: React.FC = ({ children }) => {
  return (
    <Box position="fixed" top="0" right="0">
      {children}
    </Box>
  );
};
