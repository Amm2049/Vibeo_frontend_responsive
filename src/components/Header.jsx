import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"
        >
          SocialHub
        </Link>
        <div className="flex space-x-4">
          <button className="text-gray-700 hover:text-gray-900">🔍</button>
          <button className="text-gray-700 hover:text-gray-900">❤️</button>
          <button className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
            U
          </button>
        </div>
      </div>
    </header>
  );
}
