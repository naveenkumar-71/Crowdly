import { useState } from "react";
import Button from "../components/ButtonComponents/Button";
import DOB from "../components/DOB";
import Input from "../components/InputComponents/Input";
import { validateRegister } from "../utils/validation";
import { registerUser } from "../services/auth";
import { useNavigate } from "react-router-dom";




function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // errors is an object like { email: "...", password: "..." }
  // empty object = no errors
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setSubmitted(true);

    const validationErrors = validateRegister({
      email,
      username,
      password,
      date,
      month,
      year,
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      console.log("Validation failed:", validationErrors);
      return;
    }

    const formData = {
      email,
      fullName,
      username,
      password,
      dateOfBirth: `${year}-${String(month).padStart(2, "0")}-${String(date).padStart(2, "0")}`,
    };
    
    try{
      const result = await registerUser(formData);
      console.log("registering user")
      localStorage.setItem("accessToken", result.accessToken); // Add
      localStorage.setItem("refreshToken", result.refreshToken); // Add
      localStorage.setItem("userId", result.user.id); // Add
      navigate("/profile");
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen bg-white w-full  flex items-center justify-center bg-[#fafafa]">

        <div className="  p-4 flex flex-col items-center justify-center rounded-xl shadow-sm ">

          {/* Logo */}
          <h1 className="text-4xl text-black font-bold text-center m-3">
            Crowdly
          </h1>

         
          <p className="text-center text-gray-500 text-sm mb-6">
            Sign up to see photos and videos from your friends!
          </p>

          
          <div className="flex flex-col gap-5 text-white">
            <div className="flex flex-col gap-1">

            <p className="text-black">email address</p>
            <Input
            classname="w-[500px] h-[60px]"
              placeholder="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors(prev => { const n = { ...prev }; delete n.email; return n; }); }}
              error={submitted && errors.email}
            /></div>

            <div className="flex flex-col gap-1">
            <p className="text-black">name</p>
            <Input
            classname="w-[500px] h-[60px]"
              placeholder="full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            /></div>


            <div className="flex flex-col gap-1">
              <p className="block  text-black w-full  ">birth date</p>
              <DOB
              classname="w-[500px] h-[60px]"
                date={date}
                setDate={(v) => { setDate(v); setErrors(prev => { const n = { ...prev }; delete n.dob; return n; }); }}
                month={month}
                setMonth={(v) => { setMonth(v); setErrors(prev => { const n = { ...prev }; delete n.dob; return n; }); }}
                year={year}
                setYear={(v) => { setYear(v); setErrors(prev => { const n = { ...prev }; delete n.dob; return n; }); }}
              />
              {submitted && errors.dob && (
                <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
              )}
            </div>


            <div className="flex flex-col gap-1">
            <p className="text-black">user name</p>
            <Input
              classname="w-[500px] h-[60px]"
              placeholder="username"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setErrors(prev => { const n = { ...prev }; delete n.username; return n; }); }}
              error={submitted && errors.username}
            /></div>


            <div className="flex flex-col gap-1">
            <p className="text-black">password</p>
            <Input
            classname="w-[500px] h-[60px]"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors(prev => { const n = { ...prev }; delete n.password; return n; }); }}
              error={submitted && errors.password}
            /></div>



            <Button
            
              text="Create Account"
              type="submit" classname="bg-blue-500 hover:bg-blue-600 text-white" size="w-[500px] h-[60px] "
              disabled={submitted && Object.keys(errors).length > 0}
            />

          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-1" />
            <span className="mx-3 text-gray-400 text-sm">OR</span>
            <hr className="flex-1" />
          </div>

          {/* else login */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <span className="text-blue-500 cursor-pointer font-semibold" onClick={()=> navigate("/")}>
              Log in
            </span>
          </p>

        </div>

      </div>
    </form>
  );
}

export default Register;