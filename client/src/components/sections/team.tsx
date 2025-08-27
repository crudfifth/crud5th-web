import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Twitter, Github } from "lucide-react";

const teamMembers = [
  {
    name: "髙橋綱弥",
    role: "Lead Engineer",
    description: "フルスタック開発とプロジェクトマネジメントを得意とし、チーム全体の技術戦略を牽引。",
    initials: "高綱",
    social: {
      twitter: "#",
      github: "#"
    }
  },
  {
    name: "かえる",
    role: "Creative Engineer",
    description: "UI/UX デザインとフロントエンド開発のスペシャリスト。ユーザー体験の向上に情熱を注ぐ。",
    initials: "カ",
    social: {
      twitter: "#",
      github: "#"
    }
  },
  {
    name: "mir",
    role: "Backend Engineer",
    description: "サーバーサイド開発とインフラ構築のエキスパート。スケーラブルなシステム設計を得意とする。",
    initials: "M",
    social: {
      twitter: "#",
      github: "#"
    }
  }
];

export default function Team() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="team" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
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
              key={member.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="team-card bg-gradient-to-br from-secondary/80 to-muted/40 backdrop-blur-sm border border-border rounded-xl p-8 text-center"
              data-testid={`team-card-${index}`}
            >
              <div 
                className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-primary/30 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center"
                data-testid={`team-avatar-${index}`}
              >
                <span className="text-3xl font-bold text-primary">{member.initials}</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-foreground" data-testid={`team-name-${index}`}>
                {member.name}
              </h3>
              <p className="text-primary font-semibold mb-4" data-testid={`team-role-${index}`}>
                {member.role}
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`team-description-${index}`}>
                {member.description}
              </p>
              <div className="flex justify-center space-x-4" data-testid={`team-social-${index}`}>
                <a 
                  href="https://x.com/CRUD5th"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid={`team-twitter-${index}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="https://github.com/crudfifth"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid={`team-github-${index}`}
                  target="_blank"
                  rel="noopener noreferrer"
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
