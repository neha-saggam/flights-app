import axios from 'axios';
import { predicateBy } from '../utils/common';

const URL = `https://raw.githubusercontent.com/neha-saggam/movie-app/master/public/data/movies.json`;


export function getMovies() {
      return function(dispatch) {
        axios.get(URL)
      .then((response) => {
        dispatch(getMovieSuccess(response.data));
        dispatch(getLanguages(response.data));
        dispatch(getCountries(response.data));
      })
      .catch((err) => {
        dispatch(getMovieFailure(err))
      })
  }
};

function getUniqueAttributeArray(movies, filterBy) {
  let uniqueArray = [];
  for(let i = 0; i< movies.length; i++){
    if(movies[i][filterBy].length !== 0 && uniqueArray.indexOf(movies[i][filterBy]) === -1){
      uniqueArray.push(movies[i][filterBy]);
    }
  }
  return uniqueArray;
}

function getLanguages(movies) {
  // movies.map(item => item.language)
  //   .filter((value, index, self) => self.indexOf(value) === index)
  //   console.log("languages: ", movies);
    let uniqueLanguages = getUniqueAttributeArray(movies, "language");
    return {
      type: 'FETCH_LANGUAGES_SUCCESSFUL',
      payload: uniqueLanguages
    }
}

function getCountries(movies) {
    let uniqueCountries = getUniqueAttributeArray(movies, "country");
    return {
      type: 'FETCH_COUNTRIES_SUCCESSFUL',
      payload: uniqueCountries
    }
}

function getMovieSuccess(response) {
  return {
    type: 'FETCH_MOVIES_SUCCESSFUL',
    payload: response
  }
}

function getMovieFailure(err) {
  return {
    type: 'FETCH_MOVIES_FAILRUE',
    payload: err
  }
}

export function searchMovie(searchText) {
  return (dispatch, getState) => {
    const {movies} = getState().movieReducer;
    console.log("Search");
    let updatedMovies = [];
    for(let i=0; i<movies.length; i++) {
      if(movies[i].movie_title.trim().toUpperCase() === searchText.trim().toUpperCase()) {
          updatedMovies = movies.slice(i, i+1);
      }
    }
    dispatch(getMovieSuccess(updatedMovies));
  }
}

export function sortByTitleYear(sortOrder, sortBy) {
  return (dispatch, getState) => {
    const {movies} = getState().movieReducer;
    let updatedMovies = movies;
    for(let i=0; i<4; i++){
      console.log("updatedMovies.title_year: ",typeof(updatedMovies[i].title_year));
    }
    updatedMovies.sort(predicateBy(sortBy));
    for(let i=0; i<4; i++){
      console.log("updatedMovies.title_year: ", typeof(updatedMovies[i].title_year));
    }
    dispatch(getMovieSuccess(updatedMovies));
  }
}

function filter(movies, filterValue, filterKey) {
  let updatedMovies = movies.filter(val => {
    return val[filterKey] === filterValue;
  });

  return updatedMovies;
}

export function filterByCountry(country) {
  return (dispatch, getState) => {
    const {movies} = getState().movieReducer;
    dispatch(getMovieSuccess(filter(movies, country, "country")));
  }
}

export function filterByLanguage(language) {
  return (dispatch, getState) => {
    const {movies} = getState().movieReducer;
    dispatch(getMovieSuccess(filter(movies, language, "language")));
  }
}
