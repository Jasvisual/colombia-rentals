'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/types';

interface PropertyCardProps {
  property: Property;
}

function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/property/${property.id}`}>
      <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100">
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={property.coverPhoto}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm shadow-sm ${
                property.isAvailable
                  ? 'bg-white/90 text-emerald-700'
                  : 'bg-red-500/90 text-white'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  property.isAvailable ? 'bg-emerald-500' : 'bg-white'
                }`}
              />
              {property.isAvailable ? 'Disponible' : 'No disponible'}
            </span>
          </div>
          <div className="absolute bottom-3 left-3">
            <span className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-md">
              {property.type}
            </span>
          </div>
        </div>

        <div className="p-5">
          <p className="text-sm text-emerald-600 font-medium mb-1">{property.city}</p>
          <h3 className="font-bold text-gray-900 text-lg line-clamp-1 mb-2 group-hover:text-emerald-600 transition-colors">
            {property.title}
          </h3>
          <p className="text-gray-500 text-sm mb-4 line-clamp-1">{property.neighborhood}</p>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {property.features.bedrooms} {property.features.bedrooms === 1 ? 'hab' : 'hab'}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
              {property.features.bathrooms} {property.features.bathrooms === 1 ? 'baño' : 'baños'}
            </span>
            {property.features.area && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                {property.features.area} m²
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-emerald-600">
                {formatUSD(property.pricePerNightUSD || 0)}
              </p>
              <p className="text-xs text-gray-400">USD / noche</p>
            </div>
            <span className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
