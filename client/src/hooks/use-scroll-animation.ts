import { useEffect, useRef, useState } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -10% 0px',
    triggerOnce = true,
    delay = 0
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
              setHasTriggered(true);
            }, delay);
          } else {
            setIsVisible(true);
            setHasTriggered(true);
          }
        } else if (!triggerOnce && hasTriggered) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce, delay, hasTriggered]);

  return { ref: elementRef, isVisible, hasTriggered };
}

export function useParallax() {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsScrolling(true);
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    const handleScrollOptimized = () => {
      window.requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', handleScrollOptimized, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScrollOptimized);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return { scrollY, isScrolling };
}

export function useSVGPathAnimation() {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    setPathLength(length);
    
    // Set initial state
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
  }, []);

  const animatePath = (targetProgress: number, duration: number = 2000) => {
    const path = pathRef.current;
    if (!path || pathLength === 0) return;

    const startProgress = progress;
    const progressDiff = targetProgress - startProgress;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const normalizedTime = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-in-out)
      const easedTime = normalizedTime < 0.5
        ? 2 * normalizedTime * normalizedTime
        : 1 - Math.pow(-2 * normalizedTime + 2, 2) / 2;
      
      const currentProgress = startProgress + (progressDiff * easedTime);
      const offset = pathLength * (1 - currentProgress);
      
      path.style.strokeDashoffset = `${offset}`;
      setProgress(currentProgress);

      if (normalizedTime < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return { ref: pathRef, pathLength, progress, animatePath };
}

export function useMouseTracker() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setMousePosition({ x, y });
      
      // Update CSS custom properties for advanced effects
      element.style.setProperty('--mouse-x', `${x}%`);
      element.style.setProperty('--mouse-y', `${y}%`);
    };

    element.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return { ref: elementRef, mousePosition };
}