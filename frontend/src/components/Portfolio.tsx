import { useTranslation } from 'react-i18next';

interface Project {
  title: string;
  description: string;
  category: string;
}

const Portfolio = () => {
  const { t } = useTranslation();
  
  // Get projects from translations
  const projects = t('portfolio.items', { returnObjects: true }) as Project[];

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-light mb-6 text-foreground">
            {t('portfolio.title')}
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
              <h3 className="text-lg font-medium mb-3 text-foreground">
                {project.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;