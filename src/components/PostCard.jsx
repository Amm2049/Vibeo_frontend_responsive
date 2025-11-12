import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 transition-transform hover:shadow-md">
      {/* Header */}
      <div className="flex items-center p-4">
        <img
          src={post.user.avatar}
          alt={post.user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-3">
          <Link
            to={`/post/${post.id}`}
            className="font-semibold text-gray-900 hover:text-blue-600"
          >
            {post.user.name}
          </Link>
          <p className="text-xs text-gray-500">{post.timestamp}</p>
        </div>
      </div>

      {/* Image */}
      <Link to={`/post/${post.id}`}>
        <img
          src={post.image}
          alt="Post"
          className="w-full h-auto max-h-[700px] object-cover cursor-pointer"
        />
      </Link>

      {/* Actions */}
      <div className="p-4">
        <div className="flex space-x-4 mb-3">
          <button className="text-gray-700 hover:text-red-500 transition-colors">
            ❤️ {post.likes}
          </button>
          <button className="text-gray-700 hover:text-blue-500 transition-colors">
            💬 {post.comments}
          </button>
          <button className="text-gray-700 hover:text-green-500 ml-auto">
            ↗️
          </button>
        </div>

        {/* Caption */}
        <p className="text-gray-900">
          <span className="font-semibold mr-2">{post.user.name}</span>
          {post.caption}
        </p>
      </div>
    </div>
  );
}
