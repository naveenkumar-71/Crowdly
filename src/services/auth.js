const BASE_URL = "http://localhost:3000";

//register
export const registerUser = async (formData) => {
  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registration failed");
  }

  return response.json();
};

//login
export const loginUser = async (formData) => {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return response.json();
};

//google login
export const googleLogin = async (token) => {
  const response = await fetch(`${BASE_URL}/api/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("Google login API error:", error);
    throw new Error(error.message || "Google authentication failed");
  }

  return response.json();
};

//forgot password
export const forgotPassword = async (email) => {
  const response = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to send OTP");
  }

  return response.json();
};

//verify reset otp
export const verifyResetOtp = async (email, otp) => {
  const response = await fetch(`${BASE_URL}/api/auth/verify-reset-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Invalid or expired OTP");
  }

  return response.json();
};

//reset password
export const resetPassword = async (email, newPassword) => {
  const response = await fetch(`${BASE_URL}/api/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, newPassword }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to reset password");
  }

  return response.json();
};

//refresh access token
export const refreshAccessToken = async (refreshToken) => {
  const response = await fetch(`${BASE_URL}/api/auth/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to refresh token");
  }

  return response.json();
};

//logout
export const logoutUser = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${BASE_URL}/api/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  return response.json();
};
