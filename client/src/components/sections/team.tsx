import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Twitter, Github } from "lucide-react";

const teamMembers = [
  {
    name: "髙橋綱弥",
    role: "Lead Engineer",
    description: "フルスタック開発とプロジェクトマネジメントを得意とし、チーム全体の技術戦略を牽引。",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    social: {
      twitter: "#",
      github: "#"
    }
  },
  {
    name: "かえる",
    role: "Creative Engineer",
    description: "UI/UX デザインとフロントエンド開発のスペシャリスト。ユーザー体験の向上に情熱を注ぐ。",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    social: {
      twitter: "#",
      github: "#"
    }
  },
  {
    name: "mir",
    role: "Backend Engineer",
    description: "サーバーサイド開発とインフラ構築のエキスパート。スケーラブルなシステム設計を得意とする。",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
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
              <img 
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-primary/30 object-cover"
                data-testid={`team-image-${index}`}
              />
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
                  href={member.social.twitter}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid={`team-twitter-${index}`}
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href={member.social.github}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid={`team-github-${index}`}
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
