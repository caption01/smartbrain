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
      imageUrl: ''
    }
    
  }
    
  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonClick = () => {
    
    this.setState({imageUrl: this.state.input})

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
      },
      function(err) {
        // there was an error
      }
    );

  }

  render(){
    return (
      <div className="App">
          <Particles className='particle' params={particlesOption} />
          <Navigation />
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick} />
          <FaceRecognition imageUrl={this.state.imageUrl} />

      </div>
    );
  }

}


export default App;
