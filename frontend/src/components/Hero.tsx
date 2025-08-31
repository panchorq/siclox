const Hero = () => {
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
            Soluciones Tecnológicas
            <br />
            <span className="font-normal">a tu Medida</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
            Servicios de informática, desarrollo web, marketing digital y automatización 
            para potenciar tu negocio.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={scrollToContact}
              className="btn-minimal"
            >
              Contactar
            </button>
            <button 
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-muted-foreground hover:text-foreground underline-minimal transition-colors"
            >
              Ver Servicios
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;