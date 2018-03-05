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
    setInterval(this.cambio.bind(this), 6000);
    return (<div>
      <p>{this.state.sucursal.nombre}</p>
      <p>{this.state.valor}</p>
    </div>);
  }
}
export default ControlSucursal;
