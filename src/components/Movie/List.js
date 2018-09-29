import React from "react";
import MovieTable from './Table';
import {FormControl, Row, Grid, Col} from 'react-bootstrap';

export default class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [ ],
      mode: "",
      errors: {},
      searchText: "",
      sortOrder: "ASC",
      filterByOptions: [
        "Select",
        "Language",
        "Country"
      ],
      languages: [],
      countries: [],
      isInit: true,
      filterBy: ""
    }
    this.handleSearhTextChange = this.handleSearhTextChange.bind(this);
    this.searchMovie = this.searchMovie.bind(this);
    this.sortByTitleYear = this.sortByTitleYear.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    // this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentDidMount() {
    this.props.getMovies();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({movies: nextProps.movies});
    this.setState({languages: nextProps.languages});
    this.setState({countries: nextProps.countries});
  }

  handleSearhTextChange(e) {
    this.setState({searchText: e.target.value});
    if(e.target.value.length === 0 && !this.state.isInit) {
      this.props.getMovies();
    }
    this.setState({isInit: false});
  }

  searchMovie(event) {
    if(event.key === 'Enter') {
      this.props.searchMovie(this.state.searchText);
    }
  }

  handleLanguageChange(e) {
    this.props.filterByLanguage(e.target.value);
  }

  handleCountryChange(e) {
  this.props.filterByCountry(e.target.value);
  }

  sortByTitleYear(sortBy) {
    if(this.state.sortOrder === 'ASC') {
      this.setState({sortOrder: 'DESC'});
      this.props.sortByTitleYear(this.state.sortOrder, sortBy);
    }
    else {
      this.props.sortByTitleYear(this.state.sortOrder, sortBy);
      this.setState({sortOrder: 'ASC'});
    }
  }

render() {
  return (
    <div>
    <Grid>
    <Row className="show-grid">
    <Col xs={3} md={2}>
    <FormControl componentClass="select" placeholder="Type" onChange={(e) => this.setState({filterBy: e.target.value})}>
    {
       this.state.filterByOptions.map((option, index) => {
          return (<option key={index} value={option}>{option}</option>)
       })
    }
    </FormControl>
    </Col>
    {this.state.filterBy === "Language"
      &&
      <Col xs={6} md={2}>
      <FormControl componentClass="select" placeholder="Type" onChange={this.handleLanguageChange}>
      {
        this.state.languages.map((option, index) => {
          return (<option key={index} value={option}>{option}</option>)
        })
      }
      </FormControl>
    </Col>
    }
    {this.state.filterBy === "Country"
     &&
     <Col xs={6} md={3}>
     <FormControl componentClass="select" placeholder="Type" onChange={this.handleCountryChange}>
     {
       this.state.countries.map((option, index) => {
        return (<option key={index} value={option}>{option}</option>)
      })
    }
</FormControl>
    </Col> }

      <Col xsOffset={7} xs={6} md={3}>
      <FormControl
        type="text"
        value={this.state.value}
        placeholder="Enter text"
        onChange={this.handleSearhTextChange}
        onKeyPress={this.searchMovie}
      />
      </Col>
    </Row>
    </Grid>
      <MovieTable movies={this.state.movies} sortByTitleYear={this.sortByTitleYear}></MovieTable>
  </div>
  );
}
}
