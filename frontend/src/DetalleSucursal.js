/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import { Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Row, Col } from "reactstrap";
import Login from "./login";

class DetalleSucursal extends Component {
  render () {
    let sucursal = this.props.sucursal;
    return (
      <Row >
        <Col sm="3"/>
        <Col sm="6">
          <Card>
            <CardBody>
              <CardTitle>Sucursal {sucursal.nombre}</CardTitle>
              <CardSubtitle>Dirección: {sucursal.direccion}</CardSubtitle>
            </CardBody>
            <CardImg width="100px" src={sucursal.logo} alt={"logo resturant " + sucursal.nombre} />
            <Login desSeleccionSuc = {this.props.desSeleccionSuc}
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
