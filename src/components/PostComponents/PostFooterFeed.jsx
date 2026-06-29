import { useState } from "react";
import Icon from "../Icon";

function PostFooterFeed({ likes: initialLikes = 0,likesCount, commentsCount = 0, caption, username, timestamp }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => {
    if (liked) {
      setLikes((prev) => prev - 1);
    } else {
      setLikes((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: "Check out this post!", url: window.location.href });
    } else {
      console.log("Link copied to clipboard!");
    }
  };

  return (
    <div className="p-3 flex flex-col gap-2">
      {/* Action icons row */}
      <div className="flex items-center justify-between">
        {/* Left: like, comment, share */}
        <div className="flex gap-3">
            <div className="flex gap-1">
          <Icon name="heart" filled={liked} onClick={handleLike} />
          <p>{likesCount}</p>
          </div>
          <Icon name="comment" />
          <Icon name="share" onClick={handleShare} />
        </div>
        {/* Right: save/bookmark */}
        <Icon name="bookmark" filled={saved} onClick={() => setSaved(!saved)} />
      </div>

      {/* Likes count */}
      <p className="text-sm font-semibold">
        {likes.toLocaleString()} {likes === 1 ? "like" : "likes"}
      </p>

      {/* Caption */}
      <div className="text-sm">
        <span className="font-semibold mr-2">{username}</span>
        {caption}
      </div>

      {/* View comments */}
      {/* {commentsCount > 0 && (
        <button className="text-sm text-gray-500 text-left hover:text-gray-700">
          View all {commentsCount} comments
        </button>
      )} */}

      {/* Timestamp */}
      {timestamp && (
        <p className="text-xs text-gray-400 uppercase">{timestamp}</p>
      )}
    </div>
  );
}

export default PostFooterFeed;
