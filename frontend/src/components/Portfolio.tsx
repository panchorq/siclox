const Portfolio = () => {
  const projects = [
    {
      title: 'E-commerce Moderno',
      description: 'Plataforma de comercio electrónico responsiva.',
      category: 'Desarrollo Web'
    },
    {
      title: 'Sistema CRM',
      description: 'Gestión de relaciones con clientes automatizada.',
      category: 'Automatización'
    },
    {
      title: 'Campaña Digital',
      description: 'Estrategia integral de marketing digital.',
      category: 'Marketing Digital'
    },
    {
      title: 'Bots Automatizados',
      description: 'Automatiza tu atención 24/7.',
      category: 'Automatización'
    }
  ];

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-light mb-6 text-foreground">
            Portfolio
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <div key={index} className="card-minimal">
              <div className="mb-3">
                <span className="text-xs text-muted-foreground font-medium">
                  {project.category}
                </span>
              </div>
              <h3 className="text-lg font-medium mb-3 text-foreground">{project.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;