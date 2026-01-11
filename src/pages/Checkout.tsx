import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import { formatPrice, generateOrderReference } from '../utils/helpers';
import { CustomerInfo, ShippingAddress, CartItem } from '../types';
import { logAnalyticsEvent } from '../utils/analytics';

// Fixed ACS delivery charge
const ACS_DELIVERY_CHARGE = 3;

export default function Checkout() {
  usePageMetadata({
    title: 'Checkout - Light 3D',
    description: 'Complete your order request',
  });

  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [orderReference, setOrderReference] = useState('');
  
  // Store order details for confirmation page
  const [savedOrderDetails, setSavedOrderDetails] = useState<{
    items: CartItem[];
    subtotal: number;
    total: number;
  } | null>(null);

  // Form state
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Cyprus',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (items.length === 0 && !orderReference) {
    navigate('/cart');
    return null;
  }

  const subtotal = getCartTotal();
  const shippingCost = ACS_DELIVERY_CHARGE;
  const total = subtotal + shippingCost;

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!customerInfo.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!customerInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!customerInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!customerInfo.phone.trim()) newErrors.phone = 'Phone number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!shippingAddress.address.trim()) newErrors.address = 'Address is required';
    if (!shippingAddress.city.trim()) newErrors.city = 'City is required';
    if (!shippingAddress.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmitOrder = async () => {
    setSubmitting(true);

    // Save order details before clearing cart
    const orderSubtotal = getCartTotal();
    const orderTotal = orderSubtotal + shippingCost;
    setSavedOrderDetails({
      items: [...items],
      subtotal: orderSubtotal,
      total: orderTotal,
    });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const reference = generateOrderReference();
    // Order object prepared for future backend integration
    void {
      orderReference: reference,
      customerInfo,
      shippingAddress,
      deliveryMethod: 'ACS Cash on Delivery',
      items,
      subtotal: orderSubtotal,
      shippingCost,
      total: orderTotal,
      createdAt: new Date().toISOString(),
    };

    setOrderReference(reference);
    
    // Analytics event
    logAnalyticsEvent('submit_order_request', {
      order_reference: reference,
      total: orderTotal,
      items_count: items.length,
    });

    clearCart();
    setSubmitting(false);
  };

  const generateEmailBody = () => {
    if (!savedOrderDetails) return '';
    
    let body = `Order Request: ${orderReference}\n\n`;
    body += `Customer Information:\n`;
    body += `${customerInfo.firstName} ${customerInfo.lastName}\n`;
    body += `${customerInfo.email}\n`;
    body += `${customerInfo.phone}\n\n`;
    body += `Shipping Address:\n`;
    body += `${shippingAddress.address}\n`;
    body += `${shippingAddress.city} ${shippingAddress.zipCode}\n`;
    body += `${shippingAddress.country}\n\n`;
    body += `Delivery Method: ACS Cash on Delivery\n`;
    body += `Payment: Cash on Delivery (pay at ACS)\n\n`;
    body += `Items:\n`;
    savedOrderDetails.items.forEach((item) => {
      body += `- ${item.product.name} x${item.quantity}\n`;
      body += `  Material: ${item.selectedMaterial.name}\n`;
      body += `  Color: ${item.selectedColor.name}\n`;
      body += `  Size: ${item.selectedSize.name}\n`;
      if (item.customizationNote) {
        body += `  Note: ${item.customizationNote}\n`;
      }
      body += `\n`;
    });
    body += `\nSubtotal: ${formatPrice(savedOrderDetails.subtotal)}\n`;
    body += `ACS Delivery Charge: ${formatPrice(shippingCost)}\n`;
    body += `Total: ${formatPrice(savedOrderDetails.total)}\n\n`;
    body += `Note: Payment will be collected by ACS upon delivery (cash only).`;
    
    return encodeURIComponent(body);
  };

  const copyOrderSummary = () => {
    const body = decodeURIComponent(generateEmailBody());
    navigator.clipboard.writeText(body);
    alert('Order summary copied to clipboard!');
  };

  // Order confirmation view
  if (orderReference && savedOrderDetails) {
    return (
      <div className="min-h-screen bg-slate-900 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-900/30 border border-green-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-4">
              Order Request Submitted!
            </h1>
            <p className="text-lg text-slate-300 mb-2">
              Your order reference number is:
            </p>
            <p className="text-2xl font-mono font-bold text-blue-400 mb-8">
              {orderReference}
            </p>
            
            <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-6 mb-8 text-left">
              <h2 className="font-semibold text-white mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm text-slate-300">
                <p><strong>Customer:</strong> {customerInfo.firstName} {customerInfo.lastName}</p>
                <p><strong>Email:</strong> {customerInfo.email}</p>
                <p><strong>Phone:</strong> {customerInfo.phone}</p>
                <p><strong>Shipping:</strong> {shippingAddress.address}, {shippingAddress.city} {shippingAddress.zipCode}, {shippingAddress.country}</p>
                <p><strong>Items:</strong> {savedOrderDetails.items.length}</p>
                <p className="text-lg font-bold text-white pt-2"><strong>Total:</strong> {formatPrice(savedOrderDetails.total)}</p>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={`mailto:gelo.designs3d@gmail.com?subject=Order Request ${orderReference}&body=${generateEmailBody()}`}
                className="block w-full"
              >
                <Button size="lg" className="w-full">
                  Send Request via Email
                </Button>
              </a>
              <Button
                onClick={copyOrderSummary}
                variant="outline"
                size="lg"
                className="w-full"
              >
                Copy Order Summary
              </Button>
              <Button
                onClick={() => navigate('/')}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                Return to Home
              </Button>
            </div>

            <p className="mt-6 text-sm text-slate-400">
              We'll review your request and contact you within 1-2 business days to confirm details. Your order will be delivered via ACS with Cash on Delivery payment (€3 delivery charge).
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Multi-step checkout form
  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-black text-white mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        step >= s
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-700 text-slate-400'
                      }`}
                    >
                      {s}
                    </div>
                    {s < 3 && (
                      <div
                        className={`w-12 md:w-24 h-1 mx-2 ${
                          step > s ? 'bg-blue-600' : 'bg-slate-700'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs md:text-sm text-slate-400">
                <span>Customer</span>
                <span>Shipping</span>
                <span>Review</span>
              </div>
            </div>

            {/* Form Content */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              {/* Step 1: Customer Information */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6">Customer Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={customerInfo.firstName}
                        onChange={(e) =>
                          setCustomerInfo({ ...customerInfo, firstName: e.target.value })
                        }
                        className={`w-full bg-slate-900 border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.firstName ? 'border-red-500' : 'border-slate-600'
                        }`}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={customerInfo.lastName}
                        onChange={(e) =>
                          setCustomerInfo({ ...customerInfo, lastName: e.target.value })
                        }
                        className={`w-full bg-slate-900 border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.lastName ? 'border-red-500' : 'border-slate-600'
                        }`}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) =>
                          setCustomerInfo({ ...customerInfo, email: e.target.value })
                        }
                        className={`w-full bg-slate-900 border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.email ? 'border-red-500' : 'border-slate-600'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) =>
                          setCustomerInfo({ ...customerInfo, phone: e.target.value })
                        }
                        className={`w-full bg-slate-900 border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.phone ? 'border-red-500' : 'border-slate-600'
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping Address */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6">Shipping Address</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.address}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, address: e.target.value })
                        }
                        className={`w-full bg-slate-900 border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.address ? 'border-red-500' : 'border-slate-600'
                        }`}
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-400">{errors.address}</p>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          value={shippingAddress.city}
                          onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, city: e.target.value })
                          }
                          className={`w-full bg-slate-900 border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.city ? 'border-red-500' : 'border-slate-600'
                          }`}
                        />
                        {errors.city && (
                          <p className="mt-1 text-sm text-red-400">{errors.city}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          value={shippingAddress.zipCode}
                          onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, zipCode: e.target.value })
                          }
                          className={`w-full bg-slate-900 border rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.zipCode ? 'border-red-500' : 'border-slate-600'
                          }`}
                        />
                        {errors.zipCode && (
                          <p className="mt-1 text-sm text-red-400">{errors.zipCode}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        value="Cyprus"
                        disabled
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-slate-400 cursor-not-allowed"
                      />
                      <p className="mt-1 text-sm text-slate-500">We currently only ship to Cyprus</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-6">Review Your Order</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-white mb-2">Customer Information</h3>
                      <div className="text-sm text-slate-400 space-y-1">
                        <p>{customerInfo.firstName} {customerInfo.lastName}</p>
                        <p>{customerInfo.email}</p>
                        <p>{customerInfo.phone}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">Shipping Address</h3>
                      <div className="text-sm text-slate-400 space-y-1">
                        <p>{shippingAddress.address}</p>
                        <p>{shippingAddress.city} {shippingAddress.zipCode}</p>
                        <p>{shippingAddress.country}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">Order Items ({items.length})</h3>
                      <div className="space-y-2">
                        {items.map((item) => (
                          <div key={item.itemId} className="text-sm text-slate-400 flex justify-between">
                            <span>{item.product.name} x{item.quantity}</span>
                            <span>{formatPrice(
                              (item.product.price +
                                item.selectedMaterial.priceModifier +
                                item.selectedColor.priceModifier +
                                item.selectedSize.priceModifier) *
                              item.quantity
                            )}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex gap-4">
                {step > 1 && (
                  <Button
                    onClick={() => setStep(step - 1)}
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    Back
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    onClick={handleNextStep}
                    size="lg"
                    className="flex-1"
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmitOrder}
                    size="lg"
                    className="flex-1"
                    isLoading={submitting}
                  >
                    {submitting ? 'Submitting...' : 'Submit Order Request'}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 sticky top-20">
              <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Subtotal ({items.length} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-400">
                  <span>ACS Delivery</span>
                  <span>{formatPrice(shippingCost)}</span>
                </div>
                <div className="pt-3 border-t border-slate-700">
                  <div className="flex justify-between text-lg font-bold text-white">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-amber-900/30 border border-amber-700/50 rounded-lg text-sm text-amber-200">
                <strong>💰 Cash on Delivery</strong>
                <p className="mt-2">Payment will be collected by ACS courier upon delivery (cash only). Delivery charge: €3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
