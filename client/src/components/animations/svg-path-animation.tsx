import { motion } from 'framer-motion';
import { useScrollAnimation, useSVGPathAnimation } from '@/hooks/use-scroll-animation';
import { ReactNode } from 'react';

interface SVGPathAnimationProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  threshold?: number;
}

export default function SVGPathAnimation({
  children,
  className = '',
  duration = 2,
  delay = 0,
  threshold = 0.3
}: SVGPathAnimationProps) {
  const { ref, isVisible } = useScrollAnimation({
    threshold,
    triggerOnce: true,
    delay
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <svg
        className="w-full h-full"
        style={{
          filter: 'drop-shadow(0 4px 8px rgba(29, 151, 176, 0.3))'
        }}
      >
        {children}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(193 82% 45%)" />
            <stop offset="50%" stopColor="hsl(193 100% 60%)" />
            <stop offset="100%" stopColor="hsl(200 100% 70%)" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

// Predefined animated SVG shapes
export function AnimatedLogo({ className = '', delay = 0 }: { 
  className?: string; 
  delay?: number; 
}) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.3,
    triggerOnce: true,
    delay
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8
      }}
      transition={{ duration: 0.8, delay }}
    >
      <svg 
        viewBox="0 0 200 60" 
        className="w-full h-full"
        style={{
          filter: 'drop-shadow(0 4px 8px rgba(29, 151, 176, 0.3))'
        }}
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(193 82% 45%)" />
            <stop offset="100%" stopColor="hsl(193 100% 60%)" />
          </linearGradient>
        </defs>
        
        {/* CRUD text */}
        <motion.path
          d="M20 20 Q25 15 35 20 Q40 25 35 30 Q25 35 20 30 Z"
          fill="none"
          stroke="url(#logoGradient)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isVisible ? 1 : 0 }}
          transition={{ duration: 1.5, delay: delay + 0.2 }}
        />
        
        {/* 5th accent */}
        <motion.circle
          cx="160"
          cy="25"
          r="15"
          fill="none"
          stroke="url(#logoGradient)"
          strokeWidth="2"
          initial={{ pathLength: 0, rotate: -90 }}
          animate={{ 
            pathLength: isVisible ? 1 : 0,
            rotate: isVisible ? 0 : -90
          }}
          transition={{ duration: 1, delay: delay + 0.8 }}
          style={{ transformOrigin: "160px 25px" }}
        />
        
        {/* Connecting line */}
        <motion.line
          x1="50"
          y1="25"
          x2="145"
          y2="25"
          stroke="url(#logoGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isVisible ? 1 : 0 }}
          transition={{ duration: 0.8, delay: delay + 1.2 }}
        />
      </svg>
    </motion.div>
  );
}

export function AnimatedArrow({ className = '', delay = 0, direction = 'right' }: { 
  className?: string; 
  delay?: number;
  direction?: 'right' | 'left' | 'up' | 'down';
}) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.5,
    triggerOnce: true,
    delay
  });

  const paths = {
    right: "M10 30 L40 30 M30 20 L40 30 L30 40",
    left: "M40 30 L10 30 M20 20 L10 30 L20 40",
    up: "M30 40 L30 10 M20 20 L30 10 L40 20",
    down: "M30 10 L30 40 M20 30 L30 40 L40 30"
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8
      }}
      transition={{ duration: 0.6, delay }}
    >
      <svg 
        viewBox="0 0 50 50" 
        className="w-full h-full"
      >
        <motion.path
          d={paths[direction]}
          fill="none"
          stroke="hsl(193 100% 60%)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isVisible ? 1 : 0 }}
          transition={{ 
            duration: 1.2, 
            delay: delay + 0.3,
            ease: [0.87, 0, 0.13, 1]
          }}
        />
      </svg>
    </motion.div>
  );
}

export function AnimatedUnderline({ className = '', delay = 0, width = 100 }: { 
  className?: string; 
  delay?: number;
  width?: number;
}) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.7,
    triggerOnce: true,
    delay
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <svg 
        viewBox={`0 0 ${width} 4`} 
        className="w-full h-full"
        style={{ height: '4px' }}
      >
        <motion.line
          x1="0"
          y1="2"
          x2={width}
          y2="2"
          stroke="url(#underlineGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isVisible ? 1 : 0 }}
          transition={{ 
            duration: 0.8, 
            delay: delay + 0.2,
            ease: [0.87, 0, 0.13, 1]
          }}
        />
        <defs>
          <linearGradient id="underlineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(193 82% 45%)" />
            <stop offset="100%" stopColor="hsl(193 100% 60%)" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}