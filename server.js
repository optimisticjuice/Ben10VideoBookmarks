// Simple mock API server used during development
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5174;

app.use(cors());
app.use(express.json());

app.post("/api/bookmarks", (req, res) => {
  // For demo, just echo back the bookmark
  res.status(201).json({ message: "Bookmark saved", data: req.body });
});

app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
});
