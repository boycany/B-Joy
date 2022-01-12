import Tilt from 'react-parallax-tilt';
// import brain from './icon96.png'
import Bjoy from './B-Joy1.png'
import Bjoy2 from './B-Joy2.png'

const Logo = ({ userEntries }) => {
    console.log(userEntries)
    
    return (
        <div className="ma4 mt0 center">
            <Tilt>
                <div style={{ height: '150px', width: '150px', 
                    background: 'linear-gradient(to right, rgb(226, 149, 12), rgb(136, 242, 229))' }}
                    className="br2 shadow-2 pa3">
                        {
                            userEntries < 3
                            ?   <img src={Bjoy} alt='你的怪獸' />
                            :   <img src={Bjoy2} alt='你的怪獸' />
                        }
                       
                </div>
            </Tilt>
        </div>     
    )  
}

export default Logo