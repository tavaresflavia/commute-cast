const genresData = {
  genres: [
    { id: 144, name: "Personal Finance", parent_id: 67 },
    { id: 151, name: "Locally Focused", parent_id: 67 },
    { id: 77, name: "Sports", parent_id: 67 },
    { id: 125, name: "History", parent_id: 67 },
    { id: 122, name: "Society & Culture", parent_id: 67 },
    { id: 127, name: "Technology", parent_id: 67 },
    { id: 93, name: "Business", parent_id: 67 },
    { id: 132, name: "Kids & Family", parent_id: 67 },
    { id: 168, name: "Fiction", parent_id: 67 },
    { id: 88, name: "Health & Fitness", parent_id: 67 },
    { id: 134, name: "Music", parent_id: 67 },
    { id: 99, name: "News", parent_id: 67 },
    { id: 133, name: "Comedy", parent_id: 67 },
    { id: 100, name: "Arts", parent_id: 67 },
    { id: 69, name: "Religion & Spirituality", parent_id: 67 },
    { id: 117, name: "Government", parent_id: 67 },
    { id: 68, name: "TV & Film", parent_id: 67 },
    { id: 82, name: "Leisure", parent_id: 67 },
    { id: 111, name: "Education", parent_id: 67 },
    { id: 107, name: "Science", parent_id: 67 },
  ]
};
const durationInput = document.querySelector(".form__duration-input");
const formEl = document.querySelector("form");
const cardSec = document.querySelector(".cards");
const genreInput = document.querySelector(".form__genre-input");
const btnEl = document.querySelector(".cards__button");
const genresArray = genresData.genres;
const allGenres = getAllGenres(genresArray);
const headersList = {
  "Accept": "*/*",
  "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  "X-ListenAPI-Key": "2487c04327af4d4da779ecf2a0d70b1f"
}

function getAllGenres(genresArray) {
  let obj = {};
  for (let i = 0; i < genresArray.length; i++) {
    obj[genresArray[i].name] = genresArray[i]["id"];
  }
  return obj;
}

function addingOptions(allGenres) {
  Object.keys(allGenres).forEach((element) => {
    let optionEl = document.createElement("option");
    optionEl.classList.add("form__listValue");
    optionEl.setAttribute("value", element);
    optionEl.innerText = element;
    genreInput.appendChild(optionEl);
  });
}



function genUrl( durationInput, genreInput) {
  // let page_size = 10;
  let minLen = durationInput - durationInput / 2;
  let maxLen = durationInput;

    return "https://listen-api.listennotes.com/api/v2/search?q=" + genreInput + "&sort_by_date=0&type=episode&offset=0&len_min=" + minLen +"&len_max=" + maxLen + "&genre_ids=68%2C82&published_before=1580172454000&published_after=0&only_in=title%2Cdescription&language=English&safe_mode=0&unique_podcasts=0&page_size=10";

}




//CREATE ELEMENTS
function createElements(response) {
  for (i = 0; i < 3; i++) {
    let index = Math.floor(Math.random() * response.length);

    let titleEl = document.createElement("h2");
    titleEl.innerText= response[index].title_original;
    titleEl.classList.add("card__title");
    cardSec.appendChild(titleEl);

    let cardEl = document.createElement("div");
    cardEl.classList.add("card");
    cardSec.appendChild(cardEl);

    let cardLink = document.createElement("a");
    cardLink.classList.add("card__link");
    cardLink.setAttribute("href", response[index].link);
    cardEl.appendChild(cardLink);

    let imgEl = document.createElement("img");
    imgEl.classList.add("card__img");
    imgEl.setAttribute("src", response[index].image);
    cardLink.appendChild(imgEl);


  }
}

//FORM
formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const duration = e.target.duration.value;
  const genre = e.target.genre.value;

  isValid = validateEntries(duration, genre);

  if (!isValid) {
    return false;
  }

  //Clear the input fields after submitting a new comment
  e.target.duration.value = "";
  e.target.genre.value = "";
  cardSec.innerHTML = "";

  let url = genUrl(duration, genre); //, ADDSEARCH
  
  axios
  .get(url, {headers: headersList})
  .then((response) => {
    createElements(response.data.results);

    btnEl.classList.remove("cards__button--inactive");

    btnEl.addEventListener("click", () =>{
      cardSec.innerHTML = "";
      createElements(response.data.results.reverse());})

  })
  .catch((error) => {
    console.log(error);
    errorMsgEl = document.createElement("p");
    errorMsgEl.innerText = "Sorry! Try again later.";
    cardSec.appendChild(errorMsgEl);
    console.log(error);
  });

 

});

function makePromise(url) {
 
}

function validateEntries(duration, genre) {
  let isValid = true;

  if (!duration.trim()) {
    isValid = false;
    durationInput.classList.add("form__input--invalid");
  }

  if (!genre.trim()) {
    isValid = false;
    genreInput.classList.add("form__input--invalid");
  }
  return isValid;
}

//Delete invalid class

durationInput.addEventListener("focus", () => {
  if (durationInput.classList.contains("form__input--invalid")) {
    durationInput.classList.remove("form__input--invalid");
  }
});

genreInput.addEventListener("focus", () => {
  if (genreInput.classList.contains("form__input--invalid")) {
    genreInput.classList.remove("form__input--invalid");
  }
});



addingOptions(allGenres);
