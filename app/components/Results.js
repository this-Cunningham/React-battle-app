import React from 'react'
import {battle} from '../utils/api'
import {FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser} from 'react-icons/fa'

export default class Results extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  componentDidMount(){
    const {playerOne, playerTwo} = this.props;

    battle([playerOne, playerTwo])
    .then((results)=>{
      this.setState({
        winner: results[0],
        loser: results[1],
        loading: false,
        error: null
      })
    }).catch(({message})=>{
      this.setState({
        error: message,
        loading: false
      })
    })
  }

  render() {
    const {winner, loser, error, loading} = this.state;

    if (loading === true){
      return <p>Loading</p>
    }

    if (error) {
      return <p className = 'center-text error'>{error}</p>
    }

    return (
      <div className="grid space-around container-sm">
        <div className="card bg-light">
          <h4 className="header-lg center-text">
            {winner.score === loser.score ? 'Tie': 'Winner'}
          </h4>
          <img src={winner.profile.avatar_url}
            alt={`Avatar for ${winner.profile.login}`}
            className="avatar"/>
            <h2 className="center-text">
              <a href={winner.profile.html_url} className="link">
                {winner.profile.login}
              </a>
            </h2>
            <ul className="card-list">
              <li>
                <FaUser color = 'lightblue' size = {22} />
                {winner.profile.name}
              </li>
              {winner.profile.location && (
                <li>
                  <FaCompass color = 'yellow' size = {22} />
                  {winner.profile.location}
                </li>
              )}
              {winner.profile.company && (
                <li>
                  <FaBriefcase color = 'brown' size = {22} />
                  {winner.profile.company}
                </li>
              )}
              <li>
                <FaUsers color = 'blue' size = {22} />
                {winner.profile.followers.toLocaleString()} followers
              </li>
              <li>
                <FaUserFriends color = 'blue' size = {22} />
                {winner.profile.following.toLocaleString()} following
              </li>
            </ul>
        </div>

        <div className="card bg-light">
          <h4 className="header-lg center-text">
            {winner.score === loser.score ? 'Tie': 'Loser'}
          </h4>
          <img src={loser.profile.avatar_url}
            alt={`Avatar for ${loser.profile.login}`}
            className="avatar"/>
            <h2 className="center-text">
              <a href={loser.profile.html_url} className="link">
                {loser.profile.login}
              </a>
            </h2>
            <ul className="card-list">
              <li>
                <FaUser color = 'lightblue' size = {22} />
                {loser.profile.name}
              </li>
              {loser.profile.location && (
                <li>
                  <FaCompass color = 'yellow' size = {22} />
                  {loser.profile.location}
                </li>
              )}
              {loser.profile.company && (
                <li>
                  <FaBriefcase color = 'brown' size = {22} />
                  {loser.profile.company}
                </li>
              )}
              <li>
                <FaUsers color = 'blue' size = {22} />
                {loser.profile.followers.toLocaleString()} followers
              </li>
              <li>
                <FaUserFriends color = 'blue' size = {22} />
                {loser.profile.following.toLocaleString()} following
              </li>
            </ul>
        </div>
      </div>
    )
  }
}
