import React, { useState, useEffect } from 'react';
import Reel from './Reel';
import { getAllReels } from '../../services/reels';

function ReelsFeed() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        setLoading(true);
        const data = await getAllReels();
        setReels(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching reels:", err.message);
        setError("Failed to load reels");
      } finally {
        setLoading(false);
      }
    };

    fetchReels();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <p className="text-white">Loading reels...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
      {reels.length === 0 ? (
        <div className="h-screen flex items-center justify-center bg-black">
          <p className="text-white">No reels yet</p>
        </div>
      ) : (
        reels.map((reel) => (
          <Reel key={reel.id} reel={reel} />
        ))
      )}
    </div>
  );
}

export default ReelsFeed;