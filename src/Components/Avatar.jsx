import React from "react";
import { useSelector } from "react-redux";

const UserAvatar = () => {
    const profileData = useSelector((state) => state.profileData);
    
    return (
        <span className="user-avatar">
            <img src={(profileData.image !== "" || profileData.image) ? profileData.image : "https://icon-library.com/images/default-user-icon/default-user-icon-7.jpg"} 
                alt="" 
            />
        </span>
    )
}

export default UserAvatar