import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = function (mode, replace = false) {
    if (replace) {
      setMode(mode);
      setHistory([...history.slice(0, -1), mode]);
    } else {
      setMode(mode);
      setHistory([...history, mode]);
    }
  };

  const back = function () {
    if (history.length <= 1) return;
    setMode(history[history.length - 2]);
    setHistory(history.slice(0, -1));
  };
  return { mode, transition, back };
}
