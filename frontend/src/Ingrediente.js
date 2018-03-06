/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import { FormGroup, Label, Input } from "reactstrap";

class Ingrediente extends Component {
  render () {
    return (
      <div>
        <FormGroup>
          <Label for="exampleEmail">Elige{this.props.ingrediente.tipo}
            (1 gratis) adicional
            {this.props.ingrediente.precio}
          </Label>
        </FormGroup>
        <FormGroup>
          <Label for="exampleSelect">Select</Label>
          <Input type="select" name="select" id="exampleSelect">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </FormGroup>
      </div>
    );
  }
}
export default Ingrediente;
