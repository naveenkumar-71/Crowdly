// Register Validation
export const validateRegister = ({
  email,
  username,
  password,
  date,
  month,
  year,
}) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    errors.email = "Please enter a valid email";
  }

  if (!username.trim()) {
    errors.username = "Username is required";
  } else if (username.length < 3) {
    errors.username = "Username must be at least 3 characters";
  }

  if (!password.trim()) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!date || !month || !year) {
    errors.dob = "Please select your full date of birth";
  }

  return errors;
};

// Login Validation
export const validateLogin = ({ email, password }) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    errors.email = "Please enter a valid email";
  }

  if (!password.trim()) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};