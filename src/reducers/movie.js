const initialState = {
  movies: [],
  completed: false,
  countries: [],
  languages: []
}

export default function(state = initialState, action) {
  console.log("Actions", action);
  switch (action.type) {
    case 'FETCH_MOVIES_SUCCESSFUL':
      return {
        ...state,
        movies: action.payload,
        completed: true
      }

    case 'FETCH_MOVIES_FAILURE':
      return {
        ...state,
        movies: action.payload,
        completed: false
      }

    case 'FETCH_LANGUAGES_SUCCESSFUL':
      return {
        ...state,
        languages: action.payload,
        completed: false
      }

    case 'FETCH_COUNTRIES_SUCCESSFUL':
      return {
        ...state,
        countries: action.payload,
        completed: false
      }
    default:
     return {
       ...state
     }
  }
}
