'use client';

import { cities, amenityLabels } from '@/data/properties';

interface FilterSidebarProps {
  filters: {
    priceMin: number;
    priceMax: number;
    city: string;
    amenities: string[];
  };
  onFilterChange: (filters: Partial<FilterSidebarProps['filters']>) => void;
}

export default function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const priceRanges = [
    { label: 'Cualquiera', min: 0, max: 10000000 },
    { label: 'Menos de $200K', min: 0, max: 200000 },
    { label: '$200K - $400K', min: 200000, max: 400000 },
    { label: '$400K - $600K', min: 400000, max: 600000 },
    { label: 'Más de $600K', min: 600000, max: 10000000 },
  ];

  const amenityKeys = Object.keys(amenityLabels);

  const handlePriceChange = (min: number, max: number) => {
    onFilterChange({ priceMin: min, priceMax: max });
  };

  const handleCityChange = (city: string) => {
    onFilterChange({ city: city === filters.city ? '' : city });
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    onFilterChange({ amenities: newAmenities });
  };

  return (
    <aside className="bg-white rounded-xl shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Filtros</h2>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Precio por noche</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label
              key={range.label}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceMin === range.min && filters.priceMax === range.max}
                onChange={() => handlePriceChange(range.min, range.max)}
                className="w-4 h-4 text-[#FF385C] focus:ring-[#FF385C]"
              />
              <span className="text-sm text-gray-600">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Ciudad</h3>
        <div className="space-y-2">
          {cities.map((city) => (
            <label
              key={city}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.city === city}
                onChange={() => handleCityChange(city)}
                className="w-4 h-4 text-[#FF385C] focus:ring-[#FF385C] rounded"
              />
              <span className="text-sm text-gray-600">{city}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Comodidades</h3>
        <div className="space-y-2">
          {amenityKeys.map((key) => (
            <label
              key={key}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.amenities.includes(key)}
                onChange={() => handleAmenityToggle(key)}
                className="w-4 h-4 text-[#FF385C] focus:ring-[#FF385C] rounded"
              />
              <span className="text-sm text-gray-600">
                {amenityLabels[key].icon} {amenityLabels[key].label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={() => onFilterChange({ priceMin: 0, priceMax: 10000000, city: '', amenities: [] })}
        className="w-full text-sm text-gray-500 hover:text-[#FF385C] py-2 border border-gray-200 rounded-lg hover:border-[#FF385C] transition-colors"
      >
        Limpiar filtros
      </button>
    </aside>
  );
}