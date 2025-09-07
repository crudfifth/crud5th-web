import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  variant?: 'fade' | 'slide' | 'scale' | 'reveal';
}

export default function SectionTransition({ 
  children, 
  className = '',
  variant = 'fade'
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const variants = {
    fade: {
      opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
      y: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50])
    },
    slide: {
      x: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [-100, 0, 0, 100]),
      opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
    },
    scale: {
      scale: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]),
      opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
    },
    reveal: {
      clipPath: useTransform(
        scrollYProgress,
        [0, 0.3, 0.7, 1],
        [
          "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
          "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
          "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
          "polygon(0 0%, 100% 0%, 100% 0%, 0% 0%)"
        ]
      )
    }
  };

  const style = variants[variant];

  return (
    <motion.div 
      ref={ref}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// Specialized section dividers
export function WaveTransition({ 
  direction = 'up',
  color = 'var(--background)'
}: { 
  direction?: 'up' | 'down';
  color?: string;
}) {
  return (
    <div className={`relative ${direction === 'up' ? '-mb-1' : '-mt-1'}`}>
      <svg 
        className="w-full h-16 md:h-24" 
        viewBox="0 0 1440 120" 
        fill="none" 
        preserveAspectRatio="none"
      >
        <motion.path
          d={direction === 'up' 
            ? "M0,120 C240,40 360,40 720,80 C1080,120 1200,40 1440,80 L1440,120 L0,120 Z"
            : "M0,0 C240,80 360,80 720,40 C1080,0 1200,80 1440,40 L1440,0 L0,0 Z"
          }
          fill={color}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          viewport={{ once: true }}
        />
      </svg>
    </div>
  );
}

export function DiagonalTransition({ 
  direction = 'left',
  color = 'var(--background)'
}: { 
  direction?: 'left' | 'right';
  color?: string;
}) {
  return (
    <div className="relative -my-1">
      <svg 
        className="w-full h-20" 
        viewBox="0 0 1440 120" 
        fill="none" 
        preserveAspectRatio="none"
      >
        <motion.polygon
          points={direction === 'left' 
            ? "0,120 1440,0 1440,120"
            : "0,0 1440,120 0,120"
          }
          fill={color}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}