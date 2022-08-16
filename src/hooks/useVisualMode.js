import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = function (mode, replace = false) {
    console.log(`ran transition(${mode}, ${replace})`);
    if (replace) {
      setMode(mode);
      setHistory([...history.slice(0, -1), mode]);
    } else {
      setMode(mode);
      setHistory([...history, mode]);
    }
  };

  const back = function () {
    console.log(`ran transition back()`);
    console.log(`mode: ${mode}`);
    console.log(`history: ${history}`);
    if (history.length <= 1) return;
    setMode(history[history.length - 2]);
    setHistory(history.slice(0, -1));
  };
  return { mode, transition, back };
}
