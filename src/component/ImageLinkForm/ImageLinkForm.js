const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className='f3'>
                {'這個神奇大腦會指出你圖片裡的人臉'}
            </p>
            <div className='center'>
                <div className='center pa4 br3 shadow-5' style={{width: '700px'}}>
                    <input type='text' className='f4 pa2 w-70 center' 
                            onChange={onInputChange}
                            placeholder='請貼上連結'
                    />
                    <button className='w-30 grow f4 ml2 link ph3 pv2 dib bg-light-blue' 
                            onClick={onButtonSubmit}>開始檢測
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm