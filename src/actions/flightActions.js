import axios from 'axios';
import { predicateBy } from '../utils/common';

// const URL = `https://raw.githubusercontent.com/neha-saggam/movie-app/master/public/data/movies.json`;

const URL = `https://jsonplaceholder.typicode.com/todos/1`;


export function getFlights() {
      return function(dispatch) {
        axios.get(URL)
      .then((response) => {
        response.data = [
          {
             "id":"AI-202",
             "type": "one-way",
             "origin":"Pune",
             "destination":"Delhi",
             "departTime":"10:00 AM",
             "arriveTime":"12:00 PM",
             "departDate":"1st Jan 2012",
             "arriveDate": "10th Jan 2012",
             "cost": 9500,
             "unit": "INR",
             "airlines": "XYZ"
          }
       ]
       
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

export function searchFlight(origin, destination, departureDate, returnDate) {
  return (dispatch, getState) => {
    const {flights} = getState().flightReducer;
    let updatedFlights = [];
    if(returnDate !== "") {
      for(let i=0; i<flights.length; i++) {
        if(flights[i].origin.trim().toUpperCase() === origin.trim().toUpperCase() && flights[i].destination.trim().toUpperCase() === destination && flights[i].departureDate === departureDate && flights[i].returnDate === returnDate) {
          updatedFlights = flights.slice(i, i+1);
        }
      }
    }
    else
    {
    for(let i=0; i<flights.length; i++) {
      if(flights[i].origin.trim().toUpperCase() === origin.trim().toUpperCase() && flights[i].destination.trim().toUpperCase() === destination && flights[i].departureDate === departureDate) {
        updatedFlights = flights.slice(i, i+1);
      }
    }
  }
    dispatch(getMovieSuccess(updatedFlights));
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
