// Root application component wiring up routes and context
import { Routes, Route } from "react-router-dom";
import VideoProvider from "./VideoProvider.jsx";
import BookmarkVideos from "./BookmarkVideos";
import VideoList from "./VideoList.jsx";

export default function App() {
  return (
    // ✅ Wrap app in our VideoProvider for context
    <VideoProvider>
      <Routes>
        <Route path="/" element={<VideoList />} />
        <Route path="/bookmarks" element={<BookmarkVideos />} />
      </Routes>
    </VideoProvider>
  );
}
