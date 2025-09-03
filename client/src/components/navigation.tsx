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
    <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-xl border-b border-white/20" data-testid="navigation">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="text-2xl font-bold text-white cursor-pointer drop-shadow-lg" 
            onClick={() => scrollToSection('home')}
            data-testid="logo-crud5th"
            style={{ color: 'rgba(255, 255, 255, 0.95)', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
          >
            CRUD5th
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-white hover:text-white/80 transition-colors font-medium"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
              data-testid="nav-link-home"
            >
              ホーム
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-white hover:text-white/80 transition-colors font-medium"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
              data-testid="nav-link-services"
            >
              サービス
            </button>
            <button 
              onClick={() => scrollToSection('team')} 
              className="text-white hover:text-white/80 transition-colors font-medium"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
              data-testid="nav-link-team"
            >
              チーム
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-white hover:text-white/80 transition-colors font-medium"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
              data-testid="nav-link-contact"
            >
              お問い合わせ
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-white/80 transition-colors"
              style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.8))' }}
              data-testid="mobile-menu-toggle"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/20" data-testid="mobile-menu">
            <div className="flex flex-col space-y-4 pt-4">
              <button 
                onClick={() => scrollToSection('home')} 
                className="text-left text-white hover:text-white/80 transition-colors font-medium"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
                data-testid="mobile-nav-link-home"
              >
                ホーム
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-left text-white hover:text-white/80 transition-colors font-medium"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
                data-testid="mobile-nav-link-services"
              >
                サービス
              </button>
              <button 
                onClick={() => scrollToSection('team')} 
                className="text-left text-white hover:text-white/80 transition-colors font-medium"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
                data-testid="mobile-nav-link-team"
              >
                チーム
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-left text-white hover:text-white/80 transition-colors font-medium"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
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
