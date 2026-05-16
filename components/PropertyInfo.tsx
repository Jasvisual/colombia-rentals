'use client';

import Image from 'next/image';
import { Property } from '@/types';
import { amenityLabels } from '@/data/properties';

interface PropertyInfoProps {
  property: Property;
}

export default function PropertyInfo({ property }: PropertyInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {property.title}
        </h1>
        <div className="flex items-center gap-4 text-gray-600">
          <span>{property.neighborhood}, {property.city}</span>
          <span className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="font-medium">{property.rating}</span>
            <span className="text-gray-400">({property.reviewCount} reseñas)</span>
          </span>
        </div>
      </div>

      {property.host && (
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
          <Image
            src={property.host.photo}
            alt={property.host.name}
            width={56}
            height={56}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold text-gray-900">Anfitrión: {property.host.name}</p>
            <p className="text-sm text-gray-500">Responde en {property.host.responseTime}</p>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">El espacio</h2>
        <div className="flex flex-wrap gap-4 text-gray-600">
          {property.maxGuests && (
            <div className="flex items-center gap-2">
              <span className="text-xl">👥</span>
              <span>{property.maxGuests} huéspedes</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="text-xl">🛏️</span>
            <span>{property.features.bedrooms} habitaciones</span>
          </div>
          {property.features.beds && (
            <div className="flex items-center gap-2">
              <span className="text-xl">🛏️</span>
              <span>{property.features.beds} camas</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="text-xl">🚿</span>
            <span>{property.features.bathrooms} baños</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Descripción</h2>
        <p className="text-gray-600 leading-relaxed">{property.description}</p>
      </div>

      {property.amenities && property.amenities.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Comodidades</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {property.amenities.map((amenity) => (
              <div
                key={amenity}
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
              >
                <span className="text-xl">{amenityLabels[amenity]?.icon || '✓'}</span>
                <span className="text-sm text-gray-700">
                  {amenityLabels[amenity]?.label || amenity}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}