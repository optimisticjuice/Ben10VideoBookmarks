// Shows thumbnails for all unique videos that have bookmarks
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BookmarkVideos() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    // Grab all saved bookmarks from localStorage in the form
    // of objects like { videoId, time }
    const saved = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    // Only keep unique video IDs so we show each video once
    const uniqueVideoIds = Array.from(new Set(saved.map((b) => b.videoId)));
    setBookmarks(uniqueVideoIds);
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>My Bookmarked Videos</h2>
      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 35,
            justifyItems: "center",
            alignItems: "center",
            margin: "30px 0",
          }}
        >
          {bookmarks.map((videoId, idx) => (
            <div key={idx}>
              <iframe
                width="320"
                height="180"
                title={`Bookmarked Video ${videoId}`}
                src={`https://www.dailymotion.com/embed/video/${videoId}`}
                frameBorder="0"
                allow="autoplay"
                allowFullScreen
                style={{
                  borderRadius: 8,
                  boxShadow: "0 2px 8px #0002",
                }}
              ></iframe>
            </div>
          ))}
        </div>
      )}
      <Link to="/">Back to Video Player</Link>
    </div>
  );
}
