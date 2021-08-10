import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { Chatbox } from "./components/chatbox";
import { GameContainer } from "./components/gameContainer";

function App() {
  const [f, setF] = useState(false);
  return (
    <GameContainer fullscreen={f}>
      <Button onClick={() => setF((s) => !s)}>Toggle F</Button>
      <Chatbox />
    </GameContainer>
  );
}

export default App;
