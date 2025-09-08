import { motion } from "framer-motion";
import { Award, Shield, Star, Zap } from "lucide-react";

const badges = [
  {
    icon: Award,
    title: "Excellence Award",
    subtitle: "2024年度優秀開発チーム",
    color: "text-yellow-400"
  },
  {
    icon: Shield,
    title: "Security Certified",
    subtitle: "セキュリティ認定取得済み",
    color: "text-blue-400"
  },
  {
    icon: Star,
    title: "5-Star Rating",
    subtitle: "クライアント満足度98%",
    color: "text-purple-400"
  },
  {
    icon: Zap,
    title: "Innovation Partner",
    subtitle: "技術革新パートナー認定",
    color: "text-green-400"
  }
];

export default function TrustBadges() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 3.4 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8"
    >
      {badges.map((badge, index) => (
        <motion.div
          key={badge.title}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.6, 
            delay: 3.6 + index * 0.1,
            type: "spring",
            stiffness: 100
          }}
          className="glass-card p-4 text-center group hover:bg-white/5 transition-all duration-300"
        >
          <motion.div
            className={`${badge.color} mb-2 mx-auto w-fit`}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <badge.icon size={24} />
          </motion.div>
          <h4 className="text-xs font-semibold text-white/90 mb-1">
            {badge.title}
          </h4>
          <p className="text-xs text-white/60 leading-tight">
            {badge.subtitle}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}