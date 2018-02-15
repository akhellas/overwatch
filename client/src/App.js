import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import Overwatch from './components/Overwatch'

const API = 'http://localhost:7000/api/metrics'
const DELAY = 10000
const date = new Date()
const dateString = `${date.getFullYear()}/${date.getMonth() +
  1}/${date.getDate()}`
const URL = `${API}/${dateString}`

class App extends Component {
  constructor() {
    super()
    this.state = {
      traffic: {}
    }
  }
  componentDidMount() {
    this.refreshTraffic()
    setInterval(() => this.refreshTraffic(), DELAY)
  }

  refreshTraffic() {
    fetch(URL)
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
