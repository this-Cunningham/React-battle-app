import React from 'react'
import {battle} from '../utils/api'

export default class Results extends React.Component {

componentDidMount(){
  const {playerOne, playerTwo} = this.props;

  battle([playerOne, playerTwo])
  .then((result)=>{
    console.log(result)
  })
}
  render() {
    return(
      <div className="results-container">
        <h3 className="header-lg">Results...</h3>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    )
  }
}
