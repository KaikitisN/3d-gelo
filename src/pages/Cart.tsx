import { Link } from 'react-router-dom';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import { formatPrice } from '../utils/helpers';
import { showToast } from '../components/Toast';

export default function Cart() {
  usePageMetadata({
    title: 'Shopping Cart - Light 3D',
    description: 'Review your cart items before checkout',
  });

  const {
    items,
    removeFromCart,
    updateQuantity,
    updateCustomization,
    clearCart,
    getCartTotal,
  } = useCart();

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      showToast('Cart cleared', 'info');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center px-4">
          <svg
            className="mx-auto h-24 w-24 text-slate-600 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
          <p className="text-slate-400 mb-6">Add some products to get started!</p>
          <Link to="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = 3; // ACS delivery charge
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-4xl font-black text-white">Shopping Cart</h1>
          {items.length > 0 && (
            <button
              onClick={handleClearCart}
              className="text-red-400 hover:text-red-300 text-sm font-medium"
            >
              Clear Cart
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const itemPrice =
                item.product.price +
                item.selectedMaterial.priceModifier +
                item.selectedColor.priceModifier +
                item.selectedSize.priceModifier;
              const itemTotal = itemPrice * item.quantity;

              return (
                <div
                  key={item.itemId}
                  className="bg-slate-800 rounded-lg border border-slate-700 p-6"
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <Link
                      to={`/product/${item.product.id}`}
                      className="flex-shrink-0"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link
                            to={`/product/${item.product.id}`}
                            className="text-lg font-semibold text-white hover:text-blue-400"
                          >
                            {item.product.name}
                          </Link>
                          <div className="mt-2 space-y-1 text-sm text-slate-400">
                            <p>Material: {item.selectedMaterial.name}</p>
                            <p>Color: {item.selectedColor.name}</p>
                            <p>Size: {item.selectedSize.name}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.itemId)}
                          className="text-red-400 hover:text-red-300 p-2"
                          aria-label="Remove item"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Customization Note */}
                      {item.customizationNote && (
                        <div className="mt-3 p-2 bg-blue-900/30 border border-blue-700/50 rounded text-sm text-blue-200">
                          <strong>Note:</strong> {item.customizationNote}
                        </div>
                      )}

                      <div className="mt-3">
                        <label className="block text-sm text-slate-400 mb-1">
                          Edit customization:
                        </label>
                        <textarea
                          value={item.customizationNote}
                          onChange={(e) =>
                            updateCustomization(item.itemId, e.target.value)
                          }
                          placeholder="Add customization note..."
                          className="w-full text-sm bg-slate-900 border border-slate-600 text-white placeholder-slate-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={2}
                        />
                      </div>

                      {/* Quantity and Price */}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.itemId, item.quantity - 1)
                            }
                            className="px-3 py-1 border border-slate-600 bg-slate-800 text-white rounded hover:bg-slate-700"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.itemId,
                                parseInt(e.target.value) || 1
                              )
                            }
                            className="w-16 text-center bg-slate-900 border border-slate-600 text-white rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            min="1"
                          />
                          <button
                            onClick={() =>
                              updateQuantity(item.itemId, item.quantity + 1)
                            }
                            className="px-3 py-1 border border-slate-600 bg-slate-800 text-white rounded hover:bg-slate-700"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-white">
                            {formatPrice(itemTotal)}
                          </p>
                          <p className="text-sm text-slate-400">
                            {formatPrice(itemPrice)} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 sticky top-20">
              <h2 className="text-xl font-bold text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal ({items.length} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>ACS Delivery</span>
                  <span className="font-medium">
                    {formatPrice(shipping)}
                  </span>
                </div>
                <div className="pt-3 border-t border-slate-700">
                  <div className="flex justify-between text-lg font-bold text-white">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <Link to="/checkout">
                <Button size="lg" className="w-full mb-3">
                  Proceed to Checkout
                </Button>
              </Link>
              <Link to="/shop">
                <Button variant="outline" size="lg" className="w-full">
                  Continue Shopping
                </Button>
              </Link>

              <div className="mt-6 p-4 bg-amber-900/30 border border-amber-700/50 rounded-lg">
                <p className="text-sm text-amber-200">
                  <strong>💰 Cash on Delivery:</strong> Payment collected by ACS courier upon delivery (cash only). €3 delivery charge included.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
