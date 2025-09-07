import { motion } from "framer-motion";
import ScrollReveal, { RevealOnScroll, SlideInLeft } from "@/components/animations/scroll-reveal";
import { AnimatedUnderline } from "@/components/animations/svg-path-animation";
import ProjectTimelineChart from "@/components/charts/project-timeline-chart";
import { BarChart3, TrendingUp, Users, Clock } from "lucide-react";

const insightCards = [
  {
    icon: BarChart3,
    title: "プロジェクト完了率",
    value: "98%",
    description: "すべてのプロジェクトが期限内に完了",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: TrendingUp,
    title: "クライアント満足度",
    value: "4.9/5",
    description: "継続率95%の高い信頼関係",
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    icon: Users,
    title: "チーム効率性",
    value: "3x",
    description: "業界平均の3倍の開発速度",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: Clock,
    title: "平均納期短縮",
    value: "40%",
    description: "効率的な開発プロセスによる時間削減",
    color: "from-orange-500/20 to-red-500/20"
  }
];

function InsightCard({ insight, index }: { insight: typeof insightCards[0], index: number }) {
  return (
    <ScrollReveal direction="up" delay={index * 150} className="h-full">
      <motion.div
        className="insight-card bg-secondary/40 backdrop-blur-sm border border-border rounded-xl p-6 h-full group cursor-pointer relative overflow-hidden"
        data-testid={`insight-card-${index}`}
        whileHover={{
          scale: 1.02,
          y: -5,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Background gradient */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${insight.color} opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300`}
        />
        
        <div className="relative z-10">
          <motion.div
            className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <insight.icon className="w-6 h-6 text-primary" />
          </motion.div>
          
          <motion.h3 
            className="text-lg font-semibold mb-2 text-foreground"
            data-testid={`insight-title-${index}`}
          >
            {insight.title}
          </motion.h3>
          
          <motion.div 
            className="text-3xl font-bold mb-2 gradient-text"
            data-testid={`insight-value-${index}`}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: index * 150 / 1000 + 0.3 }}
            viewport={{ once: true }}
          >
            {insight.value}
          </motion.div>
          
          <motion.p 
            className="text-sm text-muted-foreground leading-relaxed"
            data-testid={`insight-description-${index}`}
          >
            {insight.description}
          </motion.p>
        </div>
        
        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </ScrollReveal>
  );
}

export default function ProjectInsights() {
  return (
    <section id="insights" className="py-24 bg-gradient-to-br from-background via-secondary/10 to-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <RevealOnScroll className="text-center mb-16" data-testid="insights-header">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text relative">
            プロジェクト実績とインサイト
            <AnimatedUnderline className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32" delay={600} />
          </h2>
          <SlideInLeft delay={300}>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              データドリブンなアプローチで、継続的な改善と高品質なサービス提供を実現しています
            </p>
          </SlideInLeft>
        </RevealOnScroll>

        {/* Insight Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {insightCards.map((insight, index) => (
            <InsightCard key={insight.title} insight={insight} index={index} />
          ))}
        </div>

        {/* D3.js Chart Section */}
        <RevealOnScroll className="bg-secondary/20 backdrop-blur-sm rounded-2xl p-8 border border-border">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-3 gradient-text">
              プロジェクトタイムライン
            </h3>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              現在進行中のプロジェクトと完了したプロジェクトの進捗状況をリアルタイムで可視化
            </p>
          </div>
          
          <div className="flex justify-center">
            <ProjectTimelineChart />
          </div>
          
          <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold gradient-text">85%</div>
              <div className="text-xs text-muted-foreground">平均進捗率</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold gradient-text">5</div>
              <div className="text-xs text-muted-foreground">並行プロジェクト数</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold gradient-text">3.2ヶ月</div>
              <div className="text-xs text-muted-foreground">平均開発期間</div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Technology Stack Visualization - Infinite Scrolling Marquee */}
        <RevealOnScroll className="mt-16 text-center" delay={800}>
          <h3 className="text-2xl font-bold mb-12 gradient-text relative">
            対応技術スタック
            <AnimatedUnderline className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32" delay={1000} />
          </h3>
          
          <div className="space-y-6 overflow-hidden">
            {/* Row 1 - Left scroll */}
            <div className="marquee-container">
              <div className="marquee marquee-left">
                {["React", "TypeScript", "Node.js", "Vue.js", "Angular", "Next.js", "Nuxt.js", "Svelte", "Solid.js"].concat(["React", "TypeScript", "Node.js", "Vue.js", "Angular", "Next.js", "Nuxt.js", "Svelte", "Solid.js"]).map((tech, index) => (
                  <div
                    key={`row1-${index}`}
                    className="tech-tag bg-secondary/30 backdrop-blur-sm border border-border rounded-lg px-6 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 whitespace-nowrap mx-3"
                    data-testid={`tech-row1-${index}`}
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Row 2 - Right scroll */}
            <div className="marquee-container">
              <div className="marquee marquee-right">
                {["PostgreSQL", "AWS", "Docker", "MongoDB", "Redis", "MySQL", "Firebase", "Supabase", "PlanetScale"].concat(["PostgreSQL", "AWS", "Docker", "MongoDB", "Redis", "MySQL", "Firebase", "Supabase", "PlanetScale"]).map((tech, index) => (
                  <div
                    key={`row2-${index}`}
                    className="tech-tag bg-secondary/30 backdrop-blur-sm border border-border rounded-lg px-6 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 whitespace-nowrap mx-3"
                    data-testid={`tech-row2-${index}`}
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Row 3 - Left scroll */}
            <div className="marquee-container">
              <div className="marquee marquee-left">
                {["Python", "FastAPI", "Django", "Flask", "GraphQL", "REST API", "tRPC", "Prisma", "Drizzle"].concat(["Python", "FastAPI", "Django", "Flask", "GraphQL", "REST API", "tRPC", "Prisma", "Drizzle"]).map((tech, index) => (
                  <div
                    key={`row3-${index}`}
                    className="tech-tag bg-secondary/30 backdrop-blur-sm border border-border rounded-lg px-6 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 whitespace-nowrap mx-3"
                    data-testid={`tech-row3-${index}`}
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Row 4 - Right scroll */}
            <div className="marquee-container">
              <div className="marquee marquee-right">
                {["Kubernetes", "Git", "GitHub Actions", "Vercel", "Cloudflare", "Netlify", "Railway", "Heroku", "DigitalOcean"].concat(["Kubernetes", "Git", "GitHub Actions", "Vercel", "Cloudflare", "Netlify", "Railway", "Heroku", "DigitalOcean"]).map((tech, index) => (
                  <div
                    key={`row4-${index}`}
                    className="tech-tag bg-secondary/30 backdrop-blur-sm border border-border rounded-lg px-6 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 whitespace-nowrap mx-3"
                    data-testid={`tech-row4-${index}`}
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}