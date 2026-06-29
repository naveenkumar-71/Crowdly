import { useState } from 'react'
import Input from '../components/InputComponents/Input'
import Button from '../components/ButtonComponents/Button'
import { useNavigate, useLocation } from "react-router-dom";
import { verifyResetOtp } from '../services/auth';

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (otp.trim().length !== 6) {
      setError("Enter the 6-digit OTP sent to your email");
      return;
    }

    try {
      setLoading(true);
      await verifyResetOtp(email, otp.trim());
      navigate("/changepassword", { state: { email } });
    } catch (err) {
      setError(err.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='min-h-screen flex-col flex gap-4 justify-center items-center bg-gray-900'>
        <h1 className='font-bold text-[25px] text-white'>Enter OTP</h1>
        <p className='text-gray-500 text-sm'>
          A 6-digit OTP was sent to <span className='font-medium text-white'>{email}</span>
        </p>
        <Input
          placeholder="6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          error={error}
        />
        <Button text={loading ? "Verifying..." : "Verify OTP"} type="submit" disabled={loading} />
        <p
          className='text-sm text-blue-500 cursor-pointer'
          onClick={() => navigate("/forgotpassword")}
        >
          Resend OTP
        </p>
      </div>
    </form>
  )
}

export default VerifyOtp
