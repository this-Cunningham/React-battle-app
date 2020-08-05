import React from 'react'
import PropTypes from 'prop-types'
import {fetchPopularRepos} from '../utils/api'
import {FaUser, FaStar, FaCodeBranch, FaExclamationTriangle} from 'react-icons/fa'


function NavLanguages ({selected, onUpdateLanguage}) {

  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

  return (
    <ul className = 'flex-center'>
      {languages.map((language) => {
        return (
          <li key = {language}>
            <button
              className = 'btn-clear nav-link'
              style = {language === selected ? {color: 'green'}: null}
              onClick = {()=> onUpdateLanguage(language)}>
              {language}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

NavLanguages.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
}

//{repos} is our destructured prop that we will pass down from Popular Component=> this.props.repos, repos = repos[selectedLanguage] as we defined in Popular and it is an array
function ReposGrid ({repos}) {
  return (
    <ul className='grid space-around'>
      {repos.map((repo,index)=> {
        const {name, owner, html_url, stargazers_count, forks, open_issues} = repo;
        const {login, avatar_url} = owner;

        return ( //must return to create new array from .map
          <li key = {html_url} className='card bg-light'>
            <h4 className="header-lg center-text">
              #{index+1}
            </h4>
            <img
              className = 'avatar'
              src={avatar_url}
              alt={`Avatar for ${login}`}
            />
            <h2 className="center-text">
              <a href={html_url} className="link">{login}</a>
            </h2>
            <ul className="card-list">
              <li>
                <FaUser color='rgb(255,191,116)' size = {22} />
                <a href={`https://github.com/${login}`}>
                {login}
                </a>
              </li>
              <li>
                <FaStar color = 'rgb(255,115, 0)' size = {22} />
                {stargazers_count.toLocaleString()} stars
              </li>
              <li>
                <FaCodeBranch color = 'rgb(129,195, 245)' size = {22} />
                {forks.toLocaleString()} forks
              </li>
              <li>
                <FaExclamationTriangle color = 'rgb(255,215, 0)' size = {22} />
                {open_issues.toLocaleString()} open issues
              </li>
            </ul>
          </li>
        )

      })}
    </ul>
  )
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

export default class Popular extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLanguage: 'All',
      repos: {},
      error: null
    }

  this.updateLanguage = this.updateLanguage.bind(this);
  this.isLoading = this.isLoading.bind(this)
  }

//loads default 'All' after mount
  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage(selectedLanguage){
    this.setState({
      selectedLanguage,
      error: null
    })

    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
      .then((data)=> {
        this.setState(({repos})=> ({
          repos: {
            ...repos,   //(ES2018) added spread properties to object literals. It copies own enumerable **properties** from a provided object onto a new object.
            [selectedLanguage]: data
          }
        }))
      })
      .catch((error) => {

        console.warn('Error', error)

        this.setState({
          error: 'Error fetching repos'
        })
      })
    }
  }


  isLoading(){
    const {selectedLanguage, repos, error} = this.state;

    return !repos[selectedLanguage] && error===null
  }

  render(){

    const {selectedLanguage, repos, error} = this.state

    return (
      <React.Fragment>
        <NavLanguages
          selected = {selectedLanguage}
          onUpdateLanguage = {this.updateLanguage}
        />

        {this.isLoading() && <p>Loading!</p>}

        {error && <p className = 'center-text error'>{error}</p>}

        {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}

      </React.Fragment>


    )
  }
}
