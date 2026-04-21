'use client';

import { useState } from 'react';
import { cities } from '@/data/properties';

export interface SearchFilters {
  type: string;
  city: string;
  neighborhood: string;
  bedrooms: number | null;
  bathrooms: number | null;
}

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
}

const propertyTypes = ['Apartamento', 'Casa', 'Penthouse', 'Loft', 'Villa', 'Cabaña'];

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    type: '',
    city: '',
    neighborhood: '',
    bedrooms: null,
    bathrooms: null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleClear = () => {
    const emptyFilters = {
      type: '',
      city: '',
      neighborhood: '',
      bedrooms: null,
      bathrooms: null,
    };
    setFilters(emptyFilters);
    onSearch(emptyFilters);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Tipo</label>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
          >
            <option value="">Todos los tipos</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Ciudad</label>
          <select
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value, neighborhood: '' })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
          >
            <option value="">Todas las ciudades</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Barrio</label>
          <input
            type="text"
            placeholder="Buscar barrio..."
            value={filters.neighborhood}
            onChange={(e) => setFilters({ ...filters, neighborhood: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Habitaciones</label>
          <select
            value={filters.bedrooms ?? ''}
            onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value ? Number(e.target.value) : null })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
          >
            <option value="">Cualquiera</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Baños</label>
          <select
            value={filters.bathrooms ?? ''}
            onChange={(e) => setFilters({ ...filters, bathrooms: e.target.value ? Number(e.target.value) : null })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
          >
            <option value="">Cualquiera</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3+</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
        >
          Buscar
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2.5 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 text-sm"
        >
          Limpiar
        </button>
      </div>
    </form>
  );
}