import React from 'react'
import PropTypes from 'prop-types'

export default class Loading extends React.Component {
  state = {
    content: this.props.text
  }

  componentDidMount () {
    const {text, speed} = this.props;

    this.interval = window.setInterval(()=>{
      this.state.content === text + '...'
      ? this.setState({content: text})
      : this.setState(({content})=>({content: content + '.'}))
    }, speed)
  }

  componentWillUnmount(){
    window.clearInterval(this.interval)
  }

  render() {
    return(
      <p>{this.state.content}</p>
    )
  }
}

Loading.propTypes = {
  text : PropTypes.string.isRequired,
  speed: PropTypes.number
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
}
