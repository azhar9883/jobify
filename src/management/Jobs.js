import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserJob } from '../redux/userSliceJob';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import '../adminDashBoard/dashboard.css'
const Jobs = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.usersJob.usersJob)
  const [currentPage, setCurrentPage] = useState(0);
  const [check, setCheck] = useState()
  useEffect(() => {
    const takeToken = JSON.parse(localStorage.getItem('myToken'))
    setCheck(takeToken)
  }, [])
  const logout = () => {
    localStorage.removeItem('myToken')
    setCheck(null)
    navigate('/')

  }
  const itemsPerPage = 4; // Number of items per page
  axios.defaults.withCredentials = true
  const handleDelete = (id) => {
    console.log("id", id)
    axios.delete('http://localhost:4000/apiDeleteJob/' + id,)
      .then(res => {
        dispatch(deleteUserJob({ id }))
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
  }
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const pageCount = Math.ceil(user.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = user
    .slice(offset, offset + itemsPerPage)
    .map((item) => (
      <tr key={item.id}>
        <td>{item.title}</td>
        <td>{item.description}</td>
        <td>{item.company}</td>
        <td>{item.location}</td>
        <td>{item.salary}</td>

        <td>
          <NavLink to={`/editjobform/${item.id}`} className='btn btn-success me-2'>update</NavLink>
          <button onClick={() => handleDelete(item.id)} className='btn btn-danger me-2'>delete</button>
          <NavLink to={`/DetailsOfJob/${item.id}`} className='btn btn-danger '>details</NavLink>
        </td>
      </tr>
    ))
  const [isClosed, setIsClosed] = useState(false);
  const handleToggle = () => {
    setIsClosed(!isClosed);
  };
  return (

    <>
      <nav className={isClosed ? 'closed' : ''}>
        <div className="logo-name">
          <div className="logo-image">
            <img src="images/logo.png" alt="" />
          </div>
          <span className="logo_name" onClick={() => navigate('/dashboard')}>Admin</span>
        </div>
        <div className="menu-items">
          <ul className="nav-links">
            <li>
              <a href="#">

                <span className="link-name">Jobs</span>
              </a>
            </li>
            <li>
              <NavLink to='/companys'>

                <span className="link-name">Companys</span>
              </NavLink>
            </li>
          </ul>
          <ul className="logout-mode">
            <li>
              <a href="#" onClick={logout}>
                <i className="uil uil-signout" />
                <span className="link-name">Logout</span>
              </a>
            </li>

          </ul>
        </div>
      </nav>
      <section className="dashboard">
        <div className="top">
          <i className="uil uil-bars sidebar-toggle" onClick={handleToggle} />
          <div className="search-box">
            <i className="uil uil-search" />
            <input type="text" placeholder="Search here..." />
          </div>
          <img src="images/profile.jpg" alt="" />
        </div>
        <div className="dash-content">
          <div className='d-flex justify-content-end'>
            <NavLink to='/jobForm' className='btn btn-primary me-3 mx-3 px-4 '>add job</NavLink>
          </div>
          <h1>job management</h1>
          <table className="table">
            <thead>
              <tr>

                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Company</th>
                <th scope="col">Location</th>
                <th scope="col">Salery</th>
                <th scope="col">actions</th>
              </tr>
            </thead>
            <tbody>
              {
                currentPageData
              }
            </tbody>
          </table>
          <ReactPaginate
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName={'pagination'}
            activeClassName={'active'}
            pageRangeDisplayed={5} // Number of pagination numbers displayed
            marginPagesDisplayed={2}
          />
        </div>
      </section>
    </>
  )
}

export default Jobs
