import React, { useState } from 'react'
import './App.css'

const cb = require('clipboardy')

const App = () => {
  const [password, setPassword] = useState('Fire Generate!')
  const [strong, setStrong] = useState(false)
  const [length, setLength] = useState(8)
  const [lowercase, setLowercase] = useState(true)
  const [uppercase, setUppercase] = useState(true)
  const [digits, setDigits] = useState(true)
  const [special, setSpecial] = useState(true)

  const checkPassword = (val) => {
    let regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/

    if (regEx.test(val))
      setStrong(true)
    else
      setStrong(false)
  }

  const generatePassword = () => {
    let upperChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    let lowerChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    let specialChars = ['#', '$', '%', '&', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[']
    let digitChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let pattern = []
    let password = []

    if (lowercase) {
      lowerChars.forEach(char => {
        pattern.push(char)
      })
    }

    if (uppercase) {
      upperChars.forEach(char => {
        pattern.push(char)
      })
    }

    if (special) {
      specialChars.forEach(char => {
        pattern.push(char)
      })
    }

    if (digits) {
      digitChars.forEach(char => {
        pattern.push(char)
      })
    }

    for (let i = 0; i < length; i++) {
      let random = Math.floor(Math.random() * Math.floor(pattern.length))
      password.push(pattern[random])
    }

    password = password.join('')
    checkPassword(password)
    setPassword(password)
  }

  const rangeChange = () => {
    let slider = document.getElementById('length-range')
    setLength(slider.value)
  }

  const copyPassword = () => {
    let popover = document.getElementById('copy-popover')
    cb.write(password)
    popover.classList.add('popover-anim')
    setTimeout(() => {
      popover.classList.remove('popover-anim')
    }, 3000)
  }

  return (
    <div>
      <a href="https://justinprassl.de/" className="website">
        <i className="fas fa-arrow-left"></i>
        <span>Justin Praßl</span>
      </a>
      <div className="index">
        <h1 className="app-title">Password Generator</h1>
        <p className="app-description">This password generator was written in react. Have fun using it!</p>
        <div className="box">
          <div className="box-header">
            <h2 className="password">{password}</h2>
            <button className="btn" onClick={generatePassword}>Generate!</button>
            <button style={{marginLeft: "8px"}} className="btn btn-square" onClick={copyPassword}>
              <i className="fas fa-copy"></i>
              <div className="copy-popover" id="copy-popover">
                <span>Copied to clipboard!</span>
              </div>
            </button>
          </div>
          <div className="box-body">
            <div className="strength">
              <p className={strong === true ? 'strong' : 'weak'}>
                <i className="fas fa-shield-alt"></i>
                <span>{strong ? 'Strong' : 'Weak'}</span>
              </p>
            </div>
            <div className="box-sep"></div>
            <div className="length">
              <span className="length-text">Length:</span>
              <input type="range" min="6" max="64" value={length} id="length-range" onChange={rangeChange} />
              <span className="length-value">{length}</span>
            </div>
            <div className="box-sep"></div>
            <div className="options">
              <div className="option">
                <input id="upper" type="checkbox" checked={uppercase} onChange={() => setUppercase(!uppercase)} />
                <label htmlFor="upper">Uppercase?</label>
              </div>
              <div className="option">
                <input id="lower" type="checkbox" checked={lowercase} onChange={() => setLowercase(!lowercase)} />
                <label htmlFor="lower">Lowercase?</label>
              </div>
              <div className="option">
                <input id="special" type="checkbox" checked={special} onChange={() => setSpecial(!special)} />
                <label htmlFor="special">Special Chars?</label>
              </div>
              <div className="option">
                <input id="digits" type="checkbox" checked={digits} onChange={() => setDigits(!digits)} />
                <label htmlFor="digits">Digits?</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App