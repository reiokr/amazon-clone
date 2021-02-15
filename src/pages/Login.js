import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
// import { useGlobal } from '../context'
import { auth } from '../firebase'
import './login.css'

const Login = () => {
  const [errmsg, setErrMsg] = useState('')
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const { loginUser } = useGlobal()

  const handleForm = (e) => {
    e.preventDefault()
    // firebase login
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        const user = auth.user
        if (user) {
          history.push('/')
        }
      })
      .catch((err) => {
        // console.log(err)
        showError(err.message)
      })

    setEmail('')
    setPassword('')
  }

  const registerUser = () => {
    // firebase register
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        const user = auth.user
        if (user) {
          history.push('/')
        }
      })
      .catch((err) => {
        // console.log(err)
        showError(err.message)
      })
    setEmail('')
    setPassword('')
  }

  const showError = (msg) => {
    setErrMsg(msg)
    setTimeout(() => {
      setErrMsg('')
    }, 3000)
  }

  return (
    <div className='login'>
      <Link to='/'>
        <img
          src='http://pngimg.com/uploads/amazon/amazon_PNG25.png'
          alt=''
          className='login__logo'
        />
      </Link>
      <div className='login__container'>
        <div className='error__msg'>{errmsg}</div>
        <h1>Sign In</h1>
        <form className='login__form' onSubmit={handleForm}>
          <label htmlFor='email'>E-mail</label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='login__btn' type='submit'>
            Sign In
          </button>
        </form>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
          perferendis iusto. Dolorem error corrupti temporibus voluptas dolore.
          Alias, officia odit vel ex facilis expedita delectus molestiae
          explicabo quod. Nulla, illum!
        </p>
        <button className='login__btn' onClick={registerUser}>
          Create Account
        </button>
      </div>
    </div>
  )
}

export default Login
