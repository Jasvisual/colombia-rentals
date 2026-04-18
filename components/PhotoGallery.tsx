'use client';

import { useState } from 'react';
import Image from 'next/image';

interface PhotoGalleryProps {
  photos: string[];
  title: string;
}

export default function PhotoGallery({ photos, title }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative h-64 md:h-96 w-full rounded-xl overflow-hidden">
        <Image
          src={photos[selectedIndex]}
          alt={`${title} - Foto ${selectedIndex + 1}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
        />
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {photos.map((photo, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`relative h-20 w-full rounded-lg overflow-hidden border-2 transition-all ${
              selectedIndex === index
                ? 'border-[#FF385C]'
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            <Image
              src={photo}
              alt={`${title} - Foto miniatura ${index + 1}`}
              fill
              className="object-cover"
              sizes="200px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}