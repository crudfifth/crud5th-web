import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Star, Zap, Eye } from "lucide-react";

interface PortfolioProject {
  id: number;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  status: "完了" | "進行中" | "企画中";
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  achievements?: string[];
}

const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: "ECサイト構築",
    description: "最新技術を駆使した高性能Eコマースプラットフォーム",
    category: "受託開発",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    status: "完了",
    image: "/api/placeholder/400/300",
    achievements: ["月間売上30%向上", "ページ速度50%改善"]
  },
  {
    id: 2,
    title: "SaaS管理システム",
    description: "企業向け統合管理ソリューション",
    category: "自社サービス",
    technologies: ["Vue.js", "FastAPI", "MongoDB"],
    status: "進行中",
    image: "/api/placeholder/400/300",
    achievements: ["業務効率40%向上", "コスト削減25%"]
  },
  {
    id: 3,
    title: "AIチャットボット",
    description: "自然言語処理を活用したカスタマーサポート",
    category: "自社サービス",
    technologies: ["Python", "TensorFlow", "FastAPI"],
    status: "完了",
    image: "/api/placeholder/400/300",
    achievements: ["応答精度95%", "サポート業務70%削減"]
  },
  {
    id: 4,
    title: "DX導入支援",
    description: "レガシーシステムからモダン環境への移行",
    category: "コンサル",
    technologies: ["Angular", "Spring Boot", "MySQL"],
    status: "進行中",
    image: "/api/placeholder/400/300",
    achievements: ["移行成功率100%", "業務継続性確保"]
  },
  {
    id: 5,
    title: "モバイルアプリ",
    description: "クロスプラットフォーム対応アプリケーション",
    category: "受託開発",
    technologies: ["React Native", "TypeScript", "Firebase"],
    status: "完了",
    image: "/api/placeholder/400/300",
    achievements: ["App Store評価4.9", "ダウンロード10万突破"]
  },
  {
    id: 6,
    title: "ブロックチェーン",
    description: "次世代分散アプリケーション基盤",
    category: "自社サービス",
    technologies: ["Solidity", "Web3.js", "Node.js"],
    status: "企画中",
    image: "/api/placeholder/400/300",
    achievements: ["プロトタイプ完成", "投資家説明会成功"]
  }
];

interface MagneticCardProps {
  project: PortfolioProject;
  index: number;
  mousePos: { x: number; y: number };
  containerRef: React.RefObject<HTMLDivElement>;
  onHover: (id: number | null) => void;
  hoveredCard: number | null;
}

