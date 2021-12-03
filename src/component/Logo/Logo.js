import Tilt from 'react-parallax-tilt';
import brain from './icon96.png'

const Logo = () => {
    return (
        <div className="ma4 mt0" style={{ height: '150px', width: '150px',display:'flex', justifyContent: 'flex-start'}}>
            <Tilt>
                <div style={{ height: '150px', width: '150px', 
                background: 'linear-gradient(to right, rgb(226, 149, 12), rgb(136, 242, 229))' }}
                     className="br2 shadow-2 pa3">
                    <img src={brain} alt='logo' />
                </div>
            </Tilt>
        </div>
    )
}

export default Logo