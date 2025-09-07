import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

const animations = {
  up: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  },
  down: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 }
  },
  left: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 }
  },
  right: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  rotate: {
    hidden: { opacity: 0, rotate: -10, scale: 0.8 },
    visible: { opacity: 1, rotate: 0, scale: 1 }
  }
};

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 60,
  className = '',
  threshold = 0.1,
  triggerOnce = true
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollAnimation({
    threshold,
    triggerOnce,
    delay
  });

  const selectedAnimation = animations[direction];
  
  // Customize distance if provided
  const customAnimation = {
    hidden: {
      ...selectedAnimation.hidden,
      ...(direction === 'up' && { y: distance }),
      ...(direction === 'down' && { y: -distance }),
      ...(direction === 'left' && { x: -distance }),
      ...(direction === 'right' && { x: distance })
    },
    visible: selectedAnimation.visible
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={customAnimation}
      transition={{
        duration,
        ease: [0.87, 0, 0.13, 1], // Custom cubic-bezier for smooth animation
        type: "tween"
      }}
    >
      {children}
    </motion.div>
  );
}

// Specialized components for different reveal types
export function RevealOnScroll({ children, className = '', delay = 0 }: { 
  children: ReactNode; 
  className?: string; 
  delay?: number;
}) {
  return (
    <ScrollReveal direction="up" delay={delay} className={className}>
      {children}
    </ScrollReveal>
  );
}

export function SlideInLeft({ children, className = '', delay = 0 }: { 
  children: ReactNode; 
  className?: string; 
  delay?: number;
}) {
  return (
    <ScrollReveal direction="left" delay={delay} className={className}>
      {children}
    </ScrollReveal>
  );
}

export function SlideInRight({ children, className = '', delay = 0 }: { 
  children: ReactNode; 
  className?: string; 
  delay?: number;
}) {
  return (
    <ScrollReveal direction="right" delay={delay} className={className}>
      {children}
    </ScrollReveal>
  );
}

export function ScaleIn({ children, className = '', delay = 0 }: { 
  children: ReactNode; 
  className?: string; 
  delay?: number;
}) {
  return (
    <ScrollReveal direction="scale" delay={delay} className={className}>
      {children}
    </ScrollReveal>
  );
}

export function RotateIn({ children, className = '', delay = 0 }: { 
  children: ReactNode; 
  className?: string; 
  delay?: number;
}) {
  return (
    <ScrollReveal direction="rotate" delay={delay} className={className}>
      {children}
    </ScrollReveal>
  );
}