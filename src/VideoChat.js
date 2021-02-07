import React from 'react'
import './App.css'
import 'firebase/database'
import classnames from 'classnames'

export default class VideoChat extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      userToCall: null,
      username: null
    }
  }

  onLoginClicked = async () => {
    await this.props.onLogin(this.state.username)
    this.setState({
      isLoggedIn: true
    })
  }

  onStartCallClicked = () => {
    this.props.startCall(this.state.username, this.state.userToCall)
  }

  renderVideos = () => {
    return <div className={classnames('videos', { active: this.state.isLoggedIn })}>
      <div>
        <label>{this.state.username}</label>
        <video ref={this.props.setLocalVideoRef} autoPlay playsInline></video>
      </div>
      <div>
        <label>{this.props.connectedUser}</label>
        <video ref={this.props.setRemoteVideoRef} autoPlay playsInline></video>
      </div>

    </div>
  }

  renderForms = () => {
    return this.state.isLoggedIn
      ? <div key='a' className='form'>
        
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <label>Who would you like to call?</label>

        </div>
        <input value={this.state.userToCall} type="text" onChange={e => this.setState({ userToCall: e.target.value })} />
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <button onClick={this.onStartCallClicked} id="call-btn" className="btn btn-primary">Call</button>
        </div>

      </div>
      : <div key='b' className='form'>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
           <label>What is your nickname?</label>
        </div>
        <input value={this.state.username} type="text" onChange={e => this.setState({ username: e.target.value })} />
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <button onClick={this.onLoginClicked} id="login-btn" className="btn btn-primary">Login</button>
        </div>
      </div>
  }

  render () {
    return <section id="container">
      {this.props.connectedUser ? null : this.renderForms()}

      {this.renderVideos()}

    </section>
  }
}
