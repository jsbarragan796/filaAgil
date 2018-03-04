/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import { Card, CardImg, CardBody, Button,
  CardTitle, CardSubtitle, Row, Col } from "reactstrap";

class Sucursal extends Component {
  render () {
    if (this.props.sucursales === null) {return null;} else {
      return (
        <Row >{this.props.sucursales.map(
          (p) => {
            return (
              <Col sm="4" key={p._id}>
                <Card>
                  <CardBody>
                    <CardTitle>Sucursal {p.nombre}</CardTitle>
                    <CardSubtitle>Dirección: {p.direccion}</CardSubtitle>
                  </CardBody>
                  <CardImg width="100px" src={p.logo} alt={"logo resturant " + p.nombre} />
                  <CardBody>
                    <Button onClick={(p) => this.props.seleccion(p)}>Estoy haciendo fila aquí</Button>
                  </CardBody>
                </Card>
              </Col>
            );
          })
        }</Row>

      );
    }
  }
}

export default Sucursal;
