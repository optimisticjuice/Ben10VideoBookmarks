import { useRef, useContext } from "react";
import { VideoContext } from "./VideoContext";
import axios from "axios";

export default function VideoPlayer() {
  const iframeRef = useRef(null);
  const { state, dispatch } = useContext(VideoContext);

  const addBookmark = async () => {
    // ⚡ Assume 10s offset for demo (could use Dailymotion's SDK/postMessage)
    const currentTime = Math.floor(Math.random() * 100);
    dispatch({ type: "ADD_BOOKMARK", payload: currentTime });
    await axios.post("/api/bookmarks", { time: currentTime });
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
