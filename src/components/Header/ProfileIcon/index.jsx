import { useState, useEffect } from "react";
import profileImagePlaceholder from "../../../assets/profile-icon-placeholder.webp";

export default function ProfileIcon(){
    const [profileImage, setProfileImage] = useState(null);
    
    useEffect(() => {
        setProfileImage(JSON.parse(localStorage.getItem('avatar')))
    });

    return (
        <div className="profile-icon-container">
            <img 
                className="profile-icon-img" 
                src={profileImage ? profileImage : profileImagePlaceholder}
            />
        </div>
    )
}