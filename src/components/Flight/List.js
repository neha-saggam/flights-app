import React from "react";
import MovieTable from './Table';
import {FormControl, Row, Grid, Col, FormGroup, ControlLabel, Tab, Tabs, Button} from 'react-bootstrap';


function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}


export default class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      flights: [ ],
      mode: "",
      errors: {},
      searchText: "",
      sortOrder: "ASC",
      isInit: true,
      filterBy: ""
    }

    this.searchFlight = this.searchFlight.bind(this);

    this.formOneWayInstance = (
      <form>
        <FieldGroup
          id="formControlsText"
          type="text"
          label=""
          placeholder="Enter Origin"
        />
        <FieldGroup
          id="formControlsEmail"
          type="text"
          label=""
          placeholder="Enter Destination"
        />
        <FieldGroup
          id="formControlsEmail"
          type="date"
          label=""
          placeholder="Enter Departure Date"
        />
        <FieldGroup
          id="formControlsEmail"
          type="number"
          label=""
          placeholder="Enter Number of Passengers"
        />
       <Button type="button" onClick={this.searchFlight}>Search</Button>
      </form>
    );
    
    this.formReturnInstance = (
      <form>
        <FieldGroup
          id="formControlsText"
          type="text"
          label=""
          placeholder="Enter Origin"
        />
        <FieldGroup
          id="formControlsEmail"
          type="text"
          label=""
          placeholder="Enter Destination"
        />
        <FieldGroup
          id="formControlsEmail"
          type="date"
          label=""
          placeholder="Enter Departure Date"
        />
    
        <FieldGroup
          id="formControlsEmail"
          type="date"
          label=""
          placeholder="Enter Return Date"
        />
    
        <FieldGroup
          id="formControlsEmail"
          type="number"
          label=""
          placeholder="Enter Number of Passengers"
        />
    
       <Button type="button" onClick={this.searchFlight}>Search</Button>
      </form>
    );
  }

  componentDidMount() {
    this.props.getFlights();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({flights: nextProps.flights});
    this.setState({languages: nextProps.languages});
    this.setState({countries: nextProps.countries});
  }

  searchFlight(event) {
    console.log("searchn called", event.target.value);
    this.props.searchFlight("Delhi", "Pune", "28 Jan 2018", "");
  }

render() {
  return (
    <div>
    <Grid>
    <Row>
    <Col xs={3} md={3}>
    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
    <Tab eventKey={1} title="One way">
      {this.formOneWayInstance}
    </Tab>
    <Tab eventKey={2} title="Return">
      {this.formReturnInstance}
    </Tab>
    </Tabs>
    <ControlLabel></ControlLabel>
    <ControlLabel>Refine Flight Search</ControlLabel>
    <input type="range" min="0" max="10" />

    </Col>
      <Col xs={6} md={9}>
      <MovieTable flights={this.state.flights}></MovieTable>
      </Col>
    </Row>
    </Grid>
  </div>
  );
}
}
