import { Link } from 'react-router-dom';
import { usePageMetadata } from '../hooks/usePageMetadata';
import ProductCard from '../components/ProductCard';
import data from '../data/products.json';
import { useEffect, useRef } from 'react';
import { createTimeline, stagger } from 'animejs';

export default function Home() {
  usePageMetadata({
    title: "Light 3D - Premium 3D Printed Goods",
    description: 'Browse our collection of premium 3D printed products. Made to order with quality materials including PLA, PETG, and Resin.',
    ogImage: 'https://images.unsplash.com/photo-1581093458791-9d42e3b6c862?w=1200',
  });

  const featuredProducts = data.products.filter((p) => p.featured);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current && subtitleRef.current && buttonsRef.current) {
      createTimeline()
        .add(titleRef.current, {
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 800,
        })
        .add(subtitleRef.current, {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
        }, '-=400')
        .add(Array.from(buttonsRef.current.children) as HTMLElement[], {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 400,
          delay: stagger(100),
        }, '-=300');
    }
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 
              ref={titleRef}
              className="text-4xl md:text-6xl font-bold mb-6 text-balance"
              style={{ opacity: 0 }}
            >
              Premium 3D Printed Goods, Made to Order
            </h1>
            <p 
              ref={subtitleRef}
              className="text-xl md:text-2xl mb-8 text-primary-100"
              style={{ opacity: 0 }}
            >
              Discover unique, high-quality 3D printed products crafted with precision
              and care. Every item is made specifically for you.
            </p>
            <div ref={buttonsRef} className="flex flex-wrap gap-4">
              <Link to="/shop" style={{ opacity: 0 }}>
                <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Shop Now
                </button>
              </Link>
              <Link to="/custom-lithophane" style={{ opacity: 0 }}>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                  Custom Lithophane
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 48h1440V0c-240 48-480 48-720 48S240 48 0 0v48z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked favorites from our collection
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Custom Lithophane Featured Card */}
          <Link 
            to="/custom-lithophane"
            className="group bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 border-primary-200"
          >
            <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6">
                  <svg className="w-20 h-20 mx-auto mb-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div className="text-4xl font-bold text-primary-600 mb-2">Custom</div>
                  <div className="text-2xl font-semibold text-primary-700">Lithophane</div>
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  ✨ NEW
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                Custom Photo Lithophane
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Transform your favorite photos into stunning 3D printed art pieces with backlighting
              </p>
              <div className="flex items-center justify-between">
                <span className="text-primary-600 font-bold">From €13</span>
                <span className="text-sm text-primary-600 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
                  Customize Now →
                </span>
              </div>
            </div>
          </Link>

          {/* Lithophane Keyring Featured Card */}
          <Link 
            to="/custom-lithophane"
            className="group bg-gradient-to-br from-amber-50 to-orange-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 border-amber-200"
          >
            <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-amber-100 to-orange-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6">
                  <svg className="w-20 h-20 mx-auto mb-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  <div className="text-3xl font-bold text-amber-700 mb-2">Lithophane</div>
                  <div className="text-2xl font-semibold text-amber-800">Keyring</div>
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  🔑 MINI
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                Lithophane Keyring
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Carry your memories everywhere! Compact lithophane keyring with your photo
              </p>
              <div className="flex items-center justify-between">
                <span className="text-amber-600 font-bold">Only €4</span>
                <span className="text-sm text-amber-600 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
                  Order Now →
                </span>
              </div>
            </div>
          </Link>

          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center">
          <Link to="/shop">
            <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
              View All Products
            </button>
          </Link>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600">
              Find exactly what you're looking for
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.categories.map((category) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-200">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Materials & Quality Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Quality Materials, Precision Printing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every product is crafted using premium materials and state-of-the-art 3D printing technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">PLA</h3>
            <p className="text-gray-600">
              Eco-friendly, biodegradable plastic perfect for decorative items and prototypes
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">PETG</h3>
            <p className="text-gray-600">
              Durable, impact-resistant material ideal for functional parts and outdoor use
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Resin</h3>
            <p className="text-gray-600">
              Ultra-high detail for miniatures, figurines, and intricate designs
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Subscribe to our newsletter for new products, special offers, and 3D printing tips
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
