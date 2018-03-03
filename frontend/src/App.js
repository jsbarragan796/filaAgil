/* eslint react/prop-types: 0 */
import React, { Component } from "react";
import "./App.css";
import Place from "./Place";

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      images: [],
      place: null,
      places: [
        { name: "Center", address: "Cre 23 # 34", url: "https://drive.google.com/uc?id=1T1wWZ6WvqGSk0sL2IN29Jq9XXrohe7rj" },
        { name: "Center 2", address: "Cre 23 # 34", url: "https://drive.google.com/uc?id=1T1wWZ6WvqGSk0sL2IN29Jq9XXrohe7rj" },
        { name: "Center 3", address: "Cre 23 # 34", url: "https://drive.google.com/uc?id=1T1wWZ6WvqGSk0sL2IN29Jq9XXrohe7rj" },
        { name: "Center 4", address: "Cre 23 # 34", url: "https://drive.google.com/uc?id=1T1wWZ6WvqGSk0sL2IN29Jq9XXrohe7rj" }
      ]
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
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src=
            {this.state.images.filter(img => img.name === "logo").map(img => img.url)[0]} alt="logo"
          height="42" width="150"/>
          <h1 className="App-title">Welcome to Fila Agil</h1>
        </header>
        <div className="Conteiner">
          <Place
            places={this.state.places}
          />
        </div>
        <p className="App-intro">
          Great app underconstruction come back again.
        </p>
      </div>
    );
  }
}


export default App;
