/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import {
  Col,
  Row,
  Button
} from "reactstrap";

class IngredientesPedidoCliente extends Component {
  constructor (props) {
    super(props);
    this.state = {
      arroz: this.props.arroz,
      grano: this.props.grano,
      carnes: this.props.carnes,
      adiciones: this.props.adiciones,
      salsas: this.props.salsas,
      extras: this.props.extras,
      bebidas: this.props.bebidas,
      precio: null
    };
  }

  componentWillMount () {
    this.precio();
  }
  precio () {
    let total = 0;
    const arroz = this.state.arroz;
    const grano = this.state.grano;
    const carnes = this.state.carnes;
    const adiciones = this.state.adiciones;
    const salsas = this.state.salsas;
    const extras = this.state.extras;
    const bebidas = this.state.bebidas;
    if (arroz.tipos !== null) {
      total += arroz.precio * (arroz.tipos.length - 1);
    }
    if (grano.tipos !== null) {
      total += grano.precio * (grano.tipos.length - 1);
    }
    if (carnes.tipos !== null) {
      total += carnes.precio * (carnes.tipos.length - 1);
    }
    if (adiciones.tipos !== null) {
      total += adiciones.precio * (adiciones.tipos.length - 1);
    }
    if (salsas.tipos !== null) {
      total += salsas.precio * (salsas.tipos.length - 1);
    }
    if (extras.tipos !== null) {
      total += extras.precio * (extras.tipos.length - 1);
    }
    if (bebidas.tipos !== null) {
      total += bebidas.precio * (bebidas.tipos.length - 1);
    }

    this.setState({ precio: total });
  }

  render () {
    /* listas de todos los tipos de cada ingrediente */
    let tiposarroz = (this.state.arroz.tipos !== null) &&
      this.state.arroz.tipos.map((tipo) => <div key={tipo}>{tipo}</div>);
    let tiposgrano = (this.state.grano.tipos !== null) &&
      this.state.grano.tipos.map((tipo) => <div key={tipo}>{tipo}</div>);
    let tiposcarnes = (this.state.carnes.tipos !== null) &&
      this.state.carnes.tipos.map((tipo) => <div key={tipo}>{tipo}</div>);
    let tiposadiciones = (this.state.adiciones.tipos !== null) &&
      this.state.adiciones.tipos.map((tipo) => <div key={tipo}>{tipo}</div>);
    let tipossalsas = (this.state.salsas.tipos !== null) &&
      this.state.salsas.tipos.map((tipo) => <div key={tipo}>{tipo}</div>);
    let tiposextras = (this.state.extras.tipos !== null) &&
      this.state.extras.tipos.map((tipo) => <div key={tipo}>{tipo}</div>);
    let tiposbebidas = (this.state.bebidas.tipos !== null) &&
      this.state.bebidas.tipos.map((tipo) => <div key={tipo}>{tipo}</div>);

    return (
      <div>
        <Row>
          <Col sm="4">
            <h3>Arroz:</h3>
            {tiposarroz}
          </Col>
          <Col sm="4">
            <h3>Grano:</h3>
            {tiposgrano}
          </Col>
          <Col sm="4">
            <h3>Carnes:</h3>
            {tiposcarnes}
          </Col>
          <Col sm="4">
            <h3>Adiciones:</h3>
            {tiposadiciones}
          </Col>
          <Col sm="4">
            <h3>Salsas:</h3>
            {tipossalsas}
          </Col>
          <Col sm="4">
            <h3>Extras:</h3>
            {tiposextras}
          </Col>
          <Col sm="4">
            <h3>Bebidas:</h3>
            {tiposbebidas}
          </Col>
        </Row>
        <div sm="12">
          <h3>Precio:</h3>
          <p>$ {this.state.precio}</p>
          <Button onClick={() => {this.props.volverPedir();}}>Volver a pedir</Button>
        </div>
      </div>
    );
  }
}

export default IngredientesPedidoCliente;
