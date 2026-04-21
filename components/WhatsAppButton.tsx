'use client';

import { Property } from '@/types';

interface WhatsAppButtonProps {
  property: Property;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const PHONE_NUMBER = '573174792161';

export default function WhatsAppButton({
  property,
  size = 'md',
  className = '',
}: WhatsAppButtonProps) {
  const message = `Hola, quiero apartar el inmueble ${property.title} en ${property.neighborhood}`;
  const waLink = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  const isDisabled = !property.isAvailable;

  if (isDisabled) {
    return (
      <button
        disabled
        className={`
          inline-flex items-center justify-center gap-2 w-full
          bg-gray-400 text-white font-medium rounded-lg
          cursor-not-allowed ${sizeClasses[size]} ${className}
        `}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.965 21a.5.5 0 0 1-.347-.166l-2.552-1.26a.5.5 0 0 1-.2-.634l.95-3.042a.5.5 0 0 1 .587-.408l2.267.757a.5.5 0 0 1 .343.488l-.5 2.75a.5.5 0 0 1-.346.315l-1.756.15zm.035-1.68l1.44-.123.875 2.512-1.63-.544.315-1.845zM17.5 3a9 9 0 0 0-9 9v.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V12a9 9 0 0 0 7.5-7.5h2a.5.5 0 0 1 .5.5v-.5a.5.5 0 0 0-.5-.5h-5.5a.5.5 0 0 1-.5-.5V4a9 9 0 0 1 9 9h0v-.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V12a9 9 0 0 1-9 9 9 0 0 1-9-9H3a.5.5 0 0 1-.5-.5V12a9 9 0 0 0 9-9 .5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v.5a9 9 0 0 0 4 0V12a9 9 0 0 1-4 0V3h.5z"/>
        </svg>
        No disponible
      </button>
    );
  }

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center justify-center gap-2 
        bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg
        transition-colors duration-200 ${sizeClasses[size]} ${className}
      `}
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      Apartar por WhatsApp
    </a>
  );
}