import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@mui/material/Avatar";
import { FaThumbsUp, FaComment, FaShare, FaEllipsisV } from "react-icons/fa";
import { db } from "../firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";

const Post = ({ id, userId, timestamp, message, image, refreshFeed }) => {
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/40");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Reference the user's Firestore document
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUserName(userData.name );
          setProfilePic(userData.avatar || "https://via.placeholder.com/40");
        } else {
          console.warn(`User with userId ${userId} does not exist.`);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleDelete = async () => {
    try {
      const postRef = doc(db, "posts", id); // Reference to the specific post
      await deleteDoc(postRef);
      if (refreshFeed) refreshFeed();
      alert("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post: " + error.message);
    } finally {
      setShowMenu(false);
    }
  };

  return (
    <div className="post">
      {/* Header */}
      <div className="post__header">
        <Avatar src={profilePic} className="post__avatar" />
        <div className="post__info">
          <h4>{userName}</h4>
          <p>{timestamp}</p>
        </div>
        <div className="post__menuContainer">
          <FaEllipsisV
            className="post__menuIcon"
            onClick={() => setShowMenu((prev) => !prev)}
          />
          {showMenu && (
            <div className="post__menu">
              <button onClick={handleDelete} className="post__menuOption">
                Delete Post
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="post__content">
        <p>{message}</p>
        {image && <img src={image} alt="Post content" className="post__image" />}
      </div>

      {/* Actions */}
      <div className="post__actions">
        <div className="post__action">
          <FaThumbsUp className="post__icon" />
          <span>Like</span>
        </div>
        <div className="post__action">
          <FaComment className="post__icon" />
          <span>Comment</span>
        </div>
        <div className="post__action">
          <FaShare className="post__icon" />
          <span>Share</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
