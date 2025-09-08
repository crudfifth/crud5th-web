import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { AnimatedUnderline } from "@/components/animations/svg-path-animation";
import { ExternalLink, Github, Play, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Lenis from "lenis";

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
  },
  {
    id: 7,
    title: "IoTセンサー管理",
    description: "リアルタイム監視システム",
    category: "受託開発",
    technologies: ["React", "Python", "InfluxDB"],
    status: "完了",
    image: "/api/placeholder/400/300",
    achievements: ["データ可視化100%", "予測精度90%"]
  },
  {
    id: 8,
    title: "金融API",
    description: "銀行・証券会社向け決済システム",
    category: "コンサル",
    technologies: ["Java", "Spring Security", "Oracle"],
    status: "進行中",
    image: "/api/placeholder/400/300",
    achievements: ["取引処理速度3倍", "セキュリティ強化"]
  },
  {
    id: 9,
    title: "VR教育システム",
    description: "没入型学習体験プラットフォーム",
    category: "自社サービス",
    technologies: ["Unity", "C#", "WebRTC"],
    status: "企画中",
    image: "/api/placeholder/400/300",
    achievements: ["学習効果200%向上", "集中力3倍"]
  },
  {
    id: 10,
    title: "自動化RPA",
    description: "業務プロセス自動化ソリューション",
    category: "受託開発",
    technologies: ["Python", "Selenium", "OpenCV"],
    status: "完了",
    image: "/api/placeholder/400/300",
    achievements: ["業務時間50%削減", "エラー率90%低下"]
  },
  {
    id: 11,
    title: "クラウド移行",
    description: "大規模システムのクラウド最適化",
    category: "コンサル",
    technologies: ["AWS", "Docker", "Kubernetes"],
    status: "完了",
    image: "/api/placeholder/400/300",
    achievements: ["コスト50%削減", "可用性99.9%"]
  },
  {
    id: 12,
    title: "データ分析基盤",
    description: "機械学習を活用したBIシステム",
    category: "自社サービス",
    technologies: ["Python", "Apache Spark", "TensorFlow"],
    status: "進行中",
    image: "/api/placeholder/400/300",
    achievements: ["予測精度95%", "処理速度10倍向上"]
  }
];

const categoryColors: Record<string, string> = {
  "受託開発": "from-blue-500/20 to-cyan-500/20",
  "自社サービス": "from-purple-500/20 to-pink-500/20", 
  "コンサル": "from-green-500/20 to-emerald-500/20"
};

export default function Portfolio() {
  const { ref, isVisible } = useScrollAnimation();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardListRef = useRef<HTMLUListElement>(null);
  const [activeCards, setActiveCards] = useState<Set<number>>(new Set());
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!wrapperRef.current || !cardListRef.current) return;

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      autoRaf: true,
      wrapper: wrapperRef.current,
      wheelMultiplier: 0.3,
      touchMultiplier: 0.5,
      syncTouchLerp: 0.01,
      syncTouch: true,
      gestureOrientation: "both",
      infinite: true,
    });

    lenisRef.current = lenis;

    // Set initial rotation angle
    const baseDeg = 0;
    cardListRef.current.style.setProperty("--base-deg", `${baseDeg}`);

    // Scroll acceleration to rotation coefficient
    const STRENGTH = 0.3;

    // Listen to scroll events with Lenis
    lenis.on("scroll", (event: any) => {
      if (!cardListRef.current) return;
      
      const currentDeg = parseFloat(cardListRef.current.style.getPropertyValue("--base-deg") || "0");
      // Add scroll velocity to current rotation angle
      const newBaseDeg = currentDeg - event.velocity * STRENGTH;
      cardListRef.current.style.setProperty("--base-deg", `${newBaseDeg}`);
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  const toggleCardFlip = (cardId: number) => {
    if (lenisRef.current?.isScrolling) return; // Don't flip during scroll
    
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
    <section id="portfolio" className="py-24 bg-gradient-to-br from-background via-secondary/5 to-background relative overflow-hidden">
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

        {/* Circular Portfolio Cards - Exact reference implementation */}
        <div className="scrollable" ref={wrapperRef}>
          <ul 
            className="cardList" 
            ref={cardListRef}
            style={{ "--card-count": portfolioProjects.length } as React.CSSProperties}
          >
            {portfolioProjects.map((project, index) => {
              const isActive = activeCards.has(project.id);
              
              return (
                <li
                  key={project.id}
                  className={`sampleCard ${isActive ? 'isActive' : ''}`}
                  style={{ "--index": index } as React.CSSProperties}
                  onClick={() => toggleCardFlip(project.id)}
                  data-testid={`portfolio-card-${index}`}
                >
                  {/* Front Face */}
                  <div className="face front">
                    <div className="w-full h-full p-4 rounded-xl border border-gray-600 bg-slate-800 shadow-2xl relative overflow-hidden group cursor-pointer">
                      {/* Background gradient based on category */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[project.category]} opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-xl`} />
                      
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
                          <span>クリックで詳細</span>
                        </div>
                      </div>

                      {/* Subtle glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-purple-400/0 opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-xl" />
                    </div>
                  </div>

                  {/* Back Face */}
                  <div className="face back">
                    <div className="w-full h-full p-4 rounded-xl border border-gray-600 bg-slate-800 shadow-2xl relative overflow-hidden group cursor-pointer">
                      {/* Background gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[project.category]} opacity-20 rounded-xl`} />
                      
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