// function formCard(event) {
//   const card = document.createElement("div");
//   card.setAttribute("class", "card");

//   card.innerHTML = `
//   <% for(var i = 0; i < posts.length; i++) {%>
//   <h4><%= posts[i].title %></h4>
//   <p> <%= posts[i].thoughts %></p>
//   <p><%= posts[i]._id %> </p>
//   <% } %>
//   `;

//   const buttonHolder = document.createElement("div");
//   buttonHolder.setAttribute("class", "buttons_holder");

//   const cardEditBtn = document.createElement("button");
//   cardEditBtn.innerText = "Edit";
//   cardEditBtn.addEventListener("click", editBlogEntry);

//   const cardDeleteBtn = document.createElement("button");
//   cardDeleteBtn.innerText = "Delete";
//   cardDeleteBtn.onclick = deleteBlogEntry;

//   buttonHolder.appendChild(cardEditBtn);
//   buttonHolder.appendChild(cardDeleteBtn);

//   card.appendChild(buttonHolder);
//   document.querySelector("#msg-container-1").appendChild(card);
// }

// console.log(posts);

function editBlogEntry(event) {
  const newTitle = window.prompt("Please enter a new Title for your post.");
  const newThoughts = window.prompt("Please enter a new post.");

  // functionality for empty input
  const data = {
    id: this.event.target.getAttribute("unique_id"),
    title: newTitle,
    thoughts: newThoughts,
  };

  fetch("/posts", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((respo) => {
      window.location.reload(true);
    });

  /* fetchings data from the surver then uploads the new data
need to add a prompt to hold the variables to have the user input the information. 
might need to use the this keyword to get the data gu=

*/
}

function deleteBlogEntry() {
  // console.log(this.event.posts)
  fetch("/posts", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: this.event.target.getAttribute("unique_id"),
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      window.location.reload(true);
    })
    .catch((error) => console.error(error));
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

function getweather() {
  fetch(
    "https://api.weatherapi.com/v1/current.json?key=1ab36ecbfc554103bf8192258221506&q=auto:ip&aqi=no"
  )
    .then((res) => res.json())
    .then((data) => renderData(data));
}

window.addEventListener("load", getweather);

function renderData(data) {
  wCard = document.createElement("div");
  const currentWeather = data.current.temp_f;
  const icon = data.current.condition.icon;

  wCard.innerHTML = `
  <div class="card" style="width: 8rem;">
  <img src="${icon}" class="card-img-top" alt="...">
  <div class="card-body">
  <p>Current Weather </p>
    <p class="card-text">${currentWeather}℉</p>
  </div>
</div>
  
  `;

  document.querySelector("#weather-container").appendChild(wCard);
}
