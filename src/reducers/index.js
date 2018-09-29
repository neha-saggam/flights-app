import movieReducer from './movie';
import { combineReducers } from 'redux';

export default combineReducers({
    movieReducer:movieReducer
});
