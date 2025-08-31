import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "El nombre es requerido",
        variant: "destructive"
      });
      return false;
    }
    
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast({
        title: "Error",
        description: "El email debe ser válido",
        variant: "destructive"
      });
      return false;
    }
    
    if (!formData.message.trim()) {
      toast({
        title: "Error",
        description: "El mensaje es requerido",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "¡Mensaje enviado!",
          description: "Nos pondremos en contacto contigo pronto.",
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error(data.error || 'Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-light mb-6 text-foreground">
            Contacto
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            ¿Listo para llevar tu negocio al siguiente nivel?
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-transparent border-b border-border focus:border-foreground outline-none transition-colors placeholder:text-muted-foreground"
                placeholder="Nombre"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-transparent border-b border-border focus:border-foreground outline-none transition-colors placeholder:text-muted-foreground"
                placeholder="Email"
              />
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-transparent border-b border-border focus:border-foreground outline-none transition-colors placeholder:text-muted-foreground"
                placeholder="Teléfono (opcional)"
              />
            </div>

            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-transparent border-b border-border focus:border-foreground outline-none transition-colors resize-none placeholder:text-muted-foreground"
                placeholder="Mensaje"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-minimal w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>

          <div className="text-center mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">contacto@siclox.com</p>
            <p className="text-sm text-muted-foreground">+56 9 5090 3000</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;