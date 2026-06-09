import express from "express";
import tracksRouter from "../api/tracks.js";
import playlistsRouter from "../api/playlists.js";

const app = express();

app.use(express.json());

app.use("/tracks", tracksRouter);
app.use("/playlists", playlistsRouter);

app.get("/", (req, res) => {
  res.send({ message: "Jukebox API is running" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: "Internal server error" });
});

export default app;
