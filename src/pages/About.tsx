import { usePageMetadata } from '../hooks/usePageMetadata';

export default function About() {
  usePageMetadata({
    title: 'About Us - Light 3D',
    description: 'Learn about Light 3D and our commitment to quality 3D printed products.',
  });

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-black mb-4">About Light 3D</h1>
          <p className="text-xl text-slate-300">
            Crafting premium 3D printed products with passion and precision
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
          <p className="text-slate-300 mb-6">
            Light 3D was founded with a simple mission: to make high-quality, custom 3D printed
            products accessible to everyone. What started as a hobby in a small workshop has grown into
            a passion-driven business dedicated to bringing your ideas to life.
          </p>

          <h2 className="text-3xl font-bold text-white mb-6 mt-12">Our Commitment</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Quality First</h3>
              <p className="text-slate-300">
                Every product is carefully crafted using premium materials and state-of-the-art 3D
                printing technology. We inspect each item to ensure it meets our high standards.
              </p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Made to Order</h3>
              <p className="text-slate-300">
                All our products are made specifically for you. This approach reduces waste and allows
                us to offer customization options that make your purchase truly unique.
              </p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Sustainable Materials</h3>
              <p className="text-slate-300">
                We prioritize eco-friendly materials like PLA, which is biodegradable and derived from
                renewable resources. Sustainability is at the heart of what we do.
              </p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Customer Focused</h3>
              <p className="text-slate-300">
                Your satisfaction is our top priority. We work closely with you to ensure every detail
                is perfect, from initial design to final delivery.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-6">What We Offer</h2>
          <p className="text-slate-300 mb-6">
            From desk accessories to decorative pieces, gaming gear to custom orders, we offer a wide
            range of 3D printed products. Each category is carefully curated to provide functional,
            beautiful items that enhance your daily life.
          </p>
          <p className="text-slate-300 mb-6">
            Can't find what you're looking for? Our custom design service allows you to work directly
            with our team to create something completely unique.
          </p>

          <h2 className="text-3xl font-bold text-white mb-6 mt-12">Get In Touch</h2>
          <p className="text-slate-300">
            Have questions or want to discuss a custom project? We'd love to hear from you.
            Visit our <a href="/contact" className="text-blue-400 hover:text-blue-300 font-medium">contact page</a> to get in touch.
          </p>
        </div>
      </div>
    </div>
  );
}
