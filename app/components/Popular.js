import React from 'react'

export default class Popular extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLanguage: 'All'
    }

  }

  render(){
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
      <ul className = 'flex-center'>
        {languages.map((language) => (
          <li key = {language}>
            <button className = 'btn-clear nav-link'>{language}</button>
          </li>
        ))}
      </ul>
    )
  }
}
