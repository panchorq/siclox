import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${
      isScrolled ? 'bg-background/95 border-b border-border' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-xl font-medium text-foreground">
              siclox
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('services')}
              className="text-muted-foreground hover:text-foreground underline-minimal transition-colors"
            >
              {t('nav.services')}
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="text-muted-foreground hover:text-foreground underline-minimal transition-colors"
            >
              {t('nav.portfolio')}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-muted-foreground hover:text-foreground underline-minimal transition-colors"
            >
              {t('nav.contact')}
            </button>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => scrollToSection('contact')}
                className="btn-minimal"
              >
                {t('nav.contactUs')}
              </button>
              <LanguageSelector />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all overflow-hidden ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="py-4 space-y-4 border-t border-border mt-4">
            <button 
              onClick={() => scrollToSection('services')}
              className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('nav.services')}
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('nav.portfolio')}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('nav.contact')}
            </button>
            <div className="space-y-4 mt-4">
              <button 
                onClick={() => scrollToSection('contact')}
                className="btn-minimal w-full"
              >
                {t('nav.contactUs')}
              </button>
              <div className="w-full flex justify-center">
                <LanguageSelector />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;