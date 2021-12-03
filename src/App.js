import React, { Component } from 'react'
import Navigation from './component/Navigation/Navigation';
import Logo from './component/Logo/Logo'
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './component/FaceRecognition/FaceRecognition';
import Rank from './component/Rank/Rank';
import './App.css';


class App extends Component {
  constructor(){
    super()
    this.state = {
      input: '',
      imageUrl: ''
    }
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
      .then(result => console.log(JSON.parse(result, null, 2).outputs[0].data.regions[0].region_info.bounding_box))
      .catch(error => console.log('error', error));
  }

  render() {
        return (
            <div className="App">
                <Navigation />
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                <FaceRecognition imageUrl={this.state.imageUrl} />
            </div>
        );
  }

}

export default App;
