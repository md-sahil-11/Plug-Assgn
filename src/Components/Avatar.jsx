import React from "react";
import { useSelector } from "react-redux";

const UserAvatar = () => {
    const profileData = useSelector((state) => state.profileData);
    
    return (
        <span className="user-avatar">
            <img src={profileData.image} 
                alt="" 
            />
        </span>
    )
}

export default UserAvatar