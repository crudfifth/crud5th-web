import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  offset?: number;
  className?: string;
}

export default function ParallaxSection({ 
  children, 
  speed = 0.5, 
  offset = 0,
  className = ''
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, offset + (speed * 100)]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

export function ParallaxBackground({ 
  children, 
  speed = 0.3,
  className = ''
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0"
      >
        {children}
      </motion.div>
    </div>
  );
}

export function ParallaxLayer({ 
  children, 
  speed = 0.5,
  direction = 'vertical',
  className = ''
}: ParallaxSectionProps & { direction?: 'vertical' | 'horizontal' }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const transform = direction === 'vertical' 
    ? useTransform(scrollYProgress, [0, 1], [0, speed * 100])
    : useTransform(scrollYProgress, [0, 1], [0, speed * 50]);

  const style = direction === 'vertical' 
    ? { y: transform }
    : { x: transform };

  return (
    <div ref={ref} className={className}>
      <motion.div style={style}>
        {children}
      </motion.div>
    </div>
  );
}