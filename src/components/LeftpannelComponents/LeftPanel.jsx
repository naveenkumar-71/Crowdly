import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../../services/auth'
import SideMenuOptions from './SideMenuOptions'
import { GoHome } from "react-icons/go";
import { MdExplore, MdMessage, MdSearch, MdNotifications, MdAddCircle, MdDashboard, MdPerson } from "react-icons/md";

function LeftPanel() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      // even if the server fails, clear local state
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  return (
    <div className='fixed left-0 top-0 h-screen w-[200px] bg-white text-black flex flex-col  '>
      <div className='flex flex-col justify-center flex-1 gap-4 justify-between '>
      <SideMenuOptions text="Home" icon={<GoHome/>} onClick={() => navigate("/home")} />
      <SideMenuOptions text="Reels" icon={<MdExplore/>} onClick={()=>navigate("/reels")}/>
      <SideMenuOptions text="Message" icon={<MdMessage/>}/>
      <SideMenuOptions text="Search" icon={<MdSearch/>}/>
      <SideMenuOptions text="Notification" icon={<MdNotifications/>}/>
      <SideMenuOptions text="Create" icon={<MdAddCircle/>}/>
      <SideMenuOptions text="Dashboard" icon={<MdDashboard/>}/>
      <SideMenuOptions text="Profile" icon={<MdPerson/>} onClick={() => navigate("/profile")} />
      </div>
      <div className="m-4 mt-auto mb-6 cursor-pointer text-red-400 hover:text-red-300 transition" onClick={handleLogout}>
        Logout
      </div>
    </div>
  )
}

export default LeftPanel