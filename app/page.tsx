'use client';

import { useState, useMemo } from 'react';
import { properties } from '@/data/properties';
import PropertyCard from '@/components/PropertyCard';
import SearchBar, { SearchFilters } from '@/components/SearchBar';

export default function Home() {
  const [filters, setFilters] = useState<SearchFilters>({
    type: '',
    city: '',
    neighborhood: '',
    bedrooms: null,
    bathrooms: null,
  });

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      if (filters.type && property.type !== filters.type) return false;
      if (filters.city && property.city !== filters.city) return false;
      if (filters.neighborhood) {
        const searchTerm = filters.neighborhood.toLowerCase();
        if (!property.neighborhood.toLowerCase().includes(searchTerm)) return false;
      }
      if (filters.bedrooms !== null) {
        if (filters.bedrooms === 4) {
          if (property.features.bedrooms < 4) return false;
        } else if (property.features.bedrooms !== filters.bedrooms) return false;
      }
      if (filters.bathrooms !== null) {
        if (filters.bathrooms === 3) {
          if (property.features.bathrooms < 3) return false;
        } else if (property.features.bathrooms !== filters.bathrooms) return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-emerald-800 to-emerald-900 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-3">
            Encuentra tu hogar perfecto en Colombia
          </h1>
          <p className="text-emerald-100 text-center text-lg mb-8">
            Los mejores inmuebles en Medellín, Cartagena, Bogotá y Santa Marta
          </p>
          <SearchBar onSearch={setFilters} />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Inmuebles disponibles
          </h2>
          <p className="text-gray-500 mt-1">
            {filteredProperties.length} propiedad{filteredProperties.length !== 1 ? 'es' : ''} encontrada{filteredProperties.length !== 1 ? 's' : ''}
          </p>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
            <div className="text-5xl mb-4">🏠</div>
            <p className="text-gray-500 text-lg">No se encontraron propiedades con los filtros seleccionados.</p>
            <button
              onClick={() => setFilters({ type: '', city: '', neighborhood: '', bedrooms: null, bathrooms: null })}
              className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Ver todos los inmuebles
            </button>
          </div>
        )}
      </section>
    </div>
  );
}