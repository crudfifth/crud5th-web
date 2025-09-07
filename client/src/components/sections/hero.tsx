import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { AnimatedLogo, AnimatedArrow } from "@/components/animations/svg-path-animation";
import ParallaxSection from "@/components/animations/parallax-section";
import TypingAnimation from "@/components/ui/typing-animation";
import videoSrc from "@assets/Blue Modern Technology YouTube Intro_1756887855888.mp4";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

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
      {/* Enhanced Background Video with parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 scale-110"
          data-testid="hero-background-video"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </motion.div>
      
      {/* Enhanced video overlays with depth */}
      <div className="absolute inset-0 bg-black/70 z-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-primary/20 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 0.8, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/3 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
      
      {/* Main content with enhanced animations */}
      <motion.div 
        style={{ opacity }}
        className="relative z-30 text-center max-w-5xl mx-auto px-6"
      >
        {/* Enhanced hero title with staggered animations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <motion.span 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="block text-2xl md:text-4xl font-light text-white/90 mb-4 drop-shadow-2xl tracking-wider"
          >
            THE
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="text-6xl md:text-8xl font-black mb-2 leading-tight"
            data-testid="hero-title"
          >
            <span className="block gradient-text drop-shadow-2xl">EVOLUTION</span>
            <span className="block gradient-text drop-shadow-2xl">PARTNER</span>
          </motion.h1>
          
          <motion.span 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 1.2,
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="block text-xl md:text-3xl font-light text-white/85 mt-6 drop-shadow-2xl tracking-wide"
          >
            革新を共に創造するエンジニア集団
          </motion.span>
        </motion.div>

        {/* Enhanced typing animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 1.8, 
            duration: 1,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-2xl"
          data-testid="hero-typing"
        >
          <TypingAnimation />
        </motion.div>

        {/* Enhanced description with glass morphism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 2.4, 
            duration: 1,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="glass-card mx-auto max-w-3xl p-6 mb-8 backdrop-blur-xl"
        >
          <p className="text-lg md:text-xl text-white/90 leading-relaxed drop-shadow-xl"
             data-testid="hero-description">
            CRUD5thは、最新テクノロジーを駆使してビジネスの課題を解決する
            エンジニアチームです。受託開発から自社サービス開発、
            DX・ITコンサルティングまで、包括的なソリューションを提供します。
          </p>
        </motion.div>

        {/* Enhanced CTA buttons with 3D effects */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 3, 
            duration: 1,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          data-testid="hero-buttons"
        >
          <motion.button
            onClick={scrollToServices}
            className="glass-button px-8 py-4 text-lg font-semibold text-white border-2 border-primary/50 hover:border-primary rounded-lg transition-all duration-300 group relative overflow-hidden min-w-[200px]"
            whileHover={{ 
              scale: 1.05,
              y: -2,
              boxShadow: "0 20px 40px rgba(29, 151, 176, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            data-testid="hero-services-button"
          >
            <span className="relative z-10">サービス詳細</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
          
          <motion.button
            onClick={scrollToContact}
            className="glass-button px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary/80 to-accent/80 rounded-lg group relative overflow-hidden min-w-[200px]"
            whileHover={{ 
              scale: 1.05,
              y: -2,
              boxShadow: "0 20px 40px rgba(29, 151, 176, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            data-testid="hero-contact-button"
          >
            <span className="relative z-10">お問い合わせ</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent/30 to-primary/30"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{ borderRadius: "inherit" }}
            />
          </motion.button>
        </motion.div>

        {/* Enhanced scroll indicator with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 3.5, 
            duration: 1,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="flex flex-col items-center"
        >
          <motion.p 
            className="text-white/70 text-sm mb-4 drop-shadow-lg"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            スクロールして詳細を見る
          </motion.p>
          <motion.button
            onClick={scrollToServices}
            className="p-3 rounded-full glass-button hover:bg-white/10 transition-all duration-300 group"
            whileHover={{ scale: 1.1, y: -2 }}
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              hover: { duration: 0.2 }
            }}
            data-testid="hero-scroll-indicator"
          >
            <ChevronDown className="w-6 h-6 text-white/70 group-hover:text-primary transition-colors drop-shadow-lg" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Bottom fade to create seamless transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  );
}