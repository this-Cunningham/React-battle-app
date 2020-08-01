import React from 'react'
import {FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle} from 'react-icons/fa'
import PropTypes from 'prop-types'

function Instructions(){
  return(
    <div className ='instructions-container'>
      <h1 className="center-text header-lg">
        INSTRUCTIONS
      </h1>
      <ol className="container-sm grid center-text battle-instructions">
        <li>
          <h3 className="header-sm">Enter two Github Users</h3>
          <FaUserFriends className = 'bg-light' color = 'rgb(255,191,116)' size = {140} />
        </li>
        <li>
          <h3 className="header-sm">Battle</h3>
          <FaFighterJet className = 'bg-light' color = '#727272' size = {140} />
        </li>
        <li>
          <h3 className="header-sm">See the winners</h3>
          <FaTrophy className = 'bg-light' color = 'rgb(255,215,0)' size = {140} />
        </li>
      </ol>
    </div>
  )
}

class PlayerInput extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      username: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

handleChange(e){
  this.setState({
    username: e.target.value
  })
}

  handleSubmit(e){
    e.preventDefault()
    this.props.onSubmit(this.state.username)
  }

  render(){
    return(
      <form className="column player" onSubmit={this.handleSubmit}>
        <label htmlFor="username" className='player-label'>
          {this.props.label}
        </label>
        <div className="row player-inputs">
          <input
            type="text"
            id='username' //synced up with label 'htmlFor' above
            className='input-light'
            placeholder='github username'
            autoComplete='off'
            value = {this.state.username} //the text inside the input field is going to be whatever the username is...
            onChange ={this.handleChange}
            />
            <button
              type = 'submit' //when button is clicked we will submit our form
              className = 'dark-btn btn'
              disabled={!this.state.username} //if username is falsey will disable
              >
              Submit
            </button>
        </div>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}


function PlayerPreview({username, onReset, label}) {
  return(
    <div className = 'column player'>
      <h3 className="player-label">{label}</h3>
      <div className="row bg-light">
        <div className="player-info">
          <img
            src={`https://github.com/${username}.png?size=200`}
            alt={`Avatar for ${username}`}
            className="avatar-small"
          />
          <a
            href={`https://github.com/${username}`}
            className="link"
          >
              {username}
          </a>
        </div>
        <button
          className="btn-clear flex-center"
          onClick = {onReset}
        >
            <FaTimesCircle color = 'red' size = {26} />
          </button>
      </div>

    </div>
  )
}

PlayerPreview.propTypes = {
  username : PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

export default class Battle extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      playerOne: null,
      playerTwo: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

handleSubmit(id, username) {
  this.setState({
    [id]: username  //computed property name [id]
  })
}

handleReset (id) {
  this.setState ({
    [id]: null
  })
}
  render() {
    const {playerOne, playerTwo } = this.state;
    return(
      <React.Fragment>
        <Instructions />
        <div className="players-container">
          <h1 className="center-text header-lg">Players</h1>
          <div className="row space-around">
            {playerOne === null ?  //ternary operator
              (<PlayerInput
                onSubmit = {(player)=>this.handleSubmit('playerOne', player)}
                label = 'Player One'
              />)
              : <PlayerPreview
                  username = {playerOne}
                  label = 'Player One'
                  onReset = {()=>this.handleReset('playerOne')}
                />
            }

            {playerTwo === null ?
              (<PlayerInput
                onSubmit = {(player)=>this.handleSubmit('playerTwo', player)}
                label = 'Player Two'
              />)
              : <PlayerPreview
                  username = {playerTwo}
                  label = 'playerTwo'
                  onReset = {()=>this.handleReset('playerTwo')}
                />
            }
          </div>
        </div>

      </React.Fragment>
    )
  }
}
