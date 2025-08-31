import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
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
              Servicios
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="text-muted-foreground hover:text-foreground underline-minimal transition-colors"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-muted-foreground hover:text-foreground underline-minimal transition-colors"
            >
              Contacto
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="btn-minimal"
            >
              Contáctanos
            </button>
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
              Servicios
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors"
            >
              Contacto
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="btn-minimal w-full mt-4"
            >
              Contáctanos
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;