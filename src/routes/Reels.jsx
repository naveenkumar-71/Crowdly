import React from 'react';
import LeftPanel from '../components/LeftpannelComponents/LeftPanel';
import ReelsFeed from '../components/ReelComponents/ReelsFeed';

function Reels() {
  return (
    <div className="flex h-screen bg-black">
      <LeftPanel />
      <div className="flex-1 ml-[200px]">
        <ReelsFeed />
      </div>
    </div>
  );
}

export default Reels;