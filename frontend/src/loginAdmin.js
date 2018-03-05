/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import { Button, Label, Input, Form, FormGroup } from "reactstrap";

class LoginAdmin extends Component {
  constructor (props) {
    super(props);
    this.manejoContrasenia = this.manejoContrasenia.bind(this);
    this.manejoLogin = this.manejoLogin.bind(this);
    this.state = {
      sucursal: this.props.sucursal,
      pass: ""
    };
  }
  //login
  manejoContrasenia (e) {
    this.setState({ pass: e.target.value });
    console.log("pass: " + e.target);
  }

  manejoLogin () {
    console.log("pass: " + this.state.pass);
    fetch("api/sucursal?nombre=" + this.props.sucursal + "pass=" + this.state.pass)
      .then((res) => {
        return res.json();
      })
      .then((usuario) => {
        if (usuario.username === undefined) {
          console.log("error" + usuario);
          this.props.error();
        } else {
          //callback al padre para que sepa el usuariologeado
          this.props.logear(usuario);
          console.log("feliz " + usuario.username);
        }
      })
      .catch((err) => console.log(err));
  }

  render () {
    return (

      <Form >
        <FormGroup>
          <Label for="examplePassword">Contraseña</Label>
          <Input type="password" name="pass" id="examplePassword" placeholder="Contraseña"
            value={this.state.pass} autoComplete="off" />
        </FormGroup>
        <Button onClick={this.manejoLogin}>Entrar</Button>
        <Button onClick={this.props.desSeleccionSuc()}>Atrás</Button>
      </Form>

    );
  }
}
export default LoginAdmin;
