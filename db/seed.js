import { pool } from "./index.js";

async function seed() {
  console.log("🌱 Starting seed...");

  // Clear tables
  await pool.query(`DELETE FROM playlists_tracks;`);
  await pool.query(`DELETE FROM playlists;`);
  await pool.query(`DELETE FROM tracks;`);

  // --- TRACKS ----------------------------------------------------
  const tracksData = [
    ["Midnight Drive", 210000],
    ["Sunset Boulevard", 185000],
    ["Neon Skies", 240000],
    ["Electric Heartbeat", 200000],
    ["Ocean Waves", 260000],
    ["Golden Hour", 195000],
    ["Moonlit Dance", 230000],
    ["City Lights", 175000],
    ["Dream Sequence", 250000],
    ["Lost in Motion", 220000],
    ["Crystal Echoes", 205000],
    ["Velvet Horizon", 245000],
    ["Silver Lining", 190000],
    ["Parallel Lines", 215000],
    ["Gravity Shift", 225000],
    ["Northern Glow", 235000],
    ["Hidden Path", 180000],
    ["Silent Forest", 255000],
    ["Falling Stars", 200000],
    ["Mirage", 210000],
  ];

  const trackResults = await Promise.all(
    tracksData.map(([name, duration]) =>
      pool.query(
        `INSERT INTO tracks (name, duration_ms)
         VALUES ($1, $2)
         RETURNING *`,
        [name, duration],
      ),
    ),
  );

  const tracks = trackResults.map((r) => r.rows[0]);
  console.log(`🎵 Inserted ${tracks.length} tracks.`);

  // --- PLAYLISTS ----------------------------------------------------
  const playlistsData = [
    ["Chill Vibes", "Relaxing ambient and downtempo tracks"],
    ["Workout Boost", "High‑energy tracks to power your workout"],
    ["Late Night Drive", "Moody tracks for nighttime cruising"],
    ["Focus Mode", "Instrumental tracks for deep concentration"],
    ["Feel Good Hits", "Uplifting tracks to brighten your day"],
    ["Synthwave Dreams", "Retro‑inspired electronic tracks"],
    ["Ocean Escape", "Calming ocean‑themed tracks"],
    ["City Nights", "Urban electronic and house vibes"],
    ["Morning Coffee", "Warm, mellow tracks to start your day"],
    ["Stargazing", "Atmospheric tracks for quiet nights"],
  ];

  const playlistResults = await Promise.all(
    playlistsData.map(([name, description]) =>
      pool.query(
        `INSERT INTO playlists (name, description)
         VALUES ($1, $2)
         RETURNING *`,
        [name, description],
      ),
    ),
  );

  const playlists = playlistResults.map((r) => r.rows[0]);
  console.log(`📀 Inserted ${playlists.length} playlists.`);

  // --- PLAYLISTS_TRACKS --------------------------------------------
  const playlistTrackPairs = [
    [playlists[0].id, tracks[0].id],
    [playlists[0].id, tracks[1].id],
    [playlists[1].id, tracks[3].id],
    [playlists[1].id, tracks[4].id],
    [playlists[2].id, tracks[2].id],
    [playlists[2].id, tracks[5].id],
    [playlists[3].id, tracks[6].id],
    [playlists[3].id, tracks[7].id],
    [playlists[4].id, tracks[8].id],
    [playlists[4].id, tracks[9].id],
    [playlists[5].id, tracks[10].id],
    [playlists[5].id, tracks[11].id],
    [playlists[6].id, tracks[12].id],
    [playlists[7].id, tracks[13].id],
    [playlists[8].id, tracks[14].id],
    [playlists[9].id, tracks[15].id],
  ];

  const playlistTrackResults = await Promise.all(
    playlistTrackPairs.map(([playlistId, trackId]) =>
      pool.query(
        `INSERT INTO playlists_tracks (playlist_id, track_id)
         VALUES ($1, $2)
         RETURNING *`,
        [playlistId, trackId],
      ),
    ),
  );

  console.log(
    `🔗 Inserted ${playlistTrackResults.length} playlist-track links.`,
  );
  console.log("🌱 Seed complete!");
}

seed()
  .catch((err) => {
    console.error("❌ Error during seed:", err);
  })
  .finally(() => {
    pool.end();
  });
