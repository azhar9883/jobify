import React, { useState,useEffect } from 'react'
import { NavLink, useParams ,useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../adminDashBoard/dashboard.css'
const DetailsOfCompany = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const users = useSelector(state => state.users.users)
  const user2 = useSelector(state => state.usersJob.usersJob)
  const user = users.find(u => u.id === id)
  const [isClosed, setIsClosed] = useState(false);
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
            <div className='box1'>
              <h3>Company Details</h3>
              <hr />
              <h2>{user?.name}</h2>
              <h2>{user?.address}</h2>
              <h2>{user?.email}</h2>
              <h2>{user?.phone}</h2>
            </div>
            <div className='box1'>
              <h3>job list</h3>
              <hr />
             { user2.map((item)=>{
              return (
                <>
                <h2> {item?.title}</h2>
                <h2> {item?.description}</h2>
                <h2> {item?.location}</h2>
                <h2> {item?.salary}</h2>
                </>
              )
             }
            )}

            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default DetailsOfCompany
