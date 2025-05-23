// BookmarkList.js
import { useContext, useMemo } from "react";
import { VideoContext } from "./VideoContext.js";
import axios from "axios";

export default function BookmarkList() {
  const { state, dispatch } = useContext(VideoContext);

  const sorted = useMemo(() => {
    return [...state.bookmarks].sort((a, b) => a - b);
  }, [state.bookmarks]);

  const remove = async (time) => {
    dispatch({ type: "REMOVE_BOOKMARK", payload: time });
    await axios.delete(`/api/bookmarks/${time}`);
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
            <button onClick={() => remove(time)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
