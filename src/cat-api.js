'use strict';
import 'dotenv/config';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers['x-api-key'] = process.env.API_KEY;

export const fetchBreeds = () => {
  return axios.get('/breeds');
};

export const fetchCatByBreed = breedId => {
  return axios.get(`/images/search?breed_ids=${breedId}`);
};
