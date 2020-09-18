import React from 'react'
import {battle} from '../utils/api'
import {FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser} from 'react-icons/fa'
import Card from './Card'
import PropTypes from 'prop-types'
import Loading from './Loading'
import Tooltip from './Tooltip'
import queryString from 'query-string'
import { Link } from 'react-router-dom'

function ProfileList ({profile}) {
  return (
    <ul className="card-list">
      <li>
        <FaUser color = 'lightblue' size = {22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <Tooltip text = "User's Location">
            <FaCompass color = 'yellow' size = {22} />
            {profile.location}
          </Tooltip>
        </li>
      )}
      {profile.company && (
        <li>
          <Tooltip text = "User's Company">
            <FaBriefcase color = 'brown' size = {22} />
            {profile.company}
          </Tooltip>
        </li>
      )}
      <li>
        <FaUsers color = 'blue' size = {22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color = 'blue' size = {22} />
        {profile.following.toLocaleString()} following
      </li>
    </ul>
  )
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired
}

export default class Results extends React.Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true
  }

  componentDidMount () {
    const {playerOne, playerTwo} = queryString.parse(this.props.location.search);
    // queryString.parse returns an object from the query string that looks like...
    //{playerOne: 'username1', playerTwo: 'username2'} from ?playerOne=username1&playerTwo=username2

    console.log(queryString.parse(this.props.location.search));

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
      return <Loading text = 'Battling'/>
    }

    if (error) {
      return <p className = 'center-text error'>{error}</p>
    }

    return (
      <React.Fragment>
        <div className="grid space-around container-sm">
          <Card
            header = {winner.score === loser.score ? 'Tie': 'Winner'}
            subheader = {`Score: ${winner.score.toLocaleString()}`}
            avatar = {winner.profile.avatar_url}
            href = {winner.profile.html_url}
            name = {winner.profile.login}
          >
            <ProfileList profile = {winner.profile}/>

          </Card>

          <Card
            header = {winner.score === loser.score ? 'Tie': 'Loser'}
            subheader = {`Score: ${loser.score.toLocaleString()}`}
            avatar = {loser.profile.avatar_url}
            href = {loser.profile.html_url}
            name = {loser.profile.login}
          >
            <ProfileList profile = {loser.profile}/>
          </Card>
        </div>
        <Link
            className="btn-space btn dark-btn"
            to = '/battle'>
            Reset
        </Link>

      </React.Fragment>
    )
  }
}
