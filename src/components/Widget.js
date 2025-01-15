import React from "react";
import "./Widget.css";

const Widget = () => {
  return (
    <div className="widget">
      <iframe
        title="Facebook News and Articles"
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FFacebook&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
        width="100%"
        height="500"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameBorder="0"
        allow="encrypted-media"
      ></iframe>
    </div>
  );
};

export default Widget;
