import React from 'react';

function ReelHeader({ userAvatar, username, music, caption }) {
  return (
    <div className="text-left">
      {/* User info row */}
      <div className="flex items-center gap-3 mb-3">
        <img 
          src={userAvatar} 
          alt={username} 
          className="w-9 h-9 rounded-full object-cover border border-gray-300"
        />
        <div className="flex items-center gap-2">
          <p className="font-semibold text-sm text-black">{username}</p>
          <button className="text-blue-500 text-xs font-semibold hover:text-blue-600 transition">
            Follow
          </button>
        </div>
      </div>

      {/* Music info */}
      {music && (
        <div className="flex items-center gap-2 mb-2 text-gray-600 text-sm">
          <span className="text-xs">♪</span>
          <span className="truncate">{music}</span>
        </div>
      )}

      {/* Caption */}
      {caption && (
        <div className="text-sm text-gray-800 leading-relaxed">
          {caption}
        </div>
      )}
    </div>
  );
}

export default ReelHeader;
