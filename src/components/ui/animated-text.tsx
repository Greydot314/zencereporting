import { useEffect, useState, useRef } from "react";

interface AnimatedTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}

export const AnimatedText = ({ text, delay = 0, speed = 20, className = "" }: AnimatedTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setIsStarted(true);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;

    indexRef.current = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayedText(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, isStarted]);

  return (
    <span className={className}>
      {displayedText}
      {isStarted && displayedText.length < text.length && (
        <span className="inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5" />
      )}
    </span>
  );
};

interface FadeInTextProps {
  text: string;
  delay?: number;
  className?: string;
}

export const FadeInText = ({ text, delay = 0, className = "" }: FadeInTextProps) => {
  return (
    <span 
      className={`animate-fade-in inline-block ${className}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'backwards' }}
    >
      {text}
    </span>
  );
};
