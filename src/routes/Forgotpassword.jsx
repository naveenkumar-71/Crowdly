import { useState } from 'react'
import Input from '../components/InputComponents/Input'
import Button from '../components/ButtonComponents/Button'
import { useNavigate } from "react-router-dom";
import { forgotPassword } from '../services/auth';

function Forgotpassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);
      await forgotPassword(email.trim().toLowerCase());
      navigate("/verify-otp", { state: { email: email.trim().toLowerCase() } });
    } catch (err) {
      setError(err.message || "Couldn't send OTP");
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col gap-4 justify-center items-center bg-white h-screen'>
        <h1 className='font-bold text-[25px] text-black'>Find your account</h1>
        <p className='text-gray-500 text-sm'>Enter your email to receive a reset OTP.</p>
        <Input classname="w-[450px] h-[60px] bg-white" type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
        />
        <Button size="w-[450px] h-[60px]" text={loading ? "Sending..." : "Send OTP"} type="submit" disabled={loading} />
      </div>
    </form>
  )
}

export default Forgotpassword