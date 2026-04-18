'use client';

import { useState } from 'react';
import { cities } from '@/data/properties';

interface SearchBarProps {
  onSearch: (filters: {
    city: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  }) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [city, setCity] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ city, checkIn, checkOut, guests });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">
              Ciudad
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
            >
              <option value="">Todas las ciudades</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-1">
            <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">
              Check-in
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">
              Check-out
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent"
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-xs font-semibold text-gray-700 mb-1 uppercase tracking-wide">
              Huéspedes
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                -
              </button>
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
                min={1}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent text-center"
              />
              <button
                type="button"
                onClick={() => setGuests(guests + 1)}
                className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-[#FF385C] hover:bg-[#E03252] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}