export interface Property {
  id: string;
  title: string;
  city: 'Medellín' | 'Cartagena' | 'Bogotá' | 'Santa Marta';
  neighborhood: string;
  description: string;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  coverPhoto: string;
  photos: string[];
  amenities: ('wifi' | 'pool' | 'parking' | 'ac' | 'kitchen' | 'washer' | 'tv' | 'hotTub')[];
  host: {
    name: string;
    photo: string;
    responseTime: string;
  };
  maxGuests: number;
  bedrooms: number;
  beds: number;
  baths: number;
}

export interface SearchFilters {
  city: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  priceMin: number;
  priceMax: number;
  amenities: string[];
}