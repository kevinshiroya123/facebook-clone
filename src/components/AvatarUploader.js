import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { db, auth } from "../firebase"; // Import Firestore and Firebase Auth
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FaCog } from "react-icons/fa"; // Settings icon
import "./AvatarUploader.css";

const AvatarUploader = () => {
  const [userAvatar, setUserAvatar] = useState(null); // No default image
  const [userName, setUserName] = useState("Loading...");
  const [uploading, setUploading] = useState(false);
  const [showSettings, setShowSettings] = useState(false); // Toggle settings menu

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser; // Get the current authenticated user
        if (user) {
          const userDoc = doc(db, "users", user.uid); // Reference user's Firestore document by UID
          const userSnap = await getDoc(userDoc);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            setUserName(userData.name || "User"); // Set user's name
            if (userData.avatar) {
              setUserAvatar(userData.avatar); // Set avatar if it exists in Firestore
            }
          } else {
            console.error("No such user document!");
          }
        } else {
          console.error("No authenticated user found!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const compressImage = async (file, maxSizeBytes = 1048576) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          let width = img.width;
          let height = img.height;

          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(img, 0, 0, width, height);

          let quality = 0.9; // Start with 90% quality
          let compressedDataUrl = canvas.toDataURL("image/jpeg", quality);

          // Reduce quality iteratively until size is below the limit
          while ((compressedDataUrl.length * 3) / 4 > maxSizeBytes && quality > 0.1) {
            quality -= 0.1;
            compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
          }

          // Final size validation
          const byteSize = Math.round((compressedDataUrl.length * 3) / 4);
          if (byteSize > maxSizeBytes) {
            reject(new Error("Image cannot be compressed below 1MB."));
          } else {
            resolve(compressedDataUrl);
          }
        };

        img.onerror = (error) => reject(error);
      };

      reader.onerror = (error) => reject(error);
    });
  };

  const handleAvatarChange = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        try {
          setUploading(true);

          // Compress the image before saving
          const compressedImage = await compressImage(file);

          // Save the compressed image to Firestore
          const user = auth.currentUser;
          if (user) {
            const userDoc = doc(db, "users", user.uid);
            await setDoc(
              userDoc,
              { avatar: compressedImage }, // Add/update avatar field
              { merge: true }
            );

            setUserAvatar(compressedImage); // Update the avatar in the UI
            alert("Avatar updated successfully!");
          } else {
            throw new Error("User not authenticated.");
          }
        } catch (error) {
          console.error("Error uploading avatar:", error);
          alert(error.message || "Error uploading avatar.");
        } finally {
          setUploading(false);
        }
      }
    };

    fileInput.click(); // Trigger the file input dialog
  };

  return (
    <div className="avatarUploader">
      <div className="avatarUploader__container">
        <Avatar
          alt={userName}
          src={userAvatar} // Show uploaded image or no image
          className="avatarUploader__avatar"
          style={{
            backgroundColor: userAvatar ? "transparent" : "#ccc", // Placeholder background color
          }}
        >
          {!userAvatar && userName[0]} {/* Show initial if no avatar */}
        </Avatar>
        <span className="avatarUploader__text">{userName}</span>
        <button
          className="avatarUploader__settingsButton"
          onClick={() => setShowSettings(!showSettings)}
        >
          <FaCog />
        </button>
      </div>
      {showSettings && (
        <div className="avatarUploader__settingsMenu">
          <button
            className="avatarUploader__changePictureButton"
            onClick={handleAvatarChange}
          >
            Change Profile Picture
          </button>
        </div>
      )}
      {uploading && <p className="avatarUploader__status">Uploading...</p>} {/* Show upload status */}
    </div>
  );
};

export default AvatarUploader;
