import { motion } from "framer-motion";

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 3,
      ease: "easeInOut"
    }
  }
};

const circuitVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 0.6,
    transition: {
      duration: 4,
      ease: "easeInOut",
      delay: 1
    }
  }
};

const nodeVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 0.8,
    transition: {
      duration: 0.5,
      ease: "backOut",
      delay: 2
    }
  }
};

export default function ComplexPathAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-15">
      {/* Neural Network Pattern */}
      <motion.svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 1920 1080"
        initial="hidden"
        animate="visible"
      >
        {/* Main Connection Lines */}
        <motion.path
          d="M100,200 Q400,150 700,300 Q1000,450 1300,200 Q1600,50 1800,400"
          stroke="url(#gradient1)"
          strokeWidth="2"
          fill="none"
          variants={pathVariants}
        />
        
        <motion.path
          d="M200,800 Q500,650 800,750 Q1100,850 1400,650 Q1700,450 1900,700"
          stroke="url(#gradient1)"
          strokeWidth="2"
          fill="none"
          variants={pathVariants}
          transition={{ delay: 0.5 }}
        />

        {/* Circuit Board Pattern */}
        <motion.path
          d="M300,100 L300,300 L600,300 L600,150 L900,150 L900,400 L1200,400 L1200,250 L1500,250"
          stroke="url(#gradient2)"
          strokeWidth="1.5"
          fill="none"
          variants={circuitVariants}
        />

        <motion.path
          d="M200,500 L500,500 L500,700 L800,700 L800,550 L1100,550 L1100,800 L1400,800"
          stroke="url(#gradient2)"
          strokeWidth="1.5"
          fill="none"
          variants={circuitVariants}
          transition={{ delay: 1.5 }}
        />

        {/* Network Nodes */}
        <motion.circle
          cx="400"
          cy="200"
          r="6"
          fill="#2eb8cf"
          variants={nodeVariants}
        />
        <motion.circle
          cx="700"
          cy="300"
          r="8"
          fill="#2eb8cf"
          variants={nodeVariants}
          transition={{ delay: 2.2 }}
        />
        <motion.circle
          cx="1000"
          cy="150"
          r="6"
          fill="#2eb8cf"
          variants={nodeVariants}
          transition={{ delay: 2.4 }}
        />
        <motion.circle
          cx="500"
          cy="650"
          r="8"
          fill="#2eb8cf"
          variants={nodeVariants}
          transition={{ delay: 2.6 }}
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2eb8cf" stopOpacity="0" />
            <stop offset="50%" stopColor="#2eb8cf" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2eb8cf" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0" />
            <stop offset="50%" stopColor="#4ade80" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Floating Code Elements */}
      <motion.div
        className="absolute top-1/3 left-1/4 text-xs text-primary/30 font-mono"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: [0, 0.6, 0],
          y: [20, -10, -40]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeOut"
        }}
      >
        {'{ innovation: "endless" }'}
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-1/4 text-xs text-primary/30 font-mono"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: [0, 0.6, 0],
          y: [20, -10, -40]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeOut",
          delay: 3
        }}
      >
        {'const future = await build()'}
      </motion.div>
    </div>
  );
}