import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux';
import axios from 'axios'
import {getUser} from "./redux/userSlice"
import { getUserJob } from './redux/userSliceJob';
import './App.css';
import Dashboard from './adminDashBoard/Dashboard';
import AdminLogin from './adminLogin/AdminLogin';
import AdminSignUp from './adminLogin/AdminSignUp';
import Jobs from './management/Jobs';
import Companys from './management/Companys';
import CompanyForm from './form/CompanyForm';
import JobForm from './form/JobForm';
import EditCompanyForm from './form/EditCompanyForm'
import EditJobForm from './form/EditJobForm';
import DetailsOfCompany from './form/DetailsOfCompany';
import DetailsOfJob from './form/DetailsOfJob';
import AuthGurd from './AuthGurd';
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/apiData', {
          withCredentials: true
      });
        dispatch(getUser(response.data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  
  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get('http://localhost:4000/apiDataJob', {
          withCredentials: true
      });
        dispatch(getUserJob(response.data))
        
      } catch (error) {
        console.log(error)
      }
    }
    fetchData1()
  }, [])
  
  return (
    <>

      <Routes>
        <Route path='/' element={<AdminLogin />} />
        <Route path='/AdminSignUp' element={<AdminSignUp />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/jobs' element={<AuthGurd><Jobs /></AuthGurd>} />
        <Route path='/companys' element={<AuthGurd><Companys /></AuthGurd>} />
        <Route path='/companyform' element={<AuthGurd><CompanyForm /></AuthGurd>} />
        <Route path='/jobform' element={<AuthGurd><JobForm /></AuthGurd>} />
        <Route path='/editcompanyform/:id' element={<AuthGurd><EditCompanyForm /></AuthGurd>} />
        <Route path='/editjobform/:id' element={<AuthGurd><EditJobForm /></AuthGurd>} />
        <Route path='/detailsofJob/:id' element={<AuthGurd><DetailsOfJob /></AuthGurd>} />
        <Route path='/detailsofcompany/:id' element={<AuthGurd><DetailsOfCompany /></AuthGurd>} />
        
        
      </Routes>
    </>
  );
}

export default App;
