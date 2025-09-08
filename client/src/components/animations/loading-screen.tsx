import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)"
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center z-[9999] overflow-hidden"
          style={{
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            willChange: 'opacity, transform, filter'
          }}
          data-testid="loading-screen"
        >
          {/* Background geometric patterns */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
              style={{
                transform: 'translateZ(0)',
                willChange: 'transform, opacity'
              }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
              style={{
                transform: 'translateZ(0)',
                willChange: 'transform, opacity'
              }}
              animate={{ 
                scale: [1, 0.8, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            
            {/* Animated concentric circles */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute border border-white/10 rounded-full"
                  style={{
                    width: `${(i + 1) * 200}px`,
                    height: `${(i + 1) * 200}px`,
                    top: `-${(i + 1) * 100}px`,
                    left: `-${(i + 1) * 100}px`,
                    transform: 'translateZ(0)',
                    willChange: 'transform'
                  }}
                  animate={{ 
                    rotate: 360
                  }}
                  transition={{ 
                    rotate: { duration: 15 + i * 10, repeat: Infinity, ease: "linear" }
                  }}
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 text-center max-w-md mx-auto px-6">
            {/* Sophisticated loading spinner */}
            <div className="relative mb-8">
              <motion.div
                className="w-24 h-24 mx-auto relative"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Outer ring */}
                <motion.div
                  className="absolute inset-0 border-4 border-primary/20 rounded-full"
                />
                
                {/* Animated progress ring */}
                <motion.div
                  className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full"
                  style={{
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Inner pulsing core */}
                <motion.div
                  className="absolute inset-4 bg-gradient-to-br from-primary/60 to-accent/60 rounded-full"
                  style={{
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    willChange: 'transform, opacity'
                  }}
                  animate={{ 
                    scale: [0.9, 1.1, 0.9],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Floating particles */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-primary/80 rounded-full"
                    style={{
                      top: `${50 + Math.sin(i * Math.PI / 3) * 40}%`,
                      left: `${50 + Math.cos(i * Math.PI / 3) * 40}%`,
                      transform: 'translateZ(0)',
                      willChange: 'transform, opacity'
                    }}
                    animate={{
                      y: [-5, 5, -5],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1.5 + i * 0.1,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Enhanced brand name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              className="mb-6"
            >
              <motion.h1 
                className="text-4xl font-black text-white mb-2"
                animate={{ 
                  textShadow: [
                    "0 0 10px rgba(29, 151, 176, 0.5)",
                    "0 0 20px rgba(29, 151, 176, 0.8)",
                    "0 0 10px rgba(29, 151, 176, 0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                CRUD5th
              </motion.h1>
              <motion.p 
                className="text-sm text-white/70 tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                THE EVOLUTION PARTNER
              </motion.p>
            </motion.div>

            {/* Sophisticated progress bar */}
            <motion.div
              className="relative mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full relative"
                  initial={{ width: "0%" }}
                  animate={{ width: `${Math.min(loadingProgress, 100)}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  />
                </motion.div>
              </div>
              
              {/* Progress text */}
              <motion.div 
                className="text-xs text-white/60 mt-2 text-center"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Loading {Math.round(Math.min(loadingProgress, 100))}%
              </motion.div>
            </motion.div>

            {/* Loading message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-xs text-white/50 tracking-wider"
            >
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                INITIALIZING SYSTEM...
              </motion.span>
            </motion.div>
          </div>

          {/* Space-themed floating particles and stars */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Floating micro particles */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: 'translateZ(0)',
                  willChange: 'transform, opacity'
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 1,
                  ease: "easeInOut"
                }}
              />
            ))}
            
            {/* Constellation stars */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute bg-cyan-400/40 rounded-full"
                style={{
                  width: `${1 + Math.random() * 3}px`,
                  height: `${1 + Math.random() * 3}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: 'translateZ(0)',
                  willChange: 'opacity'
                }}
                animate={{
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 1,
                  ease: "easeInOut"
                }}
              />
            ))}
            
            {/* Bottom geometric pattern */}
            <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden">
              <motion.div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-32"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
              >
                {/* Hexagonal grid pattern */}
                <svg viewBox="0 0 100 40" className="w-full h-full opacity-10">
                  <defs>
                    <pattern id="hexGrid" x="0" y="0" width="10" height="8.66" patternUnits="userSpaceOnUse">
                      <polygon points="5,0 9.33,2.5 9.33,7.5 5,10 0.67,7.5 0.67,2.5" 
                        fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400"/>
                    </pattern>
                  </defs>
                  <rect width="100" height="40" fill="url(#hexGrid)" />
                </svg>
                
                {/* Animated scanning line */}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}