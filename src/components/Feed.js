import React, { useState, useEffect } from "react";
import "./Feed.css";
import Stories from "./Stories";
import Post from "./Post";
import InputSection from "./InputSection";
import { db } from "../firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = () => {
    setLoading(true);
    const postsRef = collection(db, "posts");
    const postsQuery = query(postsRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
      setLoading(false);
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = fetchPosts();
    return () => unsubscribe();
  }, []);

  const refreshFeed = () => {
    fetchPosts();
  };

  return (
    <div className="feed">
      <Stories />
      <InputSection refreshFeed={refreshFeed} />
      {loading ? (
        <div className="feed__loading">Loading...</div>
      ) : (
        posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            userId={post.userId}
            timestamp={
              post.timestamp
                ? new Date(post.timestamp.toDate()).toLocaleString()
                : "Just now"
            }
            message={post.message}
            image={post.image}
            refreshFeed={refreshFeed}
          />
        ))
      )}
    </div>
  );
};

export default Feed;
