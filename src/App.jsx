import Login from "./routes/Login";
import { Route, Routes, Navigate } from 'react-router-dom';
import Register from "./routes/Register";
import Profile from "./routes/Profile";
import Forgotpassword from "./routes/Forgotpassword";
import VerifyOtp from "./routes/VerifyOtp";
import Changepassword from "./routes/Changepassword";
import Home from "./routes/Home";
import Reels from "./routes/Reels";
import {Outlet} from 'react-router-dom';


const ProtectedRoute = () => {
  const token = localStorage.getItem("accessToken");
  return token ? <Outlet/> : <Navigate to="/" replace />; 
};

function App(){
 return(

 <Routes>
  <Route element={<ProtectedRoute/>}> {/*protected routes*/}
       <Route path='/home' element={<Home/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/reels' element={<Reels/>}></Route>
      {/* <Route path='/profile/:userId' element={<Profile/>}></Route> */}
  </Route> 

   
  <Route path='/' element={<Login/>}></Route>
  <Route path='/register' element={<Register/>}></Route>
  <Route path='/forgotpassword' element={<Forgotpassword/>}></Route>
  <Route path='/verify-otp' element={<VerifyOtp/>}></Route>

  <Route path='/changepassword' element={<Changepassword/>}></Route>
  
 </Routes>  


);
}
export default App;