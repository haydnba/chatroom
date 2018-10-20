import React from 'react';


const UsersDisplay = ({ usersList }) => {
  return (
    <ul>
      { usersList && 
        usersList.map((user, idx) => {
          return (
            <li key={idx}>
              <span>{user.name}</span>
              <span> | Joined at: </span>
              <span>{user.joined[1]}</span>
            </li>
          )
        })
      }
    </ul>
  )
}

export default UsersDisplay