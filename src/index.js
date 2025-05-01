axios.defaults.baseURL = "https://api.thecatapi.com/"
axios.defaults.headers.common["x-api-key"] = "live_jqe3uN0EE5jm1WMBDB9fpNVLj1xAGfiopj2YDqX7fm51UXiwScPXBh6ctBmpeWq0";
const catBreedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');
const catBreedInfo = document.querySelector('.cat-info');

fetchBreeds();

function fetchBreeds() {
  axios.get('/v1/breeds')
  .then((response) => {
    if(!response) {
      throw Error('Oops! Something went wrong! Try reloading the page')
    }
    return response;
  })
  .then((dataArr) => {
    catBreedSelect.style.display = 'block';
    createOptionsInSelect(dataArr.data);
  })
  .catch((error) => {
    errorMessage.style.display = 'block';
    errorMessage.textContent = error;
  })
  .finally(() => {
    loader.style.display = 'none';
  })
}

function createOptionsInSelect(data) {
  const options = data.map((breedElem) => {
    return `
        <option
          class="optionBreed"
          value="${breedElem.id}"
        >
          ${breedElem.name}
        </option>
      `
  }).join('');
  catBreedSelect.insertAdjacentHTML('beforeend', options);
  catBreedSelect.addEventListener('change', onOptionClick);
}

function onOptionClick() {
  loader.style.display = 'block'
  fetchCatByBreed(this.value);
}

function fetchCatByBreed(breedId) {
  catBreedInfo.style.display = 'none';
  axios.get(`v1/images/search?breed_ids=${breedId}`)
    .then((response) => {
      if(!response) {
        throw Error('Oops! Something went wrong! Try reloading the page')
      }
      return response.data;
    })
    .then((data) => {
      catBreedInfo.style.display = 'flex'
      createCatInfoBlock(data);
    })
    .catch((error) => {
      errorMessage.style.display = 'block';
      errorMessage.textContent = error;
    })
    .finally(() => {
      loader.style.display = 'none';
    })
}

function createCatInfoBlock(data) {
  catBreedInfo.innerHTML = createCatBreedInfoBlock(
    data[0].height,
    data[0].width,
    data[0].url,
    data[0].breeds[0].alt_names,
    data[0].breeds[0].name,
    data[0].breeds[0].description,
    data[0].breeds[0].origin
  )
}

function createCatBreedInfoBlock(height, width, url, altName, name, description, origin) {
   return `<div class="catBreedImg--wrapper">
             <img
                class="catBreedImg"
                height="${height}px"
                width="${width}px"
                src="${url}"
                alt="${altName}"
              >
           </div>
           <div class="catBreedInfo--wrapper">
             <h1 class="catBreedInfo__headline">${name}</h1>
             <p class="catBreedInfo__description">${description}</p>
             <span class="catBreedInfo__description origin">${origin}</span>
           </div>`
}