import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { ExternalLink, Github, Play, Award, Users, Calendar } from "lucide-react";

interface ProjectData {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  technologies: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  achievements: string[];
  teamSize: number;
  duration: string;
  year: string;
}

const portfolioProjects: ProjectData[] = [
  {
    id: 1,
    title: "ECサイト構築プラットフォーム",
    description: "Next.js & TypeScriptを使用したモダンなECサイト構築システム",
    longDescription: "大規模ECサイトのフルスタック開発。リアルタイム在庫管理、決済システム統合、AI推薦機能を実装。パフォーマンス最適化により読み込み速度40%向上を実現。",
    category: "受託開発",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "AWS"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    demoUrl: "#",
    githubUrl: "#",
    achievements: ["売上300%向上", "UX改善による離脱率50%削減", "モバイル最適化"],
    teamSize: 4,
    duration: "6ヶ月",
    year: "2024"
  },
  {
    id: 2,
    title: "SaaS管理システム",
    description: "企業向け業務効率化を実現するSaaSプラットフォーム",
    longDescription: "中小企業向けの包括的な業務管理システム。プロジェクト管理、チームコラボレーション、レポート自動生成機能を統合。クラウドネイティブアーキテクチャで高可用性を実現。",
    category: "自社サービス",
    technologies: ["React", "Node.js", "MongoDB", "Docker", "Kubernetes"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    demoUrl: "#",
    achievements: ["業務効率50%改善", "ユーザー数1万人突破", "チームコラボ強化"],
    teamSize: 6,
    duration: "8ヶ月",
    year: "2024"
  },
  {
    id: 3,
    title: "AIチャットボット",
    description: "自然言語処理を活用したインテリジェントなカスタマーサポート",
    longDescription: "GPTベースのAIチャットボットシステム。多言語対応、感情分析、自動エスカレーション機能を実装。カスタマーサポートの効率を大幅に向上。",
    category: "AI・ML",
    technologies: ["Python", "FastAPI", "OpenAI", "React", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    demoUrl: "#",
    achievements: ["問い合わせ対応80%自動化", "満足度95%達成", "多言語対応"],
    teamSize: 5,
    duration: "4ヶ月",
    year: "2024"
  },
  {
    id: 4,
    title: "モバイルアプリ開発",
    description: "React Nativeによるクロスプラットフォームアプリ",
    longDescription: "iOS/Android対応のネイティブアプリ開発。オフライン機能、プッシュ通知、位置情報サービスを統合。UXに特化した設計で高評価を獲得。",
    category: "モバイル",
    technologies: ["React Native", "Expo", "Firebase", "TypeScript"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
    demoUrl: "#",
    githubUrl: "#",
    achievements: ["App Store評価4.8★", "ダウンロード数5万", "快適なUX実現"],
    teamSize: 3,
    duration: "5ヶ月",
    year: "2024"
  },
  {
    id: 5,
    title: "DX導入支援システム",
    description: "企業のデジタル変革を支援するコンサルティングシステム",
    longDescription: "企業のDX推進をサポートする包括的なプラットフォーム。現状分析、戦略立案、実装支援、効果測定までを一元管理。データドリブンなアプローチで成果を可視化。",
    category: "コンサル",
    technologies: ["Vue.js", "Django", "PostgreSQL", "D3.js", "AWS"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    achievements: ["DX成功率90%", "ROI平均200%改善", "導入企業50社"],
    teamSize: 8,
    duration: "12ヶ月",
    year: "2023-2024"
  },
  {
    id: 6,
    title: "ブロックチェーンウォレット",
    description: "セキュリティを重視したWeb3ウォレットアプリケーション",
    longDescription: "多通貨対応のブロックチェーンウォレット。ハードウェアウォレット統合、DeFiプロトコル対応、高度なセキュリティ機能を実装。ユーザーフレンドリーなインターフェースでWeb3の普及に貢献。",
    category: "ブロックチェーン",
    technologies: ["Solidity", "Web3.js", "React", "Node.js", "IPFS"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
    demoUrl: "#",
    achievements: ["セキュリティ監査合格", "TVL 1億円達成", "DeFi統合"],
    teamSize: 4,
    duration: "7ヶ月",
    year: "2024"
  }
];

const categoryColors: Record<string, string> = {
  "受託開発": "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
  "自社サービス": "from-green-500/20 to-emerald-500/20 border-green-500/30",
  "AI・ML": "from-purple-500/20 to-pink-500/20 border-purple-500/30",
  "モバイル": "from-orange-500/20 to-red-500/20 border-orange-500/30",
  "コンサル": "from-yellow-500/20 to-amber-500/20 border-yellow-500/30",
  "ブロックチェーン": "from-indigo-500/20 to-purple-500/20 border-indigo-500/30"
};

function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`portfolio-card relative group cursor-pointer h-full`}
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.02,
        rotateY: 5,
        z: 50,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      data-testid={`project-card-${index}`}
    >
      {/* Glass morphism background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[project.category]} backdrop-blur-xl rounded-2xl border transition-all duration-500 ${
        isHovered ? 'shadow-2xl shadow-primary/20 border-primary/40' : 'shadow-lg'
      }`} 
      style={{ transform: "translateZ(0)" }} 
      />
      
      {/* Content */}
      <div className="relative p-8 h-full flex flex-col" style={{ transform: "translateZ(10px)" }}>
        {/* Image container with 3D effect */}
        <div className="relative mb-6 overflow-hidden rounded-xl group-hover:shadow-lg transition-shadow duration-300">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            style={{ transform: "translateZ(5px)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Floating year badge */}
          <motion.div 
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/30"
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ transform: "translateZ(15px)" }}
          >
            {project.year}
          </motion.div>
        </div>

        {/* Project meta info */}
        <div className="flex items-center gap-4 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${categoryColors[project.category]} border`}>
            {project.category}
          </span>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            {project.teamSize}名
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {project.duration}
          </div>
        </div>

        {/* Title and description */}
        <motion.h3 
          className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300"
          style={{ transform: "translateZ(8px)" }}
          data-testid={`project-title-${index}`}
        >
          {project.title}
        </motion.h3>
        
        <motion.p 
          className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow"
          style={{ transform: "translateZ(6px)" }}
        >
          {project.description}
        </motion.p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.slice(0, 4).map((tech, techIndex) => (
            <motion.span
              key={tech}
              className="px-2 py-1 bg-white/10 rounded-lg text-xs font-medium text-foreground border border-white/20"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(79, 209, 197, 0.2)" }}
              style={{ transform: "translateZ(4px)" }}
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 bg-white/10 rounded-lg text-xs font-medium text-muted-foreground border border-white/20">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Achievements */}
        <div className="space-y-2 mb-6">
          {project.achievements.slice(0, 2).map((achievement, achIndex) => (
            <motion.div 
              key={achIndex}
              className="flex items-center gap-2 text-sm text-foreground"
              style={{ transform: "translateZ(3px)" }}
            >
              <Award className="w-4 h-4 text-primary flex-shrink-0" />
              <span>{achievement}</span>
            </motion.div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-auto">
          {project.demoUrl && (
            <motion.button
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-primary/20 border border-primary/30 rounded-lg text-primary font-medium text-sm hover:bg-primary/30 transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ transform: "translateZ(12px)" }}
            >
              <Play className="w-4 h-4" />
              デモ
            </motion.button>
          )}
          {project.githubUrl && (
            <motion.button
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-white/10 border border-white/20 rounded-lg text-foreground font-medium text-sm hover:bg-white/20 transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ transform: "translateZ(12px)" }}
            >
              <Github className="w-4 h-4" />
              コード
            </motion.button>
          )}
          <motion.button
            className="p-2 bg-white/10 border border-white/20 rounded-lg text-foreground hover:bg-white/20 transition-colors duration-300"
            whileHover={{ scale: 1.1, rotate: 12 }}
            whileTap={{ scale: 0.95 }}
            style={{ transform: "translateZ(12px)" }}
          >
            <ExternalLink className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl opacity-0 pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transform: "translateZ(-1px)" }}
      />
    </motion.div>
  );
}

export default function Portfolio() {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedCategory, setSelectedCategory] = useState<string>("すべて");
  
  const categories = ["すべて", ...Array.from(new Set(portfolioProjects.map(p => p.category)))];
  
  const filteredProjects = selectedCategory === "すべて" 
    ? portfolioProjects 
    : portfolioProjects.filter(p => p.category === selectedCategory);

  return (
    <section id="portfolio" className="py-24 bg-gradient-to-b from-background via-secondary/5 to-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360] 
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0] 
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
          data-testid="portfolio-header"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">ポートフォリオ</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            最新技術を駆使したプロジェクトの数々。クライアントと共に創り上げた成功事例をご紹介します。
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 border backdrop-blur-sm ${
                selectedCategory === category
                  ? 'bg-primary/20 border-primary text-primary shadow-lg shadow-primary/20'
                  : 'bg-white/5 border-white/20 text-muted-foreground hover:bg-white/10 hover:border-white/30'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              data-testid={`category-${index}`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
          layout
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}