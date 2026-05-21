'use client';

import { useState, useMemo } from 'react';
import { properties } from '@/data/properties';
import PropertyCard from '@/components/PropertyCard';
import SearchBar, { SearchFilters } from '@/components/SearchBar';

const ITEMS_PER_PAGE = 8;

export default function Home() {
  const [filters, setFilters] = useState<SearchFilters>({
    type: '',
    city: '',
    neighborhood: '',
    bedrooms: null,
    bathrooms: null,
  });
  const [page, setPage] = useState(1);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      if (filters.type && property.type !== filters.type) return false;
      if (filters.city && property.city !== filters.city) return false;
      if (filters.neighborhood) {
        const searchTerm = filters.neighborhood.toLowerCase();
        if (!property.neighborhood.toLowerCase().includes(searchTerm) && 
            !property.city.toLowerCase().includes(searchTerm)) return false;
      }
      if (filters.bedrooms !== null) {
        if (filters.bedrooms === 4) {
          if (property.features.bedrooms < 4) return false;
        } else if (property.features.bedrooms !== filters.bedrooms) return false;
      }
      if (filters.bathrooms !== null) {
        if (filters.bathrooms === 3) {
          if (property.features.bathrooms < 3) return false;
        } else if (property.features.bathrooms !== filters.bathrooms) return false;
      }
      return true;
    });
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / ITEMS_PER_PAGE));
  const paginatedProperties = filteredProperties.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-600 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-emerald-400 font-medium tracking-wider uppercase text-sm mb-3">Expertos en bienes raíces</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Encuentra tu hogar<br className="hidden md:block" /> perfecto en Colombia
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
              Miles de propiedades en las mejores ciudades del país. Tu próximo hogar está a un clic de distancia.
            </p>
          </div>

          <SearchBar onSearch={setFilters} />
        </div>
      </section>

      {/* Properties Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Propiedades destacadas
          </h2>
          <p className="text-gray-500 mt-1">
            {filteredProperties.length} inmueble{filteredProperties.length !== 1 ? 's' : ''} encontrado{filteredProperties.length !== 1 ? 's' : ''}
          </p>
        </div>

        {filteredProperties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 space-y-8">
                {/* Stats */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl font-bold text-gray-900">500+</p>
                    <p className="text-gray-500 text-sm">Propiedades</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl font-bold text-gray-900">4</p>
                    <p className="text-gray-500 text-sm">Ciudades</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl font-bold text-gray-900">98%</p>
                    <p className="text-gray-500 text-sm">Clientes satisfechos</p>
                  </div>
                </div>

                {/* Paginator */}
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-white border border-gray-200 text-gray-600 hover:border-emerald-500 hover:text-emerald-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all ${
                        page === p
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-white border border-gray-200 text-gray-600 hover:border-emerald-500 hover:text-emerald-600'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-white border border-gray-200 text-gray-600 hover:border-emerald-500 hover:text-emerald-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg mb-2">No se encontraron propiedades</p>
            <p className="text-gray-400 text-sm mb-4">Intenta con otros filtros de búsqueda</p>
            <button
              onClick={() => { setFilters({ type: '', city: '', neighborhood: '', bedrooms: null, bathrooms: null }); setPage(1); }}
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Ver todas las propiedades
            </button>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Tienes una propiedad para vender o rentar?
          </h2>
          <p className="text-emerald-100 text-lg mb-8">
            Nosotros te ayudamos a encontrar el mejor cliente para tu inmueble. Contáctanos ahora.
          </p>
          <a
            href="https://wa.me/573174792161?text=Hola, quiero publicar mi propiedad"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-emerald-600 font-semibold px-8 py-4 rounded-xl hover:bg-emerald-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Publicar propiedad
          </a>
        </div>
      </section>
    </div>
  );
}
