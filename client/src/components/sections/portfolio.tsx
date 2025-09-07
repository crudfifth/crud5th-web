import { useState, useEffect } from "react";
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
    title: "ECサイト構築プロジェクト",
    description: "最新技術を駆使した高性能Eコマースプラットフォーム。ユーザビリティとパフォーマンスを重視した設計で、売上向上を実現。",
    category: "受託開発",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    status: "完了",
    image: "/api/placeholder/400/300",
    achievements: ["月間売上30%向上", "ページ速度50%改善", "ユーザー満足度4.8/5"]
  },
  {
    id: 2,
    title: "SaaS管理システム",
    description: "企業向け統合管理ソリューション。複雑な業務フローを効率化し、生産性向上をサポート。",
    category: "自社サービス",
    technologies: ["Vue.js", "FastAPI", "MongoDB", "Docker", "AWS"],
    status: "進行中",
    image: "/api/placeholder/400/300",
    achievements: ["業務効率40%向上", "コスト削減25%", "導入企業50社突破"]
  },
  {
    id: 3,
    title: "AIチャットボット開発",
    description: "自然言語処理を活用したインテリジェントなカスタマーサポートシステム。24/7対応でサービス品質向上。",
    category: "自社サービス",
    technologies: ["Python", "TensorFlow", "FastAPI", "Redis", "React"],
    status: "完了",
    image: "/api/placeholder/400/300",
    achievements: ["応答精度95%", "サポート業務70%削減", "顧客満足度向上"]
  },
  {
    id: 4,
    title: "DX導入支援システム",
    description: "レガシーシステムからモダンな環境への移行をサポート。段階的なデジタル化戦略でリスクを最小化。",
    category: "コンサル",
    technologies: ["Angular", "Spring Boot", "MySQL", "Kubernetes", "Azure"],
    status: "進行中",
    image: "/api/placeholder/400/300",
    achievements: ["移行成功率100%", "業務継続性確保", "従業員研修完了"]
  },
  {
    id: 5,
    title: "モバイルアプリ開発",
    description: "クロスプラットフォーム対応の革新的なモバイルアプリケーション。直感的なUIと高いパフォーマンスを実現。",
    category: "受託開発",
    technologies: ["React Native", "TypeScript", "Firebase", "GraphQL"],
    status: "完了",
    image: "/api/placeholder/400/300",
    achievements: ["App Store評価4.9", "ダウンロード10万突破", "アクティブ率85%"]
  },
  {
    id: 6,
    title: "ブロックチェーン基盤",
    description: "次世代分散アプリケーションのための堅牢なブロックチェーンインフラ。セキュリティと透明性を重視。",
    category: "自社サービス",
    technologies: ["Solidity", "Web3.js", "Node.js", "IPFS", "Ethereum"],
    status: "企画中",
    image: "/api/placeholder/400/300",
    achievements: ["プロトタイプ完成", "投資家説明会成功", "特許出願準備中"]
  }
];

const categoryColors = {
  "受託開発": "from-blue-500/20 to-cyan-500/20",
  "自社サービス": "from-purple-500/20 to-pink-500/20", 
  "コンサル": "from-green-500/20 to-emerald-500/20"
};

export default function Portfolio() {
  const { ref, isVisible } = useScrollAnimation();
  
  // Auto-rotating spiral animation - continuous rotation
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360); // Slow continuous rotation
    }, 50); // Smooth 60fps animation

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

        {/* Auto-Rotating Spiral Portfolio Layout */}
        <div className="portfolio-container relative" style={{ perspective: "1500px", height: "900px" }}>
          <motion.div
            className="portfolio-spiral-simple"
            animate={{ 
              rotateY: rotation 
            }}
            transition={{ 
              duration: 0, // Immediate updates for smooth rotation
              ease: "linear" 
            }}
          >
            {portfolioProjects.map((project, index) => {
              // Simplified spiral calculation - more horizontal, easier to read
              const angle = (index * 60) * (Math.PI / 180); // 60 degrees between each item
              const radius = 280; // Fixed radius for consistent circle
              const x = Math.cos(angle) * radius;
              const z = Math.sin(angle) * radius;
              const y = index * -40; // Less vertical spacing

              return (
                <motion.div
                  key={project.id}
                  className="portfolio-card-simple absolute left-1/2 top-1/2"
                  style={{
                    transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) rotateY(${-angle * (180 / Math.PI)}deg)`,
                    transformStyle: "preserve-3d"
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.08,
                    z: 80
                  }}
                  data-testid={`portfolio-card-${index}`}
                >
                  <div className="glassmorphism-card-simple w-72 h-80 p-5 rounded-xl border border-white/30 backdrop-blur-xl bg-white/10 shadow-2xl relative overflow-hidden group">
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