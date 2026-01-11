import { Link } from 'react-router-dom';
import { useFocusTrap } from '../hooks/useFocusTrap';
import data from '../data/products.json';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const containerRef = useFocusTrap({
    isActive: isOpen,
    onEscape: onClose,
    restoreFocus: true,
  });

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-75 z-40 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        ref={containerRef}
        className="fixed inset-y-0 right-0 max-w-sm w-full bg-slate-900 shadow-xl z-50 md:hidden overflow-y-auto border-l border-slate-800"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <span className="font-display text-xl font-bold text-white">Menu</span>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-blue-400 rounded-full hover:bg-slate-800 transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <Link
              to="/"
              onClick={onClose}
              className="block px-4 py-3 text-base font-medium text-white hover:bg-slate-800 hover:text-blue-400 rounded-lg transition-colors"
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={onClose}
              className="block px-4 py-3 text-base font-medium text-white hover:bg-slate-800 hover:text-blue-400 rounded-lg transition-colors"
            >
              Shop
            </Link>

            {/* Categories */}
            <div className="pt-2">
              <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Categories
              </div>
              {data.categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  onClick={onClose}
                  className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-blue-400 rounded-lg transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <Link
              to="/about"
              onClick={onClose}
              className="block px-4 py-3 text-base font-medium text-white hover:bg-slate-800 hover:text-blue-400 rounded-lg transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={onClose}
              className="block px-4 py-3 text-base font-medium text-white hover:bg-slate-800 hover:text-blue-400 rounded-lg transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/faq"
              onClick={onClose}
              className="block px-4 py-3 text-base font-medium text-white hover:bg-slate-800 hover:text-blue-400 rounded-lg transition-colors"
            >
              FAQ
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
