import { useParams } from 'react-router-dom';
import { usePageMetadata } from '../hooks/usePageMetadata';
import ProductCard from '../components/ProductCard';
import data from '../data/products.json';

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const category = data.categories.find((c) => c.slug === slug);
  const products = data.products.filter((p) => p.categorySlug === slug);

  usePageMetadata({
    title: `${category?.name || 'Category'} - GELO's Designs`,
    description: category?.description || 'Browse products in this category',
  });

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Category not found</h1>
          <p className="text-gray-600">The category you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
          <p className="text-xl text-primary-100">{category.description}</p>
          <p className="mt-4 text-primary-200">
            {products.length} product{products.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600">No products in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
