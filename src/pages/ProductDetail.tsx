import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import { showToast } from '../components/Toast';
import { formatPrice, formatLeadTime } from '../utils/helpers';
import { ProductDetailSkeleton } from '../components/Skeleton';
import { MaterialOption, ColorOption, SizeOption } from '../types';
import { logAnalyticsEvent } from '../utils/analytics';
import data from '../data/products.json';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = data.products.find((p) => p.id === id);
  const { addToCart } = useCart();

  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialOption | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [customization, setCustomization] = useState('');
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'shipping'>('description');

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 500);

    if (product) {
      setSelectedMaterial(product.materialOptions[0]);
      setSelectedColor(product.colorOptions[0]);
      setSelectedSize(product.sizeOptions[0]);

      // Analytics event
      logAnalyticsEvent('view_item', {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
      });
    }
  }, [product]);

  usePageMetadata({
    title: `${product?.name || 'Product'} - GELO's Designs`,
    description: product?.description || 'View product details',
    ogImage: product?.images[0],
  });

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h1>
          <Link to="/shop" className="text-primary-600 hover:text-primary-700">
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  const calculateTotalPrice = () => {
    let total = product.price;
    if (selectedMaterial) total += selectedMaterial.priceModifier;
    if (selectedColor) total += selectedColor.priceModifier;
    if (selectedSize) total += selectedSize.priceModifier;
    return total;
  };

  const handleAddToCart = () => {
    if (!selectedMaterial || !selectedColor || !selectedSize) {
      showToast('Please select all options', 'error');
      return;
    }

    addToCart(product, selectedMaterial, selectedColor, selectedSize, quantity, customization);
    showToast(`Added ${quantity} ${product.name} to cart!`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm">
        <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link to="/shop" className="text-gray-500 hover:text-gray-700">Shop</Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square bg-gray-100 rounded-lg overflow-hidden ${
                  selectedImage === index ? 'ring-2 ring-primary-600' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="mb-6">
            <p className="text-4xl font-bold text-gray-900">
              {formatPrice(calculateTotalPrice())}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Base price: {formatPrice(product.price)}
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900">
              <strong>Made to order:</strong> Ships in{' '}
              {formatLeadTime(product.leadTimeDaysMin, product.leadTimeDaysMax)}
            </p>
          </div>

          {/* Material Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Material
            </label>
            <div className="grid grid-cols-2 gap-3">
              {product.materialOptions.map((material) => (
                <button
                  key={material.id}
                  onClick={() => setSelectedMaterial(material)}
                  className={`p-3 border-2 rounded-lg text-left transition-colors ${
                    selectedMaterial?.id === material.id
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{material.name}</div>
                  <div className="text-sm text-gray-600">{material.description}</div>
                  {material.priceModifier > 0 && (
                    <div className="text-sm text-primary-600 mt-1">
                      +{formatPrice(material.priceModifier)}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Color
            </label>
            <div className="flex flex-wrap gap-3">
              {product.colorOptions.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color)}
                  className={`relative p-2 border-2 rounded-lg ${
                    selectedColor?.id === color.id
                      ? 'border-primary-600'
                      : 'border-gray-200'
                  }`}
                  title={color.name}
                >
                  <div
                    className="w-8 h-8 rounded"
                    style={{ backgroundColor: color.hexCode }}
                  />
                  {selectedColor?.id === color.id && (
                    <div className="absolute -top-1 -right-1 bg-primary-600 rounded-full p-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
            {selectedColor && (
              <p className="mt-2 text-sm text-gray-600">
                {selectedColor.name}
                {selectedColor.priceModifier > 0 && ` (+${formatPrice(selectedColor.priceModifier)})`}
              </p>
            )}
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Size
            </label>
            <div className="grid grid-cols-2 gap-3">
              {product.sizeOptions.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size)}
                  className={`p-3 border-2 rounded-lg text-left transition-colors ${
                    selectedSize?.id === size.id
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{size.name}</div>
                  <div className="text-sm text-gray-600">{size.dimensions}</div>
                  {size.priceModifier > 0 && (
                    <div className="text-sm text-primary-600 mt-1">
                      +{formatPrice(size.priceModifier)}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Customization */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Customization Note (Optional)
            </label>
            <textarea
              value={customization}
              onChange={(e) => setCustomization(e.target.value)}
              placeholder="Add any special requests or customizations..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={3}
            />
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                min="1"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button onClick={handleAddToCart} size="lg" className="w-full mb-4">
            Add to Cart - {formatPrice(calculateTotalPrice() * quantity)}
          </Button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8">
            {['description', 'specs', 'shipping'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`pb-4 text-sm font-medium capitalize ${
                  activeTab === tab
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="py-8">
          {activeTab === 'description' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Product Description</h3>
              <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
            </div>
          )}
          {activeTab === 'specs' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Specifications</h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt className="font-medium text-gray-900">SKU</dt>
                  <dd className="text-gray-600">{product.sku}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Category</dt>
                  <dd className="text-gray-600">{product.categorySlug}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Available Materials</dt>
                  <dd className="text-gray-600">
                    {product.materialOptions.map((m) => m.name).join(', ')}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Color Options</dt>
                  <dd className="text-gray-600">{product.colorOptions.length} colors</dd>
                </div>
              </dl>
            </div>
          )}
          {activeTab === 'shipping' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Shipping & Returns</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Production Time:</strong> {formatLeadTime(product.leadTimeDaysMin, product.leadTimeDaysMax)}
                </p>
                <p>
                  <strong>Shipping:</strong> All products are made to order. Once completed, items typically ship within 1-2 business days.
                </p>
                <p>
                  <strong>Returns:</strong> We accept returns within 30 days of delivery. Custom items may have different return policies.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
