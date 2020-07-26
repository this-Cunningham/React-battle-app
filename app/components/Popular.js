import React from 'react'

function NavLanguages ({selected, onUpdateLanguage}) {

  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']

  return (
    <ul className = 'flex-center'>
      {languages.map((language) => (
        <li key = {language}>
          <button
            className = 'btn-clear nav-link'
            style = {language === selected ? {color: 'green'}: null}
            onClick = {()=> onUpdateLanguage(language)}
            >
            {language}
          </button>
        </li>
      ))}
    </ul>
  )
}


export default class Popular extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLanguage: 'All'
    }

  this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(selectedLanguage){
    this.setState({
      selectedLanguage
    })
  }

  render(){

    const {selectedLanguage} = this.state

    return (
      <NavLanguages
        selected = {selectedLanguage}
        onUpdateLanguage = {this.updateLanguage}
      />

    )
  }
}
