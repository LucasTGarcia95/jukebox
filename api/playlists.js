import { Router } from "express";
import {
  getAllPlaylists,
  getPlaylistById,
  createPlaylist,
} from "../db/queries/playlists.js";

import {
  getTracksForPlaylist,
  addTrackToPlaylist,
} from "../db/queries/playlists_tracks.js";

import { getTrackById } from "../db/queries/tracks.js";

const router = Router();

/* -------------------------------------------
   GET /playlists
-------------------------------------------- */
router.get("/", async (req, res, next) => {
  try {
    const playlists = await getAllPlaylists();
    res.send(playlists);
  } catch (err) {
    next(err);
  }
});

/* -------------------------------------------
   GET /playlists/:id
-------------------------------------------- */
router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).send({ error: "Invalid ID" });

    const playlist = await getPlaylistById(id);
    if (!playlist) return res.status(404).send({ error: "Playlist not found" });

    res.send(playlist);
  } catch (err) {
    next(err);
  }
});

/* -------------------------------------------
   POST /playlists
-------------------------------------------- */
router.post("/", async (req, res, next) => {
  try {
    if (!req.body)
      return res.status(400).send({ error: "Missing request body" });

    const { name, description } = req.body;
    if (!name || !description)
      return res.status(400).send({ error: "Missing required fields" });

    const playlist = await createPlaylist({ name, description });
    res.status(201).send(playlist);
  } catch (err) {
    next(err);
  }
});

/* -------------------------------------------
   GET /playlists/:id/tracks
-------------------------------------------- */
router.get("/:id/tracks", async (req, res, next) => {
  try {
    const playlistId = Number(req.params.id);
    if (Number.isNaN(playlistId))
      return res.status(400).send({ error: "Invalid ID" });

    const playlist = await getPlaylistById(playlistId);
    if (!playlist) return res.status(404).send({ error: "Playlist not found" });

    const tracks = await getTracksForPlaylist(playlistId);
    res.send(tracks);
  } catch (err) {
    next(err);
  }
});

/* -------------------------------------------
   POST /playlists/:id/tracks
-------------------------------------------- */
router.post("/:id/tracks", async (req, res, next) => {
  try {
    const playlistId = Number(req.params.id);
    if (Number.isNaN(playlistId))
      return res.status(400).send({ error: "Invalid playlist ID" });

    if (!req.body)
      return res.status(400).send({ error: "Missing request body" });

    const { trackId } = req.body;
    if (!trackId)
      return res.status(400).send({ error: "Missing required fields" });

    const numericTrackId = Number(trackId);
    if (Number.isNaN(numericTrackId))
      return res.status(400).send({ error: "Invalid track ID" });

    const playlist = await getPlaylistById(playlistId);
    if (!playlist) return res.status(404).send({ error: "Playlist not found" });

    const track = await getTrackById(numericTrackId);
    if (!track) return res.status(400).send({ error: "Track does not exist" });

    const link = await addTrackToPlaylist(playlistId, numericTrackId);
    if (!link)
      return res.status(400).send({ error: "Track already in playlist" });

    res.status(201).send(link);
  } catch (err) {
    next(err);
  }
});

export default router;
