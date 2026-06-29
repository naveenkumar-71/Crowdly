import { useState } from "react";
import PostHeader from "./PostHeader";
import PostComment from "./PostComment";
import PostFooter from "./PostFooter";

function PostModel({ image, username, likes = 0, onClose }) {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "uuuu",
      text: "wowwwwww",
      time: "2h",
    },
    {
      id: 2,
      user: "uuuu2",
      text: "love this!",
      time: "1h",
    },
  ]);

  const handleAddComment = (text) => {
    const newComment = {
      id: Date.now(),
      user: "you",
      text,
      time: "now",
    };
    setComments((prev) => [...prev, newComment]);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex justify-center items-center bg-black/50 z-50 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded bg-white flex w-[60vw] h-[90vh]"
      >
        {/* Left — image */}
        <div className="w-1/2  flex justify-center object-cover bg-black">
          <img src={image} className="max-w-full max-h-full object-contain" />
        </div>

        {/* Right — header, comments, footer */}
        <div className="w-1/2 h-full flex flex-col bg-white text-black">
          <PostHeader username={username} image={image} />
          <PostComment comments={comments} />
          <PostFooter
            likes={likes}
            commentCount={comments.length}
            onAddComment={handleAddComment}
          />
        </div>
      </div>
    </div>
  );
}

export default PostModel;
