import { motion } from "framer-motion";

const techStacks = [
  "React", "TypeScript", "Node.js", "Python", "AWS", "Docker",
  "PostgreSQL", "GraphQL", "Kubernetes", "Next.js", "Vue.js", "Go",
  "MongoDB", "Redis", "Microservices", "CI/CD", "DevOps", "AI/ML"
];

export default function TechFlowAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {/* Top flowing technologies */}
      <motion.div
        className="absolute top-1/4 left-0 flex gap-8 text-sm text-white/30 font-mono"
        animate={{ x: [-200, window.innerWidth + 200] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {techStacks.slice(0, 6).map((tech, index) => (
          <motion.span
            key={`top-${tech}`}
            className="whitespace-nowrap"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.5
            }}
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>

      {/* Bottom flowing technologies */}
      <motion.div
        className="absolute bottom-1/4 right-0 flex gap-8 text-sm text-white/20 font-mono"
        animate={{ x: [window.innerWidth + 200, -200] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {techStacks.slice(6, 12).map((tech, index) => (
          <motion.span
            key={`bottom-${tech}`}
            className="whitespace-nowrap"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 0.7
            }}
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>

      {/* Diagonal flowing technologies */}
      <motion.div
        className="absolute top-1/2 left-0 flex gap-12 text-xs text-white/15 font-mono transform rotate-12"
        animate={{ x: [-300, window.innerWidth + 300] }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {techStacks.slice(12).map((tech, index) => (
          <motion.span
            key={`diagonal-${tech}`}
            className="whitespace-nowrap"
            animate={{ opacity: [0.15, 0.5, 0.15] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: index * 0.8
            }}
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}