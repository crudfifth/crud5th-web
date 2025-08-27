import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50" data-testid="navigation">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="text-2xl font-bold gradient-text cursor-pointer" 
            onClick={() => scrollToSection('home')}
            data-testid="logo-crud5th"
          >
            CRUD5th
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="hover:text-primary transition-colors"
              data-testid="nav-link-home"
            >
              ホーム
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="hover:text-primary transition-colors"
              data-testid="nav-link-services"
            >
              サービス
            </button>
            <button 
              onClick={() => scrollToSection('team')} 
              className="hover:text-primary transition-colors"
              data-testid="nav-link-team"
            >
              チーム
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="hover:text-primary transition-colors"
              data-testid="nav-link-contact"
            >
              お問い合わせ
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary"
              data-testid="mobile-menu-toggle"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/50" data-testid="mobile-menu">
            <div className="flex flex-col space-y-4 pt-4">
              <button 
                onClick={() => scrollToSection('home')} 
                className="text-left hover:text-primary transition-colors"
                data-testid="mobile-nav-link-home"
              >
                ホーム
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-left hover:text-primary transition-colors"
                data-testid="mobile-nav-link-services"
              >
                サービス
              </button>
              <button 
                onClick={() => scrollToSection('team')} 
                className="text-left hover:text-primary transition-colors"
                data-testid="mobile-nav-link-team"
              >
                チーム
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-left hover:text-primary transition-colors"
                data-testid="mobile-nav-link-contact"
              >
                お問い合わせ
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
