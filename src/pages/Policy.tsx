import { useParams } from 'react-router-dom';
import { usePageMetadata } from '../hooks/usePageMetadata';

const policies = {
  'shipping-returns': {
    title: 'Shipping & Returns',
    content: `
## Shipping Policy

### Processing Time
All products are made to order. Processing times vary by product:
- Simple items: 2-4 business days
- Standard items: 3-5 business days  
- Complex/Custom items: 5-10 business days

Processing time is displayed on each product page. Production begins immediately after order confirmation.

### Delivery Method
- **ACS Courier Service**: All orders are delivered via ACS courier
- **Delivery Charge**: €3.00 (fixed charge for all orders)
- **Payment**: Cash on Delivery (COD) - cash only
- **Delivery Time**: Within Cyprus, typically 1-2 business days after production

### Service Area
We currently deliver only within Cyprus. All deliveries are handled by ACS courier service.

### Payment on Delivery
- Payment is collected by the ACS courier upon delivery
- **Cash only** - please have the exact amount ready
- The total amount includes your order total plus €3 delivery charge
- No payment is required before delivery

### Tracking
Once your order is ready for delivery, you'll be notified. The ACS courier will contact you to arrange delivery.

## Returns Policy

### Standard Items
We accept returns within 14 days of delivery for standard catalog items:
- Items must be unused and in original condition
- Contact us before returning any item
- Refunds processed within 5-7 business days
- Return delivery costs are the customer's responsibility

### Custom Orders
Custom and personalized items are non-refundable unless there is a manufacturing defect or error on our part.

### Damaged or Defective Items
If your item arrives damaged or has a manufacturing defect:
- Contact us within 48 hours of delivery
- Provide photos of the damage/defect
- We'll send a replacement at no charge

### How to Initiate a Return
1. Contact us at gelo.designs3d@gmail.com with your order number
2. Wait for return authorization and instructions
3. Arrange return delivery
4. Refund processed upon receipt and inspection

## Exchanges

We're happy to exchange items for different colors, sizes, or materials within 14 days of delivery. Contact us to arrange an exchange.
    `,
  },
  'privacy': {
    title: 'Privacy Policy',
    content: `
## Privacy Policy

**Effective Date: January 1, 2026**

GELO's Designs ("we," "our," or "us") respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal information.

### Information We Collect

**Information You Provide:**
- Name, email, phone number, delivery address
- Order details and customization requests
- Communications with our customer service team

**Automatically Collected Information:**
- Device information (browser type, IP address)
- Usage data (pages visited, time spent on site)
- Cookies and similar tracking technologies

### How We Use Your Information

We use your information to:
- Process and fulfill your orders
- Coordinate delivery with ACS courier service
- Communicate about your orders and provide customer support
- Improve our website and services
- Comply with legal obligations

### Information Sharing

We do not sell your personal information. We may share your information with:
- **Delivery Service:** ACS courier for delivery coordination
- **Legal Requirements:** When required by law or to protect our rights

### Data Security

We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.

### Your Rights

You have the right to:
- Access your personal information
- Correct inaccurate information
- Request deletion of your information
- Object to certain processing of your data

### Cookies

We use cookies to enhance your browsing experience. You can control cookie preferences through your browser settings.

### Children's Privacy

Our website is not intended for children under 13, and we do not knowingly collect information from children.

### Changes to This Policy

We may update this Privacy Policy from time to time. We'll notify you of significant changes by email or through our website.

### Contact Us

For privacy-related questions or requests:
- Email: gelo.designs3d@gmail.com
- Location: Cyprus
    `,
  },
  'terms': {
    title: 'Terms of Service',
    content: `
## Terms of Service

**Last Updated: January 1, 2026**

Please read these Terms of Service ("Terms") carefully before using the GELO's Designs website and services.

### Agreement to Terms

By accessing or using our website and services, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not use our services.

### Use of Our Services

**Eligibility:**
You must be at least 18 years old to make a purchase. By placing an order, you represent that you are of legal age.

**Account Responsibilities:**
- Provide accurate delivery information
- Ensure someone is available to receive the delivery
- Have cash payment ready for the courier

**Prohibited Uses:**
You may not:
- Use our services for unlawful purposes
- Attempt to harm or interfere with our website
- Impersonate others or misrepresent your affiliation
- Violate intellectual property rights

### Orders and Payment

**Order Process:**
- Orders are considered requests until confirmed by us
- We reserve the right to refuse or cancel orders
- Prices are subject to change without notice
- All prices are in Euros (EUR)

**Payment:**
- Payment is Cash on Delivery (COD) only
- Payment collected by ACS courier upon delivery
- Cash payment only - no cards accepted
- €3 delivery charge applies to all orders

**Delivery Area:**
- We deliver only within Cyprus
- All deliveries via ACS courier service

### Intellectual Property

**Our Content:**
All content on our website (text, images, logos, designs) is owned by GELO's Designs and protected by copyright laws. You may not use our content without permission.

**Custom Designs:**
When you request a custom design:
- You grant us a license to create and produce the item
- You retain rights to your submitted ideas/designs
- We may showcase completed custom work in our portfolio

### Product Information

We strive for accuracy in product descriptions and images, but we do not warrant that:
- Product descriptions are error-free
- Colors will be exactly as displayed (monitor variations apply)
- Products will meet your specific requirements

### Limitation of Liability

To the maximum extent permitted by law:
- We are not liable for indirect, incidental, or consequential damages
- Our total liability is limited to the amount you paid for the product
- We do not guarantee uninterrupted or error-free service

### Indemnification

You agree to indemnify GELO's Designs from claims arising from:
- Your violation of these Terms
- Your use of our services
- Your violation of any third-party rights

### Dispute Resolution

**Governing Law:**
These Terms are governed by the laws of the Republic of Cyprus.

### Changes to Terms

We reserve the right to modify these Terms at any time. Changes are effective upon posting. Continued use of our services constitutes acceptance of updated Terms.

### Contact Information

For questions about these Terms:
- Email: gelo.designs3d@gmail.com
- Location: Cyprus

### Severability

If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in effect.
    `,
  },
};

export default function Policy() {
  const { type } = useParams<{ type: string }>();
  const policy = policies[type as keyof typeof policies];

  usePageMetadata({
    title: `${policy?.title || 'Policy'} - GELO's Designs`,
    description: `Read our ${policy?.title.toLowerCase() || 'policy'}.`,
  });

  if (!policy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Policy not found</h1>
          <p className="text-gray-600">The policy you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Simple markdown parser for basic formatting
  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      line = line.trim();
      
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            {line.substring(3)}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            {line.substring(4)}
          </h3>
        );
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <p key={index} className="font-semibold text-gray-900 mt-4 mb-2">
            {line.substring(2, line.length - 2)}
          </p>
        );
      }
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="text-gray-700 ml-6 mb-1">
            {line.substring(2)}
          </li>
        );
      }
      if (line === '') {
        return <div key={index} className="h-4" />;
      }
      return (
        <p key={index} className="text-gray-700 mb-3">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold">{policy.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          {renderContent(policy.content)}
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Questions?</strong> If you have any questions about this policy,
            please <a href="/contact" className="text-primary-600 hover:text-primary-700">contact us</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
