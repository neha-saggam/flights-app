import flightReducer from './flight';
import { combineReducers } from 'redux';

export default combineReducers({
    flightReducer: flightReducer
});
