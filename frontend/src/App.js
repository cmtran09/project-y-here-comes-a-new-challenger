import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import ReactDOM from 'react-dom'

import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'

import './styles/styles.scss'

import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)