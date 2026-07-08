import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [resourcesLoaded, setResourcesLoaded] = useState({
    fonts: false,
    images: false,
    video: false,
    scripts: false
  });

  useEffect(() => {
    const loadResources = async () => {
      try {
        // Load fonts
        setLoadingText('Loading fonts...');
        await document.fonts.ready;
        setResourcesLoaded(prev => ({ ...prev, fonts: true }));
        setProgress(25);

        // Keep the loading step for visual continuity, but avoid bundling
        // Replit-only video assets that are not present in the repository.
        setLoadingText('Loading video assets...');
        await new Promise(resolve => setTimeout(resolve, 100));
        setResourcesLoaded(prev => ({ ...prev, video: true }));
        setProgress(50);

        // Preload critical images/assets
        setLoadingText('Loading visual assets...');
        const imageAssets: string[] = [
          // Add any critical image paths here
        ];
        
        if (imageAssets.length > 0) {
          await Promise.all(
            imageAssets.map(src => 
              new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = resolve;
                img.onerror = reject;
              })
            )
          );
        }
        setResourcesLoaded(prev => ({ ...prev, images: true }));
        setProgress(75);

        // Final initialization
        setLoadingText('Preparing experience...');
        await new Promise(resolve => setTimeout(resolve, 500));
        setResourcesLoaded(prev => ({ ...prev, scripts: true }));
        setProgress(100);

        // Wait a moment at 100% before completing
        await new Promise(resolve => setTimeout(resolve, 800));
        onComplete();
      } catch (error) {
        console.error('Error loading resources:', error);
        // Continue anyway after a delay
        setTimeout(onComplete, 1000);
      }
    };

    loadResources();
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-primary/20 via-transparent to-accent/20"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Logo or Brand */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CRUD5th
            </span>
          </h1>
          <motion.div
            className="h-1 bg-gradient-to-r from-primary to-accent mt-2"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Loading Progress */}
        <div className="relative z-10 w-full max-w-md px-8">
          {/* Progress Bar */}
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.div
                className="absolute inset-0 bg-white/30"
                animate={{
                  x: ['0%', '100%'],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
                }}
              />
            </motion.div>
          </div>

          {/* Progress Text */}
          <div className="mt-6 text-center">
            <motion.p
              key={loadingText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-white/60 text-sm"
            >
              {loadingText}
            </motion.p>
            <p className="text-white/40 text-xs mt-2">
              {progress}%
            </p>
          </div>

          {/* Loading Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-primary rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Resource Status (subtle) */}
        <motion.div
          className="absolute bottom-8 left-8 text-xs text-white/20 space-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${resourcesLoaded.fonts ? 'bg-green-500' : 'bg-white/20'}`} />
            <span>Fonts</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${resourcesLoaded.video ? 'bg-green-500' : 'bg-white/20'}`} />
            <span>Video</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${resourcesLoaded.images ? 'bg-green-500' : 'bg-white/20'}`} />
            <span>Assets</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
