const Navigation = ({onRouteChange, isSignedIn}) => {
    if (isSignedIn){
        return (
            <nav style={{ display: "flex", justifyContent: "flex-end"}}>
                <p  onClick={() => onRouteChange('signout')}
                    className="f4 link dim black underline pa3 pointer">登出</p>
            </nav>
        )
    } else {
        return (
            <nav style={{ display: "flex", justifyContent: "flex-end"}}>
                <p  onClick={() => onRouteChange('signin')}
                    className="f4 link dim black underline pa3 pointer">登入</p>
                <p  onClick={() => onRouteChange('register')}
                    className="f4 link dim black underline pa3 pointer">註冊</p>
            </nav>
        )        
    }    
}

export default Navigation