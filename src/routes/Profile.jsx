import profile from "../assets/profile_img.jpg"
import { useState, useEffect } from "react"
import PostModel from "../components/PostComponents/PostModel"
import { useNavigate, useParams } from "react-router-dom"
import LeftPanel from "../components/LeftpannelComponents/LeftPanel"
import { getUserById } from "../services/uers"
import ProfileCard from "../components/ProfileComponents/ProfileCard"
import { getPostsByUserId } from "../services/posts"


function Profile(){
    const { user_id } = useParams(); 
    const [selectedPost,setSelectedPost]=useState()
    const navigate=useNavigate();
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);   
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                // If URL has user_id, use it. Otherwise, use logged-in user's ID
                const idToFetch = user_id || localStorage.getItem("userId")|| localStorage.getItem("tempProfileId");
                
                if (!idToFetch) {
                    console.log("No user ID available");
                    navigate("/");
                    return;
                }
                
                const userData = await getUserById(idToFetch);
                setUser(userData);
                const postsData = await getPostsByUserId(idToFetch);
                setUserPosts(postsData);
                setLoadingPosts(false);
            } catch (err) {
                console.log(err.message);
                setLoadingPosts(false);
            }
        };
        
        fetchUser();
    }, [user_id]); 

    if (!user) return <div>Loading...</div>;

    //if viewing own profile
    const isOwnProfile = !user_id || user_id === localStorage.getItem("userId");


return(<>
<div className="flex bg-white text-gray-300">
    {/* sidepannel */}
            <LeftPanel/>
    {/* main */}
    <div className=" ml-60 pr-50"> 
       <ProfileCard followersCount={user.followersCount} followingCount={user.followingCount} postsCount={user.postsCount} image={user.profilePic} username={user.username} name={user.name} bio={user.bio} isOwnProfile={isOwnProfile}/>   
                            {/* posts */}
                          <div className="border-t  m-3 py-10 flex justify-center grid grid-cols-3 gap-1 " >
                                {loadingPosts ? (
                                    <div className="col-span-3 text-center py-10">Loading posts...</div>
                                ) : userPosts.length === 0 ? (
                                    <div className="col-span-3 text-center py-10 text-gray-500">No posts yet</div>
                                ) : (
                                    userPosts.map((post) => (
                                        <img 
                                            key={post.id}
                                            src={post.image} 
                                            className="w-full h-[300px] object-cover cursor-pointer hover:opacity-90 transition" 
                                            onClick={()=>{setSelectedPost(post)}}
                                        />
                                    ))
                                )}
                            </div>
                            {
                            selectedPost &&
                            <PostModel image={selectedPost} username={user.username}
                             onClose={()=>{setSelectedPost(null)}}/>//passing func as props!
                            }
            </div>
          
        </div>
</>)
}
export default Profile
