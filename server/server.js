import app from "./app.js";
import { pool } from "../db/index.js";

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
