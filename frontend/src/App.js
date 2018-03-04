/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import "./App.css";
import Sucursal from "./Sucursal";
import DetalleSucursal from "./DetalleSucursal";
import Navebar from "./Navebar";

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      images: [],
      sucursales: null,
      sucursalSelecionada: null
    };
  }
  componentDidMount () {
    fetch("api/images")
      .then((res) => {
        return res.json();
      })
      .then((images) => {
        this.setState({ images: images });
      })
      .catch((err) => console.log(err));
    fetch("api/sucursales")
      .then((res) => {
        return res.json();
      })
      .then((sucursales) => {
        this.setState({ sucursales: sucursales });
      })
      .catch((err) => console.log(err));
  }

  seleccion (suc) {
    this.setState({
      sucursalSelecionada: suc
    });
  }

  render () {
    let vista = null;
    let nav = null;
    if (this.state.sucursalSelecionada === null) {
      nav = (<header className="App-header">
        <img src={this.state.images.url} alt="logo" height="100"/>
        <h1 className="App-title">Bienvenido a Fila Agil</h1>
      </header>);
      vista = (<Sucursal
        sucursales = {this.state.sucursales}
        seleccion = {this.seleccion.bind(this)}/>);
    } else {
      nav = <Navebar logo={this.state.images.url}/>;
      vista = <DetalleSucursal sucursal={this.state.sucursalSelecionada}/>;
    }
    return (
      <div className="App">
        {nav}
        <div className="Conteiner">
          {vista}
        </div>
      </div>
    );
  }
}

export default App;
