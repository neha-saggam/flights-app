import React from "react";
import {Navbar} from 'react-bootstrap';

export function NavBar(props) {
  return   (<Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#home">Movies</a>
      </Navbar.Brand>
    </Navbar.Header>
  </Navbar>);
}
