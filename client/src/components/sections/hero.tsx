import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ParticleBackground from "@/components/animations/particle-background";
import TypingAnimation from "@/components/ui/typing-animation";
import videoSrc from "@assets/Blue Modern Technology YouTube Intro_1756887855888.mp4";

export default function Hero() {
  const scrollToServices = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        data-testid="hero-background-video"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      
      {/* Video Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/40 via-background/60 to-primary/20 z-10" />
      
      {/* Subtle particle effects over video */}
      <div className="absolute inset-0 z-20 opacity-30">
        <ParticleBackground />
      </div>
      
      <div className="relative z-30 text-center max-w-4xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="text-5xl md:text-7xl font-black mb-6 leading-tight"
          data-testid="hero-title"
        >
          <span className="block text-2xl md:text-4xl font-medium text-foreground/80 mb-2 drop-shadow-lg">THE</span>
          <span className="block gradient-text drop-shadow-lg">EVOLUTION</span>
          <span className="block gradient-text drop-shadow-lg">PARTNER</span>
          <span className="block text-2xl md:text-3xl font-light text-foreground/70 mt-6 drop-shadow-lg">
            革新を共に創造するエンジニア集団
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.6, 
            duration: 1,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="text-xl md:text-2xl text-foreground/80 mb-8 drop-shadow-lg"
          data-testid="hero-typing"
        >
          <TypingAnimation />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 1.2, 
            duration: 1,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="text-lg md:text-xl text-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
          data-testid="hero-description"
        >
          テクノロジーの力でビジネスの限界を突破し、<br className="hidden md:inline" />
          あなたの理想を現実に変える戦略的パートナーシップを提供します。<br className="hidden md:inline" />
          <span className="text-foreground font-semibold drop-shadow-lg">共に未来を築きましょう。</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 1.6, 
            duration: 1,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
          data-testid="hero-buttons"
        >
          <motion.button
            onClick={scrollToServices}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-primary-foreground px-10 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
            data-testid="button-services"
          >
            イノベーションを始める
          </motion.button>
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-primary text-primary px-10 py-4 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
            data-testid="button-contact"
          >
            相談する
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        data-testid="scroll-indicator"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="cursor-pointer group"
          onClick={scrollToServices}
          whileHover={{ scale: 1.2 }}
        >
          <ChevronDown className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
        </motion.div>
      </motion.div>
    </section>
  );
}
