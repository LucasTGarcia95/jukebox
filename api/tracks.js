import { Router } from "express";
import {
  getAllTracks,
  getTrackById,
  createTrack,
  deleteTrack,
} from "../db/queries/tracks.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const tracks = await getAllTracks();
    res.send(tracks);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).send({ error: "Invalid ID" });

    const track = await getTrackById(id);
    if (!track) return res.status(404).send({ error: "Track not found" });

    res.send(track);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (!req.body)
      return res.status(400).send({ error: "Missing request body" });

    const { name, duration_ms } = req.body;
    if (!name || !duration_ms)
      return res.status(400).send({ error: "Missing required fields" });

    const newTrack = await createTrack({ name, duration_ms });
    res.status(201).send(newTrack);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).send({ error: "Invalid ID" });

    const deleted = await deleteTrack(id);
    if (!deleted) return res.status(404).send({ error: "Track not found" });

    res.send(deleted);
  } catch (err) {
    next(err);
  }
});

export default router;
