/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import IngredientesPedido from "./IngredientesPedido";
import {
  Media,
  Row,
  Col,
  Card,
  CardBody,
  CardSubtitle
} from "reactstrap";

class ControlSucursal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      sucursal: this.props.sucursal,
      pedidos: null,
      ingredientes: null
    };
  }

  componentWillMount () {
    this.cambio();
  }

  cambio () {
    this.getPedidos();
    this.getIngredientes();
  }

  getPedidos () {
    const query = "api/sucursal/pedidos?nombre=" + this.state.sucursal.nombre;
    fetch(query)
      .then((data) => {
        return data.json();
      }).then((pedidos) => {
        this.setState({ pedidos: pedidos });
      })
      .catch((error) => console.log("se encontro el error:\n"));
  }

  getIngredientes () {
    const query = "api/sucursal/ingredientes?nombre=" + this.state.sucursal.nombre;
    fetch(query)
      .then((data) => {
        return data.json();
      }).then((ingredientes) => {
        this.setState({ ingredientes: ingredientes });
      })
      .catch((error) => console.log("se encontro el error:\n"));
  }

  render () {
    setInterval(this.cambio.bind(this), 60000); //actualiza la info cada minuto (60 segs)
    let pedidos = null;
    let ingredientes = null;
    if (this.state.pedidos !== null) {
      pedidos = this.state.pedidos.map((pedido) => (
        <Col sm="4" key={pedido.fechaRealizado} >
          <Card>
            <CardBody>
              <CardSubtitle>Fecha: {pedido.fechaRealizado}</CardSubtitle>
              <div>
                <IngredientesPedido
                  bebidas={pedido.bebidas}
                  extras={pedido.extras}
                  salsas={pedido.salsas}
                  adiciones={pedido.adiciones}
                  carnes={pedido.carnes}
                  arroz={pedido.arroz}
                  grano={pedido.grano} />
              </div>
            </CardBody>
          </Card>
        </Col>
      ));
    }
    if (this.state.ingredientes !== null) {
      ingredientes = (
        <Row>
          <Col sm = "4">
            <h4> pedidos de arroz totales:</h4>
            {this.state.ingredientes.arroz}
          </Col>
          <Col sm = "4">
            <h4> pedidos de grano totales:</h4>
            {this.state.ingredientes.grano}
          </Col>
          <Col sm = "4">
            <h4> pedidos de carnes totales:</h4>
            {this.state.ingredientes.carnes}
          </Col>
          <Col sm = "4">
            <h4> pedidos de adiciones totales:</h4>
            {this.state.ingredientes.adiciones}
          </Col>
          <Col sm = "4">
            <h4> pedidos de salsas totales:</h4>
            {this.state.ingredientes.salsas}
          </Col>
          <Col sm = "4">
            <h4> pedidos de extras totales:</h4>
            {this.state.ingredientes.extras}
          </Col>
          <Col sm = "4">
            <h4> pedidos de bebidas totales:</h4>
            {this.state.ingredientes.bebidas}
          </Col>
        </Row>
      );
    }

    return (
      <div>
        <h1>Sucursal: {this.state.sucursal.nombre}</h1>
        <h2>Direccion: {this.state.sucursal.direccion}</h2>
        <Media left>
          <Media object src={this.state.sucursal.logo} />
        </Media>
        <h3 className="abajo" >Pedidos:</h3>
        <Row>
          {pedidos}
        </Row>
        <h3 className="abajo" >Uso de ingredientes:</h3>
        <Row>
          <br/>
          <br/>
          <br/>
          {ingredientes}
        </Row>
      </div>);
  }
}
export default ControlSucursal;
