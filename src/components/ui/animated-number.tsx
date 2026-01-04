import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  formatFn?: (value: number) => string;
  className?: string;
}

export const AnimatedNumber = ({
  value,
  duration = 1500,
  formatFn = (v) => v.toLocaleString(),
  className,
}: AnimatedNumberProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const startValueRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    startValueRef.current = displayValue;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      
      // Ease out cubic for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = startValueRef.current + (value - startValueRef.current) * easeOut;
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration]);

  return (
    <span className={cn("tabular-nums", className)}>
      {formatFn(displayValue)}
    </span>
  );
};

interface AnimatedPercentageProps {
  value: number;
  duration?: number;
  className?: string;
  showSign?: boolean;
}

export const AnimatedPercentage = ({
  value,
  duration = 1500,
  className,
  showSign = true,
}: AnimatedPercentageProps) => {
  return (
    <AnimatedNumber
      value={value}
      duration={duration}
      formatFn={(v) => `${showSign && v > 0 ? "+" : ""}${v.toFixed(1)}%`}
      className={className}
    />
  );
};

interface AnimatedCurrencyProps {
  value: number;
  duration?: number;
  className?: string;
}

export const AnimatedCurrency = ({
  value,
  duration = 1500,
  className,
}: AnimatedCurrencyProps) => {
  const formatCurrency = (num: number) => {
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
    return `₹${num.toFixed(0)}`;
  };

  return (
    <AnimatedNumber
      value={value}
      duration={duration}
      formatFn={formatCurrency}
      className={className}
    />
  );
};
