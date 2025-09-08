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
    position: { x: 600, y: 100 },
    icon: <Globe className="w-5 h-5" />,
    connections: ["raft-core", "etheria", "cloud-nas"]
  },

  {
    id: "cloud-nas",
    title: "クラウドNAS",
    category: "infrastructure",
    description: "全社共通データストレージ基盤",
    technologies: ["Node.js", "AWS S3"],
    status: "active",
    position: { x: 300, y: 120 },
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
    position: { x: 900, y: 130 },
    icon: <Database className="w-5 h-5" />,
    connections: ["cloud-nas", "crud5th-web"]
  },

  // Management Layer (Upper Middle)
  {
    id: "crud5th-act",
    title: "CRUD5th act",
    category: "management", 
    description: "稼働管理システム",
    technologies: ["React", "Express", "PostgreSQL"],
    status: "active",
    position: { x: 750, y: 280 },
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
    position: { x: 1050, y: 300 },
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
    position: { x: 950, y: 450 },
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
    position: { x: 650, y: 500 },
    icon: <Server className="w-5 h-5" />,
    connections: ["crud5th-act", "personal-business", "raft-core"]
  },

  // Creative Layer (Left Side)
  {
    id: "etheria",
    title: "Etheria",
    category: "creative",
    description: "クリエイターオールインワンシステム", 
    technologies: ["Vue.js", "WebGL"],
    status: "active",
    position: { x: 150, y: 300 },
    icon: <Brain className="w-5 h-5" />,
    connections: ["design-system", "video-edit", "donation-system"]
  },

  {
    id: "design-system",
    title: "デザイン作成",
    category: "creative",
    description: "デザインツール統合プラットフォーム",
    technologies: ["Canvas API", "WebGL"],
    status: "active",
    position: { x: 50, y: 180 },
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
    position: { x: 80, y: 400 },
    icon: <VideoIcon className="w-5 h-5" />,
    connections: ["etheria", "cloud-nas", "design-system"]
  },

  // Business & Communication Layer (Middle-Right)
  {
    id: "raft-core",
    title: "Raft Core",
    category: "business",
    description: "SES営業推進・案件マッチング支援",
    technologies: ["React", "AI/ML"],
    status: "active",
    position: { x: 500, y: 280 },
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
    position: { x: 350, y: 380 },
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
    position: { x: 300, y: 520 },
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
    position: { x: 150, y: 550 },
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
}

function NodeCard({ node, isHighlighted, onHover, highlightedConnections }: NodeCardProps) {
  return (
    <motion.div
      className={`absolute w-56 h-28 cursor-pointer group ${isHighlighted ? 'z-30' : 'z-10'}`}
      style={{
        left: node.position.x,
        top: node.position.y,
        transform: 'translate(-50%, -50%)'
      }}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
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
      <div className={`relative h-full bg-gradient-to-br ${categoryColors[node.category]} backdrop-blur-md border border-white/20 rounded-2xl p-4 overflow-hidden`}>
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"
          animate={{ opacity: isHighlighted ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Status Indicator */}
        <div className="absolute top-3 right-3">
          <div className={`w-3 h-3 rounded-full ${
            node.status === "active" ? "bg-green-400 animate-pulse" :
            node.status === "development" ? "bg-yellow-400 animate-pulse" :
            "bg-purple-400 animate-pulse"
          }`} />
        </div>

        {/* Icon & Title */}
        <div className="flex items-start gap-3 mb-2">
          <div className="p-2 bg-white/15 rounded-lg border border-white/20">
            {node.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white truncate">{node.title}</h3>
            <p className="text-xs text-white/70 capitalize">{node.category}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-white/80 leading-relaxed mb-3 line-clamp-2">
          {node.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1">
          {node.technologies.slice(0, 3).map((tech, index) => (
            <span key={index} className="text-xs px-2 py-1 bg-white/15 rounded-full text-white/90 border border-white/20">
              {tech}
            </span>
          ))}
          {node.technologies.length > 3 && (
            <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/60">
              +{node.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Connection Points */}
        {node.connections.map((connectionId, index) => {
          const angle = (index / node.connections.length) * 360;
          const x = Math.cos((angle - 90) * Math.PI / 180) * 45;
          const y = Math.sin((angle - 90) * Math.PI / 180) * 30;
          
          return (
            <div
              key={connectionId}
              className={`absolute w-2 h-2 rounded-full border-2 border-white/40 transition-colors duration-300 ${
                highlightedConnections.has(connectionId) ? 'bg-cyan-400' : 'bg-white/20'
              }`}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)'
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
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });

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
      className="py-24 bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900 relative overflow-hidden"
    >
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
            Service Ecosystem
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4">
            CRUD5thの技術サービス群とその相互関係
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <MousePointer className="w-4 h-4" />
              ノードにホバーして関係性を表示
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              データフローをリアルタイム可視化
            </div>
          </div>
        </motion.div>

        {/* Service Network Visualization */}
        <div 
          ref={containerRef}
          className="relative w-full h-[700px] mx-auto bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl border border-white/10 overflow-hidden"
          style={{ perspective: '1000px' }}
        >
          {/* SVG Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
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

          {/* Service Nodes */}
          {serviceNodes.map((node, index) => (
            <motion.div
              key={node.id}
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
              />
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {Object.entries(categoryColors).map(([category, gradient]) => (
            <div key={category} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded bg-gradient-to-br ${gradient} border border-white/20`} />
              <span className="text-sm text-gray-400 capitalize">{category}</span>
            </div>
          ))}
        </motion.div>
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