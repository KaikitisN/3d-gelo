import { Link } from 'react-router-dom';
import { usePageMetadata } from '../hooks/usePageMetadata';

export default function NotFound() {
  usePageMetadata({
    title: '404 - Page Not Found - GELO\'s Designs',
    description: 'The page you are looking for does not exist.',
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for seems to have wandered off.
          Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Go Home
          </Link>
          <Link
            to="/shop"
            className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            Browse Shop
          </Link>
        </div>
        
        <div className="mt-12">
          <p className="text-sm text-gray-500 mb-4">Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/shop" className="text-primary-600 hover:text-primary-700">Shop All</Link>
            <Link to="/category/desk-organization" className="text-primary-600 hover:text-primary-700">Desk & Organization</Link>
            <Link to="/category/home-decor" className="text-primary-600 hover:text-primary-700">Home Decor</Link>
            <Link to="/about" className="text-primary-600 hover:text-primary-700">About Us</Link>
            <Link to="/contact" className="text-primary-600 hover:text-primary-700">Contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
