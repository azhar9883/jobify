import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import './form.css'
const CompanyForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ name, setName ] = useState()
  const [ address, setaddress ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ phone, setPhone ] = useState('')
  const hundleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:4000/apiCurd', { name, address, email, phone })
      .then((res) => {
        dispatch(addUser(res.data))
        navigate('/companys')
        console.log(res)
      })
      .then((err) => console.log(err))
  }
  return (
    <div >
      <div className='form_width'>
        <form onSubmit={hundleSubmit} className='main'>
          <h3 className='text-center'>Company Form</h3>
          <div>
            <label htmlFor="fname"> Name</label>
            <input
              type="text"
              id="name"
              name="firstname"
              value={name}
              placeholder="Your name.."
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lname">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              placeholder="Your address.."
              onChange={(e) => setaddress(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lname">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Your email.."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lname">Phone</label>
            <input
              type="number"
              id="phone"
              name="phone"
              value={phone}
              placeholder="Your phone.."
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className='form_btn'>
            <button className='btn btn-primary' type="submit" defaultValue="Submit">Add Company</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CompanyForm
