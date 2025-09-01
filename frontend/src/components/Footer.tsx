import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center">
          <div className="text-xl font-medium text-foreground mb-8">
            {t('footer.brand')}
          </div>
          
          <nav className="flex justify-center space-x-8 mb-8">
            <button
              onClick={() => scrollToSection('services')}
              className="text-muted-foreground hover:text-foreground underline-minimal transition-colors"
            >
              {t('footer.links.services')}
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="text-muted-foreground hover:text-foreground underline-minimal transition-colors"
            >
              {t('footer.links.portfolio')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-muted-foreground hover:text-foreground underline-minimal transition-colors"
            >
              {t('footer.links.contact')}
            </button>
          </nav>

          <div className="text-sm text-muted-foreground">
            {t('footer.copyright', { year: currentYear })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;