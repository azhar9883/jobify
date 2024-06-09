import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserJob } from '../redux/userSliceJob';
import { useNavigate, useParams } from 'react-router-dom';
const EditJobForm = () => {
  const { id } = useParams()
  const users = useSelector(state => state.usersJob.usersJob)
  const user = users.find(u => u.id === id)
  console.log("object user".user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [title, setTitle] = useState(user.title)
  const [description, setDescription] = useState(user.description)
  const [location, setLocation] = useState(user.location)
  const [salary, setSalary] = useState(user.salary)
  axios.defaults.withCredentials = true
  const hundleUpdate = (e) => {
    e.preventDefault()
    axios.put('http://localhost:4000/apiUpdateJob/' + id, { title, description, location, salary })
      .then((res) => {
        dispatch(updateUserJob({ id, title, description, location, salary }))
        navigate('/jobs')
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
            <label htmlFor="fname"> title</label>
            <input
              type="text"
              id="name"
              name="title"
              value={title}
              placeholder="Your title.."
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lname">description</label>
            <input
              type="text"
              id="address"
              name="description"
              value={description}
              placeholder="Your description.."
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lname">location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              placeholder="Your location.."
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lname">salary</label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={salary}
              placeholder="Your salary.."
              onChange={(e) => setSalary(e.target.value)}
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

export default EditJobForm
