import React from 'react'

const Notification = ({ message }) => {
    const style = {
      color: message.color,
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
    if (message.message === null) {
      return null
    }
    return (
      <div style={style} className="error">
        {message.message}
      </div>
    )
  }

export default Notification;