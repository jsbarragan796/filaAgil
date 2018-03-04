/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import { Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Row, Col } from "reactstrap";

class DetalleSucursal extends Component {
  render () {
    if (this.props.sucursal === null) {return null;} else {
      let sucursal = this.props.sucursal;
      return (
        <Row >
          <Col sm="4" key={sucursal._id}>
            <Card>
              <CardBody>
                <CardTitle>Sucursal {sucursal.nombre}</CardTitle>
                <CardSubtitle>Dirección: {sucursal.direccion}</CardSubtitle>
              </CardBody>
              <CardImg width="100px" src={sucursal.logo} alt="logo resturant {{p.nombre}}" />
            </Card>
          </Col>
          );
          })
        </Row>

      );
    }
  }
}

export default DetalleSucursal;
