import { useState } from "react";
import Button from "../components/ButtonComponents/Button";
import Input from "../components/InputComponents/Input";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../utils/validation";
import { loginUser, googleLogin } from "../services/auth";
import { GoogleLogin } from "@react-oauth/google";
import logo from "../assets/hero.png"


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log("Google login response:", credentialResponse);
      console.log("Google login initiated...");
      const result = await googleLogin(credentialResponse.credential);
      console.log("Google login successful:", result);
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      localStorage.setItem("userId", result.user.id);
      localStorage.setItem("tempProfileId", "1");
      navigate("/home");
    } catch (error) {
      console.error("Google login error:", error);
      setServerError(error.message || "Google login failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setServerError("");

    const validationErrors = validateLogin({ email, password });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const result = await loginUser({ email: email.trim().toLowerCase(), password });
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      localStorage.setItem("userId", result.user.id);
      localStorage.setItem("tempProfileId", "1"); //for json server
      navigate(`/home`);
    } catch (error) {
      setServerError(error.message || "Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen bg-white text-black flex ">

        <div className="relative border w-1/2 p-10 flex items-center justify-center ">
        <img src={logo} className="absolute w-30 h-30 top-6 left-6"/>
          <div className="flex flex-col p-5">
          <label className="text-2xl font-medium  text-center my-9 mx-7">
  Be there when your{" "}
  <span
    className="
      bg-gradient-to-r
      from-[#753a88]
      to-[#cc2b5e]
      bg-clip-text
      text-transparent
      font-bold
    "
  >
    close friends
  </span>{" "}
  experience everyday moments.
</label>
            <img src={logo} className=" w-[500px] "/>
          </div>
        </div>

        <div className=" bg-white border  shadow-sm w-1/2 flex flex-col justify-center items-center p-10">

          {/* Logo */}
          <h1 className="text-4xl font-bold text-center mb-3  bg-gradient-to-r
    from-[#753a88]
    to-[#cc2b5e]
    bg-clip-text
    text-transparent">
            Crowdly
          </h1>

          <p className="text-center text-gray-500 text-sm mb-8">Log in to continue</p>

          {/* form */}
          <div className="space-y-4">
            <Input
              classname="w-[400px] h-[60px]"
              placeholder="Email or Username"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors(prev => { const n = { ...prev }; delete n.email; return n; }); }}
              error={submitted && errors.email}
            />
            <Input
              classname="w-[400px] h-[60px]"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors(prev => { const n = { ...prev }; delete n.password; return n; }); }}
              error={submitted && errors.password}
            />
            {serverError && (
              <p className="text-red-500 text-sm text-center">{serverError}</p>
            )}
            <Button
              size="w-[400px] h-[60px]"
              text="Log In"
              type="submit"
              disabled={submitted && Object.keys(errors).length > 0}
            />
          </div>

          {/* Forgot Password */}
          <div className="pt-3">
          <Button size="w-[400px] h-[60px]" text="forgot password?" classname="hover:border border-gray-500 text-black" onClick={() => navigate("/forgotpassword")}
           className="text-center text-sm text-blue-500 m-4 cursor-pointer"></Button>
            </div>
          {/* Divider */}
          <div className="flex items-center my-6">
            <div className=" border-t h-px border-white " />
            <span className="px-2 text-gray-400 text-sm">OR</span>
            <div className="border-t h-px border-white " />
          </div>

          {/* login with */}
          <div className="space-y-3">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {setServerError("Google login was cancelled or failed"); console.log("Google login onError");}}
              width="400"
              theme="filled_white"
              text="continue_with"
              shape="rectangular"
            />
          </div>

          {/* Create Account */}
          <div className="mt-8 border-t border-gray-500 pt-6">
            <Button size="w-[400px] h-[60px]" classname="text-center text-sm text-blue-400 border border-blue-400"
              text="Create New Account"
              onClick={() => navigate("/register")}
            />
          </div>

        </div>

      </div>
    </form>
  );
}

export default Login;