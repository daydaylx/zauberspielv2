import { useState, useEffect, useRef } from 'react';

export const useTypewriter = (text: string, speed: number = 30, enabled: boolean = true) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const index = useRef(0);
  const timer = useRef<number | null>(null);

  // Reset wenn sich der Text ändert
  useEffect(() => {
    if (!enabled) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    setDisplayedText('');
    setIsComplete(false);
    index.current = 0;

    const typeChar = () => {
      if (index.current < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index.current));
        index.current++;
        timer.current = window.setTimeout(typeChar, speed);
      } else {
        setIsComplete(true);
      }
    };

    timer.current = window.setTimeout(typeChar, speed);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [text, speed, enabled]);

  const skip = () => {
    if (timer.current) clearTimeout(timer.current);
    setDisplayedText(text);
    setIsComplete(true);
  };

  return { displayedText, isComplete, skip };
};
