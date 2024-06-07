import React, { useState } from 'react'
import Images from './Images'
import OtpInput from 'react-otp-input';
import Myfunctions from '../js/MyFuntions';
import { Link, useNavigate } from 'react-router-dom';


function SetPin() {

const [pin, setPin] = useState('');


const navigate = useNavigate()

  return (
    <div>
        <div className="verify authincation h-100">
            <div className="container h-100">
                <div className="row justify-content-center h-100 align-items-center">
                    <div className="col-md-7">
                        <div className="authincation-content">
                            <div className="row no-gutters">
                                <div className="col-xl-12">
                                    <div className="auth-form text-center">
                                        <div className="text-center mb-3">
                                            <img  src={Images.logo} alt=""/>
                                        </div>
                                        <h3 className="text-center mb-2 text-secondary">Verify Account</h3>
                                        <p className='sub-text'>Kindly set your pin to secure your account</p>
                                        <form>
                                            <div class="row">
                                                <div class="otp-boxex">
                                                    <OtpInput
                                                        value={pin}
                                                        onChange={setPin}
                                                        numInputs={4}
                                                        inputStyle={'form-control otp-input'}
                                                        renderSeparator={<span className="m-2"> - </span>}
                                                        renderInput={(props) => <input id="otp-input" name="otp_code" value={pin} {...props} />}
                                                    />
                                                    <input type="hidden" id="otp" value={pin}/>
                                                </div>
                                            </div>
                                            <div class="text-center mt-4 pb-3">
                                                <button type="button"  onClick={(e)=>{Myfunctions.SetPin(e, navigate)}} class="btn btn-primary btn-block">Submit</button>
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

export default SetPin
