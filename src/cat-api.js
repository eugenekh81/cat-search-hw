'use strict';

const API_KEY =
  'live_o5CHuOICqm6d78WBdVHJcC0RU8oyfcw2Ejqg8y1s4Qvimp0N51X19qtTF4fdtGRK';

const headers = {
  'x-api-key': API_KEY,
};

const fetchData = url => {
  return fetch(url, { headers: headers, method: 'GET' }).then(response => {
    if (!response.ok) throw new Error(`Error ${url}: ${response.status}`);
    return response.json();
  });
};

export const fetchBreeds = () => {
  return fetchData('https://api.thecatapi.com/v1/breeds');
};

export const fetchCatByBreed = breedId => {
  return fetchData(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  );
};
