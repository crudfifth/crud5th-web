import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

interface CounterProps {
  value: number;
  label: string;
  suffix?: string;
  duration?: number;
  delay?: number;
}

function AnimatedCounter({ value, label, suffix = "", duration = 2, delay = 0 }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { 
    damping: 60, 
    stiffness: 100,
    duration: duration * 1000 
  });
  const displayed = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(value);
      }, delay * 1000);
    }
  }, [motionValue, isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className="text-center group"
    >
      <motion.div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
        <motion.span>{displayed}</motion.span>
        <span className="text-primary">{suffix}</span>
      </motion.div>
      <p className="text-sm md:text-base text-white/70 font-medium tracking-wide group-hover:text-white/90 transition-colors">
        {label}
      </p>
    </motion.div>
  );
}

export default function StatsCounter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2.8 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto mb-12"
    >
      <AnimatedCounter 
        value={150} 
        suffix="+" 
        label="プロジェクト完了"
        delay={0.2}
      />
      <AnimatedCounter 
        value={85} 
        suffix="+" 
        label="満足クライアント"
        delay={0.4}
      />
      <AnimatedCounter 
        value={20} 
        suffix="+" 
        label="技術・フレームワーク"
        delay={0.6}
      />
      <AnimatedCounter 
        value={5} 
        label="年間の実績と信頼"
        suffix="年+"
        delay={0.8}
      />
    </motion.div>
  );
}
