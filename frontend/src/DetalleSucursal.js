/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import {
  Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Row, Col, Alert, Button
} from "reactstrap";
import Login from "./login";
import LoginAdmin from "./loginAdmin";

class DetalleSucursal extends Component {
  constructor (props) {
    super(props);

    this.state = {
      visible: false,
      admin: false
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onMostrar = this.onMostrar.bind(this);
    this.entraAdmin = this.entraAdmin.bind(this);
    this.saleAdmin = this.saleAdmin.bind(this);
  }

  onMostrar () {
    this.setState({ visible: true });
  }

  onDismiss () {
    this.setState({ visible: false });
  }

  entraAdmin () {
    this.setState({ admin: true });
  }

  saleAdmin () {
    this.setState({ admin: false });
  }

  render () {
    let sucursal = this.props.sucursal;
    let logeo = null;
    if (this.state.admin) {
      logeo = (
        <div>
          <LoginAdmin
            error={this.onMostrar}
            logear = {(admin) => this.props.logearAdmin(admin)}
            desSeleccionSuc={this.props.desSeleccionSuc}
            sucursal = {sucursal.nombre} />
          <Button onClick={this.saleAdmin}>¿No eres administrador?</Button>
        </div>
      );
    } else {
      logeo = (<div><Login error={this.onMostrar}
        desSeleccionSuc={this.props.desSeleccionSuc}
        logear={(usuario) => this.props.logear(usuario)} />
      <div>
        <Button href="" >¿No tienes cuenta? registrarte!</Button>
        <Button onClick={this.entraAdmin}>¿Eres administrador?</Button>
      </div>
      </div>);
    }
    return (
      <Row >
        <Col sm="3" />
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
            {/*Aca va el logeo:*/}
            {logeo}
          </Card>
        </Col>
        <Col sm="3" />
      </Row>
    );
  }
}


export default DetalleSucursal;
