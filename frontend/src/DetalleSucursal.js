/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import { Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Row, Col, Alert } from "reactstrap";
import Login from "./login";

class DetalleSucursal extends Component {
  constructor (props) {
    super(props);

    this.state = {
      visible: false
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onMostrar = this.onMostrar.bind(this);
  }

  onMostrar () {
    this.setState({ visible: true });
  }

  onDismiss () {
    this.setState({ visible: false });
  }
  render () {
    let sucursal = this.props.sucursal;
    return (
      <Row >
        <Col sm="3"/>
        <Col sm="6">
          <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
            Credenciales incorrectas!
          </Alert>
          <Card>
            <CardBody>
              <CardTitle>Sucursal {sucursal.nombre}</CardTitle>
              <CardSubtitle>Dirección: {sucursal.direccion}</CardSubtitle>
            </CardBody>
            <CardImg width="100px" src={sucursal.logo} alt={"logo resturant " + sucursal.nombre} />
            <Login error = {this.onMostrar}
              desSeleccionSuc = {this.props.desSeleccionSuc}
              logear={(usuario) => this.props.logear(usuario)}/>
            <a href="" >¿No tienes cuenta? registrarte!</a>
          </Card>
        </Col>
        <Col sm="3"/>
      </Row>
    );
  }
}


export default DetalleSucursal;
