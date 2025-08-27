import { ChevronDown } from "lucide-react";
import ParticlesBackground from "@/components/ui/particles-background";
import TypingAnimation from "@/components/ui/typing-animation";

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="hero-section">
      <ParticlesBackground />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-secondary/30"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight" data-testid="hero-title">
          <span className="block gradient-text neon-text">CRUD5th</span>
          <span className="block text-3xl md:text-5xl font-light text-muted-foreground mt-4">
            エンジニアチーム
          </span>
        </h1>
        
        <div className="text-xl md:text-2xl text-muted-foreground mb-8" data-testid="typing-text">
          <TypingAnimation />
        </div>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed" data-testid="hero-description">
          受託開発・自社サービス開発・DX/ITコンサルティングを通じて、<br className="hidden md:inline" />
          革新的なソリューションをお届けします
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => scrollToSection('services')}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all neon-glow pulse-yellow"
            data-testid="button-view-services"
          >
            サービスを見る
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="border border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
            data-testid="button-contact"
          >
            お問い合わせ
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" data-testid="scroll-indicator">
        <ChevronDown className="w-6 h-6 text-primary" />
      </div>
    </section>
  );
}
