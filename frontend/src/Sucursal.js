/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import { Card, CardImg, CardBody, Button,
  CardTitle, CardSubtitle, Col } from "reactstrap";

class Sucursal extends Component {
  render () {
    return (
      <Col sm="4" key={this.props.sucursal._id}>
        <Card>
          <CardBody>
            <CardTitle>Sucursal {this.props.sucursal.nombre}</CardTitle>
            <CardSubtitle>Dirección: {this.props.sucursal.direccion}</CardSubtitle>
          </CardBody>
          <CardImg width="100px" src={this.props.sucursal.logo} alt={"logo resturant " + this.props.sucursal.nombre} />
          <CardBody>
            <Button onClick={() => {this.props.seleccionSuc();}}>Estoy haciendo fila aquí</Button>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default Sucursal;
