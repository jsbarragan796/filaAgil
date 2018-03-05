/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import { Card, CardBody,
  Row, Col, Button, Label, Input, Form, FormGroup } from "reactstrap";

class HacerPedido extends Component {
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
  render () {
    return (
      <Row >
        <Col sm="8" >
          <Card>
            <CardBody>
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
                  <Button onClick={this.manejoLogin}>Entrar</Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default HacerPedido;
