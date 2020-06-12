import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import ReactDOM from 'react-dom'

import './styles/styles.scss'

import Home from './components/Home/Home'

const App = () => {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)