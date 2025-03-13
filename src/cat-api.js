import axios from 'axios';

const API_KEY =
  'live_RHBAXgmoJwFJEepX6tAp3yiO7ksbA64kEVliBdRrDf8SYDDoCFziYsEVLKnWXlOe';
axios.defaults.headers.common['x-api-key'] = API_KEY;
axios.defaults.baseURL = 'https://api.thecatapi.com/v1'

export async function fetchBreeds () {
  const { data } = await axios.get('/breeds');

  return data;
}

export async function fetchCatByBreed(breedId) {
  const { data } = await axios.get(`/images/search?breed_ids=${breedId}`);

  console.log(data, 'breed info');


  return data;
}
