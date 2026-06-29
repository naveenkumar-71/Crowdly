import { useState } from "react";
import Icon from "../Icon";

function ReelFooter({ likes: initialLikes = 0, commentsCount = 0, sharesCount = 0 }) {
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
      navigator.share({ title: "Check out this reel!", url: window.location.href });
    } else {
      console.log("Link copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center">
      {/* Like button */}
      <div className="flex flex-col items-center gap-1">
        <Icon name="heart" filled={liked} onClick={handleLike} className="text-black hover:opacity-70 transition" />
        <span className="text-xs text-black font-medium">{likes.toLocaleString()}</span>
      </div>

      {/* Comment button */}
      <div className="flex flex-col items-center gap-1">
        <Icon name="comment" className="text-black hover:opacity-70 transition" />
        <span className="text-xs text-black font-medium">{commentsCount}</span>
      </div>

      {/* Share button */}
      <div className="flex flex-col items-center gap-1">
        <Icon name="share" onClick={handleShare} className="text-black hover:opacity-70 transition" />
        <span className="text-xs text-black font-medium">{sharesCount}</span>
      </div>

      {/* Bookmark button */}
      <div className="flex flex-col items-center gap-1">
        <Icon name="bookmark" filled={saved} onClick={() => setSaved(!saved)} className="text-black hover:opacity-70 transition" />
      </div>

      {/* More options */}
      <button className="text-black hover:opacity-70 transition">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="6" r="2"/>
          <circle cx="12" cy="12" r="2"/>
          <circle cx="12" cy="18" r="2"/>
        </svg>
      </button>

      {/* Profile picture for liked reel */}
      <div className="mt-2">
        <div className="w-8 h-8 rounded-md border-2 border-black overflow-hidden">
          <img src="https://i.pravatar.cc/150?img=3" alt="profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export default ReelFooter;
