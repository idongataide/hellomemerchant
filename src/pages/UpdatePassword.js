import React from 'react'
import Images from './Images'
import Myfunctions from '../js/MyFuntions';
import { Link, useNavigate } from 'react-router-dom';
import { useStoreSelector } from '../js/Store/useStore';
import { useState } from 'react';


function UpdatePassword() {

    const { passwordConditions, setPasswordCondition } = useStoreSelector(["passwordConditions", "setPasswordCondition"]);
    const [loading, setLoading] = useState(false);


    let urlParams = new URLSearchParams(window.location.search)
    let password_token = urlParams.get('token');
    localStorage.setItem('pass_token', password_token)


    const [passwordShown2, setPasswordShown2] = useState(false);
    const togglePasswordVisiblity2 = () => {
       setPasswordShown2(passwordShown2 ? false : true);
    };
    const [passwordShown3, setPasswordShown3] = useState(false);
    const togglePasswordVisiblity3 = () => {
       setPasswordShown3(passwordShown3 ? false : true);
    };

 let navigate =  useNavigate()

  return (
    <div>
        <div className="verify authincation h-100">
            <div className="container h-100">
                <div className="row justify-content-center h-100 align-items-center">
                    <div className="col-lg-7 col-md-12">
                        <div className="authincation-content">
                            <div className="row no-gutters">
                                <div className="col-xl-12">
                                    <div className="auth-form">
                                         <div className="text-center mb-3">
                                             <Link to="/"> <img className='logo-img' src={Images.logo} alt=""/></Link> 
                                        </div>
                                        <h3 className="text-center mb-4 text-secondary">SET NEW PASSWORD</h3>
                                        <form onSubmit={(e)=>{Myfunctions.UpdatePassword(e, navigate, setLoading )}}>
                                            <div class="form-group">
                                                <label class="mb-1"><strong>New Password</strong></label>
                                                <div className='input-group transparent-append'>
                                                    <input type={passwordShown2 ? "text" : "password"} name='newpassword'  onKeyUp={(e) => { Myfunctions.checkPassword(e, setPasswordCondition) }} class="form-control change_password setnewpassword" />
                                                    <span class="input-group-text pointer" >
                                                        <i onClick={togglePasswordVisiblity2} className={passwordShown2 ? "fa fa-eye-slash toggle-password" : "fa fa-eye toggle-password"}></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="mb-1"><strong>Confirm Password</strong></label>
                                                <div className='input-group transparent-append'>
                                                    <input type={passwordShown3 ? "text" : "password"} name='confirmpassword' class="form-control confirm_change_password" />
                                                    <span class="input-group-text pointer" >
                                                        <i onClick={togglePasswordVisiblity3} className={passwordShown3 ? "fa fa-eye-slash toggle-password" : "fa fa-eye toggle-password"}></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="mb-3 form-validate">
                                                <div class="form-check mt-2">
                                                    <input class="form-check-input" id="uppercase" type="checkbox" value="" />
                                                    <label class={passwordConditions?.uppercase === false ? 'text-danger form-check-label' : passwordConditions?.uppercase === true ? 'text-success form-check-label' : 'form-check-label'}>Must contain uppercase letter</label>
                                                </div>
                                                <div class="form-check mt-2">
                                                    <input class="form-check-input" id="character" type="checkbox" value="" />
                                                    <label class={passwordConditions?.character === false ? 'text-danger form-check-label' : passwordConditions?.character === true ? 'text-success form-check-label' : 'form-check-label'}>Must contain numbers</label>
                                                </div>
                                                <div class="form-check mt-2">
                                                    <input class="form-check-input" id="length" type="checkbox" value="" />
                                                    <label class={passwordConditions?.length === false ? 'text-danger form-check-label' : passwordConditions?.length === true ?  'text-success form-check-label' : 'form-check-label'}>Must be up to 8 characters</label>
                                                </div>
                                            </div>
                                             <div className="text-center">
                                                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                                    {loading && <span className='spinner-border'></span>}{loading ? 'Loading...' : 'Submit'}
                                                </button>
                                            </div>
                                            </form>
                                           <Link to="/signin"><p className='text-secondary text-center fs-16 font-w500'>Proceed to signin</p></Link>
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

export default UpdatePassword
