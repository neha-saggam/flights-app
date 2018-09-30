import React from "react";
import {Table} from 'react-bootstrap';

export default function MovieTable(props) {
  const { flights, sortByTitleYear } = props;
  const movieItems = flights.map((flight, index) =>
  <tr key={index}>
  <td> {index+1}</td>
  <td> {flight.airlines} </td>
  <td> {flight.id} </td>
  <td> {flight.origin}</td>
  <td> {flight.destination}</td>
  <td> {flight.departDate} {flight.departTime}</td>
  <td> {flight.arriveDate} {flight.arriveTime}</td>
  <td> {flight.unit} {flight.cost} </td>
  </tr>
  );

return (
  <Table responsive>
  <thead>
    <tr>
      <th>#</th>
      <th>Airlines</th>
      <th>Flight</th>
      <th>From</th>
      <th>To</th>
      <th>Departure</th>
      <th>Arrvial</th>
      <th>Cost</th>
    </tr>
  </thead>
  <tbody>
    {movieItems}
  </tbody>
</Table>
);
}
