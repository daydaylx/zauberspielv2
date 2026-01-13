import React from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

interface TypewriterTextProps {
  text: string;
  speed: number;
  enabled: boolean;
  onComplete?: () => void;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({ text, speed, enabled, onComplete }) => {
  const { displayedText, isComplete, skip } = useTypewriter(text, speed, enabled);

  // Notify parent when complete
  React.useEffect(() => {
    if (isComplete && onComplete) {
        onComplete();
    }
  }, [isComplete, onComplete]);

  // Split text by paragraphs for proper styling
  const paragraphs = displayedText.split('\n\n');

  return (
    <div onClick={skip} className="cursor-pointer min-h-[200px]">
      {paragraphs.map((para, i) => (
        <p key={i} className="mb-4 leading-relaxed text-lg md:text-xl text-ink/90 font-serif first-letter:text-3xl first-letter:font-title first-letter:float-left first-letter:mr-1 first-letter:mt-1 first-letter:text-accent-dark">
          {para}
          {i === paragraphs.length - 1 && !isComplete && <span className="typing-cursor text-accent ml-1"></span>}
        </p>
      ))}
    </div>
  );
};

