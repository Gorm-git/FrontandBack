const endpoint = "http://localhost:5000";

window.addEventListener("load", init);

let selectedArtist;

function init() {
  updateArtistGrid();

  document
    .querySelector("#form-create-artist")
    .addEventListener("submit", createArtist);
  document
    .querySelector("#form-update-artist")
    .addEventListener("submit", updateArtist);
}

async function readArtistList() {
  const response = await fetch(`${endpoint}/artists`);
  const list = await response.json();
  console.log(list);
  return list;
}

async function updateArtistGrid() {
  const artists = await readArtistList();
  showArtist(artists);
}

function showArtist(list) {
  document.querySelector("#artists-grid").innerHTML = "";

  for (const artist of list) {
    showArtists(artist);
  }
}

async function createArtist(event) {
  event.preventDefault();

  const name = event.target.name.value;
  const birthdate = event.target.birthdate.value;
  const activeSince = event.target.activeSince.value;
  const genres = event.target.genres.value;
  const labels = event.target.labels.value;
  const website = event.target.website.value;
  const image = event.target.image.value;
  const shortDescription = event.target.shortDescription.value;

  const newArtist = {
    name,
    birthdate,
    activeSince,
    genres,
    labels,
    website,
    image,
    shortDescription,
  };
  const artistJson = JSON.stringify(newArtist);
  const response = await fetch(`${endpoint}/artists`, {
    method: "POST",
    body: artistJson,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    console.log(newArtist);
    updateArtistGrid();
  }
}

function showArtists(artists) {
  const artistView = document.querySelector("#artists-grid");

  const artistsHTML = /*html*/ `
            <article>
                <img src="${artists.image}">
                <h2>${artists.name}</h2>
                <p>${artists.birthdate}</p>
                <p>${artists.activeSince}</p>
                <p>${artists.genres}</p>
                <p>${artists.labels}</p>
                <p>${artists.website}</p>
                <p>${artists.image}</p>
                <p>${artists.shortDescription}</p>
                 <div class="btns">
                    <button class="btn-update-artist">Update</button>
                    <button class="btn-delete-artist">Delete</button>
                </div>
            </article>
        `;
  artistView.insertAdjacentHTML("beforeend", artistsHTML);
  document
    .querySelector("#artists-grid article:last-child .btn-delete-artist")
    .addEventListener("click", () => deleteArtist(artists.id));
  document
    .querySelector("#artists-grid article:last-child .btn-update-artist")
    .addEventListener("click", () => artistToUpdate(artists));
}

async function deleteArtist(id) {
  const response = await fetch(`${endpoint}/artists/${id}`, {
    method: "delete",
  });
  if (response.ok) {
    updateArtistGrid();
  }
}

function artistToUpdate(artist) {
  selectedArtist = artist;
  const form = document.querySelector("#form-update-artist");

  form.name.value = artist.name;
  form.birthdate.value = artist.birthdate;
  form.activeSince.value = artist.activeSince;
  form.genres.value = artist.genres;
  form.labels.value = artist.labels;
  form.website.value = artist.website;
  form.image.value = artist.image;
  form.shortDescription.value = artist.shortDescription;
}

async function updateArtist(event) {
  // event.preventDefault();
  event.preventDefault();
  const name = event.target.name.value;
  const birthdate = event.target.birthdate.value;
  const activeSince = event.target.activeSince.value;
  const genres = event.target.genres.value;
  const labels = event.target.labels.value;
  const website = event.target.website.value;
  const image = event.target.image.value;
  const shortDescription = event.target.shortDescription.value;

  const artistUpdate = {
    name,
    birthdate,
    activeSince,
    genres,
    labels,
    website,
    image,
    shortDescription,
  };
  const artistAsJson = JSON.stringify(artistUpdate);
  const response = await fetch(`${endpoint}/artists/${selectedArtist.id}`, {
    method: "PUT",
    body: artistAsJson,
  });
  if (response.ok) {
    updateArtistGrid();
  }
}

function sortByNameAZ(a, b) {
  return a.name.toLowercase().localeCompare(b.navn.toLowercase());
}

function sortByNameZA(a, b) {
  return b.name.toLowercase().localeCompare(a.name.toLowercase());
}

function sortArtist() {
  const sortCriteria = document.querySelector("#sortArtistData").value;
  let sortedArtists = artistslist;
  if (sortCriteria === "artistNameA") {
    sortedArtists = sortedArtists.sort(sortByNameAZ);
  } else if (sortCriteria === "artistNameZ") {
    sortedArtists = sortedArtists.sort(sortByNameZA);
  }
  showArtists(sortedArtists);
}

const artistSortElement = document.querySelector("#sortArtistData");
artistSortElement.addEventListener("change", sortArtist);
