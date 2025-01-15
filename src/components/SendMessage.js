export const SendMessage = (message, image) => {
    const profilePic = "https://via.placeholder.com/40"; // Default profile picture
    const username = "Kevin Shiroya"; // Default username
  
    if (message || image || profilePic) {
      const newPost = {
        profilePic,
        username,
        timestamp: "Just now", // Static timestamp for simplicity
        message,
        image,
      };
  
      return newPost;
    }
  
    return null; // Return null if no valid input
  };
  