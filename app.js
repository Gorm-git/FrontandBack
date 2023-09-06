import express, { request, response } from "express";
import fs from "fs/promises";
import cors from "cors";

const app = express();
const port = 5000;

//So kan vi parse json bodies når vi bruger nedenstående app
app.use(express.json());
//Så sikrer vi det hel med Cors sådan vi kan bruge vores routers
app.use(cors());

app.listen(port, () => {
  console.log(`App is running on http:/localhost:${port}`);
  console.log("42");
});

// Så Laver jeg en get, altså et response sådan hjemmesiden kan indlæses
app.get("/", (request, response) => {
  response.send("The website now GET's it");
});

//Der skal være en funktion som indlæser JSON filen samt vent

//jeg laver et get kald som henter hele listen:
app.get("/artists", async (request, response) => {
  const artistList = await fs.readFile("artistlist.json");
  const artist = JSON.parse(artistList);

  response.json(artist);
});
