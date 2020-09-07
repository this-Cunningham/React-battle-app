import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Popular from './components/Popular.js'
import Battle from './components/Battle.js'
import Results from './components/Results.js'
import { ThemeProvider } from './contexts/theme'  //named import
import Nav from './components/nav'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      theme: 'light',
      toggleTheme: () => {
        this.setState(({theme})=>({
          theme: theme === 'light'?'dark':'light'
        }))
      }
    }
  }

  render() {
    return (
      <Router>
        <ThemeProvider value = {this.state}>
          <div className={this.state.theme}>
            <div className = 'container'>
              <Nav />
              <Switch>
                <Route exact path = '/' component = {Popular}/>
                <Route exact path = '/battle' component = {Battle} />
                <Route path = '/battle/results' component = {Results} />
                <Route render = {()=><h1>404, Page Not Found!</h1>} />
              </Switch>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
