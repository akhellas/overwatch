import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import Overwatch from './components/Overwatch'

class App extends Component {
  constructor() {
    super()
    this.state = {
      traffic: {}
    }
  }
  componentDidMount() {
    fetch('http://localhost:7000/api/metrics/2018/1/1')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ traffic: data })
      })
  }

  render() {
    const { traffic } = this.state
    return <Overwatch traffic={traffic} />
  }
}

export default App
