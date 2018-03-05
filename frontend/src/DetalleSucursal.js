/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import { Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Row, Col, Button } from "reactstrap";
import Login from "./login";

class DetalleSucursal extends Component {
  render () {
    if (this.props.sucursal !== null) {
      let sucursal = this.props.sucursal;
      return (
        <Row >
          <Button onClick={this.props.desSeleccionSuc(sucursal)}>Atras</Button>
          <Col sm="4" key={sucursal._id}>
            <Card>
              <CardBody>
                <CardTitle>Sucursal {sucursal.nombre}</CardTitle>
                <CardSubtitle>Dirección: {sucursal.direccion}</CardSubtitle>
              </CardBody>
              <CardImg width="100px" src={sucursal.logo} alt={"logo resturant " + sucursal.nombre} />
              <Login logear={(usuario) => this.props.logear(usuario)}/>
            </Card>
          </Col>
        </Row>
      );
    }
  }
}

export default DetalleSucursal;
