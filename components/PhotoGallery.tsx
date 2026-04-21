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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 rounded-xl overflow-hidden h-96 lg:h-[500px]">
        <div className="relative h-full lg:col-span-2">
          <Image
            src={photos[0]}
            alt={`${title} - Foto principal`}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {photos.map((photo, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`relative w-24 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
              index === selectedIndex ? 'border-emerald-500' : 'border-transparent'
            }`}
          >
            <Image
              src={photo}
              alt={`${title} - Foto ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}