import React from 'react'
import Images from './Images'



function Verify() {
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
                                            <img  src={Images.envelop} alt=""/>
                                        </div>
                                        <h3 className="text-center mb-4 text-secondary">Thank you for signing up</h3>
                                        <p className='sub-text'>We just sent a verification e-mail to saitoweezy@gmail.com. Kindly click the link in the mail to verify your Hellome Money account.</p>
                                        <form action="#">                                            
                                            <div className="text-center">
                                                <button type="submit" className="btn btn-link btn-block">Didn’t get the e-mail? <span className='text-secondary link'>Re-send verification link</span></button>
                                            </div>
                                        </form>
                                        <p className='text-secondary fs-18 font-w500'>Log  out</p>
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

export default Verify
