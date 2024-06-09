import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addUserJob } from '../redux/userSliceJob';
import { useNavigate } from 'react-router-dom';
import './form.css'
import axios from 'axios';
const JobForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [company, setCompany] = useState()
  const [location, setLocation] = useState()
  const [salary, setSalary] = useState()
  const hundleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:4000/apiCurdJob', { title, description, company, location,salary })
      .then((res) => {
        dispatch(addUserJob(res.data))
        navigate('/jobs')
        console.log(res)
      })
      .then((err) => console.log(err))
  }
  return (
    <div >
      <div className='form_width'>
        <form onSubmit={hundleSubmit} className='main'>
          <h3 className='text-center'>Job Form</h3>
          <div>
            <label htmlFor="fname">Title</label>
            <input type="text"
              id="fname"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your title.." />
          </div>
          <div>
            <label htmlFor="lname">description</label>
            <input
              type="text"
              id="lname"
              name="decription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Your description.."
            />
          </div>
          <div>
            <label htmlFor="lname">Company</label>
            <input
              type="text"
              id="lname"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Your company.." />
          </div>
          <div>
            <label htmlFor="lname">Location</label>
            <input
              type="text"
              id="lname"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Your location.." />
          </div>
          <div>
            <label htmlFor="lname">Salary</label>
            <input
              type="number"
              id="lname"
              name="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Your salary.." />
          </div>
          <div className='form_btn'>
            <button className='btn btn-primary' type="submit" defaultValue="Submit">Add Job</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default JobForm
