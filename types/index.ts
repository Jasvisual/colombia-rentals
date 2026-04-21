export interface Property {
  id: string;
  title: string;
  type: 'Apartamento' | 'Casa' | 'Penthouse' | 'Loft' | 'Villa' | 'Cabaña';
  city: 'Medellín' | 'Cartagena' | 'Bogotá' | 'Santa Marta';
  neighborhood: string;
  description: string;
  price: number;
  coverPhoto: string;
  photos: string[];
  features: {
    bedrooms: number;
    bathrooms: number;
    area?: number;
  };
  isAvailable: boolean;
}

export interface SearchFilters {
  type: string;
  city: string;
  neighborhood: string;
  bedrooms: number | null;
  bathrooms: number | null;
}