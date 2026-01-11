import { useState } from 'react';
import { usePageMetadata } from '../hooks/usePageMetadata';

const faqs = [
  {
    category: 'Orders',
    questions: [
      {
        q: 'How long does it take to receive my order?',
        a: 'All products are made to order. Production time varies by product (typically 3-14 business days), plus 5-7 business days for standard shipping. You\'ll see the specific lead time on each product page.',
      },
      {
        q: 'Can I cancel or modify my order?',
        a: 'Since we start production immediately, we can only accept cancellations or modifications within 24 hours of placing your order. Contact us as soon as possible if you need changes.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Currently we ship to Cyprus. Shipping times vary by location.',
      },
    ],
  },
  {
    category: 'Materials & Quality',
    questions: [
      {
        q: 'What materials do you use?',
        a: 'We use three primary materials: PLA (eco-friendly biodegradable plastic), PETG (durable and impact-resistant), and Resin (high-detail premium finish). Each product page lists available material options.',
      },
      {
        q: 'Are your products safe?',
        a: 'Yes! All our materials are non-toxic and safe for everyday use. PLA is food-safe when properly printed, though we recommend hand washing items that will contact food.',
      },
      {
        q: 'How durable are 3D printed products?',
        a: 'Our products are designed for regular use. PLA items are great for decorative and light-duty applications. PETG offers superior strength and durability for functional parts. Resin provides excellent detail but is more brittle.',
      },
    ],
  },
  {
    category: 'Custom Orders',
    questions: [
      {
        q: 'Can I request a custom design?',
        a: 'Absolutely! Visit our Custom Orders category or contact us directly. We\'ll work with you to understand your vision and provide a quote for your custom piece.',
      },
      {
        q: 'How much do custom orders cost?',
        a: 'Custom order pricing depends on complexity, size, and materials. Simple modifications start around $50, while complex custom designs can range from $150-500+. Contact us for a detailed quote.',
      },
      {
        q: 'Can you match a specific color?',
        a: 'We offer a wide range of standard colors. For custom color matching, contact us with a reference image or Pantone color code, and we\'ll do our best to accommodate.',
      },
    ],
  },
  {
    category: 'Returns & Exchanges',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We accept returns within 30 days of delivery for standard items in unused condition. Custom orders are non-refundable unless there\'s a manufacturing defect.',
      },
      {
        q: 'What if my item arrives damaged?',
        a: 'We package items carefully, but if damage occurs during shipping, contact us within 48 hours with photos. We\'ll send a replacement at no charge.',
      },
      {
        q: 'Can I exchange my item?',
        a: 'Yes! Exchanges for different colors or sizes are accepted within 30 days. Contact us to arrange an exchange. Note that custom items may have different policies.',
      },
    ],
  },
  {
    category: 'Account & Payment',
    questions: [
      {
        q: 'Do I need an account to order?',
        a: 'No, you can checkout as a guest. However, we currently use an order request system where you submit your request and we contact you to finalize payment.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept major credit cards, Ravolut, and bank transfers. Payment details will be provided when we contact you to confirm your order request.',
      },
      {
        q: 'Is my payment information secure?',
        a: 'Absolutely. We use industry-standard encryption and never store your payment information on our servers.',
      },
    ],
  },
];

export default function FAQ() {
  usePageMetadata({
    title: 'FAQ - Light 3D',
    description: 'Frequently asked questions about Light 3D products, orders, and services.',
  });

  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleQuestion = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-black mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-300">
            Find answers to common questions about our products and services
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {faqs.map((category, catIndex) => (
          <div key={catIndex} className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">{category.category}</h2>
            <div className="space-y-4">
              {category.questions.map((faq, qIndex) => {
                const id = `${catIndex}-${qIndex}`;
                const isOpen = openIndex === id;
                
                return (
                  <div
                    key={id}
                    className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-700 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="font-semibold text-white pr-8">{faq.q}</span>
                      <svg
                        className={`flex-shrink-0 w-5 h-5 text-slate-400 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-4 text-slate-300">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="mt-12 p-6 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-700/50 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-white mb-2">
            Still have questions?
          </h3>
          <p className="text-slate-300 mb-4">
            We're here to help! Contact our support team for personalized assistance.
          </p>
          <a
            href="/contact"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
