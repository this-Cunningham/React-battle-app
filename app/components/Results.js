import React from 'react'

export default class Results extends React.Component {
  render() {
    return(
      <div className="results-container">
        <h3 className="header-lg">Results...</h3>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    )
  }
}
