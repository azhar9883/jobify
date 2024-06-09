import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './adminLogin.css'
const AdminLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  axios.defaults.withCredentials = true
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/login', { email, password })
      .then(res => {
        localStorage.setItem('myToken', JSON.stringify(res.data.token));
        if (res.data.status === "Success") {
          if (res.data.role === "visitor") {
            navigate('/dashboard');
          } else {
            navigate('/');
          }
        } else {
          alert('Wrong email or password.'); // Show alert for wrong email or password
        }
      })
      .catch(err => console.log(err));
};
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
            <NavLink to='/adminsignUp' className="btn" href="">
              Sign Up
            </NavLink>
          </div>
        </div>
        <div className="col-right">
          <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <p>
                <label>
                  email<span>*</span>
                </label>
                <input type="email"
                  placeholder="Username or Email"
                  required=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </p>
              <p>
                <label>
                  Password<span>*</span>
                </label>
                <input type="password"
                  placeholder="Password"
                  required=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
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

export default AdminLogin
