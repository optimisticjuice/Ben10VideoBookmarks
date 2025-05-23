import { useReducer, useEffect } from "react";
import { VideoContext } from "./VideoContext.js";
import axios from "axios";
// 1️⃣ Define action types for our reducer
const SET_BOOKMARKS = "SET_BOOKMARKS";
const ADD_BOOKMARK = "ADD_BOOKMARK";
const REMOVE_BOOKMARK = "REMOVE_BOOKMARK";
const SET_VIDEO = "SET_VIDEO";

const initialState = {
  bookmarks: [],
  selectedVideo: null,
};

// 3️⃣ Reducer handles adding/removing bookmarks
function videoReducer(state, action) {
  switch (action.type) {
    case SET_BOOKMARKS:
      return { ...state, bookmarks: action.payload };
    case ADD_BOOKMARK:
      return { bookmarks: [...state.bookmarks, action.payload] };
    case REMOVE_BOOKMARK:
      return {
        bookmarks: state.bookmarks.filter((b) => b.time !== action.payload),
      };
    case SET_VIDEO:
      return { ...state, selectedVideo: action.payload };
    default:
      return state;
  }
}

// 5️⃣ Provider component wires up reducer & persists on change
export default function VideoProvider({ children }) {
  const [state, dispatch] = useReducer(videoReducer, initialState);

  useEffect(() => {
    // 🌐 Fetch bookmarks from your API
    const fetchBookmarks = async () => {
      const res = await axios.get("/api/bookmarks");
      dispatch({ type: SET_BOOKMARKS, payload: res.data });
    };
    fetchBookmarks();
  }, []);

  return (
    <VideoContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoContext.Provider>
  );
}
