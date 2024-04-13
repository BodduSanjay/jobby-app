import {Component} from 'react'
import {Cookies} from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {userName: '', password: '', errorMsg: '', showError: false}

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessfulSubmit = jwtToken => {
    Cookies.set('jwt_token', {jwtToken}, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitCreds = async event => {
    event.preventDefault()
    const {userName, password} = this.state
    if (userName.trim() !== '' && password.trim() !== '') {
      const url = 'https://apis.ccbp.in/login'
      const userDetails = {
        username: userName,
        password,
      }
      const options = {
        method: 'POST',
        body: userDetails,
      }

      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        this.onSuccessfulSubmit(data.jwt_token)
      } else {
        this.setState({errorMsg: data.error_msg, showError: true})
      }
    }
  }

  render() {
    const {userName, password, errorMsg, showError} = this.state

    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-cont">
        <form onSubmit={this.onSubmitCreds}>
          <img
            className="login-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <label htmlFor="input1">USERNAME</label>
          <input
            className="input-el"
            type="text"
            id="input1"
            placeholder="Username"
            value={userName}
            onChange={this.onChangeUserName}
          />
          <label htmlFor="input2">PASSWORD</label>
          <input
            className="input-el"
            type="password"
            id="input2"
            placeholder="Password"
            value={password}
            onChange={this.onChangePassword}
          />
          <button className="input-el button-login" type="submit">
            Login
          </button>
          {showError && <p className="error-para">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
