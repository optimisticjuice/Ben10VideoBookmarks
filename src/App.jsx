import VideoProvider from "./VideoProvider.jsx";
import VideoPlayer from "./VideoPlayer";
import VideoList from "./VideoList.jsx";

export default function App() {
  return (
    // ✅ Wrap app in our VideoProvider for context
    <VideoProvider>
      <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
        <h1>Ben 10: Custom Video Player with Bookmarks 🎥</h1>
        <VideoPlayer />
        <VideoList />
      </div>
    </VideoProvider>
  );
}
