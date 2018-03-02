import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      images: []
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
          <img src={this.state.images.filter(img => img.name === "logo").map(img => img.url)[0]} alt="logo" />
          <h1 className="App-title">Welcome to Fila Agil</h1>
        </header>
        <p className="App-intro">
          Great app underconstruction come back again.
        </p>
      </div>
    );
  }
}

export default App;
