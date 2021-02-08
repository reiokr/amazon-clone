import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div
      style={{
        width: '100%',
        textAlign: 'center',
        marginTop: '100px',
      }}
    >
      <h3>oops... something went wrong</h3>
      <Link to='/'>
        <button style={{ marginTop: '50px' }}>Back to homepage</button>
      </Link>
    </div>
  )
}

export default Error
