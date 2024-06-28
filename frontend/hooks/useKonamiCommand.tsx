import { useState, useEffect } from "react";

export const useKonamiCommand = (callback: () => void) => {
  const [input, setInput] = useState<string[]>([]);
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setInput((prevInput) => [...prevInput, event.key].slice(-konamiCode.length));
    };

    window.addEventListener("keydown", handleKeyDown);

    if (input.join("") === konamiCode.join("")) {
      callback();
      setInput([]);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [input, callback]);

  return { input };
};
