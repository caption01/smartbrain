import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './component/Navigation/Navigation';
import Logo from './component/Logo/Logo'
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm'
import Rank from './component/Rank/Rank';
import FaceRecognition from './component/FaceRecognition/FaceRecognition';
import './App.css';
import 'tachyons';

import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'ae17b1eea2bb427abbb98e2ca41dd85a'
 });

const particlesOption = {
  
  particles: {
    line_linked: {
      shadow: {
          enable: true,
          color: "#3CA9D1",
          blur: 1
        }
      }
    }

}

class App extends Component {

  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
    
  }
    
  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonClick = () => {
    
    this.setState({imageUrl: this.state.input});

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(error => console.log(error))

  }

  calculateFaceLocation = (data) => {
    
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(clarifaiFace);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }

  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  render(){
    return (
      <div className="App">
          <Particles className='particle' params={particlesOption} />
          <Navigation />
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick} />
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />

      </div>
    );
  }

}


export default App;
