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
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-primary/5 to-primary/20 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent z-10" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-accent/15 via-accent/8 to-transparent rounded-full blur-3xl"
          animate={{ 
            scale: [1, 0.7, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-primary/15 to-accent/15 rounded-full blur-2xl"
          animate={{ 
            scale: [0.8, 1.1, 0.8],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="block text-sm md:text-lg font-light text-white/75 mb-6 drop-shadow-2xl tracking-widest uppercase"
          >
            THE
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1, 
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
            data-testid="hero-title"
          >
            <span className="block bg-gradient-to-r from-primary via-white to-primary bg-clip-text text-transparent drop-shadow-2xl mb-2 font-extrabold tracking-tight">EVOLUTION</span>
            <span className="block bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent drop-shadow-2xl font-extrabold tracking-tight">PARTNER</span>
          </motion.h1>
          
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: 1.2,
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="block text-lg md:text-xl font-normal text-white/85 mb-8 drop-shadow-2xl tracking-wide"
          >
            革新を共に創造するエンジニア集団
          </motion.span>
        </motion.div>

        {/* Enhanced typing animation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 1.8, 
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="text-base md:text-lg text-white/80 mb-12 drop-shadow-xl"
          data-testid="hero-typing"
        >
          <TypingAnimation />
        </motion.div>

        {/* Enhanced description with premium glass morphism */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            delay: 2.4, 
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="relative mx-auto max-w-4xl p-8 mb-12 backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 rounded-2xl shadow-2xl shadow-primary/10"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(46,184,207,0.1) 100%)'
          }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-50" />
          <div className="relative z-10">
            <div className="text-base md:text-lg text-white/90 leading-relaxed drop-shadow-lg max-w-3xl mx-auto font-medium"
                 data-testid="hero-description">
              {(() => {
                const text = "CRUD5thは、最新テクノロジーを駆使してビジネス変革を推進するエンジニアチームです。受託開発・自社サービス開発・DX/ITコンサルティングを通じて、お客様の成長と成功に貢献する包括的なソリューションを提供いたします。";
                return text.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.1,
                      delay: 2.8 + (index * 0.03),
                      ease: "easeOut"
                    }}
                    className={char === " " ? "inline-block w-1" : "inline-block"}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ));
              })()}
            </div>
          </div>
        </motion.div>

        {/* Enhanced CTA buttons with refined spacing */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 3, 
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          data-testid="hero-buttons"
        >
          <motion.button
            onClick={scrollToServices}
            className="relative px-8 py-4 text-base font-semibold text-white backdrop-blur-xl bg-gradient-to-r from-black/20 via-primary/10 to-black/20 border border-white/30 hover:border-primary/60 rounded-2xl transition-all duration-500 group overflow-hidden min-w-[200px]"
            style={{
              boxShadow: '0 8px 32px rgba(46, 184, 207, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
            whileHover={{ 
              scale: 1.05,
              y: -2,
              boxShadow: "0 20px 40px rgba(46, 184, 207, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            data-testid="hero-services-button"
          >
            <span className="relative z-10 tracking-wide">サービス詳細</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 rounded-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent rounded-2xl" />
          </motion.button>
          
          <motion.button
            onClick={scrollToContact}
            className="relative px-8 py-4 text-base font-semibold text-white backdrop-blur-xl bg-gradient-to-r from-primary/40 via-primary/60 to-accent/40 border border-primary/50 hover:border-primary rounded-2xl group overflow-hidden min-w-[200px]"
            style={{
              boxShadow: '0 8px 32px rgba(46, 184, 207, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
            }}
            whileHover={{ 
              scale: 1.05,
              y: -2,
              boxShadow: "0 20px 40px rgba(46, 184, 207, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.25)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            data-testid="hero-contact-button"
          >
            <span className="relative z-10 tracking-wide">お問い合わせ</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent/30 to-primary/30 rounded-2xl"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent rounded-2xl" />
          </motion.button>
        </motion.div>

        {/* Refined scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 3.5, 
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="flex flex-col items-center"
        >
          <motion.p 
            className="text-white/60 text-xs mb-3 drop-shadow tracking-wide"
            animate={{ opacity: [0.6, 0.8, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            スクロールして詳細を見る
          </motion.p>
          <motion.button
            onClick={scrollToServices}
            className="p-2 rounded-full glass-button hover:bg-white/5 transition-all duration-300 group"
            whileHover={{ scale: 1.05, y: -1 }}
            animate={{ y: [0, 6, 0] }}
            transition={{ 
              y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
              hover: { duration: 0.2 }
            }}
            data-testid="hero-scroll-indicator"
          >
            <ChevronDown className="w-5 h-5 text-white/60 group-hover:text-primary transition-colors drop-shadow" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Bottom fade to create seamless transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  );
}