async function getAllArtists(request, response) {
  response.json(await getArtistList());
}

async function getOneArtistID(request, response) {
  const id = Number(request.params.id);
  const artistList = await getArtistList();
  const artistID = artistList.find((artistID) => artistID.id === id);

  response.json(artistID);
}

async function postNewArtist(request, response) {
  const newArtist = request.body;
  console.log(request.body);
  newArtist.id = new Date().getTime();
  newArtist.favorite = false;

  console.log(newArtist);

  const artistList = await getArtistList();
  artistList.push(newArtist);
  fs.writeFile("artistlist.json", JSON.stringify(artistList));
  response.json(artistList);
}

async function deleteArtist(request, response) {
  const id = Number(request.params.id);
  const artistList = await getArtistList();
  const index = artistList.findIndex((artist) => artist.id === id);

  if (index === -1) {
    response.status(404).json({ message: "Artist not found" });
  } else {
    artistList.splice(index, 1);

    fs.writeFile("artistlist.json", JSON.stringify(artistList));
    response.json(artistList);
  }
}

async function updateAnArtist(request, response) {
  console.log(request.params.id);
  const id = Number(request.params.id);
  console.log(id);

  const artistList = await getArtistList();

  const updatingArtist = artistList.find((artist) => artist.id === id);

  const body = request.body;

  updatingArtist.name = body.name;
  updatingArtist.birthdate = body.birthdate;
  updatingArtist.activeSince = body.activeSince;
  updatingArtist.genres = body.genres;
  updatingArtist.labels = body.labels;
  updatingArtist.website = body.website;
  updatingArtist.image = body.image;
  updatingArtist.shortDescription = body.shortDescription;

  fs.writeFile("artistlist.json", JSON.stringify(artistList));
  response.json(artistList);
}

export {
  getAllArtists,
  getOneArtistID,
  postNewArtist,
  deleteArtist,
  updateAnArtist,
};
