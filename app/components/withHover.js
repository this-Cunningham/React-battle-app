import React from 'react'

export default function withHover (Component, propName = 'hovering') {
  return class WithHover extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
        hovering: false
      }
      this.mouseOut = this.mouseOut.bind(this);
      this.mouseOver = this.mouseOver.bind(this);
    }
    mouseOut () {
      this.setState ({
        hovering: false
      })
    }
    mouseOver () {
      this.setState({
        hovering: true
      })
    }

    render() {
      const props = {
        [propName]: this.state.hovering,
        ...this.props
      }
      return (
        <div onMouseOut = {this.mouseOut} onMouseOver = {this.mouseOver}>
          <Component {...props} />
        </div>
      )
    }
  }
}
