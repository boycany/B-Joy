const Rank = ({userName, userEntries}) => {
    return (
        <div>
            <div className='f3 mb2'>   
                <p>{`${userName} 你好啊！`}</p>
                <p>{'你現在登錄圖片的次數是...'}</p>
            </div>
            <div className='f1'>
                {userEntries} 
            </div>
        </div>

    )
}   

export default Rank