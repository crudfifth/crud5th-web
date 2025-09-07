import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { AnimatedUnderline } from "@/components/animations/svg-path-animation";
import { ExternalLink, Github, Play, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    title: "ECサイト構築プラットフォーム",
    description: "次世代コマース体験を実現する統合型ECプラットフォーム。AI推薦とリアルタイム在庫管理を搭載。",
    category: "受託開発",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    status: "完了",
    image: "/api/placeholder/400/300",
    achievements: ["月間売上300%向上", "ページ速度90%改善", "コンバージョン率250%アップ"]
  },
  {
    id: 2,
    title: "企業向けSaaS統合管理システム",
    description: "マルチテナント対応の企業向け統合プラットフォーム。ワークフロー自動化とBI分析機能を実装。",
    category: "自社サービス",
    technologies: ["Vue.js", "FastAPI", "MongoDB", "Docker", "GCP"],
    status: "進行中",
    image: "/api/placeholder/400/300",
    achievements: ["業務効率65%向上", "導入企業120社突破", "ARR 5億円達成"]
  },
  {
    id: 3,
    title: "AIドリブン・カスタマーサポート",
    description: "GPT-4を活用した次世代カスタマーサポートシステム。多言語対応と感情分析機能を搭載。",
    category: "自社サービス", 
    technologies: ["Python", "OpenAI GPT-4", "FastAPI", "Redis", "React"],
    status: "完了",
    image: "/api/placeholder/400/300",
    achievements: ["応答精度98.5%", "サポート業務85%自動化", "顧客満足度4.9/5"]
  },
  {
    id: 4,
    title: "レガシーシステムモダン化コンサル",
    description: "大手企業のレガシーシステム刷新プロジェクト。マイクロサービス化とクラウドネイティブ移行を実現。",
    category: "コンサル",
    technologies: ["Kubernetes", "Spring Boot", "PostgreSQL", "Azure", "Terraform"],
    status: "完了",
    image: "/api/placeholder/400/300",
    achievements: ["運用コスト60%削減", "システム可用性99.9%", "開発速度300%向上"]
  },
  {
    id: 5,
    title: "次世代モバイル金融アプリ",
    description: "ブロックチェーン技術を活用したデジタルウォレット。セキュアな決済とDeFi機能を統合。",
    category: "受託開発",
    technologies: ["React Native", "Solidity", "Node.js", "MongoDB", "AWS"],
    status: "進行中",
    image: "/api/placeholder/400/300",
    achievements: ["ユーザー数50万突破", "取引高100億円突破", "セキュリティ認証取得"]
  },
  {
    id: 6,
    title: "IoTデータ分析プラットフォーム",
    description: "製造業向けリアルタイムデータ分析システム。機械学習による予知保全と品質管理を実現。",
    category: "自社サービス",
    technologies: ["Python", "TensorFlow", "InfluxDB", "Kafka", "Kubernetes"],
    status: "完了",
    image: "/api/placeholder/400/300",
    achievements: ["故障予測精度92%", "保守コスト45%削減", "生産効率20%向上"]
  },
  {
    id: 7,
    title: "メタバース教育プラットフォーム",
    description: "VR/AR技術を活用した没入型学習環境。リアルタイムコラボレーションと3D教材作成機能。",
    category: "受託開発",
    technologies: ["Unity", "WebRTC", "Node.js", "PostgreSQL", "AWS"],
    status: "進行中",
    image: "/api/placeholder/400/300",
    achievements: ["学習効果40%向上", "利用学校数200校突破", "国際教育賞受賞"]
  },
  {
    id: 8,
    title: "ヘルスケアAIプラットフォーム",
    description: "医療画像解析とバイタルデータ分析を組み合わせた包括的ヘルスケアソリューション。",
    category: "自社サービス",
    technologies: ["Python", "PyTorch", "FastAPI", "PostgreSQL", "Docker"],
    status: "完了",
    image: "/api/placeholder/400/300",
    achievements: ["診断精度96%達成", "医療機関100施設導入", "FDA承認取得"]
  },
  {
    id: 9,
    title: "サステナブル物流最適化システム",
    description: "AIとIoTを活用したカーボンニュートラル配送ルート最適化。リアルタイム追跡とCO2削減分析。",
    category: "コンサル",
    technologies: ["React", "Python", "Neo4j", "Apache Kafka", "GCP"],
    status: "進行中",
    image: "/api/placeholder/400/300",
    achievements: ["CO2排出量30%削減", "配送効率25%向上", "ESG投資評価A+獲得"]
  },
  {
    id: 10,
    title: "量子コンピューティング研究基盤",
    description: "次世代計算技術の研究開発プラットフォーム。量子アルゴリズムの実装とシミュレーション環境を提供。",
    category: "自社サービス",
    technologies: ["Qiskit", "Python", "Kubernetes", "PostgreSQL", "IBM Quantum"],
    status: "企画中",
    image: "/api/placeholder/400/300",
    achievements: ["量子優位性実証", "研究論文10本発表", "特許出願15件"]
  }
];

const categoryColors = {
  "受託開発": "from-blue-500/20 to-cyan-500/20",
  "自社サービス": "from-purple-500/20 to-pink-500/20", 
  "コンサル": "from-green-500/20 to-emerald-500/20"
};

export default function Portfolio() {
  const { ref, isVisible } = useScrollAnimation();
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Enhanced animation states
  const [rotation, setRotation] = useState(0);
  const [waveOffset, setWaveOffset] = useState(0);
  const [particlePositions, setParticlePositions] = useState<{x: number, y: number, z: number}[]>([]);
  
  // Initialize floating particles
  useEffect(() => {
    const particles = Array.from({ length: 50 }, () => ({
      x: (Math.random() - 0.5) * 1000,
      y: (Math.random() - 0.5) * 800,
      z: (Math.random() - 0.5) * 600
    }));
    setParticlePositions(particles);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.3) % 360); // Slower rotation
      setWaveOffset(prev => prev + 0.02); // Wave animation
    }, 30); // 30fps for smoother animation

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="portfolio" className="py-32 bg-gradient-to-br from-background via-secondary/5 to-background relative overflow-hidden min-h-screen flex items-center">
      {/* Space Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-cyan-400/60 rounded-full animate-pulse" />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-blue-400/30 rounded-full animate-pulse" />
        <div className="absolute top-1/2 right-1/6 w-1.5 h-1.5 bg-pink-400/50 rounded-full animate-pulse" />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>

        {/* Gradient overlays */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-l from-purple-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
          data-testid="portfolio-header"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text relative">
            ポートフォリオ
            <AnimatedUnderline className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40" delay={600} />
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            革新的なテクノロジーで創り上げた、数々のプロジェクト実績をご紹介します
          </p>
        </motion.div>

        {/* Enhanced 3D Portfolio with Path Animations */}
        <div className="portfolio-container-enhanced relative" style={{ perspective: "2000px", height: "1000px" }}>
          {/* SVG Path Animations */}
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            style={{ transform: "translateZ(0)" }}
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(79, 209, 197, 0)" />
                <stop offset="50%" stopColor="rgba(79, 209, 197, 0.8)" />
                <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Connecting orbital paths */}
            {portfolioProjects.map((_, index) => {
              const angle = (index * 36) * (Math.PI / 180);
              const nextAngle = ((index + 1) % 10 * 36) * (Math.PI / 180);
              const radius = 350;
              const centerX = 500;
              const centerY = 400;
              
              const x1 = centerX + Math.cos(angle) * radius;
              const y1 = centerY + Math.sin(angle) * radius;
              const x2 = centerX + Math.cos(nextAngle) * radius;
              const y2 = centerY + Math.sin(nextAngle) * radius;
              
              return (
                <motion.path
                  key={`path-${index}`}
                  d={`M ${x1} ${y1} Q ${centerX} ${centerY} ${x2} ${y2}`}
                  stroke="url(#pathGradient)"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 3,
                    delay: index * 0.2,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                />
              );
            })}
            
            {/* Central energy ring */}
            <motion.circle
              cx="500"
              cy="400"
              r="80"
              stroke="rgba(79, 209, 197, 0.5)"
              strokeWidth="2"
              fill="none"
              filter="url(#glow)"
              animate={{
                r: [80, 100, 80],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </svg>

          {/* 3D Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {particlePositions.map((particle, index) => (
              <motion.div
                key={`particle-${index}`}
                className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                }}
                animate={{
                  x: particle.x + Math.sin(waveOffset * 2 + index) * 20,
                  y: particle.y + Math.cos(waveOffset * 1.5 + index) * 15,
                  scale: [0.5, 1.5, 0.5],
                  opacity: [0.2, 0.8, 0.2]
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.1
                }}
              />
            ))}
          </div>

          <motion.div
            className="portfolio-spiral-enhanced"
            animate={{ 
              rotateY: rotation,
              rotateX: Math.sin(waveOffset) * 5 // Subtle X-axis wobble
            }}
            transition={{ 
              duration: 0,
              ease: "linear" 
            }}
          >
            {portfolioProjects.map((project, index) => {
              // Enhanced 3D spiral calculation for 10 items
              const angle = (index * 36) * (Math.PI / 180); // 36 degrees between each item (360/10)
              const radius = 350; // Larger radius for more items
              const x = Math.cos(angle) * radius;
              const z = Math.sin(angle) * radius;
              const y = Math.sin(index * 0.8 + waveOffset * 3) * 80 + Math.cos(waveOffset * 2) * 20; // Dynamic wave positioning
              const floatY = Math.sin(waveOffset * 1.5 + index) * 15; // Additional floating effect

              return (
                <motion.div
                  key={project.id}
                  className="portfolio-card-enhanced absolute left-1/2 top-1/2"
                  style={{
                    transform: `translate(-50%, -50%) translate3d(${x}px, ${y + floatY}px, ${z}px) rotateY(${-angle * (180 / Math.PI)}deg)`,
                    transformStyle: "preserve-3d"
                  }}
                  initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    rotateX: Math.sin(waveOffset + index) * 10, // Dynamic rotation
                  }}
                  transition={{ 
                    duration: 0,
                    ease: "linear"
                  }}
                  whileHover={{ 
                    scale: 1.12,
                    z: 120,
                    rotateX: 0,
                    transition: { duration: 0.3 }
                  }}
                  data-testid={`portfolio-card-${index}`}
                >
                  <div className="glassmorphism-card-enhanced w-72 h-80 p-5 rounded-xl border border-white/30 backdrop-blur-xl bg-white/10 shadow-2xl relative overflow-hidden group">
                    {/* Background gradient based on category */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[project.category as keyof typeof categoryColors]} opacity-30 group-hover:opacity-60 transition-opacity duration-300 rounded-xl`} />
                    
                    {/* Content - Simplified for better readability */}
                    <div className="relative z-10 h-full flex flex-col text-center">
                      {/* Project number and status */}
                      <div className="flex justify-between items-center mb-3">
                        <div className="w-8 h-8 rounded-full bg-cyan-400/20 flex items-center justify-center">
                          <span className="text-sm font-bold text-cyan-300">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          project.status === "完了" ? "bg-green-500/30 text-green-200 border border-green-400/50" :
                          project.status === "進行中" ? "bg-blue-500/30 text-blue-200 border border-blue-400/50" :
                          "bg-purple-500/30 text-purple-200 border border-purple-400/50"
                        }`}>
                          {project.status}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors leading-tight">
                        {project.title}
                      </h3>
                      
                      {/* Category */}
                      <div className="text-xs text-cyan-300 mb-3 font-medium">
                        {project.category}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-gray-300 mb-3 leading-relaxed flex-1 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Key achievement */}
                      {project.achievements && (
                        <div className="mb-3 p-2 bg-white/5 rounded-lg border border-white/10">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Award className="w-3 h-3 text-yellow-400" />
                            <span className="text-xs font-medium text-yellow-300">成果</span>
                          </div>
                          <div className="text-xs text-white font-medium">
                            {project.achievements[0]}
                          </div>
                        </div>
                      )}

                      {/* Technologies - Top 3 only */}
                      <div className="flex flex-wrap gap-1 justify-center mb-4">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="text-xs px-2 py-1 bg-cyan-500/20 rounded-full text-cyan-200 border border-cyan-400/30 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* View button */}
                      <Button size="sm" variant="ghost" className="w-full text-xs bg-white/20 hover:bg-white/30 border border-white/40 text-white font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Play className="w-3 h-3 mr-1" />
                        プロジェクト詳細
                      </Button>
                    </div>

                    {/* Enhanced glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Central navigation hub with rotation indicator */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400/40 to-purple-400/40 backdrop-blur-xl border-2 border-white/40 flex flex-col items-center justify-center shadow-2xl">
              <div className="text-white text-xs font-bold mb-1">WORKS</div>
              <div className="text-cyan-300 text-xs">回転中...</div>
            </div>
            
            {/* Rotating progress ring */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-transparent border-t-cyan-400/60"
              animate={{ rotate: rotation * 2 }} // Faster rotation for visual feedback
              transition={{ duration: 0, ease: "linear" }}
            />
            
            {/* Navigation indicators - static positions */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {portfolioProjects.map((_, index) => {
                const angle = (index * 60) * (Math.PI / 180);
                const radius = 55;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                  <div
                    key={index}
                    className="absolute w-3 h-3 bg-cyan-400/60 rounded-full border border-white/40 flex items-center justify-center"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                  >
                    <div className="text-white text-xs font-bold">{index + 1}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}