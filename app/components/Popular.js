import React from 'react'
import PropTypes from 'prop-types'
import {fetchPopularRepos} from '../utils/api'


function NavLanguages ({selected, onUpdateLanguage}) {

  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

  return (
    <ul className = 'flex-center'>
      {languages.map((language) => (
        <li key = {language}>
          <button
            className = 'btn-clear nav-link'
            style = {language === selected ? {color: 'green'}: null}
            onClick = {()=> onUpdateLanguage(language)}>
            {language}
          </button>
        </li>
      ))}
    </ul>
  )
}

NavLanguages.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
}


export default class Popular extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLanguage: 'All',
      repos: null,
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
      repos: null,
      error: null
    })

    fetchPopularRepos(selectedLanguage)
    .then((repos)=> this.setState({
      repos,
      error: null
    }))
    .catch(() => {

      console.warn('Error', error)

      this.setState({
        error: 'Error fetching repos'
      })
    })
  }

  isLoading(){
    return this.state.repos===null && this.state.error===null
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

        {error && <p>{error}</p>}

        {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}

      </React.Fragment>


    )
  }
}
