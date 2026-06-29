const BASE_URL = "http://localhost:3001";

export const getAllReels = async () => {
  const res = await fetch(`${BASE_URL}/reels`);
  
  if (!res.ok) {
    throw new Error("Failed to fetch reels");
  }
  
  return res.json();
};