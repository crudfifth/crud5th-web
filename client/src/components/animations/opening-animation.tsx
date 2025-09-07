import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OpeningAnimationProps {
  onComplete: () => void;
}

export default function OpeningAnimation({ onComplete }: OpeningAnimationProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timers = [
      // Phase 0: Initial delay
      setTimeout(() => setCurrentPhase(1), 500),
      // Phase 1: Logo appears
      setTimeout(() => setCurrentPhase(2), 1800),
      // Phase 2: Tagline appears
      setTimeout(() => setCurrentPhase(3), 3200),
      // Phase 3: Fade out and complete
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 800);
      }, 4500)
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed inset-0 z-[9999] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center"
        data-testid="opening-animation"
      >
        {/* Background geometric pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/3 rounded-full" />
        </div>

        <div className="relative z-10 text-center">
          {/* Main Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={currentPhase >= 1 ? { 
              opacity: 1, 
              scale: 1, 
              y: 0 
            } : {}}
            transition={{ 
              duration: 1.2, 
              ease: [0.16, 1, 0.3, 1],
              delay: 0.2
            }}
            className="mb-8"
          >
            <h1 className="text-7xl md:text-8xl font-black text-white mb-4">
              <span className="inline-block">C</span>
              <span className="inline-block">R</span>
              <span className="inline-block">U</span>
              <span className="inline-block">D</span>
              <span 
                className="inline-block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                style={{ 
                  background: 'linear-gradient(135deg, hsl(193 82% 65%), hsl(193 100% 80%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                5th
              </span>
            </h1>
            
            {/* Animated underline */}
            <motion.div
              initial={{ width: 0 }}
              animate={currentPhase >= 1 ? { width: "100%" } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-1 bg-gradient-to-r from-primary to-accent mx-auto"
              style={{ 
                background: 'linear-gradient(135deg, hsl(193 82% 65%), hsl(193 100% 80%))'
              }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={currentPhase >= 2 ? { 
              opacity: 1, 
              y: 0 
            } : {}}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: 0.3
            }}
            className="space-y-2"
          >
            <motion.p 
              className="text-xl md:text-2xl text-white/90 font-light tracking-wider"
              initial={{ opacity: 0 }}
              animate={currentPhase >= 2 ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              THE EVOLUTION PARTNER
            </motion.p>
            
            <motion.p 
              className="text-lg text-white/70 font-light"
              initial={{ opacity: 0 }}
              animate={currentPhase >= 2 ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              革新を共に創造するエンジニア集団
            </motion.p>
          </motion.div>

          {/* Loading indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={currentPhase >= 2 ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="mt-12 flex justify-center"
          >
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-white/60 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Particle effect */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}