import { useState } from 'react'
import Input from '../components/InputComponents/Input'
import Button from '../components/ButtonComponents/Button'
import { useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from '../services/auth';

function Changepassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(email, newPassword);
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='min-h-screen bg-white flex-col flex gap-4 justify-center items-center'>
        <h1 className='font-bold text-[25px] text-black'>Create a Strong Password</h1>
        <p className='text-gray-500 text-sm text-center max-w-xs'>
          Your password must be at least 8 characters and should include a combination of numbers, letters and special characters (!$@%).
        </p>
        <Input
        classname="w-[450px] h-[60px]"
          placeholder="New password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={error}
        />
        <Input
        classname="w-[450px] h-[60px]"
          placeholder="Confirm new password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={error}
        />
        <Button size="w-[450px] h-[60px]" text={loading ? "Resetting..." : "Reset Password"} type="submit" disabled={loading} />
      </div>
    </form>
  )
}

export default Changepassword