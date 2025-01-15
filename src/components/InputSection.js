import React, { useState, useEffect } from "react";
import "./InputSection.css";
import Avatar from "@mui/material/Avatar";
import { FaVideo, FaPhotoVideo, FaSmile } from "react-icons/fa";
import { db, auth } from "../firebase";
import { collection, doc, getDoc, addDoc, serverTimestamp } from "firebase/firestore";

const InputSection = ({ refreshFeed }) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/40");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, "users", user.uid); // Reference to the user's document in Firestore
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            setProfilePic(userData.avatar || "https://via.placeholder.com/40"); // Update profile picture
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No user logged in!");

      // Reference the global "posts" collection
      const postsRef = collection(db, "posts");
      await addDoc(postsRef, {
        userId: user.uid, // Store the user ID
        message: message || null,
        image: image || null,
        timestamp: serverTimestamp(),
      });

      // Reset input fields
      setMessage("");
      setImage("");

      // Notify the parent component to refresh the feed
      if (refreshFeed) refreshFeed();

      alert("Post added successfully!");
    } catch (error) {
      console.error("Error adding post:", error);
      alert("Error adding post: " + error.message);
    }
  };

  return (
    <div className="feed__inputContainer">
      <div className="feed__avatarAndForm">
        <Avatar src={profilePic} alt="Profile" className="feed__avatar" />
        <form className="feed__form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="What's on your mind?"
            className="feed__input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image URL (Optional)"
            className="feed__imageInput"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <button type="submit" className="feed__submitButton" style={{ display: "none" }}>
            Post
          </button>
        </form>
      </div>
      <div className="feed__actions">
        <div className="feed__action">
          <FaVideo className="feed__icon feed__icon--red" />
          <span>Live Video</span>
        </div>
        <div className="feed__action">
          <FaPhotoVideo className="feed__icon feed__icon--green" />
          <span>Photo/Video</span>
        </div>
        <div className="feed__action">
          <FaSmile className="feed__icon feed__icon--yellow" />
          <span>Feeling/Activity</span>
        </div>
      </div>
    </div>
  );
};

export default InputSection;
