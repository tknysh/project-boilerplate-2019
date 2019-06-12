import { API_BASE_URL } from 'constants/common';

export const moviesUrl = `${API_BASE_URL}movies/`;
export const singleMovieUrl = id => `${moviesUrl}${id}`;
