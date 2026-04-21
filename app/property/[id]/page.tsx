'use client';

import { useState } from 'react';
import { use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { properties } from '@/data/properties';
import WhatsAppButton from '@/components/WhatsAppButton';

function formatPrice(cop: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(cop);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">Inmobiliaria XYZ</span>
          </a>
          <a href="/" className="text-gray-600 hover:text-emerald-600 transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Features */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Características</h2>
              <div className="grid grid-cols-3 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={featureIcons.bedrooms.path} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{property.features.bedrooms}</p>
                    <p className="text-sm text-gray-500">Habitaciones</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={featureIcons.bathrooms.path} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{property.features.bathrooms}</p>
                    <p className="text-sm text-gray-500">Baños</p>
                  </div>
                </div>
                {property.features.area && (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={featureIcons.area.path} />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{property.features.area}</p>
                      <p className="text-sm text-gray-500">m²</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Descripción</h2>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Ubicación</h2>
              <div className="h-64 bg-gray-100 rounded-xl flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="font-medium">{property.neighborhood}</p>
                  <p className="text-sm">{property.city}, Colombia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 border border-gray-100">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500 mb-1">Precio de renta</p>
                <p className="text-4xl font-bold text-emerald-600">
                  {formatPrice(property.price)}
                </p>
                <p className="text-gray-400 text-sm">por mes</p>
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