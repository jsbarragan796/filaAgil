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
      valor: 0,
      pedidos: null
    };
  }

  componentDidMount () {
    this.cambio();
  }

  cambio () {
    const val = this.state.valor;
    this.getPedidos();
    this.setState({ valor: val + 1 });
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

  render () {
    setInterval(this.cambio.bind(this), 60000); //actualiza la info cada minuto (60 segs)
    let pedidos = null;
    if (this.state.pedidos !== null) {
      pedidos = this.state.pedidos.map((pedido) => (
        <Col sm="3" key={pedido.fechaRealizado} >
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
        <p>{this.state.valor}</p>
      </div>);
  }
}
export default ControlSucursal;
