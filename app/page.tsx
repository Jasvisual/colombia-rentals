'use client';

import { useState, useMemo } from 'react';
import { properties } from '@/data/properties';
import PropertyCard from '@/components/PropertyCard';
import SearchBar from '@/components/SearchBar';
import FilterSidebar from '@/components/FilterSidebar';

export default function Home() {
  const [searchFilters, setSearchFilters] = useState({
    city: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
  });

  const [sidebarFilters, setSidebarFilters] = useState({
    priceMin: 0,
    priceMax: 10000000,
    city: '',
    amenities: [] as string[],
  });

  const handleSearch = (filters: typeof searchFilters) => {
    setSearchFilters(filters);
    if (filters.city) {
      setSidebarFilters((prev) => ({ ...prev, city: filters.city }));
    }
  };

  const handleFilterChange = (filters: Partial<typeof sidebarFilters>) => {
    setSidebarFilters((prev) => ({ ...prev, ...filters }));
  };

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      if (sidebarFilters.city && property.city !== sidebarFilters.city) return false;
      if (property.pricePerNight < sidebarFilters.priceMin || property.pricePerNight > sidebarFilters.priceMax) return false;
      if (sidebarFilters.amenities.length > 0) {
        const hasAllAmenities = sidebarFilters.amenities.every((a) => property.amenities.includes(a as any));
        if (!hasAllAmenities) return false;
      }
      if (searchFilters.guests && property.maxGuests < searchFilters.guests) return false;
      return true;
    });
  }, [sidebarFilters, searchFilters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-b from-pink-50 to-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
            Encuentra tu prochain destino en Colombia
          </h1>
          <p className="text-xl text-gray-600 text-center mb-8">
            Alquileres cortos en las mejores ciudades: Medellín, Cartagena, Bogotá y Santa Marta
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <FilterSidebar filters={sidebarFilters} onFilterChange={handleFilterChange} />
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-4">
              <p className="text-gray-600">
                {filteredProperties.length} properti{filteredProperties.length === 1 ? 'dad' : 'es'} encontrad{filteredProperties.length === 1 ? 'a' : 'as'}
              </p>
            </div>

            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    checkIn={searchFilters.checkIn}
                    checkOut={searchFilters.checkOut}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No se encontraron propiedades con los filtros seleccionados.</p>
                <button
                  onClick={() => setSidebarFilters({ priceMin: 0, priceMax: 10000000, city: '', amenities: [] })}
                  className="mt-4 text-[#FF385C] hover:underline"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}