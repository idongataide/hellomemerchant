import React, { useState } from 'react'
import Images from './Images'
import Myfunctions from '../js/MyFuntions';
import { Link, useNavigate } from 'react-router-dom';


function ForgotPassword() {

 let navigate =  useNavigate()
 const [loading, setLoading] = useState(false);


  return (
    <div>
        <div className="verify authincation h-100">
            <div className="container h-100">
                <div className="row justify-content-center h-100 align-items-center">
                    <div className="col-xl-7 col-lg-7 col-md-12">
                        <div className="authincation-content">
                            <div className="row no-gutters">
                                <div className="col-xl-12">
                                    <div className="auth-form">
                                         <div className="text-center mb-5">
                                           <Link to="/"> <img className='logo-img' src={Images.logo} alt=""/></Link> 
                                        </div>
                                        <h3 className="text-center mb-4 text-secondary">FORGOT PASSWORD</h3>
                                        <p className='sub-text text-center fs-14'>No worries! Enter your email address below and we will send you instructions on how to reset your password.</p>
                                        <form action='#' onSubmit={(e)=>{Myfunctions.ForgotPassword(e, navigate, setLoading)}}>
                                            <div className="form-group mb-4">
                                                <label className="mb-1"><strong>Email Address *</strong></label>
                                                <input type="email" name='email' className="form-control" placeholder='Enter your email'/>
                                            </div>    
                                            <div className="text-center">
                                                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                                    {loading && <span className='spinner-border'></span>}{loading ? 'Signing in...' : 'Sign In'}
                                                </button>
                                            </div>
                                        </form>
                                        <Link to="/signin"><p className='text-secondary text-center fs-16 font-w500'>Proceed to sigin</p></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default ForgotPassword
