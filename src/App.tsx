import { Box, Button, Center, Heading } from "@chakra-ui/react";
import { useTick } from "@inlet/react-pixi";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Chatbox } from "./components/chatbox";
import { DevTools } from "./components/devTools";
import { GameContainer } from "./components/gameContainer";
import { MainStage } from "./components/mainStage";
import { characters } from "./constants/characters";
import { dialogues } from "./constants/dialogues";
import { useAppendChat } from "./stores/chatbox";
import { positionState } from "./stores/position";
import { currentSceneIdx } from "./stores/scene";
import { useKeyPress } from "./utils/keyListener";

import { appLogger as log } from "./utils/logger";

function App() {
  const [f, setF] = useState(false);
  const appendChat = useAppendChat();
  const [todo, setTodo] = useState(dialogues[0]);
  const [current, setCurrent] = useState<any>(null);
  const [scene, setScene] = useRecoilState(currentSceneIdx);

  if (!f)
    return (
      <Center w="100vw" h="100vh" bg="black" color="white">
        <Box textAlign='center'>
          <Heading>Remember Me</Heading>
          <Button variant="unstyled" textDecor='underline' onClick={() => setF((s) => !s)}>
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
