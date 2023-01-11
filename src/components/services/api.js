import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.params = {
  api_key: '2db21389930b520d8ed134be7fb3bbe4',
};

export const getInitialMovies = async () => {
  const { data } = await axios.get('/trending/movie/week');
  return data.results;
};

export const getQueryMovies = async movie => {
  const { data } = await axios.get(`/search/movie?query=${movie}`);
  return data.results;
};

export const getMoviesById = async id => {
  const { data } = await axios.get(`/movie/${id}`);
  return data;
};

export const getCast = async id => {
  const { data } = await axios.get(`/movie/${id}/credits`);
  return data.cast;
};

export const getReviews = async id => {
  const { data } = await axios.get(`/movie/${id}/reviews`);
  return data.results;
};
