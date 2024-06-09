import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/userSlice';
import { useNavigate, useParams } from 'react-router-dom';
const EditCompanyForm = () => {
  const { id } = useParams()
  const users = useSelector(state => state.users.users)
  const user = users.find(u => u.id === id)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState(user.name)
  const [address, setaddress] = useState(user.address)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone)
  axios.defaults.withCredentials = true
  const hundleUpdate = (e) => {
    e.preventDefault()
    axios.put('http://localhost:4000/apiUpdate/' + id, { name, address, email, phone })
      .then((res) => {
        dispatch(updateUser({ id, name, address, email, phone }))
        navigate('/companys')
        console.log(res)
      })
      .then((err) => console.log(err))
  }
  return (
    <div >
      <div className='form_width'>
        <form onSubmit={hundleUpdate} className='main'>
          <h3 className='text-center'>Update Form</h3>
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
            <button className='btn btn-primary' type="submit" defaultValue="Submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCompanyForm
