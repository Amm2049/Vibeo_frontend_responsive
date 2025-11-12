import { useParams, Link } from "react-router-dom";
import { posts } from "../data/posts";

export default function PostDetail() {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="text-center text-gray-500">Post not found</p>
        <Link
          to="/"
          className="block text-center mt-4 text-blue-600 hover:underline"
        >
          ← Back to feed
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center p-4 border-b border-gray-100">
          <img
            src={post.user.avatar}
            alt={post.user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <Link
              to="/"
              className="font-semibold text-gray-900 hover:text-blue-600"
            >
              {post.user.name}
            </Link>
            <p className="text-xs text-gray-500">{post.timestamp}</p>
          </div>
        </div>

        {/* Image */}
        <img
          src={post.image}
          alt="Post"
          className="w-full h-auto max-h-[80vh] object-cover"
        />

        {/* Actions */}
        <div className="p-4">
          <div className="flex space-x-4 mb-4">
            <button className="text-2xl hover:text-red-500 transition-colors">
              ❤️
            </button>
            <button className="text-2xl hover:text-blue-500 transition-colors">
              💬
            </button>
            <button className="text-2xl hover:text-green-500 ml-auto">
              ↗️
            </button>
          </div>

          <p className="text-lg">
            <span className="font-semibold">{post.user.name}</span>{" "}
            {post.caption}
          </p>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-gray-600 font-medium">{post.likes} likes</p>
            <p className="text-gray-500 mt-2">
              View all {post.comments} comments
            </p>
          </div>
        </div>
      </div>

      <Link
        to="/"
        className="mt-6 block text-blue-600 hover:underline text-center"
      >
        ← Back to feed
      </Link>
    </div>
  );
}
