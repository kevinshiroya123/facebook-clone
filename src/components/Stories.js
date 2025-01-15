import React from "react";
import "./Stories.css";
import Story from "./Story";

const Stories = () => {
  // Example stories data with random images
  const storiesData = [
    {
      profileSrc: "https://randomuser.me/api/portraits/men/32.jpg",
      backgroundImage: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*oM1GuZ0oC3_9v1GfKC2Egg.jpeg",
      title: "John Doe",
    },
    {
      profileSrc: "https://randomuser.me/api/portraits/women/44.jpg",
      backgroundImage: "https://themeisle.com/blog/wp-content/uploads/2024/06/Online-Image-Optimizer-Test-Image-JPG-Version.jpeg",
      title: "Jane Smith",
    },
    {
      profileSrc: "https://randomuser.me/api/portraits/men/73.jpg",
      backgroundImage: "https://www.wearegecko.co.uk/media/50316/mountain-3.jpg",
      title: "Michael Brown",
    },
    {
      profileSrc: "https://randomuser.me/api/portraits/women/18.jpg",
      backgroundImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&s",
      title: "Emily Davis",
    },
    {
      profileSrc: "https://randomuser.me/api/portraits/men/51.jpg",
      backgroundImage: "https://i0.wp.com/picjumbo.com/wp-content/uploads/pink-flower-macro-free-image.jpeg?w=1024&quality=50",
      title: "Chris Wilson",
    },
  ];

  return (
    <div className="stories">
      {storiesData.map((story, index) => (
        <Story
          key={index}
          profileSrc={story.profileSrc}
          backgroundImage={story.backgroundImage}
          title={story.title}
        />
      ))}
    </div>
  );
};

export default Stories;
