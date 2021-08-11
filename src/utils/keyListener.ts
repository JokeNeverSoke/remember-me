import { useEffect, useState } from "react";

import { dirLogger } from "./_logger";
const log = dirLogger.extend("keyListener");

// https://usehooks.com/useKeyPress/
export const useKeyPress = (targetKey: string, cb?: () => void) => {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState<boolean>(false);
  // If pressed key is our target key then set to true
  function downHandler({ key }: { key: string }) {
    log(`key ${key} down`);
    if (key === targetKey) {
      if (cb) cb();
      setKeyPressed(true);
    }
  }
  // If released key is our target key then set to false
  const upHandler = ({ key }: { key: string }) => {
    log(`key ${key} up`);
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [cb]); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
};
