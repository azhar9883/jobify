import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const AdminSignUp = () => {
  const navigate = useNavigate()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const hundleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:4000/register', { name, email, password })
      .then(res => {
       navigate('/')
      }).catch(err => console.log(err))
  }
  console.log("object", password)

  return (
    <div className="wrapper">
      <div className="container">
        <div className="col-left">
          <div className="login-text">
            <h2>Welcome Back</h2>
            <p>
              Create your account.
              <br />
              It's totally free.
            </p>
            <a className="btn" href="">
              Login
            </a>
          </div>
        </div>
        <div className="col-right">
          <div className="login-form">
            <h2>Sign Up</h2>
            <form onSubmit={hundleSubmit}>
              <p>
                <label>
                  name<span>*</span>
                </label>
                <input
                  type="text"
                  placeholder="enter name.."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required="" />
              </p>
              <p>
                <label>
                  email<span>*</span>
                </label>
                <input type="email"
                  placeholder="Username or Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required="" />
              </p>
              <p>
                <label>
                  Password<span>*</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required="" />
              </p>

              <p>
                <input type="submit" defaultValue="Sing In" />
              </p>
              <p>
                <a href="">Forget Password?</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSignUp
