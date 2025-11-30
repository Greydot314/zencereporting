import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface StreamingTextProps {
  text: string;
  isStreaming?: boolean;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export const StreamingText = ({ 
  text, 
  isStreaming = false, 
  speed = 20,
  className,
  onComplete 
}: StreamingTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isStreaming) {
      setDisplayedText(text);
      setCurrentIndex(text.length);
      return;
    }

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        // Stream multiple characters at once for faster effect
        const charsToAdd = Math.min(3, text.length - currentIndex);
        setDisplayedText(text.slice(0, currentIndex + charsToAdd));
        setCurrentIndex(prev => prev + charsToAdd);
      }, speed);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [text, currentIndex, isStreaming, speed, onComplete]);

  // Reset when text changes significantly
  useEffect(() => {
    if (isStreaming && text.length > displayedText.length + 10) {
      // New chunk arrived, continue streaming
    } else if (!isStreaming) {
      setDisplayedText(text);
      setCurrentIndex(text.length);
    }
  }, [text, isStreaming]);

  const showCursor = isStreaming && currentIndex < text.length;

  return (
    <span className={cn("whitespace-pre-wrap", className)}>
      {displayedText}
      {showCursor && (
        <span className="inline-block w-2 h-4 ml-0.5 bg-primary animate-blink align-middle" />
      )}
    </span>
  );
};
