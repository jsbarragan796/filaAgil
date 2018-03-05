/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import "./App.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink, Button } from "reactstrap";

class Navebar extends Component {
  constructor (props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle () {
    this.setState({ isOpen: !this.state.isOpen });
  }
  render () {
    let usuarioNombre = null;
    let cerrarSesion = null;
    if (this.props.usuario !== null) {
      usuarioNombre = (<NavItem>
        <NavLink >{"Hola, " + this.props.usuario.username}</NavLink>
      </NavItem>);
      cerrarSesion = (<NavItem>
        <Button onClick={this.props.cerrarSesion}>Cerrar Sesion</Button>
      </NavItem>);
    } else {
      cerrarSesion = null;
    }
    return (
      <div>
        <Navbar className="navbar-custom" expand="md">
          <NavbarBrand href="/">
            <img src={this.props.logo} alt="logo" height="50"/>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {usuarioNombre}
              {cerrarSesion}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navebar;
