import { useState, useMemo } from 'react';
import { usePageMetadata } from '../hooks/usePageMetadata';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/Skeleton';
import { SortOption, FilterState } from '../types';
import data from '../data/products.json';

const PRODUCTS_PER_PAGE = 12;

export default function Shop() {
  usePageMetadata({
    title: 'Shop All Products - Light 3D',
    description: 'Browse our complete collection of premium 3D printed products.',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 200],
    materials: [],
    colors: [],
    rating: 0,
    tags: [],
  });
  const [loading] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = [...data.products];

    // Apply price filter
    products = products.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Apply material filter
    if (filters.materials.length > 0) {
      products = products.filter((p) =>
        p.materialOptions.some((m) => filters.materials.includes(m.id))
      );
    }

    // Apply rating filter
    if (filters.rating > 0) {
      products = products.filter((p) => p.rating >= filters.rating);
    }

    // Apply tag filter
    if (filters.tags.length > 0) {
      products = products.filter((p) =>
        p.tags.some((t) => filters.tags.includes(t))
      );
    }

    // Sort products
    switch (sortBy) {
      case 'featured':
        products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'newest':
        // Assuming newer products have higher IDs
        products.reverse();
        break;
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
    }

    return products;
  }, [filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handleResetFilters = () => {
    setFilters({
      priceRange: [0, 200],
      materials: [],
      colors: [],
      rating: 0,
      tags: [],
    });
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-2">
            All Products
          </h1>
          <p className="text-slate-400">
            Showing {paginatedProducts.length} of {filteredProducts.length} products
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="md:col-span-1">
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-white">Filters</h2>
                <button
                  onClick={handleResetFilters}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  Reset
                </button>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Price Range
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={filters.priceRange[0]}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        priceRange: [Number(e.target.value), filters.priceRange[1]],
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-600 text-white rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                  <span className="text-slate-500">to</span>
                  <input
                    type="number"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        priceRange: [filters.priceRange[0], Number(e.target.value)],
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-600 text-white rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </div>
              </div>

              {/* Material Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Material
                </label>
                {['pla', 'petg', 'resin'].map((material) => (
                  <label key={material} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={filters.materials.includes(material)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilters({
                            ...filters,
                            materials: [...filters.materials, material],
                          });
                        } else {
                          setFilters({
                            ...filters,
                            materials: filters.materials.filter((m) => m !== material),
                          });
                        }
                      }}
                      className="rounded text-blue-600 focus:ring-blue-500 bg-slate-900 border-slate-600"
                    />
                    <span className="ml-2 text-sm text-slate-300 capitalize">
                      {material}
                    </span>
                  </label>
                ))}
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) =>
                    setFilters({ ...filters, rating: Number(e.target.value) })
                  }
                  className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="0">All Ratings</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-slate-700 bg-slate-800 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <div className="flex gap-1">
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`px-4 py-2 rounded-lg ${
                            currentPage === i + 1
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                              : 'border border-slate-700 bg-slate-800 text-white hover:bg-slate-700'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-slate-700 bg-slate-800 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <svg
                  className="mx-auto h-12 w-12 text-slate-600 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-white mb-2">
                  No products found
                </h3>
                <p className="text-slate-400 mb-4">
                  Try adjusting your filters to see more results
                </p>
                <button
                  onClick={handleResetFilters}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
