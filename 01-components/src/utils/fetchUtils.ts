const SERVER = 'https://api.themoviedb.org/3';
const API_KEY = 'bd15370077551ed52137260fd06032e7';

export const moviesPopularUrl = (page = 1) => {
  return `${SERVER}/movie/popular?api_key=${API_KEY}&page=${page}`;
};

export const searchMoviesUrl = (query: string, page = 1) => {
  return `${SERVER}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
};

export const movieDetailsUrl = (id: number) => {
  return `${SERVER}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;
};

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};
