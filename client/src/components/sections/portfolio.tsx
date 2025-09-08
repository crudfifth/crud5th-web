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
  const sectionRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [activeCards, setActiveCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!sectionRef.current || !ringRef.current) return;

    const cards = [...ringRef.current.querySelectorAll('.card3d')];
    const N = cards.length;
    
    // Nを実数に同期
    document.documentElement.style.setProperty('--N', String(N));
    const STEP = 360 / N;

    let targetRot = 0;
    let currentRot = 0;
    let prevTargetRot = 0;
    let velocity = 0;
    let scrollStopTimer: NodeJS.Timeout | null = null;

    // Enhanced parameters for smoother snap
    const LERP = 0.10;
    const SNAP_DELAY = 160;
    const DEADZONE = STEP * 0.22;

    const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

    // indexをCSS変数で埋める（transformはCSS側の数式で決まる）
    cards.forEach((c, i) => {
      const element = c as HTMLElement;
      element.style.setProperty('--i', i.toString());
    });

    // 半径を自動計算（重なり回避）
    function pxVar(name: string): number {
      const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      const n = parseFloat(v);
      return isNaN(n) ? 0 : n;
    }

    function computeRadius(): number {
      const w = pxVar('--card-w');
      const gap = pxVar('--gap-px') || 12;
      const r = (w / 2 + gap) / Math.tan(Math.PI / N);
      return Math.max(r, 420);
    }

    function applyRadius() {
      const r = Math.round(computeRadius());
      document.documentElement.style.setProperty('--radius', r + 'px');
    }

    function updateTargetFromScroll() {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = (sectionRef.current.offsetHeight - vh) || 1;
      const passed = clamp((vh - rect.top) / total, 0, 1);
      const turns = 1.0; // 1周
      targetRot = -passed * (turns * 360);
    }

    function snapMaybe() {
      const nearest = Math.round(targetRot / STEP) * STEP;
      if (Math.abs(targetRot - nearest) < DEADZONE) {
        targetRot = nearest;
      }
    }

    function onScroll() {
      updateTargetFromScroll();
      if (scrollStopTimer) clearTimeout(scrollStopTimer);
      scrollStopTimer = setTimeout(snapMaybe, SNAP_DELAY);
    }

    function markActive() {
      // 現在角度から正面indexを推定
      const idx = ((-Math.round((currentRot % 360) / STEP)) % N + N) % N;
      cards.forEach((c, i) => {
        c.classList.toggle('is-active', i === idx);
      });
    }

    function animate() {
      if (!ringRef.current) return;
      
      velocity = targetRot - prevTargetRot;
      prevTargetRot = targetRot;
      
      if (Math.abs(velocity) < 0.08) {
        targetRot = Math.round(targetRot / STEP) * STEP;
      }

      currentRot += (targetRot - currentRot) * LERP;
      
      if (Math.abs(currentRot - targetRot) < 0.02) {
        currentRot = targetRot;
      }

      ringRef.current.style.setProperty('--rot', currentRot.toFixed(3) + 'deg');
      markActive();
      requestAnimationFrame(animate);
    }

    // Initialize
    applyRadius();
    updateTargetFromScroll();
    animate();
    
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', applyRadius);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', applyRadius);
      if (scrollStopTimer) clearTimeout(scrollStopTimer);
    };
  }, []);

  const toggleCardFlip = (cardId: number) => {
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

        {/* Stable Circular Portfolio Cards with pin section */}
        <div className="helix" ref={sectionRef}>
          <div className="pin">
            <div className="stage">
              <div 
                className="ring" 
                ref={ringRef}
                style={{ "--rot": "0deg" } as React.CSSProperties}
              >
                {portfolioProjects.map((project, index) => {
                  const isActive = activeCards.has(project.id);
                  
                  return (
                    <article
                      key={project.id}
                      className={`card3d ${isActive ? 'is-active' : ''}`}
                      style={{ "--i": index } as React.CSSProperties}
                      onClick={() => toggleCardFlip(project.id)}
                      data-testid={`portfolio-card-${index}`}
                    >
                      <div className="box">
                        {/* Front Face */}
                        <div className="face front">
                          <div className="content">
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

                            <h3 className="title">{project.title}</h3>
                            <p className="desc">{project.description}</p>
                            
                            <div className="cta">
                              <button className="btn secondary">詳細</button>
                              <button className="btn">開く</button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Back Face */}
                        <div className="face back">
                          <div className="content">
                            <h3 className="title">{project.title}</h3>
                            <div className="desc">
                              <h4 className="text-sm font-semibold text-cyan-300 mb-2">使用技術</h4>
                              <div className="flex flex-wrap gap-1 mb-3">
                                {project.technologies.map((tech, techIndex) => (
                                  <span key={techIndex} className="text-xs px-2 py-1 bg-white/15 rounded-full text-white border border-white/30">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                              
                              {project.achievements && (
                                <div>
                                  <h4 className="text-sm font-semibold text-yellow-300 mb-2">主な成果</h4>
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
                            </div>
                          </div>
                        </div>
                        
                        {/* Side faces for 3D thickness */}
                        <div className="face left"></div>
                        <div className="face right"></div>
                        <div className="face top"></div>
                        <div className="face bottom"></div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}