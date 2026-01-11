import { Link } from 'react-router-dom';
import { usePageMetadata } from '../hooks/usePageMetadata';

export default function NotFound() {
  usePageMetadata({
    title: '404 - Page Not Found - Light 3D',
    description: 'The page you are looking for does not exist.',
  });

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-display text-9xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-slate-400 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for seems to have wandered off.
          Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all"
          >
            Go Home
          </Link>
          <Link
            to="/shop"
            className="border-2 border-blue-600 text-blue-400 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600/10 transition-all"
          >
            Browse Shop
          </Link>
        </div>
        
        <div className="mt-12">
          <p className="text-sm text-slate-500 mb-4">Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/shop" className="text-blue-400 hover:text-blue-300">Shop All</Link>
            <Link to="/category/desk-organization" className="text-blue-400 hover:text-blue-300">Desk & Organization</Link>
            <Link to="/category/home-decor" className="text-blue-400 hover:text-blue-300">Home Decor</Link>
            <Link to="/about" className="text-blue-400 hover:text-blue-300">About Us</Link>
            <Link to="/contact" className="text-blue-400 hover:text-blue-300">Contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
