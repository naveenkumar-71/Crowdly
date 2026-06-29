import { useState } from "react";

function PostComment({ comments = [] }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {comments.length === 0 && (
        <p className="text-center text-gray-400 text-sm mt-10">
          No comments yet. Be the first!
        </p>
      )}

      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

function CommentItem({ comment }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex items-start justify-between gap-2">
      <div className="flex-1">
        <p className="text-sm">
          <span className="font-semibold mr-1">{comment.user}</span>
          {comment.text}
        </p>
        {comment.time && (
          <p className="text-xs text-gray-400 mt-1">{comment.time}</p>
        )}
      </div>

      {/* Mini like button */}
      <button
        onClick={() => setLiked(!liked)}
        className="mt-1 cursor-pointer hover:opacity-60 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`w-3.5 h-3.5 ${liked ? "fill-red-500 stroke-red-500" : "fill-none stroke-gray-400 stroke-2"}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button>
    </div>
  );
}

export default PostComment;
