/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import {
  Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Row, Col, Alert, Button
} from "reactstrap";
import Login from "./login";
import LoginAdmin from "./loginAdmin";
import Registro from "./registro";

class DetalleSucursal extends Component {
  constructor (props) {
    super(props);

    this.state = {
      visibleS: false,
      visibleD: false,
      admin: false,
      registro: false,
      mensaje: ""
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onMostrar = this.onMostrar.bind(this);
    this.entraAdmin = this.entraAdmin.bind(this);
    this.saleAdmin = this.saleAdmin.bind(this);
    this.entraRegistro = this.entraRegistro .bind(this);
    this.saleRegistro = this.saleRegistro.bind(this);
  }

  onMostrar (err) {
    this.setState({ mensaje: err.mensaje });
    if (err.tipo === "danger") {
      this.setState({ visibleD: true });
    } else {
      this.setState({ visibleS: true });
    }
  }

  onDismiss () {
    this.setState({ visibleS: false });
    this.setState({ visibleD: false });
  }

  entraAdmin () {
    this.setState({ admin: true });
  }

  saleAdmin () {
    this.setState({ admin: false });
  }

  entraRegistro () {
    this.setState({ registro: true });
  }

  saleRegistro () {
    this.setState({ registro: false });
  }

  render () {
    let sucursal = this.props.sucursal;
    let logeo = null;
    if (this.state.registro) {
      logeo = (
        <div>
          <Registro
            saleRegistro={this.saleRegistro}
            error={(err) => this.onMostrar(err)}/>
          <Button onClick={this.saleRegistro}>Cancelar</Button>
        </div>
      );
    } else if (this.state.admin) {
      logeo = (
        <div>
          <LoginAdmin
            error={(err) => this.onMostrar(err)}
            logear = {(admin) => this.props.logearAdmin(admin)}
            desSeleccionSuc={this.props.desSeleccionSuc}
            sucursal = {sucursal.nombre} />
          <Button onClick={this.saleAdmin}>¿No eres administrador?</Button>
        </div>
      );
    } else {
      logeo = (
        <div><Login error={(err) => this.onMostrar(err)}
          desSeleccionSuc={this.props.desSeleccionSuc}
          logear={(usuario) => this.props.logear(usuario)} />
        <Button onClick={this.entraRegistro} >¿No tienes cuenta? registrarte!</Button>
        <Button onClick={this.entraAdmin}>¿Eres administrador?</Button>
        </div>
      );
    }
    return (
      <Row >
        <Col sm="3" />
        <Col sm="6">
          <Alert color="success" isOpen={this.state.visibleS} toggle={this.onDismiss}>
            {this.state.mensaje}
          </Alert>
          <Alert color="danger" isOpen={this.state.visibleD} toggle={this.onDismiss}>
            {this.state.mensaje}
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
