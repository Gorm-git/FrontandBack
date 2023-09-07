import express, { request, response } from "express";
import fs from "fs/promises";
import cors from "cors";
import { get } from "http";

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

// For at gøre det nemmere for mig selv så kan jeg lave en funktion
// Som ligger listen i en konstant "artist", herfra vil jeg
// kunne genbruge den i  mine routers
async function getArtistList() {
  const list = await fs.readFile("artistlist.json");
  const artist = JSON.parse(list);

  return artist;
}

// Så Laver jeg en get, altså et response sådan hjemmesiden kan indlæses
app.get("/", (request, response) => {
  response.send("The website now GET's it");
});

//Der skal være en funktion som indlæser JSON filen samt vent

//jeg laver et get kald som henter hele listen:
app.get("/artists", getAllArtists);

// så laver jeg et get kald som kan hente specifikke artists baseret på deres
app.get("/artists/:id", getOneArtistID);

// Jeg laver nu et post response, som requester bodyen fra det nye object som,
// er blevet oprettet, dernæst når den har fået artists bodien så skal den give
//

async function getAllArtists(response) {
  response.json(await getArtistList());
}

async function getOneArtistID(request, response) {
  const id = request.params.id;
  const artistList = await getArtistList();
  const artistID = artistList.find((artistID) => artistID.id === id);

  response.json(artistID);
}
