import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Widget from "./components/Widget";
import SignInSignUp from "./components/SignInSignUp";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null); // Store user data
  const [loading, setLoading] = useState(true); // Loading state for app initialization
  const [componentLoading, setComponentLoading] = useState(false); // Loading state for components

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);

        try {
          setComponentLoading(true);
          // Fetch user data from Firestore
          const userRef = doc(db, "users", authUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserData(userSnap.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setComponentLoading(false);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      alert("Error logging out: " + error.message);
    }
  };

  if (loading) {
    return <div className="app__loading">Initializing app...</div>;
  }

  return (
    <div className="app">
      {!user ? (
        <SignInSignUp setUser={setUser} />
      ) : (
        <>
          <div className="app__header">
            {componentLoading ? (
              <div className="app__loading">Loading Header...</div>
            ) : (
              <Header handleLogout={handleLogout} userData={userData} />
            )}
          </div>
          <div className="app__content">
            <div className="app__sidebar">
              {componentLoading ? (
                <div className="app__loading">Loading Sidebar...</div>
              ) : (
                <Sidebar />
              )}
            </div>
            <div className="app__main">
              {componentLoading ? (
                <div className="app__loading">Loading Feed...</div>
              ) : (
                <Feed />
              )}
            </div>
            <div className="app__widget">
              {componentLoading ? (
                <div className="app__loading">Loading Widgets...</div>
              ) : (
                <Widget />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
