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
  const lithophaneKeyring = data.products.find((p) => p.id === 'prod-lithophane-keyring');
  const customLithophane = data.products.find((p) => p.id === 'prod-lithophane');
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
    <div className="bg-slate-900">
      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(100, 200, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(100, 200, 255, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}></div>
        </div>
        
        {/* Glowing orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 
              ref={titleRef}
              className="font-display text-5xl md:text-7xl font-black mb-6 text-balance bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent"
              style={{ opacity: 0 }}
            >
              NEXT-GEN 3D PRINTED GOODS
            </h1>
            <p 
              ref={subtitleRef}
              className="text-xl md:text-2xl mb-8 text-slate-300 font-light tracking-wide"
              style={{ opacity: 0 }}
            >
              Experience the future of manufacturing. Precision-crafted 3D printed products
              engineered for tomorrow, delivered today.
            </p>
            <div ref={buttonsRef} className="flex flex-wrap gap-4">
              <Link to="/shop" style={{ opacity: 0 }}>
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-bold hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform">
                  EXPLORE PRODUCTS
                </button>
              </Link>
              <Link to="/custom-lithophane" style={{ opacity: 0 }}>
                <button className="border-2 border-slate-600 text-slate-300 px-8 py-4 rounded-lg font-bold hover:bg-slate-800 hover:border-slate-500 transition-all backdrop-blur-sm">
                  CUSTOM LITHOPHANE
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 48h1440V0c-240 48-480 48-720 48S240 48 0 0v48z"
              fill="#0f172a"
            />
          </svg>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-900">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            FEATURED <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">PRODUCTS</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Cutting-edge designs from our collection
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Custom Lithophane Featured Card */}
          {customLithophane && (
            <Link 
              to="/custom-lithophane"
              className="group bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
                <img
                  src={customLithophane.images[0]}
                  alt={customLithophane.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    ✨ NEW
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {customLithophane.name}
                </h3>
                <p className="text-sm text-slate-400 mb-3">
                  {customLithophane.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-400 font-bold">From €{customLithophane.price}</span>
                  <span className="text-sm text-blue-400 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
                    Customize Now →
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Lithophane Keyring Featured Card */}
          {lithophaneKeyring && (
            <Link 
              to="/custom-lithophane"
              className="group bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl border border-slate-700 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
                <img
                  src={lithophaneKeyring.images[0]}
                  alt={lithophaneKeyring.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    🔑 MINI
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {lithophaneKeyring.name}
                </h3>
                <p className="text-sm text-slate-400 mb-3">
                  {lithophaneKeyring.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-purple-400 font-bold">Only €{lithophaneKeyring.price}</span>
                  <span className="text-sm text-purple-400 font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
                    Order Now →
                  </span>
                </div>
              </div>
            </Link>
          )}

          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center">
          <Link to="/shop">
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-lg font-bold hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform">
              VIEW ALL PRODUCTS
            </button>
          </Link>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="bg-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              SHOP BY <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">CATEGORY</span>
            </h2>
            <p className="text-lg text-slate-300">
              Navigate through our tech-forward collections
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.categories.map((category) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all border border-slate-700 hover:border-slate-600"
              >
                <div className="aspect-video">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="font-display text-xl font-bold mb-1 text-blue-300">{category.name}</h3>
                    <p className="text-sm text-slate-300">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Materials & Quality Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-900">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            ADVANCED <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">MATERIALS</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            State-of-the-art printing technology with aerospace-grade materials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-slate-600 hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-2">PLA</h3>
            <p className="text-slate-400">
              Eco-friendly, biodegradable plastic perfect for decorative items and prototypes
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-slate-600 hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-2">PETG</h3>
            <p className="text-slate-400">
              Durable, impact-resistant material ideal for functional parts and outdoor use
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-slate-600 hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-2">Resin</h3>
            <p className="text-slate-400">
              Ultra-high detail for miniatures, figurines, and intricate designs
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative bg-slate-800 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, rgba(100, 150, 255, 0.5) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-display text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            STAY CONNECTED
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Get exclusive updates on cutting-edge products and breakthrough innovations
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-6 py-4 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-bold hover:from-blue-500 hover:to-indigo-500 transition-all hover:scale-105 transform"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
