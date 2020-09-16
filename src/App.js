import React from 'react'
import './App.css'

import { Home } from './components'

import axios from 'axios'
axios.defaults.baseURL = 'https://random-persons.herokuapp.com'

function App() {
  return <Home />
}

export default App