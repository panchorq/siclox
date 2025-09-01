import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-3xl md:text-5xl font-light mb-6 leading-tight text-foreground">
            {t('hero.title1')}
            <br />
            <span className="font-normal">{t('hero.title2')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={scrollToContact}
              className="btn-minimal"
            >
              {t('hero.contact')}
            </button>
            <button 
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-muted-foreground hover:text-foreground underline-minimal transition-colors"
            >
              {t('hero.viewServices')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;