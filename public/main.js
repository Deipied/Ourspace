function formCard(event) {
  const card = document.createElement("div");
  card.setAttribute("class", "card");

  card.innerHTML = `
  <% for(var i = 0; i < posts.length; i++) {%>
  <h4><%= posts[i].title %></h4>
  <p> <%= posts[i].thoughts %></p>
  <p><%= posts[i]._id %> </p>
  <% } %>
  `;

  const buttonHolder = document.createElement("div");
  buttonHolder.setAttribute("class", "buttons_holder");

  const cardEditBtn = document.createElement("button");
  cardEditBtn.innerText = "Edit";
  cardEditBtn.addEventListener("click", editBlogEntry);

  const cardDeleteBtn = document.createElement("button");
  cardDeleteBtn.innerText = "Delete";
  cardDeleteBtn.onclick = deleteBlogEntry;

  buttonHolder.appendChild(cardEditBtn);
  buttonHolder.appendChild(cardDeleteBtn);

  card.appendChild(buttonHolder);
  document.querySelector("#msg-container-1").appendChild(card);
}

function editBlogEntry(event) {
  const newTitle = window.prompt("Please enter a new Title for your post.");
  const newThoughts = window.prompt("Please enter a new post.");

  const data = { title: newTitle, thoughts: newThoughts };
  const url = event.target.id;
  const concat = "'" + url + "'";

  fetch("/posts/_id=" + concat, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  })
    .then((response) => response.json())
    .then((respo) => {
      window.location.reload(true);
    });

  /* fetchings data from the surver then uploads the new data
need to add a prompt to hold the variables to have the user input the information. 
might need to use the this keyword to get the data 

*/
}

function deleteBlogEntry() {
  // sends a delete request using the this key to grab the information of the element that called the fucntioned
}

function serializer() {}

// function readData() {
//   const nameElt = document.querySelector("#name-input");
//   const textElt = document.querySelector("#text-input");

//   return {
//     nameInfo: nameElt.value,
//     textInfo: textElt.value,
//   };
// }

//function newDate() {
// TODO: optional add a place to pla
