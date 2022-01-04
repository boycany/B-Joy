import React from "react"

class Register extends React.Component  {
    
    constructor(props){     //props 繼承 App.js 傳過來的 props (包括 onRouteChange)
        super(props)
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    
    onEmailChange = (event) =>{
        this.setState({ email: event.target.value })
    }
    
    onPasswordChange = (event) =>{
        this.setState({ password: event.target.value })
    }
    
    onNameChange = (event) => {
        this.setState({ name: event.target.value })
    }

    onSubmitChange = () =>{
        // console.log(this.state)

        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })   
        })    
        .then(response => response.json())
        .then(user =>{
            // console.log(user)
            //如果response回應錯誤訊息，user還是會傳過來一個空陣列，
            //所以條件設立為 user.id 才能確認有沒有實際資料
            if (user.id){  
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            }else{
                alert('註冊未成功')
            }
        })
        .catch(err=>console.log(err))    
    }


    render(){
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw4 ph0 mh0">註冊</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                       type="text" 
                                       name="name"  
                                       id="name"
                                       onChange={this.onNameChange} 
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                       type="email" 
                                       name="email-address"  
                                       id="email-address"
                                       onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                       type="password" 
                                       name="password"  
                                       id="password"
                                       onChange={this.onPasswordChange} 
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitChange}  
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="送出"                                 
                            />
                        </div>
                    </div>
                </main>
            </article>
        )
    }    
}

export default Register