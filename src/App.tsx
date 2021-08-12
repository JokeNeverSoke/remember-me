import React, { useState } from "react";
import { Box, Button, Center, Heading } from "@chakra-ui/react";
import PIXI from "pixi.js";
import { sound } from "@pixi/sound";
import angelDream from "./assets/sounds/angel_dream.mp3";

import { Chatbox } from "./components/chatbox";
import { DevTools } from "./components/devTools";
import { GameContainer } from "./components/gameContainer";
import { MainStage } from "./components/mainStage";

sound.add("my-sound", angelDream);

function App() {
  const [f, setF] = useState(false);

  if (!f)
    // title scene
    return (
      <Center w="100vw" h="100vh" bg="black" color="white">
        <Box textAlign="center">
          <Heading>Remember Me</Heading>
          <Button
            variant="unstyled"
            textDecor="underline"
            onClick={() => {
              sound.play("my-sound", { loop: true });
              setF((s) => !s);
            }}
          >
            Start Game
          </Button>
        </Box>
      </Center>
    );

  return (
    <GameContainer fullscreen={f}>
      <MainStage />
      <Chatbox />
    </GameContainer>
  );
}

export default App;
