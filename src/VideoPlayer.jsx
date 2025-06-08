// Plays the selected video and allows adding bookmarks
import { useRef, useContext } from "react";
import { VideoContext } from "./VideoContext";

export default function VideoPlayer() {
  // Reference to the iframe element so we could access the player API if needed
  const iframeRef = useRef(null);
  const { state, dispatch } = useContext(VideoContext);

  const addBookmark = () => {
    // ⚡ Demo bookmark time value. In a real app we'd read current time from the player
    const currentTime = Math.floor(Math.random() * 100);
    dispatch({ type: "ADD_BOOKMARK", payload: currentTime });

    // Save to localStorage as { videoId, time }
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    if (state.selectedVideo) {
      bookmarks.push({ videoId: state.selectedVideo, time: currentTime });
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  };

  if (!state.selectedVideo) return <p>Select a video first.</p>;

  return (
    <div>
      <iframe
        ref={iframeRef}
        width="100%"
        height="360"
        title="Dailymotion Player"
        src={`https://www.dailymotion.com/embed/video/${state.selectedVideo}`}
        frameBorder="0"
        allow="autoplay"
        allowFullScreen
      ></iframe>
      <button onClick={addBookmark}>➕ Add Ben 10 Bookmark</button>
    </div>
  );
}
