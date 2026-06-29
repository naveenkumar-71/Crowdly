import { useState, useRef } from "react";
import Icon from "../Icon";

function PostFooter({ likes: initialLikes = 0, commentCount = 0, onAddComment }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [commentText, setCommentText] = useState("");
  const commentInputRef = useRef(null);

  const handleLike = () => {
    if (liked) {
      setLikes((prev) => prev - 1);
    } else {
      setLikes((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  const handleCommentClick = () => {
    commentInputRef.current?.focus();
  };

  const handlePostComment = () => {
    const trimmed = commentText.trim();
    if (!trimmed) return;
    onAddComment?.(trimmed);
    setCommentText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handlePostComment();
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: "Check out this post!", url: window.location.href });
    } else {
      
      console.log("Link copied to clipboard!");
    }
  };

  return (
    <div className="border-t flex flex-col p-4 gap-3">
      {/* Action icons row */}
      <div className="flex items-center justify-between">
        {/* Left: like, comment, share */}
        <div className="flex gap-4">
          <Icon name="heart" filled={liked} onClick={handleLike} />
          <Icon name="comment" onClick={handleCommentClick} />
          <Icon name="share" onClick={handleShare} />
        </div>
        {/* Right: save/bookmark */}
        <Icon name="bookmark" filled={saved} onClick={() => setSaved(!saved)} />
      </div>

      {/* Likes count */}
      <p className="text-sm font-semibold">
        {likes.toLocaleString()} {likes === 1 ? "like" : "likes"}
      </p>

      {/* Comment input row */}
      <div className="flex items-center gap-2">
        <input
          ref={commentInputRef}
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 text-sm outline-none bg-transparent placeholder-gray-400"
        />
        {commentText.trim() && (
          <button
            onClick={handlePostComment}
            className="text-sm font-semibold text-blue-500 hover:text-blue-700 cursor-pointer"
          >
            Post
          </button>
        )}
      </div>

      {/* Comment count (if any) */}
      {commentCount > 0 && (
        <p className="text-xs text-gray-400">
          {commentCount} {commentCount === 1 ? "comment" : "comments"}
        </p>
      )}
    </div>
  );
}

export default PostFooter;
