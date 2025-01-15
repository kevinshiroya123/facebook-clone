import React, { useEffect, useState } from "react";
import "./Header.css";
import { FaFacebook, FaCommentAlt, FaBell, FaCaretDown, FaSearch, FaHome, FaFlag, FaVideo, FaStore, FaUsers, FaPlus } from "react-icons/fa";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; // Import Firestore and Firebase auth

const Header = ({ handleLogout }) => {
    const [userName, setUserName] = useState("Loading...");
    const [userAvatar, setUserAvatar] = useState(null); // State to hold user's avatar

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userRef = doc(db, "users", user.uid); // Reference to user's document
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        const userData = userSnap.data();
                        setUserName(userData.name || "User"); // Set user's name
                        setUserAvatar(userData.avatar || null); // Set user's avatar
                    } else {
                        console.error("No such user document!");
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const getInitial = (name) => {
        return name ? name.charAt(0).toUpperCase() : "?";
    };

    return (
        <div className="header">
            {/* Left Section */}
            <div className="header__left">
                <FaFacebook className="header__logo" />
                <div className="header__searchWrapper">
                    <FaSearch className="header__searchIcon" />
                    <input type="text" placeholder="Search Facebook" className="header__search" />
                </div>
            </div>

            <div className="header__middle">
                <div className="header__icon">
                    <FaHome />
                </div>
                <div className="header__icon">
                    <FaFlag />
                </div>
                <div className="header__icon">
                    <FaVideo />
                </div>
                <div className="header__icon">
                    <FaStore />
                </div>
                <div className="header__icon">
                    <FaUsers />
                </div>
            </div>

            {/* Right Section */}
            <div className="header__right">
                {userAvatar ? (
                    <img
                        src={userAvatar}
                        alt="Profile"
                        className="header__profilePic"
                    />
                ) : (
                    <div className="header__profilePic header__initial">
                        {getInitial(userName)}
                    </div>
                )}
                <span className="header__username">{userName}</span>
                <div className="header__actionIcons">
                    <FaPlus className="header__iconAction" />
                    <FaCommentAlt className="header__iconAction" />
                    <FaBell className="header__iconAction" />
                    <FaCaretDown className="header__iconAction" />
                    <button className="header__logoutButton" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
