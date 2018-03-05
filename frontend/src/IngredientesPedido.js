/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import {
  Col
} from "reactstrap";

class IngredientesPedido extends Component {
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
  precio () {

  }
  render () {
    /* listas de todos los tipos de cada ingrediente */
    let tiposarroz = (this.state.arroz.tipos !== null) && this.state.arroz.tipos.map((tipo) => <div key={tipo}>{tipo}</div>);
    let tiposgrano = (this.state.grano.tipos !== null) && this.state.grano.tipos.map((tipo) => <div key={tipo}>{tipo}</div>);
    let tiposcarnes = (this.state.carnes.tipos !== null) && this.state.carnes.tipos.map((tipo) => <div key={tipo}>{tipo}</div>);
    let tiposadiciones = (this.state.adiciones.tipos !== null) && this.state.adiciones.tipos.map((tipo) => <div key={tipo}>{tipo}</div>);
    let tipossalsas = (this.state.salsas.tipos !== null) && this.state.salsas.tipos.map((tipo) => <div key={tipo}>{tipo}</div>);
    let tiposextras = (this.state.extras.tipos !== null) && this.state.extras.tipos.map((tipo) => <div key={tipo}>{tipo}</div>);
    let tiposbebidas = (this.state.bebidas.tipos !== null) && this.state.bebidas.tipos.map((tipo) => <div key={tipo}>{tipo}</div>);

    return (<div>
      <Col>
        <h3>Arroz:</h3>
        {tiposarroz}
      </Col>
      <Col>
        <h3>Grano:</h3>
        {tiposgrano}
      </Col>
      <Col>
        <h3>Carnes:</h3>
        {tiposcarnes}
      </Col>
      <Col>
        <h3>Adiciones:</h3>
        {tiposadiciones}
      </Col>
      <Col>
        <h3>Salsas:</h3>
        {tipossalsas}
      </Col>
      <Col>
        <h3>Extras:</h3>
        {tiposextras}
      </Col>
      <Col>
        <h3>Bebidas:</h3>
        {tiposbebidas}
      </Col>
    </div>);
  }
}

export default IngredientesPedido;
