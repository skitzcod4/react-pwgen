import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: 'Fire Generate!',
      strong: false,
      length: 8,
      lowercase: true,
      uppercase: true,
      digits: true,
      special: true
    }
  }

  checkPassword = (val) => {
    let regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/

    if (regEx.test(val))
      this.setState({ strong: true })
    else
      this.setState({ strong: false })
  }

  generatePassword = () => {
    let upper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    let lower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    let special = ['#', '$', '%', '&', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[']
    let digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let pattern = []
    let password = []

    if (this.state.lowercase === true) {
      lower.forEach(char => {
        pattern.push(char)
      })
    }

    if (this.state.uppercase === true) {
      upper.forEach(char => {
        pattern.push(char)
      })
    }

    if (this.state.special === true) {
      special.forEach(char => {
        pattern.push(char)
      })
    }

    if (this.state.digits === true) {
      digits.forEach(char => {
        pattern.push(char)
      })
    }

    for (let i = 0; i < this.state.length; i++) {
      let random = Math.floor(Math.random() * Math.floor(pattern.length))
      password.push(pattern[random])
    }

    password = password.join('')
    this.checkPassword(password)
    this.setState({ password: password })
  }

  rangeChange = () => {
    let slider = document.getElementById('length-range')
    this.setState({ length: slider.value })
  }

  render() {
    return (
      <div>
        <a href="https://justinprassl.de/" className="website">
          <i class="fas fa-arrow-left"></i>
          <span>Justin Praßl</span>
        </a>
        <div className="index">
          <h1 className="app-title">Password Generator</h1>
          <p className="app-description">This password generator was written in react. Have fun using it!</p>
          <div className="box">
            <div className="box-header">
              <h2 className="password">{this.state.password}</h2>
              <button className="btn" onClick={this.generatePassword}>Generate!</button>
            </div>
            <div className="box-body">
              <div className="strength">
                <p className={this.state.strong === true ? 'strong' : 'weak'}>
                  <i className="fas fa-shield-alt"></i>
                  <span>{this.state.strong === true ? 'Strong' : 'Weak'}</span>
                </p>
              </div>
              <div className="box-sep"></div>
              <div className="length">
                <span className="length-text">Length:</span>
                <input type="range" min="6" max="64" value={this.state.length} id="length-range" onChange={this.rangeChange} />
                <span className="length-value">{this.state.length}</span>
              </div>
              <div className="box-sep"></div>
              <div className="options">
                <div className="option">
                  <input id="upper" type="checkbox" checked={this.state.uppercase} onChange={() => this.setState({ uppercase: !this.state.uppercase })} />
                  <label for="upper">Uppercase?</label>
                </div>
                <div className="option">
                  <input id="lower" type="checkbox" checked={this.state.lowercase} onChange={() => this.setState({ lowercase: !this.state.lowercase })} />
                  <label for="lower">Lowercase?</label>
                </div>
                <div className="option">
                  <input id="special" type="checkbox" checked={this.state.special} onChange={() => this.setState({ special: !this.state.special })} />
                  <label for="special">Special Chars?</label>
                </div>
                <div className="option">
                  <input id="digits" type="checkbox" checked={this.state.digits} onChange={() => this.setState({ digits: !this.state.digits })} />
                  <label for="digits">Digits?</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App