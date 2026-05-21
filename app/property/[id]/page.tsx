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

const featureIcons: Record<string, string> = {
  bedrooms: 'fi fi-rr-bed',
  bathrooms: 'fi fi-rr-bath',
  beds: 'fi fi-rr-bed',
  guests: 'fi fi-rr-people',
  area: 'fi fi-rr-expand-arrows-alt',
};

const featureLabels: Record<string, string> = {
  bedrooms: 'Habitaciones',
  bathrooms: 'Baños',
  beds: 'Camas',
  guests: 'Huéspedes',
  area: 'Área',
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
                      <i className={`${featureIcons[key] || 'fi fi-rr-circle'} text-emerald-600 text-xl leading-none`}></i>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{value}{suffix}</p>
                      <p className="text-sm text-gray-500">{featureLabels[key]}</p>
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
                      <i className={`${feat.icon} text-emerald-600 text-lg leading-none`}></i>
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
                  src={`https://maps.google.com/maps?q=${mapsQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
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
