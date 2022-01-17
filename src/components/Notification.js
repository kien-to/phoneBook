import React from 'react-dom'

const Notification = ({ notification }) => {
    if (notification === null) {
      return null
    }
  
    return (
      <div className='error'>
        {notification.message}
      </div>
    )
  }

  export default Notification