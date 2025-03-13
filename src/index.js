'use strict';

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
  })
  .then(() => {
    select.classList.remove('hidden');
  })
  .catch(err => {
    errorMessage.display = 'block';
    errorMessage.textContent = err.message;
  });

function renderSelectOptions(data) {
  const firstOption = document.createElement('option');
  firstOption.value = '';
  firstOption.textContent = 'Select breed...';
  firstOption.disabled = true;
  firstOption.selected = true;

  select.append(firstOption);

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
        errorMessage.display = 'block';
        errorMessage.textContent = err.message;
      });
  });
}

function renderCatInfo([data]) {
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

[
  {
    breeds: [
      {
        weight: {
          imperial: '7 - 10',
          metric: '3 - 5',
        },
        id: 'aege',
        name: 'Aegean',
        vetstreet_url: 'http://www.vetstreet.com/cats/aegean-cat',
        temperament: 'Affectionate, Social, Intelligent, Playful, Active',
        origin: 'Greece',
        country_codes: 'GR',
        country_code: 'GR',
        description:
          'Native to the Greek islands known as the Cyclades in the Aegean Sea, these are natural cats, meaning they developed without humans getting involved in their breeding. As a breed, Aegean Cats are rare, although they are numerous on their home islands. They are generally friendly toward people and can be excellent cats for families with children.',
        life_span: '9 - 12',
        indoor: 0,
        alt_names: '',
        adaptability: 5,
        affection_level: 4,
        child_friendly: 4,
        dog_friendly: 4,
        energy_level: 3,
        grooming: 3,
        health_issues: 1,
        intelligence: 3,
        shedding_level: 3,
        social_needs: 4,
        stranger_friendly: 4,
        vocalisation: 3,
        experimental: 0,
        hairless: 0,
        natural: 0,
        rare: 0,
        rex: 0,
        suppressed_tail: 0,
        short_legs: 0,
        wikipedia_url: 'https://en.wikipedia.org/wiki/Aegean_cat',
        hypoallergenic: 0,
        reference_image_id: 'ozEvzdVM-',
      },
    ],
    id: 'ks5wRxZmP',
    url: 'https://cdn2.thecatapi.com/images/ks5wRxZmP.jpg',
    width: 1939,
    height: 1400,
  },
];
