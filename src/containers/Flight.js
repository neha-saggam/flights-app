import { connect } from 'react-redux';
import  actions from '../actions';
import { bindActionCreators } from 'redux';
import FlightList from '../components/Flight/List';

function mapStateToProps(state) {
  return {
    flights: state.flightReducer.flights
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
        getFlights: actions.flightActions.getFlights,
        searchFlight: actions.flightActions.searchFlight,
        sortByTitleYear: actions.flightActions.sortByTitleYear,
        filterByLanguage: actions.flightActions.filterByLanguage,
        filterByCountry: actions.flightActions.filterByCountry
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FlightList);
