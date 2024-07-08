import React from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";

function Youtube() {
  const { id } = useParams();

  const videos = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1 style={{ marginBottom: "50px", textAlign: "center" }}>
        YouTube Video
      </h1>
      <YouTube videoId={id} videos={videos} />
    </div>
  );
}

export default Youtube;
