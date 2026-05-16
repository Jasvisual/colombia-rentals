'use client';

import { useState } from 'react';

interface AvailabilityCalendarProps {
  onDateSelect?: (checkIn: string, checkOut: string) => void;
}

export default function AvailabilityCalendar({ onDateSelect }: AvailabilityCalendarProps) {
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');

  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const handleDateClick = (day: number) => {
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(dateStr);
      setCheckOut('');
    } else if (dateStr > checkIn) {
      setCheckOut(dateStr);
      onDateSelect?.(checkIn, dateStr);
    } else {
      setCheckIn(dateStr);
      setCheckOut('');
    }
  };

  const isDateAvailable = (day: number) => Math.random() > 0.2;
  const isDateSelected = (day: number) => {
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return checkIn === dateStr || checkOut === dateStr;
  };
  const isDateInRange = (day: number) => {
    if (!checkIn || !checkOut) return false;
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return dateStr > checkIn && dateStr < checkOut;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">
        {monthNames[today.getMonth()]} {today.getFullYear()}
      </h3>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['D', 'L', 'M', 'X', 'J', 'V', 'S'].map((day, i) => (
          <div key={i} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const available = isDateAvailable(day);
          const selected = isDateSelected(day);
          const inRange = isDateInRange(day);
          
          return (
            <button
              key={day}
              onClick={() => available && handleDateClick(day)}
              disabled={!available || day < today.getDate()}
              className={`
                aspect-square flex items-center justify-center text-sm rounded-lg transition-colors
                ${!available || day < today.getDate() 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'hover:bg-gray-100 cursor-pointer'
                }
                ${selected ? 'bg-[#FF385C] text-white hover:bg-[#E03252]' : ''}
                ${inRange ? 'bg-[#FF385C]/20' : ''}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      {(checkIn || checkOut) && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-gray-500">Check-in</p>
              <p className="font-medium">{checkIn || 'Selecciona...'}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500">Check-out</p>
              <p className="font-medium">{checkOut || 'Selecciona...'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}