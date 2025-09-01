import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import PhoneInputBase from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

// Type assertion for PhoneInput
const PhoneInput = PhoneInputBase as unknown as React.ComponentType<any>;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+56', // Valor por defecto para Chile
    message: ''
  });
  
  const [phoneValue, setPhoneValue] = useState('+56'); // Valor por defecto para Chile
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handlePhoneChange = (value: string = '') => {
    setPhoneValue(value);
    setFormData({
      ...formData,
      phone: value
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
          <form onSubmit={handleSubmit} className="space-y-6 [&_.PhoneInputInput]:w-full [&_.PhoneInputInput]:px-4 [&_.PhoneInputInput]:py-3 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:border-b [&_.PhoneInputInput]:border-border [&_.PhoneInputInput]:focus:border-foreground [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:transition-colors [&_.PhoneInputInput]:placeholder:text-muted-foreground [&_.PhoneInputInput]:text-foreground [&_.PhoneInputCountry]:mr-2">
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

            <div className="w-full">
              <PhoneInput
                international
                defaultCountry="CL"
                value={phoneValue}
                onChange={handlePhoneChange}
                placeholder="Ingresa tu teléfono"
                className="w-full"
                style={{
                  '--PhoneInputCountrySelectArrow-color': 'hsl(var(--muted-foreground))',
                  '--PhoneInput-color': 'hsl(var(--foreground))',
                  '--PhoneInputCountryFlag-borderColor': 'hsl(var(--border))',
                  '--PhoneInputCountrySelectArrow-opacity': '0.8',
                  '--PhoneInputInput-color': 'hsl(var(--foreground))',
                  '--PhoneInputInput-placeholder-color': 'hsl(var(--muted-foreground))',
                  '--PhoneInputInput-background': 'transparent',
                  '--PhoneInputInput-border': 'none',
                }}
                inputClassName="w-full px-4 py-3 bg-transparent border-b border-border focus:border-foreground outline-none transition-colors placeholder:text-muted-foreground text-foreground"
                countrySelectProps={{
                  className: '!bg-transparent !text-foreground !border-border',
                }}
                countryOptionsOrder={['CL', '|', '...']}
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