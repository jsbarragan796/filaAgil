/* eslint react/prop-types: 0 */
import IngredientesPedidoCliente from "./IngredientesPedidoCliente";
import React, { Component } from "react";
import { Button,
  Row, Col, Card, CardBody,
  CardTitle, CardSubtitle, Alert } from "reactstrap";

class HacerPedido extends Component {
  constructor (props) {
    super(props);
    this.state = {
      ingredientes: [],
      pedidos: null,
      cSelected: [],
      visible: false
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onMostrar = this.onMostrar.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
    this.volverPedir = this.volverPedir.bind(this);
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
  onMostrar (err) {
    this.setState({ visible: true });
    fetch("api/usuario/pedidos?correo=" + this.props.usuario.correo)
      .then((res) => {
        return res.json();
      })
      .then((pedidos) => {
        this.setState({ pedidos: pedidos });
      })
      .catch((err) => console.log(err));
  }

  onDismiss () {
    this.setState({ visible: false });
  }

  entraAdmin () {
    this.setState({ admin: true });
  }
  volverPedir (orden) {
    let event = new Date();
    orden.fechaRealizado = event.toISOString();
    orden.sucursal.nombre = this.props.sucursal.nombre;
    Reflect.deleteProperty(orden, "_id");
    fetch("api/addpedido", { method: "POST", body: JSON.stringify(orden),
      headers: { "Content-Type": "application/json" } })
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        if (resp === undefined) {
          console.log("error");
        } else {
          //callback al padre para que sepa el usuariologeado
          this.onMostrar();
          console.log("intentando ");
        }
      })
      .catch((err) => {
        this.onMostrar();
        console.log(err);
      }
      );
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
    let pedidos = null;
    if (this.state.pedidos !== null) {
      pedidos = this.state.pedidos.map((pedido) => (
        <Col sm="4" key={pedido._id} >
          <Card>
            <CardBody>
              <CardSubtitle>Fecha: {pedido.fechaRealizado}</CardSubtitle>
              <div>
                <IngredientesPedidoCliente
                  bebidas={pedido.bebidas}
                  extras={pedido.extras}
                  salsas={pedido.salsas}
                  adiciones={pedido.adiciones}
                  carnes={pedido.carnes}
                  arroz={pedido.arroz}
                  grano={pedido.grano}
                  volverPedir={() => this.volverPedir(pedido)}/>
              </div>
            </CardBody>
          </Card>
        </Col>
      ));
    }
    if (this.state.ingredientes.length > 0) {
      form = (
        <div>
          {this.state.ingredientes.map((p) => {
            return (
              <Row >
                <Card>
                  <CardBody>
                    <CardTitle>Elige  {p.tipo}</CardTitle>
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
      <div>
        <Row >
          <Col sm="2"/>
          <Col sm="8">
            <h1>Arma tu pedido</h1>
            {form}
          </Col>
          <Col sm="2"/>
        </Row>
        <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
          { this.props.usuario.username + " ya tomamos tu pedido!"}
        </Alert>
        <h1>Vuelve a pedir de tus pedidos anteriores</h1>
        <Row >
          {pedidos}
        </Row>
      </div>);
  }
}
export default HacerPedido;
