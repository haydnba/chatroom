import React from 'react';


const MessagesDisplay = ({ chatHistory }) => {
  return (
    <section>
      { chatHistory && 
        chatHistory.map((message, idx) => {
          return (
            <article key={idx}>
              <header>
                {message.data.userName} said:
              </header>
              <main>{message.data.message}</main>
              <footer>
                on: {message.data.dateTime.split(',')[0]}, 
                at: {message.data.dateTime.split(',')[1]}
              </footer>
            </article>
          )
        })
      }
    </section>
  )
}

export default MessagesDisplay