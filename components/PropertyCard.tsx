'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/types';
import WhatsAppButton from './WhatsAppButton';

interface PropertyCardProps {
  property: Property;
  checkIn?: string;
  checkOut?: string;
}

function formatPrice(cop: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(cop);
}

export default function PropertyCard({ property, checkIn, checkOut }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={property.coverPhoto}
          alt={property.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 right-2">
          <WhatsAppButton
            property={property}
            checkIn={checkIn}
            checkOut={checkOut}
            size="sm"
            showLabel={false}
            className="!rounded-full !px-2"
          />
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-1">{property.title}</h3>
            <p className="text-sm text-gray-500">{property.neighborhood}, {property.city}</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="font-medium text-sm">{property.rating}</span>
            <span className="text-gray-400 text-sm">({property.reviewCount})</span>
          </div>
        </div>
        
        <p className="text-xl font-bold text-[#FF385C] mb-3">
          {formatPrice(property.pricePerNight)}
          <span className="text-sm font-normal text-gray-500"> / noche</span>
        </p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {property.amenities.slice(0, 4).map((amenity) => (
            <span
              key={amenity}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
            >
              {amenity}
            </span>
          ))}
          {property.amenities.length > 4 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              +{property.amenities.length - 4}
            </span>
          )}
        </div>
        
        <Link
          href={`/property/${property.id}`}
          className="block w-full text-center bg-[#FF385C] hover:bg-[#E03252] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Ver más
        </Link>
      </div>
    </div>
  );
}