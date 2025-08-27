import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Twitter, Github } from "lucide-react";

const teamMembers = [
  {
    id: "takahashi-tsunaya",
    name: "髙橋綱弥",
    role: "Lead Engineer",
    description: "フルスタック開発とプロジェクトマネジメントを得意とし、チーム全体の技術戦略を牽引。",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
    twitter: "#",
    github: "#"
  },
  {
    id: "kaeru",
    name: "かえる", 
    role: "Creative Engineer",
    description: "UI/UX デザインとフロントエンド開発のスペシャリスト。ユーザー体験の向上に情熱を注ぐ。",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
    twitter: "#",
    github: "#"
  },
  {
    id: "mir",
    name: "mir",
    role: "Backend Engineer", 
    description: "サーバーサイド開発とインフラ構築のエキスパート。スケーラブルなシステム設計を得意とする。",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
    twitter: "#",
    github: "#"
  }
];

export default function TeamSection() {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '-50px'
  });

  return (
    <section id="team" className="py-24 bg-background" data-testid="team-section" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          data-testid="team-header"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">チーム</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            多様なスキルセットを持つエンジニアが集まったプロフェッショナルチーム
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="team-card bg-gradient-to-br from-secondary/80 to-muted/40 backdrop-blur-sm border border-border rounded-xl p-8 text-center hover:scale-105 transition-all duration-400 hover:shadow-2xl hover:shadow-black/50"
              initial={{ opacity: 0, y: 60 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.1 
              }}
              data-testid={`team-card-${member.id}`}
            >
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-primary/30" 
                data-testid={`img-${member.id}`}
              />
              <h3 className="text-2xl font-bold mb-2 text-foreground" data-testid={`text-${member.id}-name`}>
                {member.name}
              </h3>
              <p className="text-primary font-semibold mb-4" data-testid={`text-${member.id}-role`}>
                {member.role}
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`text-${member.id}-description`}>
                {member.description}
              </p>
              <div className="flex justify-center space-x-4">
                <a 
                  href={member.twitter} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid={`link-${member.id}-twitter`}
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href={member.github} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid={`link-${member.id}-github`}
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
