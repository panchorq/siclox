import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();
  
  // Get services from translations
  const services = t('services.items', { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-light mb-6 text-foreground">
            {t('services.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="card-minimal">
              <h3 className="text-lg font-medium mb-3 text-foreground">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;