// BookmarkList.js
// Displays the list of bookmark times for the current video
import { useContext, useMemo } from "react";
import { VideoContext } from "./VideoContext.js";

export default function BookmarkList() {
  const { state, dispatch } = useContext(VideoContext);

  // Sort bookmark times ascending whenever the context updates
  const sorted = useMemo(() => {
    return [...state.bookmarks].sort((a, b) => a - b);
  }, [state.bookmarks]);

  const remove = (time) => {
    dispatch({ type: "REMOVE_BOOKMARK", payload: time });
    // Also update localStorage so bookmarks persist across reloads
    const stored = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    const filtered = stored.filter((b) => b.time !== time);
    localStorage.setItem("bookmarks", JSON.stringify(filtered));
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Bookmarks</h2>
      {sorted.length === 0 && <p>No bookmarks yet. Add one!</p>}
      <ul>
        {sorted.map((time) => (
          <li key={time} style={{ display: "flex", alignItems: "center" }}>
            <span style={{ flex: 1 }}>
              {new Date(time * 1000).toISOString().substr(14, 5)}
            </span>
            {/* Clicking the X removes the bookmark */}
            <button onClick={() => remove(time)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
