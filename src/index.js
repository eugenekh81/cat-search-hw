'use strict';
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

fetchBreeds()
  .then(data => {
    return data;
  })
  .then(data => {
    loader.classList.add('hidden');

    renderSelectOptions(data);

    const select = new SlimSelect({
      select: '#selectElement',
      placeholder: 'Select breed...',
      searchPlaceholder: 'Search breed...',
      showSearch: true,
      searchFocus: true,
    });

    select.setData(data);
  })
  .then(() => {
    select.classList.remove('hidden');
  })
  .catch(err => {
    errorMessage.display = 'block';
    errorMessage.textContent = err.message;
  });

function renderSelectOptions(data) {
  // const firstOption = document.createElement('option');
  // firstOption.value = '';
  // firstOption.textContent = 'Select breed...';
  // firstOption.disabled = true;
  // firstOption.selected = true;

  // select.append(firstOption);

  data.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = item.name;

    select.append(option);
  });

  select.addEventListener('change', e => {
    const id = e.target.value;
    loader.classList.remove('hidden');
    catInfo.innerHTML = '';

    fetchCatByBreed(id)
      .then(data => {
        renderCatInfo(data);
      })
      .then(() => {
        loader.classList.add('hidden');
        catInfo.classList.remove('hidden');
      })
      .catch(err => {
        loader.classList.add('hidden');
        Notify.failure('Oops, something went wrong. Please try again later.');
      });
  });
}

function renderCatInfo([data]) {
  console.log(data, 'data');

  catInfo.innerHTML = '';

  const catInfoContent = document.createElement('div');
  catInfoContent.className = 'cat-info__content';

  const catInfoTextBlock = document.createElement('div');
  catInfoTextBlock.className = 'cat-info__text-block';

  const catImageContainer = document.createElement('div');
  catImageContainer.className = 'cat-info__image-container';

  const catImage = document.createElement('img');
  catImage.className = 'cat-info__image';
  catImage.src = data.url;

  catImageContainer.append(catImage);

  const catName = document.createElement('h2');
  catName.className = 'cat-info__name';
  catName.textContent = data.breeds[0].name;

  const catDescription = document.createElement('p');
  catDescription.className = 'cat-info__description';
  catDescription.textContent = data.breeds[0].description;

  const temperament = document.createElement('p');
  temperament.className = 'cat-info__temperament';
  temperament.innerHTML = `<b>Temperament</b>: ${data.breeds[0].temperament}`;

  catInfoTextBlock.append(catName, catDescription, temperament);
  catInfoContent.append(catImageContainer, catInfoTextBlock);
  catInfo.append(catInfoContent);
}

select.classList.add('hidden');
errorMessage.classList.add('hidden');
catInfo.classList.add('hidden');
