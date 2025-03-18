'use strict';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const errorMessage = document.querySelector('.error');
const loader = document.querySelector('.loader');

const placeholder = document.createElement('option');
placeholder.textContent = 'Select breed';
placeholder.disabled = true;
placeholder.selected = true;

select.appendChild(placeholder);

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

  catInfo.style.maxWidth = '400px';
  catInfo.style.padding = '15px';
  catInfo.style.border = '1px solid #ddd';
  catInfo.style.borderRadius = '8px';
  catInfo.style.backgroundColor = '#fff';
  catInfo.style.boxShadow = '2px 2px 10px rgba(0, 0, 0, 0.1)';

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
  catImage.style.borderRadius = '8px';

  const breedDescription = document.createElement('p');
  breedDescription.innerHTML = `<strong>Description:</strong> ${breed.description}`;

  const temperament = document.createElement('p');
  temperament.innerHTML = `<strong>Temperament:</strong> ${breed.temperament}`;

  catInfo.append(catsBreed, catImage, breedDescription, temperament);
};

// styles

// body
document.body.style.fontFamily = 'Arial, sans-serif';
document.body.style.textAlign = 'center';
document.body.style.margin = '0px';
document.body.style.display = 'flex';
document.body.style.flexDirection = 'column';
document.body.style.alignItems = 'center';
document.body.style.justifyContent = 'center';
document.body.style.height = '100vh';

// select
select.style.backgroundColor = '#fff';
select.style.border = '2px solid #000';
select.style.padding = '8px';
select.style.borderRadius = '8px';
select.style.fontSize = '16px';
select.style.cursor = 'pointer';
select.style.marginBottom = '40px';

// errorMessage
errorMessage.style.color = 'red';
errorMessage.style.fontWeight = 'bold';

// loader
loader.style.fontSize = '18px';
loader.style.fontWeight = 'bold';
