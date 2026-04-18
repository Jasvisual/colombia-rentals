'use client';

import { Property } from '@/types';

interface FloatingWhatsAppProps {
  property: Property;
  checkIn?: string;
  checkOut?: string;
}

export default function FloatingWhatsApp({ property, checkIn, checkOut }: FloatingWhatsAppProps) {
  const phoneNumber = '+573001234567';
  
  let message = `Hola, estoy interesado en ${property.title}.`;
  if (checkIn && checkOut) {
    message += ` ¿Está disponible del ${checkIn} al ${checkOut}?`;
  }
  
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BD5A] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
      aria-label="Contactar por WhatsApp"
    >
      <img
          src="/whatsapp-icon.png"
          alt="WhatsApp"
          className="w-8 h-8"
        />
    </a>
  );
}