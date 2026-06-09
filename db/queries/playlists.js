import { pool } from "../index.js";

export async function getAllPlaylists() {
  const result = await pool.query("SELECT * FROM playlists ORDER BY id;");
  return result.rows;
}

export async function getPlaylistById(id) {
  const result = await pool.query("SELECT * FROM playlists WHERE id = $1;", [
    id,
  ]);
  return result.rows[0];
}

export async function createPlaylist({ name, description }) {
  const result = await pool.query(
    "INSERT INTO playlists (name, description) VALUES ($1, $2) RETURNING *;",
    [name, description],
  );
  return result.rows[0];
}
