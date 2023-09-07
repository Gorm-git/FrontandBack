const endpoint = "http://localhost:5000";

window.addEventListener("load", init);

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
    .addEventListener("click", () => updateArtist(artists));
}

async function deleteArtist(id) {
  const response = await fetch(`${endpoint}/artist/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    updateArtistGrid();
  }
}

async function updateArtist(event) {
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
  const userAsJson = JSON.stringify(artistUpdate);
  const response = await fetch(`${endpoint}/artists/${artist.id}`, {
    method: "PUT",
    body: userAsJson,
  });
  if (response.ok) {
    updateArtistGrid();
  }
}