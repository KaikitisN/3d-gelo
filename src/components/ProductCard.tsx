import { Link } from 'react-router-dom';
import { Product } from '../types';
import { formatPrice, formatLeadTime } from '../utils/helpers';
import { useState, useEffect, useRef } from 'react';
import Modal from './Modal';
import Button from './Button';
import { useCart } from '../context/CartContext';
import { showToast } from './Toast';
import { animate } from 'animejs';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const { addToCart } = useCart();
  const cardRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animate(entry.target as HTMLElement, {
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 600,
              easing: 'out-quad',
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(cardRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  const handleQuickAdd = () => {
    addToCart(
      product,
      product.materialOptions[0],
      product.colorOptions[0],
      product.sizeOptions[0],
      1
    );
    showToast('Added to cart!');
  };

  return (
    <>
      <div 
        ref={cardRef}
        className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
        style={{ opacity: 0 }}
      >
        <Link to={product.customUrl || `/product/${product.id}`} className="block relative">
          <div className="aspect-square overflow-hidden bg-gray-100">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          {product.featured && (
            <span className="absolute top-2 right-2 bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded">
              Featured
            </span>
          )}
        </Link>

        <div className="p-4">
          <Link to={product.customUrl || `/product/${product.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <div className="mt-2 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">({product.reviewCount})</span>
          </div>

          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </p>
              <p className="text-xs text-gray-500">
                Ships in {formatLeadTime(product.leadTimeDaysMin, product.leadTimeDaysMax)}
              </p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            {product.customizable ? (
              <Link to={product.customUrl || `/product/${product.id}`} className="flex-1">
                <Button
                  className="w-full"
                  size="sm"
                >
                  Customize Now
                </Button>
              </Link>
            ) : (
              <>
                <Button
                  onClick={handleQuickAdd}
                  className="flex-1"
                  size="sm"
                >
                  Quick Add
                </Button>
                <Button
                  onClick={() => setQuickViewOpen(true)}
                  variant="outline"
                  size="sm"
                >
                  Quick View
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <Modal
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
        title={product.name}
        size="lg"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full rounded-lg"
            />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-2">
              {formatPrice(product.price)}
            </p>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <p className="text-sm text-blue-900">
                <strong>Made to order:</strong> Ships in{' '}
                {formatLeadTime(product.leadTimeDaysMin, product.leadTimeDaysMax)}
              </p>
            </div>
            <div className="flex gap-3">
              <Link to={`/product/${product.id}`} className="flex-1">
                <Button className="w-full">View Full Details</Button>
              </Link>
              <Button
                onClick={() => {
                  handleQuickAdd();
                  setQuickViewOpen(false);
                }}
                variant="secondary"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
