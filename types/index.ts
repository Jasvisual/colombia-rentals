export interface Property {
  id: string;
  title: string;
  type: string;
  city: string;
  neighborhood: string;
  description: string;
  price: number;
  pricePerNight?: number;
  rating?: number;
  reviewCount?: number;
  coverPhoto: string;
  photos: string[];
  features: {
    bedrooms: number;
    bathrooms: number;
    beds?: number;
    area?: number;
  };
  amenities?: string[];
  host?: {
    name: string;
    photo: string;
    responseTime: string;
  };
  maxGuests?: number;
  isAvailable: boolean;
}

export interface SearchFilters {
  type: string;
  city: string;
  neighborhood: string;
  bedrooms: number | null;
  bathrooms: number | null;
}
