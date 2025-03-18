'use strict';

import { fetchBreeds, fetchCatByBreed } from './cat-api';

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const errorMessage = document.querySelector('.error');
const loader = document.querySelector('.loader');

const toggleVisibility = (el, show) => {
  if (show) {
    el.style.display = 'block';
  } else {
    el.style.display = 'none';
  }
};

toggleVisibility(errorMessage, false);
toggleVisibility(loader, false);

const renderBreeds = data => {
  data.forEach(element => {
    const option = document.createElement('option');
    option.value = element.id;
    option.textContent = element.name;

    select.appendChild(option);
  });
};

fetchBreeds().then(renderBreeds);

select.addEventListener('change', e => {
  const breedId = e.target.value;
  if (breedId) {
    toggleVisibility(loader, true);
    toggleVisibility(catInfo, false);
    fetchCatByBreed(breedId)
      .then(data => {
        showCatInfo(data);
        toggleVisibility(loader, false);
        toggleVisibility(catInfo, true);
      })
      .catch(() => {
        toggleVisibility(errorMessage, true);
      });
  }
});

const showCatInfo = data => {
  const cat = data[0];
  const breed = cat.breeds[0];

  catInfo.innerHTML = '';

  const catsBreed = document.createElement('h2');
  catsBreed.textContent = breed.name;

  const catImage = document.createElement('img');
  catImage.src = cat.url;
  catImage.alt = breed.name;
  catImage.width = 300;

  const breedDescription = document.createElement('p');
  breedDescription.innerHTML = `<strong>Description:</strong> ${breed.description}`;

  const temperament = document.createElement('p');
  temperament.innerHTML = `<strong>Temperament:</strong> ${breed.temperament}`;

  catInfo.append(catsBreed, catImage, breedDescription, temperament);
};
