import React, { useState } from 'react'
import Images from './Images'
import OtpInput from 'react-otp-input';
import Myfunctions from '../js/MyFuntions';
import { Link, useNavigate } from 'react-router-dom';


function Otp() {

const [otp, setOtp] = useState('');
const [loading, setLoading] = useState(false);


const navigate =useNavigate()
let email = localStorage.getItem('email')

  return (
    <div>
        <div className="verify authincation h-100">
            <div className="container h-100">
                <div className="row justify-content-center h-100 align-items-center">
                    <div className="col-lg-7 col-md-12">
                        <div className="authincation-content">
                            <div className="row no-gutters">
                                <div className="col-xl-12">
                                    <div className="auth-form text-center">
                                        <div className="text-center mb-3">
                                            <img  src={Images.envelop} alt=""/>
                                        </div>
                                        <h3 className="text-center mb-2 text-secondary">Email verification</h3>
                                        <p className='sub-text'>We just sent a verification e-mail to <span className='text-secondary'>{email}</span>. Kindly insert the code to proceed.</p>
                                        <form>
                                            <div class="row">
                                                <div class="otp-boxex">
                                                    <OtpInput
                                                        value={otp}
                                                        onChange={setOtp}
                                                        numInputs={6}
                                                        inputStyle={'form-control otp-input'}
                                                        renderSeparator={<span className="m-2"> - </span>}
                                                        renderInput={(props) => <input id="otp-input" name="otp_code" value={otp} {...props} />}
                                                    />
                                                    <input type="hidden" id="otp" value={otp}/>
                                                </div>
                                            </div>
                                            <div class="text-center mt-4 pb-3">
                                                <button type="button"  onClick={(e)=>{Myfunctions.handleOTP(e, navigate, setOtp)}} class="btn btn-primary btn-block">Submit</button>
                                            </div>
                                         </form>
                                        <Link to="/signin"><p className='text-secondary fs-18 font-w500'>Proceed to sigin</p></Link>
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

export default Otp
