import { Component } from "react/cjs/react.production.min";
import "./SignIn.css";
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitChange = () => {
    this.props.handleLoadingModal();
    fetch("https://secret-citadel-52458.herokuapp.com/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
          this.props.handleLoadingModal();
        } else {
          this.props.handleLoadingModal();
          alert("使用者帳號或密碼有誤");
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { onRouteChange } = this.props;

    return (
      <div>
        <div className="wrapper">
          <span>B</span>
          <span>-</span>
          <span>J</span>
          <span>O</span>
          <span>Y</span>
        </div>
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f3 fw4 ph0 mh0">登入</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Email
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={this.onEmailChange}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
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
                  className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f6 dib"
                  type="submit"
                  value="送出"
                />
              </div>
              <div className="lh-copy mt3">
                <p className="f6">
                  ＊沒有帳號？
                  <span
                    onClick={() => onRouteChange("register")} //寫成箭頭函式，才不會在render後就執行這個函式，route狀態就被直接改成register。
                    className="f6 underline pointer"
                  >
                    點此註冊
                  </span>
                </p>
              </div>
            </div>
          </main>
        </article>
      </div>
    );
  }
}

export default SignIn;
