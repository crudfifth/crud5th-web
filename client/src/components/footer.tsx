export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-secondary/30 border-t border-border py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-2xl font-bold gradient-text mb-2" data-testid="footer-logo">CRUD5th</div>
            <div className="text-muted-foreground">エンジニアチーム</div>
          </div>
          <div className="flex space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="footer-link-home"
            >
              ホーム
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="footer-link-services"
            >
              サービス
            </button>
            <button 
              onClick={() => scrollToSection('team')} 
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="footer-link-team"
            >
              チーム
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="footer-link-contact"
            >
              お問い合わせ
            </button>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          © 2024 CRUD5th. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