function MagneticCard({ project, index, mousePos, containerRef, onHover, hoveredCard }: MagneticCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const controls = useAnimation();
  
  // Physics constants
  const MAGNETIC_STRENGTH = 0.3;
  const REPULSION_STRENGTH = 1000;
  const FRICTION = 0.85;
  const MAX_VELOCITY = 8;
  
  useEffect(() => {
    // Initialize random position
    const initialX = (Math.random() - 0.5) * 600;
    const initialY = (Math.random() - 0.5) * 400;
    setPosition({ x: initialX, y: initialY });
  }, []);

  useEffect(() => {
    const animate = () => {
      if (!cardRef.current || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const cardRect = cardRef.current.getBoundingClientRect();
      
      // Convert mouse position to container-relative coordinates
      const relativeMouseX = mousePos.x - rect.left - rect.width / 2;
      const relativeMouseY = mousePos.y - rect.top - rect.height / 2;
      
      // Current card center relative to container center
      const cardCenterX = position.x;
      const cardCenterY = position.y;
      
      // Magnetic force towards mouse
      const deltaX = relativeMouseX - cardCenterX;
      const deltaY = relativeMouseY - cardCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      let forceX = 0;
      let forceY = 0;
      
      if (distance > 0) {
        const magneticForce = Math.min(MAGNETIC_STRENGTH / Math.max(distance / 200, 1), 2);
        forceX += (deltaX / distance) * magneticForce;
        forceY += (deltaY / distance) * magneticForce;
      }
      
      // Repulsion from other cards
      portfolioProjects.forEach((otherProject, otherIndex) => {
        if (otherIndex === index) return;
        
        const otherElement = document.querySelector(`[data-card-id="${otherProject.id}"]`) as HTMLDivElement;
        if (!otherElement) return;
        
        const otherRect = otherElement.getBoundingClientRect();
        const otherX = parseFloat(otherElement.style.transform?.match(/translateX\(([^)]+)px\)/)?.[1] || "0");
        const otherY = parseFloat(otherElement.style.transform?.match(/translateY\(([^)]+)px\)/)?.[1] || "0");
        
        const repelDeltaX = cardCenterX - otherX;
        const repelDeltaY = cardCenterY - otherY;
        const repelDistance = Math.sqrt(repelDeltaX * repelDeltaX + repelDeltaY * repelDeltaY);
        
        if (repelDistance > 0 && repelDistance < 300) {
          const repelForce = REPULSION_STRENGTH / (repelDistance * repelDistance);
          forceX += (repelDeltaX / repelDistance) * repelForce;
          forceY += (repelDeltaY / repelDistance) * repelForce;
        }
      });
      
      // Boundary forces (soft walls)
      const maxX = rect.width / 2 - 150;
      const maxY = rect.height / 2 - 100;
      
      if (Math.abs(cardCenterX) > maxX) {
        forceX -= (cardCenterX / Math.abs(cardCenterX)) * 0.5;
      }
      if (Math.abs(cardCenterY) > maxY) {
        forceY -= (cardCenterY / Math.abs(cardCenterY)) * 0.5;
      }
      
      // Update velocity
      setVelocity(prev => {
        const newVelX = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, (prev.x + forceX) * FRICTION));
        const newVelY = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, (prev.y + forceY) * FRICTION));
        return { x: newVelX, y: newVelY };
      });
      
      // Update position
      setPosition(prev => ({
        x: prev.x + velocity.x,
        y: prev.y + velocity.y
      }));
    };
    
    const interval = setInterval(animate, 16); // ~60fps
    return () => clearInterval(interval);
  }, [mousePos, position, velocity, index]);

  const isHovered = hoveredCard === project.id;
  const categoryColors = {
    "受託開発": "from-blue-500/30 to-cyan-500/20",
    "自社サービス": "from-purple-500/30 to-pink-500/20", 
    "コンサル": "from-green-500/30 to-emerald-500/20"
  };

  return (
    <motion.div
      ref={cardRef}
      data-card-id={project.id}
      className="absolute w-72 h-48 cursor-pointer group"
      style={{
        left: '50%',
        top: '50%',
        transform: `translate(${position.x - 144}px, ${position.y - 96}px)`,
        zIndex: isHovered ? 50 : 10
      }}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      whileHover={{ 
        scale: 1.1,
        rotateY: 5,
        rotateX: 5,
        transition: { duration: 0.3 }
      }}
      data-testid={`portfolio-card-${index}`}
    >
      {/* Main Card */}
      <div className={`relative h-full bg-gradient-to-br ${categoryColors[project.category]} backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-2xl transform-gpu`}>
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Content */}
        <div className="relative p-6 h-full flex flex-col justify-between">
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              project.status === "完了" ? "bg-green-500/30 text-green-200 border border-green-400/50" :
              project.status === "進行中" ? "bg-blue-500/30 text-blue-200 border border-blue-400/50" :
              "bg-purple-500/30 text-purple-200 border border-purple-400/50"
            }`}>
              {project.status}
            </span>
            <span className="text-xs text-white/60 bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm">
              {project.category}
            </span>
          </div>

          {/* Title & Description */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-2 leading-tight">{project.title}</h3>
            <p className="text-sm text-white/80 leading-relaxed line-clamp-2">{project.description}</p>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1 mb-4">
            {project.technologies.slice(0, 3).map((tech, techIndex) => (
              <span key={techIndex} className="text-xs px-2 py-1 bg-white/15 rounded-full text-white/90 border border-white/20">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/70">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <motion.button 
              className="flex-1 bg-white/20 text-white text-sm font-medium py-2 px-4 rounded-lg border border-white/30 backdrop-blur-sm hover:bg-white/30 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="w-4 h-4 inline mr-2" />
              詳細
            </motion.button>
            <motion.button 
              className="px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <Star className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
        
        {/* Energy Lines */}
        <div className="absolute inset-0 pointer-events-none">
          {isHovered && (
            <>
              <div className="absolute top-0 left-1/2 w-px h-4 bg-gradient-to-b from-cyan-400 to-transparent animate-pulse" />
              <div className="absolute bottom-0 left-1/2 w-px h-4 bg-gradient-to-t from-cyan-400 to-transparent animate-pulse" />
              <div className="absolute left-0 top-1/2 w-4 h-px bg-gradient-to-r from-cyan-400 to-transparent animate-pulse" />
              <div className="absolute right-0 top-1/2 w-4 h-px bg-gradient-to-l from-cyan-400 to-transparent animate-pulse" />
            </>
          )}
        </div>
      </div>
      
      {/* Floating particles around hovered card */}
      <AnimatePresence>
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400/60 rounded-full"
                initial={{ 
                  opacity: 0,
                  x: 144,
                  y: 96,
                  scale: 0
                }}
                animate={{
                  opacity: [0, 1, 0],
                  x: 144 + Math.cos(i * Math.PI / 4) * 80,
                  y: 96 + Math.sin(i * Math.PI / 4) * 80,
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsInteracting(true);
    };

    const handleMouseLeave = () => {
      setIsInteracting(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleCardHover = useCallback((cardId: number | null) => {
    setHoveredCard(cardId);
  }, []);

  return (
    <section id="portfolio" className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }} />
        </div>
        
        {/* Flowing particles */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        {/* Energy field visualization */}
        {isInteracting && (
          <motion.div
            className="absolute w-4 h-4 border border-cyan-400/50 rounded-full"
            style={{
              left: mousePos.x - 8,
              top: mousePos.y - 8,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 border border-cyan-400/30 rounded-full animate-ping" />
          </motion.div>
        )}
      </div>

      <div className="relative z-10 px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
            Portfolio
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            磁場シミュレーションで体験する、インタラクティブなプロジェクトポートフォリオ
          </p>
          <div className="mt-8 text-sm text-gray-400">
            <Zap className="inline w-4 h-4 mr-2" />
            マウスを動かして、カードとインタラクションしてみてください
          </div>
        </motion.div>

        {/* Magnetic Field Container */}
        <div 
          ref={containerRef}
          className="relative w-full h-[600px] mx-auto"
          style={{ perspective: '1000px' }}
        >
          {portfolioProjects.map((project, index) => (
            <MagneticCard
              key={project.id}
              project={project}
              index={index}
              mousePos={mousePos}
              containerRef={containerRef}
              onHover={handleCardHover}
              hoveredCard={hoveredCard}
            />
          ))}
        </div>

        {/* Information Panel */}
        <AnimatePresence>
          {hoveredCard && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-md z-50"
            >
              {(() => {
                const project = portfolioProjects.find(p => p.id === hoveredCard);
                return project ? (
                  <>
                    <h3 className="text-white font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                    {project.achievements && (
                      <div>
                        <h4 className="text-cyan-300 text-sm font-semibold mb-2">主な成果</h4>
                        <ul className="text-gray-400 text-xs space-y-1">
                          {project.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Star className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : null;
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}