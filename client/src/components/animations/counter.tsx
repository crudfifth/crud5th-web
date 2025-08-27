import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface CounterProps {
  target: number;
  duration?: number;
  className?: string;
  suffix?: string;
}

export default function Counter({ target, duration = 2000, className = "", suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollAnimation();
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!isVisible || hasStarted) return;

    setHasStarted(true);
    const increment = target / (duration / 16);
    let currentCount = 0;

    const timer = setInterval(() => {
      currentCount += increment;
      if (currentCount >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(currentCount));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, target, duration, hasStarted]);

  return (
    <span ref={ref} className={`counter ${className}`} data-testid="counter">
      {count}{suffix}
    </span>
  );
}
