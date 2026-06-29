import React from 'react'
import Following from '../Following';
import { useState } from 'react';
import ProfileImg from './ProfileImg';
import Button2 from '../ButtonComponents/Button2';


function ProfileCard(props) {

    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);
  return (
     
        <div className=" m-3 p-5 flex justify-center bg-white text-black">
                    <div className='p-4'>
                    <ProfileImg img={props.image} size="w-40 h-40" />
                    </div>
                    <div className="grid grid-cols-1 gap-3 ">
                        <h1 className="font-bold">{props.username}</h1>
                        <p>{props.name}</p>
                                    <div className=" flex gap-8">
                                        <button >{props.postCount||0} posts</button>
                                        <button onClick={() => setShowFollowers(true)}>{props.followersCount} followers</button>
                                        {showFollowers && (
                                        <Following type="followers"
                                            onClose={() => setShowFollowers(false)}
                                        />
                                        )}
                                        <button onClick={() => setShowFollowing(true)}>{props.followingCount} following</button>
                                        {showFollowing && (
                                        <Following type="following"
                                            onClose={() => setShowFollowing(false)}
                                        />
                                        )}
                                    </div>
                        <p>{props.bio}</p>
                        <div className="flex gap-4 mt-2">
                                    {props.isOwnProfile && <Button2 text="Edit profile" bgcolor="bg-gray-200"/>}
                                    {props.isOwnProfile&& <Button2 text="View archive" bgcolor="bg-gray-200"/>}
                                    {!props.isOwnProfile&& <Button2 text="Follow" bgcolor="bg-blue-300 hover:bg-blue-400" />}
                                    {!props.isOwnProfile&& <Button2 text="Message" bgcolor="bg-gray-200 hover:bg-gray-300" />}
                                        </div>
                    </div>
                </div>
  )
}

export default ProfileCard