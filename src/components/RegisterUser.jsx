import React from 'react';
import Button from './Button.jsx';


export default class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  handleChange(event) {
    this.setState({ userName: event.target.value }, () => {
      if (this.state.userName.length > 1) {
        this.props.validateName(this.state.userName);
      }
    });
  }

  registerUser() {
    this.props.registerUser(this.state.userName);
    this.setState({ userName: '' });
  }

  render() {
    const { nameIsValid } = this.props;
    return (
      <div>
        <span>Please add your username: </span>
        <input type="text" onChange={this.handleChange} value={this.state.userName} />
        { nameIsValid &&
          <Button onClick={this.registerUser}>
            Enter
          </Button>
        }
        { nameIsValid === false &&
          <span>Sorry, that user name has been taken</span>
        }
      </div>
    )
  }

}