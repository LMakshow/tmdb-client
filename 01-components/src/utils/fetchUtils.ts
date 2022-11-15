const SERVER = 'https://api.themoviedb.org/3';
const API_KEY = 'bd15370077551ed52137260fd06032e7';

export const pageRequest = (currentPage: number, itemsPerPage: number) => {
  if (itemsPerPage === 10) return Math.floor(currentPage / 2) + 1;
  if (itemsPerPage === 40) return currentPage * 2 + 1;
  return currentPage + 1;
};

export const moviesPopularUrl = (
  page = 1,
  searchModel = 'movie',
  searchAdult = 'no-adult',
  searchYear = 'any-year'
) => {
  const adult = searchAdult === 'adult' ? true : false;
  const yearQuery = () => {
    if (searchYear === 'any-year') return '';
    if (searchModel === 'movie') return `&primary_release_year=${searchYear}`;
    if (searchModel === 'tv') return `&first_air_date_year=${searchYear}`;
    return '';
  };

  return `${SERVER}/discover/${searchModel}?api_key=${API_KEY}&page=${page}&include_adult=${adult}${yearQuery()}`;
};

export const searchMoviesUrl = (
  query: string,
  page = 1,
  searchModel = 'movie',
  searchAdult = 'no-adult',
  searchYear = 'any-year'
) => {
  const adult = searchAdult === 'adult' ? true : false;
  const yearQuery = () => {
    if (searchYear === 'any-year') return '';
    if (searchModel === 'movie') return `&primary_release_year=${searchYear}`;
    if (searchModel === 'tv') return `&first_air_date_year=${searchYear}`;
    return '';
  };

  return `${SERVER}/search/${searchModel}?api_key=${API_KEY}&query=${query}&page=${page}&include_adult=${adult}${yearQuery()}`;
};

export const movieDetailsUrl = (id: number, searchModel = 'movie') => {
  return `${SERVER}/${searchModel}/${id}?api_key=${API_KEY}&append_to_response=videos`;
};

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};
