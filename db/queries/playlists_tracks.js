import { pool } from "../index.js";

export async function getTracksForPlaylist(playlistId) {
  const result = await pool.query(
    `
    SELECT tracks.*
    FROM playlists_tracks
    JOIN tracks ON tracks.id = playlists_tracks.track_id
    WHERE playlists_tracks.playlist_id = $1
    ORDER BY tracks.id;
    `,
    [playlistId],
  );

  return result.rows;
}

export async function addTrackToPlaylist(playlistId, trackId) {
  const result = await pool.query(
    `
    INSERT INTO playlists_tracks (playlist_id, track_id)
    VALUES ($1, $2)
    ON CONFLICT (playlist_id, track_id) DO NOTHING
    RETURNING *;
    `,
    [playlistId, trackId],
  );

  return result.rows[0] || null;
}
