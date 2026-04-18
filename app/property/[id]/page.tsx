'use client';

import { useState, use } from 'react';
import { notFound } from 'next/navigation';
import { properties } from '@/data/properties';
import PhotoGallery from '@/components/PhotoGallery';
import PropertyInfo from '@/components/PropertyInfo';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';
import WhatsAppButton from '@/components/WhatsAppButton';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

function formatPrice(cop: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(cop);
}

export default function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = properties.find((p) => p.id === id);
  
  const [selectedDates, setSelectedDates] = useState({ checkIn: '', checkOut: '' });

  if (!property) {
    notFound();
  }

  const handleDateSelect = (checkIn: string, checkOut: string) => {
    setSelectedDates({ checkIn, checkOut });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <PhotoGallery photos={property.photos} title={property.title} />
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PropertyInfo property={property} />
            
            <div className="mt-8 p-6 bg-gray-100 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Ubicación</h3>
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <span className="text-4xl block mb-2">📍</span>
                  <p>Mapa de ubicación</p>
                  <p className="text-sm">{property.neighborhood}, {property.city}, Colombia</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <p className="text-2xl font-bold text-[#FF385C]">
                  {formatPrice(property.pricePerNight)}
                </p>
                <p className="text-gray-500">por noche</p>
              </div>
              
              <div className="flex items-center gap-1 mb-6">
                <span className="text-yellow-500">★</span>
                <span className="font-medium">{property.rating}</span>
                <span className="text-gray-400">({property.reviewCount} reseñas)</span>
              </div>
              
              <AvailabilityCalendar onDateSelect={handleDateSelect} />
              
              <div className="mt-6">
                <WhatsAppButton
                  property={property}
                  checkIn={selectedDates.checkIn}
                  checkOut={selectedDates.checkOut}
                  className="w-full justify-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <FloatingWhatsApp
        property={property}
        checkIn={selectedDates.checkIn}
        checkOut={selectedDates.checkOut}
      />
    </div>
  );
}