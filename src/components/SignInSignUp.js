import React, { useState } from "react";
import "./SignInSignUp.css";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const SignInSignUp = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // State for user name
  const [isSignUp, setIsSignUp] = useState(false);

  const googleProvider = new GoogleAuthProvider(); // Google Auth Provider

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let authUser;
      if (isSignUp) {
        // Create a new user
        authUser = await createUserWithEmailAndPassword(auth, email, password);
        const userRef = doc(db, "users", authUser.user.uid);
        await setDoc(userRef, {
          name,
          email,
        }); // Save user data in Firestore
        alert("Account created successfully!");
      } else {
        // Sign in existing user
        authUser = await signInWithEmailAndPassword(auth, email, password);

        // Fetch user data from Firestore
        const userRef = doc(db, "users", authUser.user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          console.log("User data:", userSnap.data());
        }
        alert("Signed in successfully!");
      }

      setUser(authUser.user); // Update user state in App.js
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Reference the user's document in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Save user data to Firestore if logging in for the first time
        await setDoc(userRef, {
          name: user.displayName || "Anonymous",
          email: user.email,
          avatar: user.photoURL || "https://via.placeholder.com/40",
        });
      }

      setUser(user); // Update user state in App.js
      alert("Signed in with Google successfully!");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      alert("Failed to sign in with Google: " + error.message);
    }
  };

  return (
    <div className="auth__container">
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <form onSubmit={handleSubmit} className="auth__form">
        {isSignUp && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="auth__button">
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>
      <p onClick={() => setIsSignUp(!isSignUp)} className="auth__toggle">
        {isSignUp
          ? "Already have an account? Sign In"
          : "Don't have an account? Sign Up"}
      </p>
      <button onClick={handleGoogleSignIn} className="auth__googleButton">
        Sign In with Google
      </button>
    </div>
  );
};

export default SignInSignUp;
