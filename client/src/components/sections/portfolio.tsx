import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { AnimatedUnderline } from "@/components/animations/svg-path-animation";
import { ExternalLink, Github, Play, Award, RotateCw } from "lucide-react";
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

const categoryColors: Record<string, string> = {
  "受託開発": "from-blue-500/20 to-cyan-500/20",
  "自社サービス": "from-purple-500/20 to-pink-500/20", 
  "コンサル": "from-green-500/20 to-emerald-500/20"
};

export default function Portfolio() {
  const { ref, isVisible } = useScrollAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardListRef = useRef<HTMLUListElement>(null);
  const [activeCards, setActiveCards] = useState<Set<number>>(new Set());
  const [isScrolling, setIsScrolling] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Circle rotation based on scroll with more dramatic effect
  const circleRotation = useTransform(scrollYProgress, [0, 1], [0, 1080]); // 3 full rotations

  useEffect(() => {
    const unsubscribe = circleRotation.on("change", (latest) => {
      if (cardListRef.current) {
        cardListRef.current.style.setProperty("--base-deg", `${latest}`);
      }
    });
    return unsubscribe;
  }, [circleRotation]);

  // Scroll state management
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout((window as any).scrollTimeout);
      (window as any).scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout((window as any).scrollTimeout);
    };
  }, []);

  const toggleCardFlip = (cardId: number) => {
    if (isScrolling) return; // Don't flip during scroll
    
    setActiveCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  return (
    <section id="portfolio" className="py-24 bg-gradient-to-br from-background via-secondary/5 to-background relative overflow-hidden" ref={containerRef}>
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

        {/* Circular Portfolio Cards - Based on reference implementation */}
        <div className={`portfolio-scrollable ${isScrolling ? 'scrolling' : ''}`} ref={containerRef}>
          <ul 
            className="portfolio-card-list" 
            ref={cardListRef}
            style={{ "--card-count": portfolioProjects.length } as React.CSSProperties}
          >
            {portfolioProjects.map((project, index) => {
              const isActive = activeCards.has(project.id);
              
              return (
                <li
                  key={project.id}
                  className={`portfolio-sample-card ${isActive ? 'is-active' : ''}`}
                  style={{ "--index": index } as React.CSSProperties}
                  onClick={() => toggleCardFlip(project.id)}
                  data-testid={`portfolio-card-${index}`}
                >
                  {/* Front Face */}
                  <div className="face front">
                    <div className="glassmorphism-card w-full h-full p-4 rounded-xl border border-white/20 backdrop-blur-xl bg-white/5 shadow-2xl relative overflow-hidden group cursor-pointer">
                      {/* Background gradient based on category */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[project.category]} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`} />
                      
                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col">
                        {/* Status badge */}
                        <div className="flex justify-between items-start mb-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            project.status === "完了" ? "bg-green-500/20 text-green-300 border border-green-500/30" :
                            project.status === "進行中" ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" :
                            "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                          }`}>
                            {project.status}
                          </span>
                          <span className="text-xs text-muted-foreground bg-secondary/30 px-2 py-1 rounded-full">
                            {project.category}
                          </span>
                        </div>

                        {/* Title and description */}
                        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-300 mb-3 leading-relaxed flex-1">
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.slice(0, 3).map((tech, techIndex) => (
                              <span 
                                key={techIndex}
                                className="text-xs px-2 py-1 bg-white/10 rounded-full text-cyan-200 border border-white/20"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="text-xs px-2 py-1 bg-white/5 rounded-full text-gray-400">
                                +{project.technologies.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Flip indicator */}
                        <div className="flex items-center justify-center gap-2 text-white/60 text-xs">
                          <RotateCw className="w-3 h-3" />
                          <span>クリックで詳細</span>
                        </div>
                      </div>

                      {/* Holographic effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                    </div>
                  </div>

                  {/* Back Face */}
                  <div className="face back">
                    <div className="glassmorphism-card w-full h-full p-4 rounded-xl border border-white/20 backdrop-blur-xl bg-white/5 shadow-2xl relative overflow-hidden group cursor-pointer">
                      {/* Background gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[project.category]} opacity-30 rounded-xl`} />
                      
                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col">
                        <div className="text-center mb-3">
                          <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                          <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto" />
                        </div>

                        {/* All Technologies */}
                        <div className="mb-3">
                          <h4 className="text-sm font-semibold text-cyan-300 mb-2">使用技術</h4>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.map((tech, techIndex) => (
                              <span 
                                key={techIndex}
                                className="text-xs px-2 py-1 bg-white/15 rounded-full text-white border border-white/30"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Achievements */}
                        {project.achievements && (
                          <div className="mb-3 flex-1">
                            <div className="flex items-center gap-1 mb-2">
                              <Award className="w-3 h-3 text-yellow-400" />
                              <h4 className="text-sm font-semibold text-yellow-300">主な成果</h4>
                            </div>
                            <ul className="text-xs text-gray-200 space-y-1">
                              {project.achievements.map((achievement, achIndex) => (
                                <li key={achIndex} className="flex items-center gap-2">
                                  <div className="w-1 h-1 bg-cyan-400 rounded-full flex-shrink-0" />
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Action buttons */}
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" className="flex-1 text-xs bg-white/10 hover:bg-white/20 border border-white/20">
                            <Play className="w-3 h-3 mr-1" />
                            詳細
                          </Button>
                          <Button size="sm" variant="ghost" className="bg-white/10 hover:bg-white/20 border border-white/20">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}