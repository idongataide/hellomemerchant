import React, { useEffect, useState } from 'react'
import Images from './Images'
import { Link, useNavigate} from 'react-router-dom'
import Myfunctions from '../js/MyFuntions'
import Apphelpers from '../js/Apphelpers'
import { appState } from '../js/Context/State'



function Signup() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = "Signup - Hellome Merchant"
     }, [])

  return (
    <div>

        <div class="SignupBody authincation">
                <div class="container">
                    <div class="row justify-content-center h-100- align-items-center">
                        <div class="col-md-8">
                            <div class="authincation-content">
                                <div class="row no-gutters">
                                    <div class="col-xl-12">
                                        <div class="auth-form">
                                            <div class="text-center mb-3">
                                                <img className='logo-img' src={Images.logo} alt=""/>
                                            </div>
                                            <h4 class="text-center mb-5">Create your HelloMe Money Account</h4>
                                            <form onSubmit={(e)=>{Myfunctions.create(e, navigate, setLoading )}} action="#">
                                               <div className='row'>  
                                                    <div className='mb-3 col-md-6'>
                                                        <div class="form-group">
                                                            <label class="mb-1"><strong>First Name</strong></label>
                                                            <input name='fname' type="text" class="form-control" placeholder="First Name"/>
                                                        </div>
                                                    </div>    
                                                    <div className='mb-3 col-md-6'>
                                                        <div class="form-group">
                                                            <label class="mb-1"><strong>Last Name</strong></label>
                                                            <input name='lname' type="text" class="form-control" placeholder="Last Name"/>
                                                        </div>                                                
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <div class="form-group">
                                                            <label class="mb-1"><strong>Company Name</strong></label>
                                                            <input name='business_name' type="text" class="form-control" placeholder="Company Name"/>
                                                        </div>
                                                    </div>    
                                                    <div className='mb-3 col-md-6'>    
                                                        <div class="form-group">
                                                            <label class="mb-1"><strong>Email</strong></label>
                                                            <input name='email' type="email" class="form-control" placeholder="Email"/>
                                                        </div>                                                
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <div class="form-group">
                                                            <label class="mb-1"><strong>Password</strong></label>
                                                            <input name='password' type="password" class="password form-control" placeholder="Password"/>
                                                        </div>
                                                    </div>    
                                                    <div className='mb-3 col-md-6'>    
                                                        <div class="form-group">
                                                            <label class="mb-1"><strong>Retype Password</strong></label>
                                                            <input name='confirm_password' type="password" class="confirm_password form-control" placeholder="Confirm Password"/>
                                                        </div>                                                
                                                    </div>
                                                    <div className='mb-3 col-md-6'>
                                                        <div class="form-group">
                                                            <label class="mb-1"><strong>How did you hear about Hellome Money?</strong></label>
                                                            <select  name='medium' className='form-control bg-white medium'>
                                                                <option data-value="">Select Medium</option>
                                                                <option data-value="LinkedIn">LinkedIn</option>
                                                                <option data-value="Friends">Friends</option>
                                                                <option data-value="Facebook">Facebook</option>
                                                                <option data-value="Family">Family Referall</option>
                                                                <option data-value="Others">Others</option>
                                                            </select>
                                                        </div>                                          
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <div class="form-group">
                                                            <label class="mb-1"><strong>Referall Code</strong></label>
                                                            <input name='sponsor' type="text" class="form-control" placeholder="Referal Code"/>
                                                        </div>
                                                    </div>  
                                                    <div className="form-group">
                                                        <div className="custom-control custom-checkbox ms-1">
                                                            <input type="checkbox" className="form-check-input" id="basic_checkbox_1" required/>
                                                            <label className="form-check-label" for="basic_checkbox_1">
                                                                <p className='text-center agree'>
                                                                     I hereby consent to the Terms of Use and give consent for Hellome Money to process my data <br/> in line with Hellome Money's Privacy Policy. I also confirm I have the authorization of the <br/>
                                                                    Board of Directors and the Company to create this account and provide their personal data.
                                                                </p>
                                                            </label>
                                                        </div>
                                                    </div>
                                                     
                                                    <button type="submit" className="btn btn-primary btn-block w-80 m-auto" disabled={loading}>
                                                       {loading && <span className='spinner-border'></span>}{loading ? 'Loading in...' : 'Sign Up'}
                                                    </button>

                                                </div>
                                            </form>
                                            <div class="new-account mt-3 text-center">
                                                <h5 className='text-secondary'>Login To Existing Account <Link class="text-secondary" to="/signin">Sign in</Link></h5>
                                            </div>
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

export default Signup
