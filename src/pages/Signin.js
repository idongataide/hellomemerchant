import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Images from './Images';
import Myfunctions from '../js/MyFuntions';
import { useStoreSelector } from '../js/Store/useStore';



function Signin() {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUserData, setProfileProgress } = useStoreSelector(["setUserData", "setProfileProgress"]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await Myfunctions.Signin(e, navigate, setLoading, setUserData, setProfileProgress);
        } catch (error) {
            console.error('Error during sign-in:', error);
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="LoginBody authincation h-100">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="authincation-content">
                                <div className="row no-gutters">
                                    <div className="col-xl-12">
                                        <div className="auth-form">
                                            <div className="text-center mb-5">
                                                <img className='logo-img' src={Images.logo} alt="" />
                                            </div>
                                            <form onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                    <label className="mb-1"><strong>Email Address *</strong></label>
                                                    <input type="email" name='email' className="form-control" placeholder='Enter your business email' />
                                                </div>
                                                <div className="form-group">
                                                    <label className="mb-1"><strong>Password *</strong></label>
                                                    <input type="password" name='password' className="form-control" placeholder='Enter your password' />
                                                </div>
                                                <div className="form-row d-flex justify-content-between mt-4 mb-2">
                                                    <div className="form-group">
                                                        <div className="custom-control custom-checkbox ms-1">
                                                            <input type="checkbox" className="form-check-input" id="basic_checkbox_1" />
                                                            <label className="form-check-label" htmlFor="basic_checkbox_1">Keep me signed in</label>
                                                        </div>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <Link className='link' to="/forgot-password">Forgot Password?</Link>
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                                        {loading && <span className='spinner-border'></span>}{loading ? 'Signing in...' : 'Sign In'}
                                                    </button>
                                                </div>
                                            </form>
                                            <div className="new-account mt-3">
                                                <p className='text-center fs-12'>Don't have an account? <Link className="text-secondary fw-500 fs-16" to="/signup">Create Account</Link></p>
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
    );
}

export default Signin;
