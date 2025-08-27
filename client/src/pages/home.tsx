import { useEffect } from "react";
import Navigation from "@/components/ui/navigation";
import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import Team from "@/components/sections/team";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import LoadingScreen from "@/components/animations/loading-screen";
import Counter from "@/components/ui/counter-animation";

export default function Home() {
  useEffect(() => {
    document.title = "CRUD5th - エンジニアチーム | 受託開発・自社サービス開発・DX/ITコンサル";
    
    // Add meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'CRUD5thは受託開発、自社サービス開発、DX・ITコンサルティングを提供するエンジニアチームです。革新的なソリューションでビジネスの成長をサポートします。');

    // Add Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'CRUD5th - エンジニアチーム' },
      { property: 'og:description', content: 'CRUD5thは受託開発、自社サービス開発、DX・ITコンサルティングを提供するエンジニアチームです。' },
      { property: 'og:type', content: 'website' },
    ];

    ogTags.forEach(tag => {
      let existing = document.querySelector(`meta[property="${tag.property}"]`);
      if (!existing) {
        existing = document.createElement('meta');
        existing.setAttribute('property', tag.property);
        document.head.appendChild(existing);
      }
      existing.setAttribute('content', tag.content);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <LoadingScreen />
      <Navigation />
      <main>
        <Hero />
        <Services />
        
        {/* Statistics Section */}
        <section className="py-20 bg-gradient-to-r from-secondary/30 to-muted/20" data-testid="statistics-section">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="motion-preset-slide-up">
                <div className="text-5xl font-bold gradient-text mb-2" data-testid="stat-projects">
                  <Counter target={50} />
                </div>
                <div className="text-muted-foreground">プロジェクト完了</div>
              </div>
              <div className="motion-preset-slide-up motion-delay-100">
                <div className="text-5xl font-bold gradient-text mb-2" data-testid="stat-members">
                  <Counter target={3} />
                </div>
                <div className="text-muted-foreground">チームメンバー</div>
              </div>
              <div className="motion-preset-slide-up motion-delay-200">
                <div className="text-5xl font-bold gradient-text mb-2" data-testid="stat-satisfaction">
                  <Counter target={98} suffix="%" />
                </div>
                <div className="text-muted-foreground">クライアント満足度</div>
              </div>
              <div className="motion-preset-slide-up motion-delay-300">
                <div className="text-5xl font-bold gradient-text mb-2" data-testid="stat-support">
                  <Counter target={24} />
                </div>
                <div className="text-muted-foreground">サポート時間/日</div>
              </div>
            </div>
          </div>
        </section>

        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
