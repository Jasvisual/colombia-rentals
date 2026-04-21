'use client';

import { useState } from 'react';
import { cities, propertyTypes } from '@/data/properties';

export interface SearchFilters {
  type: string;
  city: string;
  neighborhood: string;
  bedrooms: number | null;
  bathrooms: number | null;
}

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  variant?: 'hero' | 'compact';
}

export default function SearchBar({ onSearch, variant = 'hero' }: SearchBarProps) {
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

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="col-span-2 md:col-span-1">
            <label className="block text-xs font-semibold text-gray-500 mb-1">Tipo</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
            >
              <option value="">Todos</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="block text-xs font-semibold text-gray-500 mb-1">Ciudad</label>
            <select
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value, neighborhood: '' })}
              className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
            >
              <option value="">Todas</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="block text-xs font-semibold text-gray-500 mb-1">Habitaciones</label>
            <select
              value={filters.bedrooms ?? ''}
              onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value ? Number(e.target.value) : null })}
              className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
            >
              <option value="">Cualquiera</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4+</option>
            </select>
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="block text-xs font-semibold text-gray-500 mb-1">Baños</label>
            <select
              value={filters.bathrooms ?? ''}
              onChange={(e) => setFilters({ ...filters, bathrooms: e.target.value ? Number(e.target.value) : null })}
              className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
            >
              <option value="">Cualquiera</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3+</option>
            </select>
          </div>

          <div className="col-span-2 md:col-span-1 flex items-end">
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Buscar
            </button>
          </div>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <label className="block text-xs font-semibold text-gray-500 mb-2">Ubicación</label>
          <div className="relative">
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar por ciudad o barrio..."
              value={filters.neighborhood}
              onChange={(e) => setFilters({ ...filters, neighborhood: e.target.value, city: '' })}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-2">Tipo</label>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm"
          >
            <option value="">Todos los tipos</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-2">Habitaciones</label>
          <select
            value={filters.bedrooms ?? ''}
            onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value ? Number(e.target.value) : null })}
            className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-emerald-500 text-sm"
          >
            <option value="">Cualquiera</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Buscar
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
        {cities.map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => setFilters({ ...filters, city, neighborhood: '' })}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
              filters.city === city
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {city}
          </button>
        ))}
        {filters.city && (
          <button
            type="button"
            onClick={() => setFilters({ ...filters, city: '' })}
            className="px-4 py-1.5 rounded-full text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            × Limpiar
          </button>
        )}
      </div>
    </form>
  );
}