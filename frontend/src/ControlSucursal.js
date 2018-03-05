/* eslint react/prop-types: 0 */
import React, { Component } from "react";

class ControlSucursal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      sucursal: this.props.sucursal,
      valor: 0
    };
  }
  cambio () {
    const val = this.state.valor;
    this.setState({ valor: val + 1 });
  }
  render () {
    setInterval(this.cambio.bind(this), 60000);
    return (<div>
      <h1>Sucursal: {this.state.sucursal.nombre}</h1>
      <h2>Direccion: {this.state.sucursal.direccion}</h2>
      <p>{this.state.valor}</p>
    </div>);
  }
}
export default ControlSucursal;
