import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence, useInView } from "framer-motion";
import { 
  Server, Database, Globe, Users, VideoIcon, Shield, 
  Gamepad2, Brain, Code, Cloud, Building2, Zap,
  Workflow, ArrowRight, MousePointer, Eye
} from "lucide-react";

interface ServiceNode {
  id: string;
  title: string;
  category: "web" | "management" | "creative" | "infrastructure" | "vr" | "business";
  description: string;
  technologies: string[];
  status: "active" | "development" | "planning";
  position: { x: number; y: number };
  icon: React.ReactNode;
  connections: string[];
  details?: {
    overview: string;
    features: string[];
    githubUrl?: string;
    demoUrl?: string;
    techStack: string[];
  };
}

const serviceNodes: ServiceNode[] = [
  // Core Infrastructure Layer (Top)
  {
    id: "crud5th-web",
    title: "CRUD5th WEB",
    category: "web",
    description: "コーポレートサイト",
    technologies: ["React", "TypeScript", "Vite"],
    status: "active",
    position: { x: 800, y: 150 },
    icon: <Globe className="w-5 h-5" />,
    connections: ["raft-core", "etheria", "cloud-nas"],
    details: {
      overview: "CRUD5thの公式コーポレートサイト。最新技術を駆使したモダンなWebサイトです。",
      features: ["レスポンシブデザイン", "高速表示", "SEO最適化", "アクセシビリティ対応"],
      demoUrl: "/",
      techStack: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"]
    }
  },

  {
    id: "cloud-nas",
    title: "クラウドNAS",
    category: "infrastructure",
    description: "全社共通データストレージ基盤",
    technologies: ["Node.js", "AWS S3"],
    status: "active",
    position: { x: 400, y: 100 },
    icon: <Cloud className="w-5 h-5" />,
    connections: ["domain-system", "crud5th-web", "video-edit"]
  },

  {
    id: "domain-system",
    title: "ドメイン構造管理",
    category: "infrastructure",
    description: "DNS・ドメイン統合管理",
    technologies: ["DNS API", "React"],
    status: "active",
    position: { x: 1200, y: 180 },
    icon: <Database className="w-5 h-5" />,
    connections: ["cloud-nas", "crud5th-web"]
  },

  // Management Layer (Right Side)
  {
    id: "crud5th-act",
    title: "CRUD5th act",
    category: "management", 
    description: "稼働管理システム",
    technologies: ["React", "Express", "PostgreSQL"],
    status: "active",
    position: { x: 1000, y: 400 },
    icon: <Building2 className="w-5 h-5" />,
    connections: ["personal-business", "enda", "keibi-shift"]
  },

  {
    id: "keibi-shift",
    title: "KeibiShift",
    category: "management",
    description: "警備シフト管理システム",
    technologies: ["React", "Calendar API"],
    status: "active",
    position: { x: 1400, y: 420 },
    icon: <Shield className="w-5 h-5" />,
    connections: ["crud5th-act", "enda"]
  },

  {
    id: "personal-business",
    title: "個人事業管理",
    category: "management",
    description: "フリーランス向け業務管理",
    technologies: ["React", "Express"],
    status: "active",
    position: { x: 1400, y: 700 },
    icon: <Shield className="w-5 h-5" />,
    connections: ["crud5th-act", "enda"]
  },

  {
    id: "enda",
    title: "ENDA",
    category: "management",
    description: "リアルタイム動態管理",
    technologies: ["IoT", "WebSocket"],
    status: "active",
    position: { x: 1000, y: 750 },
    icon: <Server className="w-5 h-5" />,
    connections: ["crud5th-act", "personal-business", "raft-core"]
  },

  // Creative Layer (Left Side - 広範囲分散配置)
  {
    id: "etheria",
    title: "Etheria",
    category: "creative",
    description: "クリエイターオールインワンシステム", 
    technologies: ["Vue.js", "WebGL"],
    status: "active",
    position: { x: 200, y: 350 },
    icon: <Brain className="w-5 h-5" />,
    connections: ["design-system", "video-edit", "donation-system"],
    details: {
      overview: "クリエイターのための包括的なプラットフォーム。作品制作から収益化まで一貫してサポートします。",
      features: ["作品管理", "コラボレーション機能", "収益分析", "ファン交流"],
      githubUrl: "https://github.com/crud5th/etheria",
      techStack: ["Vue.js 3", "WebGL", "Three.js", "Node.js", "PostgreSQL"]
    }
  },

  {
    id: "design-system",
    title: "デザイン作成",
    category: "creative",
    description: "デザインツール統合プラットフォーム",
    technologies: ["Canvas API", "WebGL"],
    status: "active",
    position: { x: 20, y: 120 },
    icon: <Code className="w-5 h-5" />,
    connections: ["etheria", "video-edit", "crud5th-web"]
  },

  {
    id: "video-edit",
    title: "動画編集",
    category: "creative",
    description: "Webベース動画編集プラットフォーム",
    technologies: ["WebAssembly", "FFmpeg"],
    status: "development",
    position: { x: -10, y: 600 },
    icon: <VideoIcon className="w-5 h-5" />,
    connections: ["etheria", "cloud-nas", "design-system"]
  },

  // Business & Communication Layer (Center)
  {
    id: "raft-core",
    title: "SES Corabo",
    category: "business",
    description: "SES営業推進・案件マッチング支援",
    technologies: ["React", "AI/ML"],
    status: "active",
    position: { x: 650, y: 420 },
    icon: <Users className="w-5 h-5" />,
    connections: ["crud5th-act", "communication-system", "enda"]
  },

  {
    id: "communication-system",
    title: "コミュニケーション",
    category: "web",
    description: "リアルタイム通信基盤",
    technologies: ["WebSocket", "WebRTC"],
    status: "active",
    position: { x: 320, y: 580 },
    icon: <Zap className="w-5 h-5" />,
    connections: ["meltin-vr", "raft-core", "donation-system"]
  },

  {
    id: "donation-system",
    title: "投げ銭",
    category: "web",
    description: "クリエイター支援プラットフォーム",
    technologies: ["Stripe", "React"],
    status: "active",
    position: { x: 600, y: 780 },
    icon: <Building2 className="w-5 h-5" />,
    connections: ["etheria", "communication-system"]
  },

  // VR Innovation Layer (Bottom-Left)
  {
    id: "meltin-vr",
    title: "Meltin VR",
    category: "vr",
    description: "お婿養マッチングアプリ",
    technologies: ["Unity", "WebXR"],
    status: "development",
    position: { x: 180, y: 820 },
    icon: <Gamepad2 className="w-5 h-5" />,
    connections: ["communication-system", "etheria"]
  }
];

