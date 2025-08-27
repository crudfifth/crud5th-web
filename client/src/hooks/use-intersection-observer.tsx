import { useState, useEffect, useRef } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver<T extends Element = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    triggerOnce = true
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyIntersecting = entry.isIntersecting;
        
        if (isCurrentlyIntersecting) {
          setIsIntersecting(true);
          if (triggerOnce && !hasTriggered) {
            setHasTriggered(true);
          }
        } else if (!triggerOnce || !hasTriggered) {
          setIsIntersecting(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return [ref, isIntersecting] as const;
}

// Alternative hook for cases where you want the element and visibility state separately
export function useElementInView<T extends Element = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
) {
  const [ref, isVisible] = useIntersectionObserver<T>(options);
  
  return {
    ref,
    isVisible,
    inView: isVisible
  };
}
