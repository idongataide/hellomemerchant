import React, { useState } from 'react'
import Images from './Images'
import Myfunctions from '../js/MyFuntions';
import { useNavigate } from 'react-router-dom';


function ForgotPassword() {

 let navigate =  useNavigate()

  return (
    <div>
        <div className="verify authincation h-100">
            <div className="container h-100">
                <div className="row justify-content-center h-100 align-items-center">
                    <div className="col-md-7">
                        <div className="authincation-content">
                            <div className="row no-gutters">
                                <div className="col-xl-12">
                                    <div className="auth-form">
                                         <div className="text-center mb-5">
                                            <img className='logo-img' src={Images.logo} alt=""/>
                                        </div>
                                        <h3 className="text-center mb-4 text-secondary">FORGOT PASSWORD</h3>
                                        <p className='sub-text text-center fs-14'>No worries! Enter your email address below and we will send you instructions on how to reset your password.</p>
                                        <form action='#' onSubmit={(e)=>{Myfunctions.ForgotPassword(e, navigate)}}>
                                            <div className="form-group mb-4">
                                                <label className="mb-1"><strong>Email Address *</strong></label>
                                                <input type="email" name='email' className="form-control" placeholder='Enter your email'/>
                                            </div>    
                                            <div className="text-center">
                                                <button type="submit" className="btn btn-primary btn-block">Proceed</button>
                                            </div>
                                        </form>
                                        <p className='text-secondary text-center fs-18 font-w500'>Proceed to signin</p>
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
