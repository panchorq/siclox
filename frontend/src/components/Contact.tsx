import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import PhoneInputBase from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

// Type assertion for PhoneInput
const PhoneInput = PhoneInputBase as unknown as React.ComponentType<any>;

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+56', // Default value for Chile
    message: ''
  });
  
  const [phoneValue, setPhoneValue] = useState('+56'); // Default value for Chile
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      toast.error(t('contact.error'), {
        description: t('contact.required', { field: t('contact.name') })
      });
      return false;
    }
    
    if (!formData.email.trim()) {
      toast.error(t('contact.error'), {
        description: t('contact.required', { field: t('contact.email') })
      });
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error(t('contact.error'), {
        description: t('contact.invalidEmail')
      });
      return false;
    }
    
    if (!formData.phone || formData.phone === '+56') {
      toast.error(t('contact.error'), {
        description: t('contact.required', { field: t('contact.phone') })
      });
      return false;
    }
    
    if (!formData.message.trim()) {
      toast.error(t('contact.error'), {
        description: t('contact.required', { field: t('contact.message') })
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
        setIsSubmitted(true);
        toast.success(t('contact.success'), {
          description: t('contact.successDescription'),
          duration: 5000,
        });
        setFormData({ name: '', email: '', phone: '+56', message: '' });
        setPhoneValue('+56');
      } else {
        throw new Error(data.error || 'Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(t('contact.error'), {
        description: error instanceof Error ? error.message : t('contact.errorDescription')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('contact.title')}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t('contact.subtitle')}
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6 [&_.PhoneInputInput]:w-full [&_.PhoneInputInput]:px-4 [&_.PhoneInputInput]:py-3 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:border-b [&_.PhoneInputInput]:border-border [&_.PhoneInputInput]:focus:border-foreground [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:transition-colors [&_.PhoneInputInput]:placeholder:text-muted-foreground [&_.PhoneInputInput]:text-foreground [&_.PhoneInputCountry]:mr-2">
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              {t('contact.name')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder={t('contact.name')}
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              {t('contact.email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder={t('contact.email')}
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
              {t('contact.phone')}
            </label>
            <PhoneInput
              international
              defaultCountry="CL"
              value={phoneValue}
              onChange={handlePhoneChange}
              placeholder={t('contact.phone')}
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
              inputClassName="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              countrySelectProps={{
                className: '!bg-transparent !text-foreground !border-border',
              }}
              countryOptionsOrder={['CL', '|', '...']}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
              {t('contact.message')}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder={t('contact.message')}
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('contact.sending') : t('contact.send')}
          </button>
        </form>

        <div className="text-center mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">contacto@siclox.com</p>
          <p className="text-sm text-muted-foreground">+56 9 5090 3000</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;