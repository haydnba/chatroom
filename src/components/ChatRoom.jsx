import React from 'react';
import io from 'socket.io-client';
import RegisterUser from './RegisterUser.jsx';
import MessageInput from './MessageInput.jsx';
import MessagesDisplay from './MessagesDisplay.jsx';
import UsersDisplay from './UsersDisplay.jsx';


export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.socket = null;
    this.state = {
      isRegistered: false,
      userName: null,
      allMessages: [],
      allUsers: []
    }
    this.initSocket = this.initSocket.bind(this);
    this.validateName = this.validateName.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.initSocket();
  }

  initSocket() {
    this.socket = io.connect('http://localhost:3000');

    this.socket.on('receiveMessage', (data) => {
      console.log(data);
      if (this.state.isRegistered)
      this.setState(({ allMessages: previousMessages }) => ({
        allMessages: previousMessages.concat(data)
      }));
    });

    this.socket.on('updateUsers', (users) => {
      console.log('Client Update Users: ', Object.values(users));
      this.setState({ allUsers: Object.values(users) });
    });

    this.socket.on('userDepart', (userName) => {
      console.log('User left the chatroom: ', userName);
    })
  }

  validateName(userName) {
    this.socket.emit('validateName', userName, (status) => {
      console.log('Client Validate Name: ', status);
      this.setState({ userName: status })
    });
  }

  registerUser(userName) {
    this.socket.emit('registerUser', userName);
    this.setState({ userName: userName, isRegistered: true });
  }

  sendMessage(message) {
    const dateTime = new Date().toLocaleString();
    const { userName } = this.state;
    const data = { dateTime, userName, message };
    this.socket.emit('userMessage', data);
  }

  render() {
    const { userName, allMessages, allUsers } = this.state;
    return (
      <div className="chat">
        { allUsers.length === 0 && 
          <RegisterUser 
            validateName={this.validateName} 
            registerUser={this.registerUser}
            nameIsValid={userName}
          /> 
        }
        { allMessages.length > 0 && 
          <MessagesDisplay chatHistory={allMessages} /> 
        }
        { allUsers.length > 0 && 
          <section>
            <MessageInput sendMessage={this.sendMessage} /> 
            <UsersDisplay usersList={allUsers} />
          </section>
        }
      </div>
    )
  }
}
