import { Property } from '@/types';
import propertiesData from './properties.json';

export const properties: Property[] = propertiesData as Property[];

export const cities = ['Medellín', 'Cartagena', 'Bogotá', 'Santa Marta'] as const;

export const propertyTypes = ['Apartamento', 'Casa', 'Penthouse', 'Loft', 'Villa', 'Cabaña'] as const;