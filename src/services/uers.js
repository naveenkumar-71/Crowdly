const BASE_URL = "http://localhost:3001";//json server
// const BASE_URL = "http://localhost:3000";//backend port


export const getUserById = async (id) => {
  //for json server
  const res = await fetch(`${BASE_URL}/users/${id}`);

  // const res = await fetch(`${BASE_URL}/api/auth/users/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
};