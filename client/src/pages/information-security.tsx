import { motion } from "framer-motion";
import { Shield, Lock, Users, Eye, AlertTriangle, Zap } from "lucide-react";
import ScrollReveal, { RevealOnScroll, SlideInLeft } from "@/components/animations/scroll-reveal";
import { AnimatedUnderline } from "@/components/animations/svg-path-animation";

export default function InformationSecurity() {
  const principles = [
    {
      icon: Shield,
      title: "リスク評価と対応",
      description: "情報セキュリティマネジメントシステムの確立と継続的な改善を実現するため、定められた手順を用いて情報資産リスクを明らかにし、適切なリスク対応を実施します。"
    },
    {
      icon: Lock,
      title: "情報資産管理",
      description: "情報セキュリティに対する役割及び責任を明確に定め、お客様から委託された情報資産を適切に管理します。"
    },
    {
      icon: Users,
      title: "教育・啓蒙活動",
      description: "情報セキュリティを維持する責任を自覚させるために、全てのメンバー及び関係者に対し、継続的な教育・啓蒙活動を行います。"
    },
    {
      icon: Eye,
      title: "監視・改善",
      description: "情報セキュリティマネジメントシステムの実施状況を監視・記録し、定期的な内部監査・マネジメントレビューによって継続的な改善を図ります。"
    },
    {
      icon: AlertTriangle,
      title: "インシデント対応",
      description: "万一、情報セキュリティ上の問題が発生した場合、直ちに原因を究明し被害を最小限にとどめると共に、事業継続性を確保するよう努力します。"
    },
    {
      icon: Zap,
      title: "法令遵守",
      description: "情報資産及びその取扱について、法令やその他の社会規範、お客様との契約を遵守します。"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-secondary/20 via-background to-background relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <RevealOnScroll>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 gradient-text relative"
              data-testid="page-title"
            >
              情報セキュリティ基本方針
              <AnimatedUnderline className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32" delay={600} />
            </motion.h1>
            <SlideInLeft delay={300}>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                CRUD5thは、お客様から信頼いただいた情報資産を適切に保護し、
                情報セキュリティマネジメントシステムの確立・運用によって、
                業務上取り扱う各種情報の機密性・完全性・可用性を守ります。
              </p>
            </SlideInLeft>
          </RevealOnScroll>
        </div>
      </section>

      {/* Basic Policy */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <RevealOnScroll className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center gradient-text relative">
              基本方針
              <AnimatedUnderline className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20" delay={400} />
            </h2>
          </RevealOnScroll>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-secondary/80 to-muted/40 backdrop-blur-sm border border-border rounded-xl p-8"
          >
            <p className="text-foreground leading-relaxed text-base">
              CRUD5th（以下、「当社」という）は、システム開発・受託開発・DX・ITコンサルティングサービスを営む企業として、
              情報セキュリティマネジメントシステムの確立・運用によって、業務上取り扱う各種情報資産の機密性と完全性、
              可用性を守り、情報漏洩及び改ざん等のセキュリティ事故の発生を防止することを目指します。
              その目的のために、下記の情報セキュリティの行動指針を定めるものとします。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Action Guidelines */}
      <section className="py-16 bg-gradient-to-br from-background to-secondary/10">
        <div className="max-w-6xl mx-auto px-6">
          <RevealOnScroll className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center gradient-text relative">
              行動指針
              <AnimatedUnderline className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20" delay={400} />
            </h2>
          </RevealOnScroll>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-gradient-to-br from-secondary/80 to-muted/40 backdrop-blur-sm border border-border rounded-xl p-6 group cursor-pointer h-full"
                data-testid={`principle-${index}`}
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110"
                  transition={{ duration: 0.3 }}
                >
                  <principle.icon className="w-8 h-8 text-primary" />
                </motion.div>
                
                <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {principle.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {principle.description}
                </p>
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Information */}
      <section className="py-16 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-secondary/80 to-muted/40 backdrop-blur-sm border border-border rounded-xl p-8"
          >
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                制定日：{new Date().getFullYear()}年{new Date().getMonth() + 1}月{new Date().getDate()}日
              </div>
              
              <div className="border-t border-border pt-4">
                <div className="text-lg font-semibold text-primary mb-2">CRUD5th</div>
                <div className="text-sm text-muted-foreground">
                  代表：髙橋 綱弥
                </div>
              </div>
              
              <div className="border-t border-border pt-4">
                <div className="text-sm font-medium text-foreground mb-2">
                  【情報セキュリティに関するお問い合わせ窓口】
                </div>
                <div className="text-sm text-muted-foreground">
                  CRUD5th<br />
                  情報セキュリティ管理者<br />
                  e-mail：security@crud5th.com
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}