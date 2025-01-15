import React from "react";
import "./Sidebar.css";
import {
  FaFlag,
  FaPlus,
  FaUserFriends,
  FaFacebookMessenger,
  FaStore,
  FaVideo,
  FaChevronDown,
} from "react-icons/fa";
import AvatarUploader from "./AvatarUploader";
const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Profile Section */}
      <div className="sidebar__item">
        <AvatarUploader /> {/* Avatar Uploader Component */}
      </div>

      {/* Sidebar Options */}
      <div className="sidebar__item">
        <FaPlus className="sidebar__icon" />
        <span className="sidebar__text">COVID-19 Information Center</span>
      </div>
      <div className="sidebar__item">
        <FaFlag className="sidebar__icon" />
        <span className="sidebar__text">Pages</span>
      </div>
      <div className="sidebar__item">
        <FaUserFriends className="sidebar__icon" />
        <span className="sidebar__text">Friends</span>
      </div>
      <div className="sidebar__item">
        <FaFacebookMessenger className="sidebar__icon" />
        <span className="sidebar__text">Messenger</span>
      </div>
      <div className="sidebar__item">
        <FaStore className="sidebar__icon" />
        <span className="sidebar__text">Marketplace</span>
      </div>
      <div className="sidebar__item">
        <FaVideo className="sidebar__icon" />
        <span className="sidebar__text">Videos</span>
      </div>
      <div className="sidebar__item">
        <FaChevronDown className="sidebar__icon" />
        <span className="sidebar__text">Marketplace</span>
      </div>
    </div>
  );
};

export default Sidebar;
