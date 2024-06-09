import React, { useState,useEffect } from 'react'
import { NavLink ,useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import ReactPaginate from 'react-paginate';
import { deleteUser } from '../redux/userSlice';
import '../adminDashBoard/dashboard.css'
import axios from 'axios';

const Companys = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state=>state.users.users)
  const [isClosed, setIsClosed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const[check,setCheck] = useState()
  useEffect(()=>{
   const takeToken = JSON.parse(localStorage.getItem('myToken'))
   setCheck(takeToken)
  },[])
  
  const logout=()=>{
       localStorage.removeItem('myToken')
       setCheck(null)
       navigate('/')
   
  }
  const itemsPerPage = 4; // Number of items per page
  const handleDelete=(id)=>{
    axios.delete('http://localhost:4000/apiDelete/' + id, {
      withCredentials: true
  })
    .then(res =>{
       dispatch(deleteUser({id}))
      console.log(res)
    }).catch(err=>{
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
        <td>{item.name}</td>
        <td>{item.address}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
     
        <td>
          <NavLink to={`/editCompanyForm/${item.id}`} className='btn btn-success me-2'>update</NavLink>
          <button onClick={() => handleDelete(item.id)} className='btn btn-danger me-2'>delete</button>
          <NavLink to={`/DetailsOfCompany/${item.id}`}  className='btn btn-danger '>details</NavLink>
        </td>
      </tr>
    ))
    console.log(currentPageData)
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
          <span onClick={()=>navigate('/dashboard')} className="logo_name">Admin</span>
        </div>
        <div className="menu-items">
          <ul className="nav-links">
            <li>
              <NavLink to='/jobs'>

                <span className="link-name">Jobs</span>
              </NavLink>
            </li>
            <li>
              <a href="#">

                <span className="link-name">Companys</span>
              </a>
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
            <NavLink to='/companyform' className='btn btn-primary me-3 mx-3 px-4 '>Add company</NavLink>
          </div>
          <h1>Management company</h1>
          
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Email</th>
                <th scope="col">Phone No</th>
                <th scope='col'>action</th>
              </tr>
            </thead>
            <tbody>
            {currentPageData}
          
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

export default Companys
