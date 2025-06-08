// VideoProvider ties together the global video state using React Context
import { useReducer, useEffect } from "react";
import { VideoContext } from "./VideoContext.js";
// 1️⃣ Define action types for our reducer
const SET_BOOKMARKS = "SET_BOOKMARKS";
const ADD_BOOKMARK = "ADD_BOOKMARK";
const REMOVE_BOOKMARK = "REMOVE_BOOKMARK";
const SET_VIDEO = "SET_VIDEO";

const initialState = {
  bookmarks: [],
  selectedVideo: null,
};

// Reducer actions update the bookmarks array and selected video

// 3️⃣ Reducer handles adding/removing bookmarks
function videoReducer(state, action) {
  switch (action.type) {
    case SET_BOOKMARKS:
      return { ...state, bookmarks: action.payload };
    case ADD_BOOKMARK:
      // keep existing state when adding a bookmark time
      return { ...state, bookmarks: [...state.bookmarks, action.payload] };
    case REMOVE_BOOKMARK:
      // bookmarks is just an array of times so we compare directly
      return {
        ...state,
        bookmarks: state.bookmarks.filter((b) => b !== action.payload),
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
    // Load any saved bookmark times from localStorage on start
    const saved = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    const times = saved.map((b) => b.time);
    dispatch({ type: SET_BOOKMARKS, payload: times });
  }, []);

  return (
    <VideoContext.Provider value={{ state, dispatch }}>
      {children}
    </VideoContext.Provider>
  );
}
