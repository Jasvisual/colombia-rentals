'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { properties } from '@/data/properties';
import PhotoGallery from '@/components/PhotoGallery';
import WhatsAppButton from '@/components/WhatsAppButton';

function formatPrice(cop: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(cop);
}

const featureIcons: Record<string, string> = {
  bedrooms: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  bathrooms: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z',
  area: 'M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4',
};

export default function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = properties.find((p) => p.id === id);

  if (!property) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {property.title}
          </h1>
          <p className="text-gray-500 mt-1">
            {property.neighborhood}, {property.city}
          </p>
        </div>

        <PhotoGallery photos={property.photos} title={property.title} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={featureIcons.bedrooms} />
                  </svg>
                  <span>{property.features.bedrooms} Habitaciones</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={featureIcons.bathrooms} />
                  </svg>
                  <span>{property.features.bathrooms} Baños</span>
                </div>
                {property.features.area && (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={featureIcons.area} />
                    </svg>
                    <span>{property.features.area} m²</span>
                  </div>
                )}
              </div>

              <span className="inline-block bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full mb-4">
                {property.type}
              </span>

              <h2 className="text-lg font-semibold text-gray-900 mb-3">Descripción</h2>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Ubicación</h2>
              <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm">{property.neighborhood}, {property.city}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="mb-4">
                <p className="text-3xl font-bold text-emerald-600">
                  {formatPrice(property.price)}
                </p>
                <p className="text-gray-500">por mes</p>
              </div>

              <div className="mb-6">
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                    property.isAvailable
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      property.isAvailable ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                  />
                  {property.isAvailable ? 'Disponible' : 'No disponible'}
                </span>
              </div>

              <WhatsAppButton property={property} className="w-full justify-center" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}