const categoryColors: Record<string, string> = {
  "web": "from-blue-500/30 to-cyan-500/20",
  "management": "from-green-500/30 to-emerald-500/20",
  "creative": "from-purple-500/30 to-pink-500/20",
  "infrastructure": "from-orange-500/30 to-red-500/20",
  "vr": "from-indigo-500/30 to-purple-500/20",
  "business": "from-yellow-500/30 to-orange-500/20"
};

interface NodeCardProps {
  node: ServiceNode;
  isHighlighted: boolean;
  onHover: (nodeId: string | null) => void;
  highlightedConnections: Set<string>;
  onClick?: (nodeId: string) => void;
  isDetailView?: boolean;
}

function NodeCard({ node, isHighlighted, onHover, highlightedConnections, onClick, isDetailView }: NodeCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick(node.id);
    }
  };

  if (isDetailView && node.details) {
    // 詳細表示モード
    return (
      <motion.div
        className="absolute cursor-pointer z-50"
        style={{
          left: node.position.x,
          top: node.position.y,
          transform: 'translate(-50%, -50%)'
        }}
        onMouseEnter={() => onHover(node.id)}
        onMouseLeave={() => onHover(null)}
        onClick={handleClick}
        initial={{ scale: 1 }}
        animate={{ scale: 1.5, zIndex: 100 }}
        transition={{ duration: 0.3 }}
      >
        <div 
          className={`
            w-[240px] min-h-[140px] rounded-xl border-2
            bg-gradient-to-br ${categoryColors[node.category]}
            backdrop-blur-sm
            border-cyan-400/70 shadow-xl shadow-cyan-400/30
          `}
        >
          <div className="p-4 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-white/15 rounded-lg">
                {node.icon}
              </div>
              <span className="text-sm font-bold text-white">
                {node.title}
              </span>
            </div>

            {/* Overview */}
            <p className="text-xs text-gray-200 mb-3 leading-relaxed">
              {node.details.overview}
            </p>

            {/* Features */}
            <div className="mb-3">
              <h4 className="text-xs font-semibold text-cyan-300 mb-1">主要機能</h4>
              <ul className="text-[10px] text-gray-300 space-y-0.5">
                {node.details.features.slice(0, 3).map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div className="flex gap-2 mt-auto">
              {node.details.githubUrl && (
                <a 
                  href={node.details.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 text-[10px] bg-black/30 text-cyan-300 rounded border border-cyan-400/30 hover:bg-cyan-400/20 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  GitHub
                </a>
              )}
              {node.details.demoUrl && (
                <a 
                  href={node.details.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 text-[10px] bg-black/30 text-green-300 rounded border border-green-400/30 hover:bg-green-400/20 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
  // 通常表示モード
  return (
    <motion.div
      className={`absolute w-[72px] h-[40px] cursor-pointer group ${isHighlighted ? 'z-30' : 'z-10'}`}
      style={{
        left: node.position.x,
        top: node.position.y,
        transform: 'translate(-50%, -50%)'
      }}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onClick={handleClick}
      whileHover={{ scale: 1.05, z: 50 }}
      animate={{
        scale: isHighlighted ? 1.02 : 1,
        boxShadow: isHighlighted 
          ? "0 20px 40px rgba(99, 102, 241, 0.3)" 
          : "0 8px 25px rgba(0, 0, 0, 0.15)"
      }}
      transition={{ duration: 0.3 }}
      data-testid={`service-node-${node.id}`}
    >
      <div 
        className={`
          w-[72px] h-[40px] rounded-xl border
          bg-gradient-to-br ${categoryColors[node.category]}
          backdrop-blur-sm transition-all duration-300
          ${isHighlighted 
            ? 'border-cyan-400/70 shadow-lg shadow-cyan-400/20 scale-110' 
            : 'border-white/30 hover:border-white/50'
          }
        `}
      >
        {/* Status Indicator */}
        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-800 ${
          node.status === 'active' ? 'bg-green-400' :
          node.status === 'development' ? 'bg-yellow-400' :
          'bg-gray-400'
        }`} />

        <div className="p-2 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-1 mb-1">
            {node.icon}
            <span className="text-xs font-semibold text-white truncate flex-1">
              {node.title}
            </span>
          </div>

          {/* Description */}
          <p className="text-[10px] text-gray-200 line-clamp-3 leading-tight mb-1">
            {node.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-0.5 mt-auto">
            {node.technologies.slice(0, 4).map((tech, index) => (
              <span 
                key={index}
                className="px-1 py-0.5 text-[8px] bg-black/20 text-gray-200 rounded border border-white/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Connection Points */}
        {node.connections.map((_, index) => {
          const totalConnections = node.connections.length;
          const angle = (index / totalConnections) * 2 * Math.PI;
          const radius = 36; // Half of width/height
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <div
              key={index}
              className="absolute w-1.5 h-1.5 bg-cyan-400/60 rounded-full border border-white/40"
              style={{
                left: `calc(50% + ${x}px - 3px)`,
                top: `calc(50% + ${y}px - 3px)`,
              }}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

function ConnectionLine({ from, to, isActive }: { from: ServiceNode, to: ServiceNode, isActive: boolean }) {
  const pathId = `connection-${from.id}-${to.id}`;
  
  // Calculate control points for curved path
  const dx = to.position.x - from.position.x;
  const dy = to.position.y - from.position.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  const controlOffset = Math.min(distance * 0.3, 100);
  const midX = (from.position.x + to.position.x) / 2;
  const midY = (from.position.y + to.position.y) / 2;
  
  const perpX = -dy / distance * controlOffset;
  const perpY = dx / distance * controlOffset;
  
  const pathData = `M ${from.position.x} ${from.position.y} Q ${midX + perpX} ${midY + perpY} ${to.position.x} ${to.position.y}`;

  return (
    <g>
      {/* Background Path */}
      <path
        d={pathData}
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth="2"
        fill="none"
        strokeDasharray="5,5"
      />
      
      {/* Active Path */}
      <motion.path
        d={pathData}
        stroke={isActive ? "rgba(99, 102, 241, 0.8)" : "rgba(255, 255, 255, 0.2)"}
        strokeWidth={isActive ? "3" : "2"}
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: isActive ? 1 : 0.3, 
          opacity: isActive ? 1 : 0.4 
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      
      {/* Data Flow Animation - using SVG animate */}
      {isActive && (
        <circle r="3" fill="rgba(99, 102, 241, 0.9)">
          <animateMotion
            dur="2s"
            repeatCount="indefinite"
            path={pathData}
          />
        </circle>
      )}
    </g>
  );
}

export default function Portfolio() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [detailViewNode, setDetailViewNode] = useState<string | null>(null);
  const [zoom, setZoom] = useState(0.6); // デフォルトで60%ズーム
  const [pan, setPan] = useState({ x: -50, y: -50 }); // 初期値を左上に調整
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });

  // 画面外クリック時のフォーカス解除と詳細表示解除
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
        setDetailViewNode(null);
      }
    };

    if (isFocused || detailViewNode) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFocused, detailViewNode]);

  // ズーム・パン機能（フォーカス時のみ）
  const handleWheel = (e: React.WheelEvent) => {
    if (!isFocused) return; // フォーカスがない場合は通常のスクロール
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    const newZoom = Math.min(Math.max(0.3, zoom + delta), 2.0);
    setZoom(newZoom);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // 左クリックのみ
      e.preventDefault();
      setIsFocused(true); // クリック時にフォーカス設定
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      const newPan = {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      };
      setPan(newPan);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // ズーム・パンのリセット
  const resetView = () => {
    setZoom(0.6);
    setPan({ x: -50, y: -50 });
  };

  const highlightedConnections = new Set<string>();
  const activeConnections = new Set<string>();

  if (hoveredNode || selectedNode) {
    const node = serviceNodes.find(n => n.id === (hoveredNode || selectedNode));
    if (node) {
      node.connections.forEach(connId => {
        highlightedConnections.add(connId);
        activeConnections.add(`${node.id}-${connId}`);
        activeConnections.add(`${connId}-${node.id}`);
      });
    }
  }

  return (
    <section 
      ref={sectionRef}
      id="portfolio" 
      className="relative overflow-hidden"
    >
      {/* グラデーションブラー境界 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-slate-900/50" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-900 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
      
      <div className="relative py-24 bg-gradient-to-br from-slate-900/90 via-purple-900/5 to-slate-900/90">
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
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
            サービスエコシステム
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            CRUD5thの技術サービス群とその相互関係
          </p>
        </motion.div>

        {/* Service Network Visualization */}
        <div 
          ref={containerRef}
          className={`relative w-full h-[700px] mx-auto bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl border border-white/10 overflow-hidden cursor-grab outline-none ${
            isFocused ? 'ring-2 ring-cyan-500/50' : ''
          }`}
          style={{ 
            perspective: '1000px',
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* 全体表示ボタン（マップ内） */}
          <button 
            onClick={() => {
              resetView();
              setIsFocused(true);
            }}
            className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors text-sm text-white"
          >
            <Eye className="w-4 h-4" />
            全体表示
          </button>
          {/* Zoom/Pan Transform Container */}
          <div 
            className={`absolute inset-0 ${isDragging ? '' : 'transition-transform duration-200 ease-out'}`}
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: 'center center'
            }}
          >
            {/* SVG Connections */}
            <svg 
              className="absolute pointer-events-none" 
              style={{ 
                width: '1500px', 
                height: '850px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: -1 
              }}
            >
              {serviceNodes.map(fromNode => 
                fromNode.connections.map(toNodeId => {
                  const toNode = serviceNodes.find(n => n.id === toNodeId);
                  if (!toNode) return null;
                  
                  const connectionKey = `${fromNode.id}-${toNode.id}`;
                  const isActive = activeConnections.has(connectionKey);
                  
                  return (
                    <ConnectionLine
                      key={connectionKey}
                      from={fromNode}
                      to={toNode}
                      isActive={isActive}
                    />
                  );
                })
              )}
            </svg>

            {/* Service Nodes Container */}
            <div 
              className="absolute pointer-events-none"
              style={{
                width: '1500px',
                height: '850px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              {serviceNodes.map((node, index) => (
                <motion.div
                  key={node.id}
                  className="pointer-events-auto"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    scale: 1,
                    transition: { 
                      duration: 0.6, 
                      delay: index * 0.1,
                      ease: "easeOut"
                    }
                  } : {}}
                >
                  <NodeCard
                    node={node}
                    isHighlighted={hoveredNode === node.id || selectedNode === node.id || highlightedConnections.has(node.id)}
                    onHover={setHoveredNode}
                    highlightedConnections={highlightedConnections}
                    onClick={setDetailViewNode}
                    isDetailView={detailViewNode === node.id}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Zoom Level Indicator */}
          <div className="absolute top-16 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-white/70">
            ズーム: {Math.round(zoom * 100)}%
          </div>
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6"
        >
          {Object.entries(categoryColors).map(([category, gradient]) => (
            <div key={category} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded bg-gradient-to-br ${gradient} border border-white/20`} />
              <span className="text-sm text-gray-400 capitalize">{category}</span>
            </div>
          ))}
        </motion.div>
      </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `
      }} />
    </section>
  );
}