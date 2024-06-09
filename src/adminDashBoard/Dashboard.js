import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './dashboard.css'
const Dashboard = () => {
  const navigate = useNavigate()
  const[check,setCheck] = useState()
  const [isClosed, setIsClosed] = useState(false);
  const handleToggle = () => {
    setIsClosed(!isClosed);
  };
   useEffect(()=>{
    const takeToken = JSON.parse(localStorage.getItem('myToken'))
    setCheck(takeToken)
   },[])
   const logout=()=>{
        localStorage.removeItem('myToken')
        setCheck(null)
        navigate('/')
    
   }
 
  axios.defaults.withCredentials = true
  // useEffect(()=>{
  //   axios.get('http://localhost:4000/dashboard')
  //        .then(res =>{
  //         console.log("hello",res.data)
  //         if(res.data === "Success"){
  //           setSuc('successfull ok')
  //         }else{
  //           navigate('/')
  //         }
  //        }).catch(err => console.log(err))
  // })
  return (

    <>
      <nav className={isClosed ? 'closed' : ''}>
        <div className="logo-name">
          <div className="logo-image">
            <img src="images/logo.png" alt="" />
          </div>
          <span className="logo_name">Admin</span>
        </div>
        <div className="menu-items">
          <ul className="nav-links">
            <li>
              <NavLink to='/jobs'>

                <span className="link-name">Jobs</span>
              </NavLink>
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
         <div className='boxs'>
           <div className='box' onClick={()=>navigate('/jobs')}>
           <h3>Click here to see Jobs</h3>
           </div>
           <div className='box' onClick={()=>navigate('/companys')}>
           <h3> Click here to see Companys</h3>
           </div>
         </div>
        </div>
      </section>
    </>
  )
}

export default Dashboard
