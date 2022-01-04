import './FaceRecognition.css'
import BoundingBox from '../BoundingBox/BoundingBox'

const FaceRecognition = ({box, imageUrl}) => {
    
    return (
        <div className='center' style={{zIndex: 1}}>
  
            <div className='absolute mt3 mb5 pa3'>
                <img id='inputImage' src={imageUrl} alt='' width='500px' height='auto'/>
                <BoundingBox box={box} />
                
                {/* <div className='bounding-box' 
                     style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol, }}
                ></div> */}
            </div>
            
        </div>
    )
}

export default FaceRecognition