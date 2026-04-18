'use client';

import { Property } from '@/types';

interface WhatsAppButtonProps {
  property: Property;
  checkIn?: string;
  checkOut?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export default function WhatsAppButton({
  property,
  checkIn,
  checkOut,
  size = 'md',
  showLabel = true,
  className = '',
}: WhatsAppButtonProps) {
  const phoneNumber = '+573001234567';
  
  let message = `Hola, estoy interesado en ${property.title}.`;
  if (checkIn && checkOut) {
    message += ` ¿Está disponible del ${checkIn} al ${checkOut}?`;
  }
  
  const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center justify-center gap-2 
        bg-[#25D366] hover:bg-[#20BD5A] text-white font-medium rounded-lg
        transition-colors duration-200 ${sizeClasses[size]} ${className}
      `}
    >
      <img
            src="/whatsapp-icon.png"
            alt="WhatsApp"
            className={iconSizes[size]}
        />
      {showLabel && (
        <span>Contactar por WhatsApp</span>
      )}
    </a>
  );
}