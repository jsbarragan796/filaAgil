/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import "./App.css";
import Sucursal from "./Sucursal";
import DetalleSucursal from "./DetalleSucursal";
import HacerPedido from "./HacerPedido";
import Navebar from "./Navebar";
import NavebarAdmin from "./NavebarAdmin";
import ControlSucursal from "./ControlSucursal";
import { Row } from "reactstrap";

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      images: [],
      sucursales: [],
      sucursalSelecionada: null,
      usuarioLogeado: null,
      adminLogeado: null
    };
  }
  componentDidMount () {
    fetch("api/sucursales")
      .then((res) => {
        return res.json();
      })
      .then((sucursales) => {
        this.setState({ sucursales: sucursales });
      })
      .catch((err) => console.log(err));

    fetch("api/images")
      .then((res) => {
        return res.json();
      })
      .then((images) => {
        this.setState({ images: images });
      })
      .catch((err) => console.log(err));
  }
  seleccionSuc (suc) {
    this.setState({
      sucursalSelecionada: suc
    });
  }
  desSeleccionSuc () {
    this.setState({
      sucursalSelecionada: null
    });
  }
  //login
  usuarioLogear (usuario) {
    this.setState({
      usuarioLogeado: usuario
    });
  }

  //login de admin
  adminLogear (admin) {
    this.setState({
      adminLogeado: admin
    });
  }

  usuarioCerrarSesion (usuario) {
    this.setState({
      usuarioLogeado: null
    });
  }

  adminCerrarSesion () {
    this.setState({
      adminLogeado: null
    });
  }

  renderSucursal (s) {
    return (<Sucursal key ={s.nombre} sucursal = {s}
      seleccionSuc = {() => this.seleccionSuc(s)}/>);
  }


  render () {
    let vista = <Row >{this.state.sucursales.map((p) => this.renderSucursal(p))}</Row>;
    let nav = (<header className="App-header">
      <img src={this.state.images.url} alt="logo" height="100"/>
      <h1 className="App-title">Bienvenido a Fila Agil</h1>
    </header>);
    if (this.state.sucursalSelecionada !== null && this.state.usuarioLogeado === null) {
      nav = (<Navebar logo={this.state.images.url} usuario={this.state.usuarioLogeado}
        cerrarSesion = {() => this.usuarioCerrarSesion()}/>);
      vista = (<DetalleSucursal
        logear = {(usuario) => this.usuarioLogear(usuario)}
        logearAdmin = {(admin) => this.adminLogear(admin)}
        usuario = {this.state.usuarioLogeado}
        sucursal={this.state.sucursalSelecionada}
        desSeleccionSuc={() => this.desSeleccionSuc.bind(this)}/>);
    }
    if (this.state.sucursalSelecionada !== null && this.state.usuarioLogeado !== null) {
      nav = (<Navebar logo={this.state.images.url} usuario={this.state.usuarioLogeado}
        cerrarSesion = {() => this.usuarioCerrarSesion()}/>);
      vista = <HacerPedido sucursal={this.state.sucursalSelecionada} usuario={this.state.usuarioLogeado} />;
    }
    if (this.state.adminLogeado !== null) {
      nav = (<NavebarAdmin logo={this.state.images.url} admin={this.state.adminLogeado}
        cerrarSesion = {() => this.adminCerrarSesion()}/>);
      vista = <ControlSucursal sucursal={this.state.adminLogeado} />;
    }
    return (
      <div className="App">
        {nav}
        <div className="Container">
          {vista}
        </div>
      </div>
    );
  }
}

export default App;
