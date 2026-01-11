import { useState } from 'react';
import { usePageMetadata } from '../hooks/usePageMetadata';
import Button from '../components/Button';
import { showToast } from '../components/Toast';

export default function CustomLithophane() {
  usePageMetadata({
    title: 'Custom Lithophane - Light 3D',
    description: 'Create a personalized 3D printed lithophane from your own photos. Perfect gifts for any occasion.',
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    size: 'lithophane',
    quantity: '1',
    addSong: false,
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    if (!formData.name || !formData.email || !formData.phone) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    setSubmitting(true);

    try {
      // Calculate price based on size
      const prices: Record<string, number> = {
        keyring: 4,
        lithophane: 13,
      };
      const songPrice = formData.addSong ? 2 : 0;
      const basePrice = prices[formData.size] * parseInt(formData.quantity);
      const price = basePrice + songPrice;

      // Create email body with all order details
      const emailBody = `
Custom Lithophane Order Request

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CUSTOMER DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ORDER DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type: ${formData.size === 'keyring' ? 'Keyring (4cm × 5cm)' : 'Lithophane (15cm × 15cm)'}
Quantity: ${formData.quantity}
Add Song: ${formData.addSong ? 'Yes (+€2)' : 'No'}
Estimated Price: €${price.toFixed(2)}

⚠️ IMPORTANT: Please attach your image file to this email before sending.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SPECIAL INSTRUCTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.message || 'None'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Note: Delivery charge (€3) will be added to final price.
        `.trim();

        // Create mailto link
        const subject = `Custom Lithophane Order - ${formData.name}`;
        const mailtoLink = `mailto:gelo.designs3d@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        showToast('Opening your email client... Please attach your image before sending!', 'success');
        
        // Show instructions
        setTimeout(() => {
        alert(`📧 Your email client should open now!\n\n✅ IMPORTANT STEPS:\n\n1. Wait for your email app to open\n2. ATTACH your image file\n3. Review the pre-filled details\n4. Click Send\n\nIf the email doesn't open, manually email:\ngelo.designs3d@gmail.com`);
      }, 500);
      
      // Clear form after a delay
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', size: 'lithophane', quantity: '1', addSong: false, message: '' });
        setSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      showToast('An error occurred. Please try again.', 'error');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-black mb-4">Custom Lithophane</h1>
          <p className="text-xl text-slate-300">
            Transform your favorite photos into stunning 3D printed lithophanes
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Info Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">What is a Lithophane?</h2>
            <p className="text-slate-300 mb-4">
              A lithophane is a unique 3D printed art piece that reveals a hidden image when
              backlit. The varying thickness of the material creates beautiful gradients and
              details, turning your favorite photos into stunning decorative pieces.
            </p>

            {/* Image Gallery */}
            <div className="mb-8">
              <h3 className="font-semibold text-white mb-4">📷 Gallery</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <img
                  src="/images/products/lithophane-example-1.webp"
                  alt="Lithophane Example 1"
                  className="w-full rounded-lg shadow-lg aspect-square object-cover border border-slate-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%231e293b" width="400" height="400"/%3E%3Ctext fill="%2394a3b8" font-family="Arial" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ELithophane Example%3C/text%3E%3C/svg%3E';
                  }}
                />
                <img
                  src="/images/products/lithophane-example-2.webp"
                  alt="Lithophane Example 2"
                  className="w-full rounded-lg shadow-lg aspect-square object-cover border border-slate-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%231e293b" width="400" height="400"/%3E%3Ctext fill="%2394a3b8" font-family="Arial" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EBacklit Effect%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              <img
                src="/images/products/lithophane-example-3.webp"
                alt="Lithophane Display Example"
                className="w-full rounded-lg shadow-lg aspect-video object-cover border border-slate-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect fill="%231e293b" width="600" height="400"/%3E%3Ctext fill="%2394a3b8" font-family="Arial" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ELithophane with Stand%3C/text%3E%3C/svg%3E';
                }}
              />
              <p className="text-sm text-slate-500 mt-2 text-center italic">
                Examples: Lithophanes displayed with and without backlighting
              </p>
            </div>

            <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-white mb-3">Pricing</h3>
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex justify-between">
                  <span>• Keyring (4cm × 5cm):</span>
                  <span className="font-semibold text-blue-400">€4</span>
                </div>
                <div className="flex justify-between">
                  <span>• Lithophane (15cm × 15cm):</span>
                  <span className="font-semibold text-blue-400">€13</span>
                </div>
                <div className="flex justify-between">
                  <span>• Add Song Option (Lithophane only):</span>
                  <span className="font-semibold text-blue-400">+€2</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-white mb-3">📸 Photo Guidelines</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• High resolution images work best (minimum 1000px)</li>
                <li>• Good contrast and clear subjects produce better results</li>
                <li>• Portrait photos, landscapes, and pets work wonderfully</li>
                <li>• Avoid overly dark or blurry images</li>
              </ul>
            </div>

            <div className="bg-green-900/30 border border-green-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-white mb-3">✨ Perfect For</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Unique personalized gifts</li>
                <li>• Wedding and anniversary presents</li>
                <li>• Memorial pieces</li>
                <li>• Home decoration</li>
                <li>• Baby photos and family portraits</li>
              </ul>
            </div>
          </div>

          {/* Order Form */}
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Order Your Lithophane</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="size" className="block text-sm font-medium text-slate-300 mb-2">
                  Type *
                </label>
                <select
                  id="size"
                  required
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value, addSong: e.target.value === 'keyring' ? false : formData.addSong })}
                  className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="lithophane">Lithophane (15cm × 15cm) - €13</option>
                  <option value="keyring">Keyring (4cm × 5cm) - €4</option>
                </select>
              </div>

              {formData.size === 'lithophane' && (
                <div>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.addSong}
                      onChange={(e) => setFormData({ ...formData, addSong: e.target.checked })}
                      className="w-4 h-4 text-blue-600 border-slate-600 rounded focus:ring-2 focus:ring-blue-500 bg-slate-900"
                    />
                    <span className="text-sm font-medium text-slate-300">
                      Add Spotify Song Code (+€2)
                    </span>
                  </label>
                  <p className="text-xs text-slate-500 mt-1 ml-7">
                    Include a scannable Spotify code for your favorite song on the lithophane
                  </p>
                </div>
              )}

              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-slate-300 mb-2">
                  Quantity *
                </label>
                <select
                  id="quantity"
                  required
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Special Instructions (Optional)
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Any special requests or notes about your lithophane..."
                  className="w-full bg-slate-900 border border-slate-600 text-white placeholder-slate-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <p className="text-sm text-slate-300">
                  <strong>Estimated Price:</strong>{' '}
                  €
                  {(
                    (formData.size === 'keyring' ? 4 : 13) *
                    parseInt(formData.quantity || '1') +
                    (formData.addSong && formData.size === 'lithophane' ? 2 : 0)
                  ).toFixed(2)}
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  * Delivery charge (€3) will be added at checkout
                </p>
              </div>

              <Button type="submit" size="lg" className="w-full" isLoading={submitting}>
                Request Quote
              </Button>

              <p className="text-xs text-slate-500 text-center">
                📧 Your email client will open with pre-filled order details. Don't forget to attach your image file before sending!
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Submit Your Order</h3>
              <p className="text-sm text-gray-600">
                Fill out the form with your details and upload your favorite photo
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">We Create</h3>
              <p className="text-sm text-gray-600">
                Our team converts your image into a lithophane and 3D prints it with care
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Delivered to You</h3>
              <p className="text-sm text-gray-600">
                Your custom lithophane arrives ready to display (5-10 business days)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
