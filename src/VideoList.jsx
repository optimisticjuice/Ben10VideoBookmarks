// VideoList.js
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { VideoContext } from "./VideoContext";
import VideoPlayer from "./VideoPlayer.jsx";
import { Link } from "react-router-dom";

export default function VideoList() {
  const { dispatch } = useContext(VideoContext);
  const [videos, setVideos] = useState([]);
  const [limit, setLimit] = useState(5); // 👈 Slider-controlled limit
  const [benMore, setBenMore] = useState("");
  const baseSearch = "Ben 10";
  const searchQuery = `${baseSearch} + " " + ${benMore}`;
  useEffect(() => {
    // 🛰️ Fetch videos from Dailymotion's public API
    axios
      .get(
        `https://api.dailymotion.com/videos?fields=id,title,thumbnail_url&limit=${limit}&search=${searchQuery}`
      )
      .then((res) => setVideos(res.data.list));
  }, [limit, searchQuery]); // 👈 Add limit to dependencies

  return (
    <>
      <h1>Ben 10 Videos Fan Page: </h1>
      <input type="text" onChange={(e) => setBenMore(e.target.value)} />
      <div>
        <h2>Select a Video</h2>
        <h4>Number of videos chosen : </h4>

        <input
          type="range"
          min={1}
          max={40}
          value={limit}
          style={{ width: "80%" }}
          onChange={(e) => setLimit(e.target.value)}
        />

        <h4>{limit}</h4>
        <ol>
          {videos.map((video) => (
            <li key={video.id}>
              <img
                src={video.thumbnail_url}
                alt={video.title}
                style={{ width: "15px", height: "20px" }}
                onClick={() =>
                  dispatch({ type: "SET_VIDEO", payload: video.id })
                }
              />
              <button
                onClick={() =>
                  dispatch({ type: "SET_VIDEO", payload: video.id })
                }
              >
                ▶️ {video.title}
              </button>
            </li>
          ))}
        </ol>
      </div>
      <br />
      <VideoPlayer />
      <br />
      <h5>View My Bookmarks Here 👇</h5>
      <p>
        <Link to="/bookmarks">Go to Bookmarks</Link>
      </p>
    </>
  );
}
