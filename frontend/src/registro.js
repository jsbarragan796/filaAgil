/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import { Button, Label, Input, Form, FormGroup } from "reactstrap";

class Registro extends Component {
  constructor (props) {
    super(props);
    this.manejoContrasenia = this.manejoContrasenia.bind(this);
    this.manejoCorreo = this.manejoCorreo.bind(this);
    this.manejoUsername = this.manejoUsername.bind(this);
    this.manejoRegistro = this.manejoRegistro.bind(this);
    this.state = {
      correo: "",
      pass: "",
      username: ""
    };
  }
  //login
  manejoContrasenia (e) {
    this.setState({ pass: e.target.value });
  }

  manejoUsername (e) {
    this.setState({ username: e.target.value });
  }

  manejoCorreo (e) {
    this.setState({ correo: e.target.value });
  }

  manejoRegistro () {
    let usuario = { username: this.state.username, correo: this.state.correo, pass: this.state.pass };
    fetch("api/addUsuario", { method: "POST", body: JSON.stringify(usuario),
      headers: { "Content-Type": "application/json" } })
      .then((res) => {
        return res.json();
      })
      .then((usuario) => {
        if (usuario.mensaje === undefined) {
          let err = { mensaje: usuario.error, tipo: "danger" };
          this.props.error(err);
        } else {
          //callback al padre para que sepa el usuariologeado
          let err = { mensaje: "Bienvenido " + this.state.username + " ahora puedes iniciar sesion", tipo: "success" };
          this.props.saleRegistro();
          this.props.error(err);
        }
      })
      .catch((err) => console.log(err));
  }

  render () {
    return (

      <Form >
        <FormGroup>
          <Label >Nombre de usuario</Label>
          <Input name="username" id="username" placeholder="usuario"
            value={this.state.username} onChange={this.manejoUsername}/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Correo Eléctronico</Label>
          <Input type="email" name="correo" id="exampleEmail" placeholder="ejemplo@elemplo.com"
            value={this.state.correo} onChange={this.manejoCorreo}/>
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Contraseña</Label>
          <Input type="password" name="pass" id="examplePassword" placeholder="Contraseña"
            value={this.state.pass} onChange={this.manejoContrasenia} autoComplete="off"/>
        </FormGroup>
        <Button onClick={this.manejoRegistro}>Registrarse</Button>
      </Form>

    );
  }
}
export default Registro;
