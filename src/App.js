import React, { Component } from 'react'
import Navigation from './component/Navigation/Navigation';
import Logo from './component/Logo/Logo'
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './component/FaceRecognition/FaceRecognition';
import Rank from './component/Rank/Rank';
import './App.css';
import Particles from "react-tsparticles" 

const particlesOptions = {
    particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              value_area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.4,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,
            value: 4,
          }
    }
}

class App extends Component {
  constructor(){
    super()
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  }

  calculateFaceLocation = (data) => {
    // const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
   
    

    // const image = document.querySelector('#inputImage')

    // const imgWidth = Number(image.width)
    // const imgHeight = Number(image.height)

    // console.log('data:', data, 'clarifaiFace:', clarifaiFace, 'image:', image)
    // console.log(imgWidth, imgHeight)
  
    // return {
    //   topRow: clarifaiFace.top_row * imgHeight,
    //   rightCol: imgWidth - (clarifaiFace.right_col * imgWidth),
    //   bottomRow: imgHeight - (clarifaiFace.bottom_row * imgHeight),
    //   leftCol: clarifaiFace.left_col * imgWidth
    // }

    const faceRegionsArray = data.outputs[0].data.regions

    const image = document.querySelector('#inputImage')

    const imgWidth = Number(image.width)
    const imgHeight = Number(image.height)

    const boundinboxArray = []

    for(let i=0; i< faceRegionsArray.length;i++){
        faceRegionsArray[i].region_info.bounding_box.top_row = faceRegionsArray[i].region_info.bounding_box.top_row * imgHeight
        faceRegionsArray[i].region_info.bounding_box.right_col = imgWidth - (faceRegionsArray[i].region_info.bounding_box.right_col * imgWidth)
        faceRegionsArray[i].region_info.bounding_box.bottom_row = imgHeight - (faceRegionsArray[i].region_info.bounding_box.bottom_row * imgHeight)
        faceRegionsArray[i].region_info.bounding_box.left_col = faceRegionsArray[i].region_info.bounding_box.left_col * imgWidth
        
        boundinboxArray.push(faceRegionsArray[i].region_info.bounding_box)
    }
    // console.log(boundinboxArray)
    return boundinboxArray
  }

  displayFaceBox = (boxArray) => {
    this.setState({box: boxArray})
  }

  onInputChange = (event) => {
    console.log(event.target.value)

    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    // console.log('click')

    this.setState({imageUrl: this.state.input})

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": "yurayurateiko",
        "app_id": "3a7ed23aacbd41269cf7d083a49be859"
      },
      "inputs": [
        {
          "data": {
            "image": {
              // "url": "https://samples.clarifai.com/face-det.jpg"
              "url": `${this.state.input}`  
                  //如果這段url的位置寫 this.state.imageUrl ---> 會報錯，因為state運作方式的關係  
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key dd9a3a245dcc490da87b4a90a2e91cf6'
      },
      body: raw
    };

    fetch("https://api.clarifai.com/v2/models/f76196b43bbd45c99b4f3cd8e8b40a8a/outputs", requestOptions)
      .then(response => response.text())
      // .then(result => console.log(JSON.parse(result, null, 2).outputs[0].data.regions[0].region_info.bounding_box))
      .then(result => this.calculateFaceLocation(JSON.parse(result, null, 2)))
      .then(boxArray => this.displayFaceBox(boxArray))
      .catch(error => console.log('ERROR! There is no face in this picture!', error))
  }

  render() {
        return (
            <div className="App">
                <Particles params={particlesOptions}/>
                <Navigation />
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
            </div>
            
        );
  }

}

export default App;
