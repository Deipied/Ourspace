document.querySelector("#form-submit").addEventListener("click", (event) => {
  event.preventDefault();
  createBlogEntry();
});

function createBlogEntry() {
  const { nameInfo, textInfo } = readData();
  const card = document.createElement("div");
  card.setAttribute("class", "blog-card");

  card.innerHTML = `
  <h4> ${nameInfo} </h4>
  <p> ${textInfo} </p>
  
  `;
  document.querySelector("#msg-container-1").appendChild(card);
}

function readData() {
  const nameElt = document.querySelector("#name-input");
  const textElt = document.querySelector("#text-input");

  return {
    nameInfo: nameElt.value,
    textInfo: textElt.value,
  };
}

function newDate() {
  // TODO: optional add a place to place a profile picture.
  // TODO: timestamp the date from the program/ store timestamp
  // * new Date() for getting timestamp to store in the database
}

// momentjs for friendly manipulating front end
