import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence, useInView } from "framer-motion";
import { ExternalLink, Github, Star, Zap, Eye, Code, Award } from "lucide-react";

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

interface FlipCardProps {
  project: PortfolioProject;
  index: number;
}

function FlipCard({ project, index }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categoryColors: Record<string, string> = {
    "受託開発": "from-blue-500/20 to-cyan-500/10",
    "自社サービス": "from-purple-500/20 to-pink-500/10", 
    "コンサル": "from-green-500/20 to-emerald-500/10"
  };

  const statusColors: Record<string, string> = {
    "完了": "bg-green-500/20 text-green-300 border-green-500/40",
    "進行中": "bg-blue-500/20 text-blue-300 border-blue-500/40",
    "企画中": "bg-purple-500/20 text-purple-300 border-purple-500/40"
  };

  return (
    <motion.div
      ref={ref}
      className="relative w-full h-80 perspective-1000"
      initial={{ opacity: 0, y: 50, rotateX: -20 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        transition: { 
          duration: 0.6, 
          delay: index * 0.1,
          ease: "easeOut"
        }
      } : {}}
      whileHover={{ scale: 1.05, z: 20 }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      data-testid={`portfolio-card-${index}`}
    >
      <motion.div
        className="relative w-full h-full transform-style-preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front Side */}
        <div className={`absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br ${categoryColors[project.category]} backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col`}>
          {/* Status & Category */}
          <div className="flex justify-between items-start mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[project.status]}`}>
              {project.status}
            </span>
            <span className="text-xs text-white/60 bg-black/20 px-3 py-1 rounded-full">
              {project.category}
            </span>
          </div>

          {/* Project Image Placeholder */}
          <div className="w-full h-32 bg-gradient-to-br from-white/10 to-white/5 rounded-xl mb-4 flex items-center justify-center">
            <Code className="w-8 h-8 text-white/40" />
          </div>

          {/* Title & Description */}
          <h3 className="text-xl font-bold text-white mb-3 leading-tight">{project.title}</h3>
          <p className="text-sm text-white/80 leading-relaxed flex-1">{project.description}</p>

          {/* Hover Indicator */}
          <div className="mt-4 flex items-center justify-center text-white/50 text-xs">
            <Eye className="w-4 h-4 mr-2" />
            ホバーで詳細表示
          </div>
        </div>

        {/* Back Side */}
        <div className={`absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br ${categoryColors[project.category]} backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col`} style={{ transform: 'rotateY(180deg)' }}>
          <h3 className="text-lg font-bold text-white mb-4">{project.title}</h3>
          
          {/* Technologies */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-cyan-300 mb-2 flex items-center">
              <Zap className="w-4 h-4 mr-1" />
              使用技術
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, techIndex) => (
                <span key={techIndex} className="text-xs px-2 py-1 bg-white/15 rounded-full text-white border border-white/20">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements */}
          {project.achievements && (
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-yellow-300 mb-2 flex items-center">
                <Award className="w-4 h-4 mr-1" />
                主な成果
              </h4>
              <ul className="text-xs text-gray-200 space-y-2">
                {project.achievements.map((achievement, achIndex) => (
                  <li key={achIndex} className="flex items-start gap-2">
                    <Star className="w-3 h-3 text-yellow-400 flex-shrink-0 mt-0.5" />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <motion.button 
              className="flex-1 bg-white/20 text-white text-sm font-medium py-2 px-4 rounded-lg border border-white/30 hover:bg-white/30 transition-colors flex items-center justify-center"
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              デモ
            </motion.button>
            <motion.button 
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0"
        animate={{ opacity: isFlipped ? 0.6 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ zIndex: -1 }}
      />
    </motion.div>
  );
}

export default function Portfolio() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });

  return (
    <section 
      ref={sectionRef}
      id="portfolio" 
      className="py-24 bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0 bg-grid-pattern"
            style={{
              backgroundImage: `
                linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* Floating Orbs */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-cyan-400/30 rounded-full blur-sm"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
            Portfolio
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            革新的なソリューションで創り上げた、プロジェクト実績をご紹介
          </p>
          <div className="mt-6 text-sm text-gray-400">
            カードにホバーして詳細をご覧ください
          </div>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioProjects.map((project, index) => (
            <FlipCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            これらのプロジェクトは、お客様のビジネス成長と技術革新への貢献の証です
          </p>
          <motion.button
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:from-cyan-400 hover:to-purple-400 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            もっと見る
          </motion.button>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .perspective-1000 {
            perspective: 1000px;
          }
          
          .transform-style-preserve-3d {
            transform-style: preserve-3d;
          }
          
          .backface-hidden {
            backface-visibility: hidden;
          }
        `
      }} />
    </section>
  );
}