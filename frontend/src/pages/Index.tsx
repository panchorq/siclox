import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Update meta tags for SEO
    document.title = 'siclox - Soluciones Tecnológicas a tu Medida | Desarrollo Web, IT y Marketing Digital';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Empresa líder en servicios informáticos, desarrollo web, marketing digital y automatización con bots n8n. Transformamos tu negocio con tecnología de vanguardia.');
    }

    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "siclox",
      "description": "Empresa de servicios tecnológicos especializados en desarrollo web, IT, marketing digital y automatización",
      "url": window.location.origin,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+34-900-123-456",
        "contactType": "customer service",
        "email": "contacto@siclox.com"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Madrid",
        "addressCountry": "ES"
      },
      "sameAs": [
        "https://linkedin.com/company/siclox",
        "https://github.com/siclox"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Portfolio />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
