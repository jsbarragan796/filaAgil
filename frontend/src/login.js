/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import { Button, Label, Input, Form, FormGroup } from "reactstrap";

class Login extends Component {
  constructor (props) {
    super(props);
    this.manejoContrasenia = this.manejoContrasenia.bind(this);
    this.manejoCorreo = this.manejoCorreo.bind(this);
    this.manejoLogin = this.manejoLogin.bind(this);
    this.state = {
      correo: "",
      pass: ""
    };
  }
  //login
  manejoContrasenia (e) {
    this.setState({ pass: e.target.value });
  }

  manejoCorreo (e) {
    this.setState({ correo: e.target.value });
  }

  manejoLogin () {
    fetch("api/usuario?correo=" + this.state.correo + "&pass=" + this.state.pass)
      .then((res) => {
        return res.json();
      })
      .then((usuario) => {
        if (usuario.username === undefined) {
          let err = { mensaje: usuario.error, tipo: "danger" };
          this.props.error(err);
        } else {
          //callback al padre para que sepa el usuariologeado
          this.props.logear(usuario);
        }
      })
      .catch((err) => console.log(err));
  }

  render () {
    return (

      <Form >
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
        <Button onClick={this.manejoLogin}>Entrar</Button>
        <Button onClick={this.props.desSeleccionSuc()}>Atrás</Button>
      </Form>

    );
  }
}
export default Login;
