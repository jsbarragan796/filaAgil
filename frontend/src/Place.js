/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import { Card, CardImg, CardBody, CardLink,
  CardTitle, CardSubtitle, Row, Col } from "reactstrap";

class Place extends Component {
  render () {
    return (
      <Row >{this.props.places.map(
        (p) => {
          return (
            <Col sm="3">
              <Card>
                <CardBody>
                  <CardTitle>{p.name}</CardTitle>
                  <CardSubtitle>address: {p.address}</CardSubtitle>
                </CardBody>
                <CardImg width="100px" src={p.url} alt="logo resturant {{p.name}}" />
                <CardBody>
                  <CardLink href="#">I am queueing here</CardLink>
                </CardBody>
              </Card>
            </Col>
          );
        })
      }</Row>

    );
  }
}

export default Place;
