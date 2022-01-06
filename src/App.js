import React, { Component } from 'react'
import Navigation from './component/Navigation/Navigation';
import SignIn from './component/SignIn/SignIn';
import Register from './component/Register/Register';
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

const initialState = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      userLoggedIn: {
          id: '',
          name: '',
          email: '',
          entries: 0, 
          joined: ''
      }
}

class App extends Component {
  constructor(){
    super()
    this.state = initialState   
  }

  loadUser = (user) => {
    this.setState({ 
      userLoggedIn:{
          id: user.id,
          name: user.name,
          email: user.email,
          entries: user.entries, 
          joined: user.joined  
    }})
  }

  /*
  
  只是拿來確認可以與server連接
  componentDidMount(){
    fetch('http://localhost:3000/')
      .then(response=>response.json())
      .then(data=>console.log(data))
  }
  
  */

  calculateFaceLocation = (data) => {

    /*
    
    只顯示一張人臉的框框

    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.querySelector('#inputImage')

    const imgWidth = Number(image.width)
    const imgHeight = Number(image.height)

    console.log('data:', data, 'clarifaiFace:', clarifaiFace, 'image:', image)
    console.log(imgWidth, imgHeight)
  
    return {
      topRow: clarifaiFace.top_row * imgHeight,
      rightCol: imgWidth - (clarifaiFace.right_col * imgWidth),
      bottomRow: imgHeight - (clarifaiFace.bottom_row * imgHeight),
      leftCol: clarifaiFace.left_col * imgWidth
    }
    
    */
    
    /* 圖片裡有幾個人臉就顯示幾個框框 */
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
    // console.log('boxArray:', boundinboxArray)
    return boundinboxArray
  }

  displayFaceBox = (boxArray) => {
    this.setState({box: boxArray})
  }

  onInputChange = (event) => {
    // console.log(event.target.value)

    this.setState({input: event.target.value})
  }

  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  onPictureSubmit = () => {
    // console.log('click')

    this.setState({imageUrl: this.state.input})

    fetch("http://localhost:3000/imageurl", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            input: this.state.input
        })
    })
    .then(response=>{
        
        if(response){
            fetch("http://localhost:3000/image", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: this.state.userLoggedIn.id,                      
                })   
            })
            .then(imageRes=>{
                return imageRes.json()
            })
            .then(count=>{
                return this.setState(Object.assign(this.state.userLoggedIn, {entries: count}))
            })
            // 如果直接這樣寫的話，會更新整個userLoggedIn物件，導致其他沒有更新到的props顯示為undefined
            // .then(count=>{
            //     this.setState({ userLoggedIn: {
            //         entries: count
            //     }})
            // })
            .catch(err=>console.log(err))
        }         
        return response.json()
    })
    // .then(result => console.log(JSON.parse(result, null, 2).outputs[0].data.regions[0].region_info.bounding_box))
    .then(result => {               
        return this.calculateFaceLocation(result)
    })
    .then(boxArray => this.displayFaceBox(boxArray))
    .catch(error => {
        alert('這張圖無法辨識')
        console.log('ERROR! There is no face in this picture!', error)
    })   
  }

  render() {
        const { imageUrl, box, route, isSignedIn, userLoggedIn } = this.state

        return (            
            <div className="App">
                <Particles params={particlesOptions}/>
                <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
                { 
                  route === 'home' 
                  ? <div> 
                      <Logo />
                      <Rank userName={userLoggedIn.name} userEntries={userLoggedIn.entries}/>
                      <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit}/>
                      <FaceRecognition box={box} imageUrl={imageUrl} />
                    </div>
                  : (
                      route === 'signin'
                      ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                      : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                    )   
                }
            </div>            
        );
  }
}

export default App;
