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
    console.log("nombre: " + this.state.sucursal);
    fetch("api/sucursal?nombre=" + this.props.sucursal + "&pass=" + this.state.pass)
      .then((res) => {
        return res.json();
      })
      .then((sucursalEntrada) => {
        if (sucursalEntrada.nombre === undefined) {
          let err = { mensaje: "Contraseña incorrecta", tipo: "danger" };
          this.props.error(err);
        } else {
          //callback al padre para que sepa el sucursalEntradalogeado
          this.props.logear(sucursalEntrada);
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
            value={this.state.pass} onChange={this.manejoContrasenia} autoComplete="off" />
        </FormGroup>
        <Button onClick={this.manejoLogin}>Entrar</Button>
      </Form>

    );
  }
}
export default LoginAdmin;
