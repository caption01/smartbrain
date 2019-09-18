import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './component/Navigation/Navigation';
import Logo from './component/Logo/Logo'
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm'
import Rank from './component/Rank/Rank'
import './App.css';
import 'tachyons'


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


  render(){
    return (
      <div className="App">
          <Particles className='particle' params={particlesOption} />
          <Navigation />
          <Logo />
          <Rank />
          <ImageLinkForm />
            {/*
              <FaceRecognition />
            */}
      </div>
    );
  }

}


export default App;
