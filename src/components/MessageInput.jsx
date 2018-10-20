import React from 'react';
import Button from './Button.jsx';


export default class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.dispatchMessage = this.dispatchMessage.bind(this);
  }

  handleChange(event) {
    this.setState({ message: event.target.value })
  }

  dispatchMessage() {
    this.props.sendMessage(this.state.message);
    this.setState({ message: '' });
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleChange} value={this.state.message} />
        <Button onClick={this.dispatchMessage}>
          Send
        </Button>
      </div>
    )
  }

}