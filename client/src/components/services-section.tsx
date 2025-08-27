import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const services = [
  {
    id: "freelance-development",
    title: "受託開発",
    icon: "💻",
    description: "フリーランス同士の連携により、高品質なWebアプリケーション・システム開発をスピーディーに提供します。",
    features: [
      "フロントエンド開発",
      "バックエンド開発", 
      "データベース設計",
      "API開発・統合"
    ],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "web-service-development", 
    title: "自社サービス開発",
    icon: "🚀",
    description: "市場のニーズを捉えた革新的なWebサービスの企画・開発・運用まで一貫してサポートします。",
    features: [
      "サービス企画・設計",
      "MVP開発",
      "スケーリング支援", 
      "マーケティング連携"
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
  },
  {
    id: "dx-it-consulting",
    title: "DX・ITコンサル", 
    icon: "📊",
    description: "企業のデジタル変革をテクノロジーの視点から戦略的にサポートし、業務効率化を実現します。",
    features: [
      "DX戦略立案",
      "システム選定・導入",
      "業務プロセス改善",
      "技術教育・研修"
    ],
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
  }
];

export default function ServicesSection() {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '-50px'
  });

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-background to-secondary/20" data-testid="services-section" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          data-testid="services-header"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">サービス</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            私たちが提供する技術サービスで、あなたのビジネスを次のレベルへ
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="service-card bg-secondary/50 backdrop-blur-sm border border-border rounded-xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
              initial={{ opacity: 0, y: 60 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.1 
              }}
              data-testid={`service-card-${service.id}`}
            >
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-48 object-cover rounded-lg mb-6" 
                data-testid={`img-${service.id}`}
              />
              <div className="text-primary text-4xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-foreground" data-testid={`text-${service.id}-title`}>
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`text-${service.id}-description`}>
                {service.description}
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} data-testid={`text-${service.id}-feature-${featureIndex}`}>
                    ・{feature}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
