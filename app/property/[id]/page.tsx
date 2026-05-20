'use client';

import { useState } from 'react';
import { use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { properties } from '@/data/properties';
import WhatsAppButton from '@/components/WhatsAppButton';

function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

const featureIcons: Record<string, { path: string; label: string }> = {
  bedrooms: { 
    path: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', 
    label: 'Habitaciones' 
  },
  bathrooms: { 
    path: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z', 
    label: 'Baños' 
  },
  beds: { 
    path: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', 
    label: 'Camas' 
  },
  guests: { 
    path: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', 
    label: 'Huéspedes' 
  },
  area: { 
    path: 'M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4', 
    label: 'Área' 
  },
};

export default function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = properties.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!property) {
    notFound();
  }

  const mainFeatures = [
    { key: 'bedrooms', value: property.features.bedrooms, suffix: '' },
    { key: 'beds', value: property.features.beds, suffix: '' },
    { key: 'bathrooms', value: property.features.bathrooms, suffix: '' },
    { key: 'guests', value: property.maxGuests, suffix: '' },
  ];
  if (property.features.area) {
    mainFeatures.push({ key: 'area', value: property.features.area, suffix: ' m²' });
  }

  const mapsQuery = encodeURIComponent(`${property.neighborhood}, ${property.city}, Colombia`);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back link */}
        <a href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors mb-6">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a propiedades
        </a>

        {/* Title & Location */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
              {property.type}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                property.isAvailable
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${property.isAvailable ? 'bg-emerald-500' : 'bg-red-500'}`} />
              {property.isAvailable ? 'Disponible' : 'No disponible'}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{property.title}</h1>
          <div className="flex items-center gap-2 text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{property.neighborhood}, {property.city}</span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src={property.photos[selectedImage]}
              alt={property.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {property.photos.slice(1, 5).map((photo, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index + 1)}
                className={`relative h-48 rounded-xl overflow-hidden transition-all ${
                  selectedImage === index + 1 ? 'ring-4 ring-emerald-500' : 'hover:opacity-90'
                }`}
              >
                <Image
                  src={photo}
                  alt={`${property.title} - Foto ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Price Box (below carousel, visible only on mobile) */}
        <div className="lg:hidden bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <p className="text-sm text-gray-500 mb-1 text-center">Precio por noche</p>
          <p className="text-4xl font-bold text-emerald-600 text-center">
            {formatUSD(property.pricePerNightUSD || 0)}
          </p>
          <p className="text-gray-400 text-sm text-center">USD / noche</p>
          <div className="border-t border-gray-100 my-4 pt-4 text-center">
            <p className="text-2xl font-semibold text-gray-900">
              {formatUSD(property.priceUSD || 0)}
            </p>
            <p className="text-gray-400 text-sm">USD / mes</p>
          </div>
          <WhatsAppButton property={property} className="w-full justify-center mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Features */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Características</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                {mainFeatures.map(({ key, value, suffix }) => (
                  <div key={key} className="flex flex-col items-center gap-3 text-center">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={featureIcons[key]?.path} />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{value}{suffix}</p>
                      <p className="text-sm text-gray-500">{featureIcons[key]?.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Extra Features */}
            {property.extraFeatures && property.extraFeatures.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Servicios destacados</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {property.extraFeatures.map((feat, i) => (
                    <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                      <span className="text-2xl">{feat.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{feat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Descripción</h2>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            {/* Location & Map */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Ubicación</h2>
              <p className="text-gray-600 mb-4">
                {property.neighborhood}, {property.city}, Colombia
              </p>
              <div className="h-72 rounded-xl overflow-hidden">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDTHlYxF62U9MvXcfIdzH3H_S7COh4H5aw&q=${mapsQuery}&zoom=14&language=es`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Ubicación de ${property.title}`}
                />
              </div>
            </div>
          </div>

          {/* Sidebar (desktop only) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 border border-gray-100">
              <p className="text-sm text-gray-500 mb-1 text-center">Precio por noche</p>
              <p className="text-4xl font-bold text-emerald-600 text-center">
                {formatUSD(property.pricePerNightUSD || 0)}
              </p>
              <p className="text-gray-400 text-sm text-center">USD / noche</p>
              <div className="border-t border-gray-100 my-4 pt-4 text-center">
                <p className="text-2xl font-semibold text-gray-900">
                  {formatUSD(property.priceUSD || 0)}
                </p>
                <p className="text-gray-400 text-sm">USD / mes</p>
              </div>

              <WhatsAppButton property={property} className="w-full justify-center mb-4" />

              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm text-gray-500 text-center">
                  ¿Necesitas más información?
                </p>
                <a
                  href="https://wa.me/573174792161?text=Hola, quiero más información sobre el inmueble"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-emerald-600 font-medium hover:text-emerald-700 mt-1"
                >
                  Chatear por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
