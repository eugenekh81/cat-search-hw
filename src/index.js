'use strict';

import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
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
    el.classList.remove('hidden');
  } else {
    el.classList.add('hidden');
  }
};

toggleVisibility(errorMessage, false);
toggleVisibility(select, false);
toggleVisibility(loader, true);

const renderBreeds = ({ data }) => {
  console.log(data, 'data');

  data.forEach(element => {
    const option = document.createElement('option');
    option.value = element.id;
    option.textContent = element.name;

    select.appendChild(option);
  });

  toggleVisibility(loader, false);
  toggleVisibility(select, true);
};

fetchBreeds().then(renderBreeds);

select.addEventListener('change', e => {
  const breedId = e.target.value;

  if (breedId) {
    toggleVisibility(loader, true);
    catInfo.style.display = 'none';

    fetchCatByBreed(breedId)
      .then(data => {
        showCatInfo(data);
        toggleVisibility(loader, false);
        catInfo.style.display = 'block';
      })
      .catch(() => {
        toggleVisibility(loader, false);

        Notiflix.Notify.failure('Oops, something went wrong...', {
          timeout: 1000,
        });

        catInfo.style.display = 'none';
      });
  }
});

const selectNew = new SlimSelect({
  select: '#selectElement',
  placeholder: 'Select breed...',
  searchPlaceholder: 'Search breed...',
  showSearch: true,
  searchFocus: true,
});

const showCatInfo = axiosResponse => {
  const { data } = axiosResponse;
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
