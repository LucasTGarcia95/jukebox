import { pool } from "../index.js";

export async function getAllTracks() {
  const result = await pool.query("SELECT * FROM tracks ORDER BY id;");
  return result.rows;
}

export async function getTrackById(id) {
  const result = await pool.query("SELECT * FROM tracks WHERE id = $1;", [id]);
  return result.rows[0];
}

export async function createTrack({ name, duration_ms }) {
  const result = await pool.query(
    "INSERT INTO tracks (name, duration_ms) VALUES ($1, $2) RETURNING *;",
    [name, duration_ms],
  );
  return result.rows[0];
}

export async function deleteTrack(id) {
  const result = await pool.query(
    "DELETE FROM tracks WHERE id = $1 RETURNING *;",
    [id],
  );
  return result.rows[0];
}
