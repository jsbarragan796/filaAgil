/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText,
  Row, Col, Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Alert } from "reactstrap";

class HacerPedido extends Component {
  constructor (props) {
    super(props);
    this.manejoContrasenia = this.manejoContrasenia.bind(this);
    this.manejoCorreo = this.manejoCorreo.bind(this);
    this.manejoLogin = this.manejoLogin.bind(this);
    this.state = {
      ingredientes: [],
      pedidos: [],
      cSelected: [],
      orden: {}
    };
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
  }


  componentDidMount () {
    fetch("api/ingredientes")
      .then((res) => {
        return res.json();
      })
      .then((ingredientes) => {
        this.setState({ ingredientes: ingredientes });
      })
      .catch((err) => console.log(err));

    fetch("api/usuario/pedidos?correo=" + this.props.usuario.correo)
      .then((res) => {
        return res.json();
      })
      .then((pedidos) => {
        this.setState({ pedidos: pedidos });
      })
      .catch((err) => console.log(err));
  }
  agregarOrden (ingrediente) {
    let orden = this.state.orden;
    this.setState({ orden: orden });
  }
  //login
  manejoContrasenia (e) {
    this.setState({ pass: e.target.value });
    console.log("pass: " + e.target);
  }

  manejoCorreo (e) {
    this.setState({ correo: e.target.value });
    console.log("correo: " + e);
  }

  manejoLogin () {
    console.log("Correo: " + this.state.correo);
    console.log("pass: " + this.state.pass);
    fetch("api/usuario?correo=" + this.state.correo + "&pass=" + this.state.pass)
      .then((res) => {
        return res.json();
      })
      .then((usuario) => {
        if (usuario.username === undefined) {
          console.log("error" + usuario);
          this.props.error();
        } else {
          //callback al padre para que sepa el usuariologeado
          this.props.logear(usuario);
          console.log("feliz " + usuario.username);
        }
      })
      .catch((err) => console.log(err));
  }

  onRadioBtnClick (rSelected) {
    this.setState({ rSelected });
  }

  onCheckboxBtnClick (selected, p) {
    const index = this.state.cSelected.indexOf(selected);
    if (index < 0) {
      this.state.cSelected.push(selected);
    } else {
      this.state.cSelected.splice(index, 1);
    }
    this.setState({ cSelected: [...this.state.cSelected] });
  }
  render () {
    let form = null;
    if (this.state.ingredientes.length > 0) {
      form = (
        <div>
          {this.state.ingredientes.map((p) => {
            return (
              <Row >
                <Card>
                  <CardBody>
                    <CardTitle>Eligue  {p.tipo}</CardTitle>
                    <CardSubtitle>1 gratis (cada adicional {p.precio})</CardSubtitle>
                    {p.tipos.map((i, p) => {
                      return (
                        <Button onClick={() => this.onCheckboxBtnClick(i, p)}
                          active={this.state.cSelected.includes(i)} color="info">{i}</Button>
                      );
                    })}
                  </CardBody>
                </Card>
              </Row>
            );
          })}
        </div>
      );
    }
    return (
      <Row >
        <Col sm="2"/>
        <Col sm="8">
          <h1>Arma tu pedido</h1>
          {form}
        </Col>
        <Col sm="2"/>
      </Row>
    );
  }
}
export default HacerPedido;
