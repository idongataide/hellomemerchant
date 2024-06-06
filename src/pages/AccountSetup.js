import React, { useEffect, useRef, useState } from 'react';
import Images from './Images';
import { Link, useNavigate } from 'react-router-dom';
import Myfunctions from '../js/MyFuntions';
import OtpInput from 'react-otp-input';
import useStore, { useStoreSelector } from '../js/Store/useStore';



function AccountSetup() {
    const { userData, profileProgress } = useStoreSelector(["userData", "profileProgress"]);

    const { setProfileProgress } = useStoreSelector(["setProfileProgress"]);


    useEffect(() => {
        Myfunctions.ProfileProgress(navigate, setProfileProgress)
     }, [])

    const [pin, setPin] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fileInputCACRef = useRef(null);

    const CACUpload = () => {
        fileInputCACRef.current.click();
    };

    const handleCACUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            Myfunctions.uploadCAC(file);
        }
    };

    const fileMermatRef = useRef(null);

    const MermatUpload = () => {
        fileMermatRef.current.click();
    };

    const handleMermatUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            Myfunctions.uploadMermat(file);
        }
    };


    const filePOFRef = useRef(null);

    const POFUpload = () => {
        filePOFRef.current.click();
    };

    const handlePOFUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            Myfunctions.uploadPOF(file);
        }
    };

    
    const fileIDRef = useRef(null);

    const IDUpload = () => {
        fileIDRef.current.click();
    };

    const handleIDUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            Myfunctions.IDcard(file);
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
                                            <div className="text-center mb-3">
                                                <img className='logo-img w-40' src={Images.logo} alt="" />
                                            </div>
                                            <h4 className="text-secondary">Account Setup</h4>
                                            <p className='sub-text'>Just few more steps to get you all setup </p>

                                            <div className='setup-items mb-2'>
                                                <div className="media style-1" onClick={CACUpload}>
                                                    <i className='fa fa-file-alt fs-20 me-3' />
                                                    <div className="media-body">
                                                        <h6>CAC Document</h6>
                                                        <span>Provide document gotten from CAC</span>
                                                    </div>
                                                    {profileProgress.cac == '1' ? <i className='fas fa-check-circle text-green' /> : <i className='fas fa-angle-right' />}
                                                </div>
                                                <input type="file" className='file' ref={fileInputCACRef} style={{ display: 'none' }} onChange={handleCACUpload} />
                                            </div>

                                            <div className='setup-items mb-2'>
                                                <div className="media style-1" onClick={MermatUpload}>
                                                    <i className='fa fa-file-alt fs-20 me-3' />
                                                    <div className="media-body">
                                                        <h6>Mermat Document</h6>
                                                        <span>Memorandum and articles of association</span>
                                                    </div>
                                                    {profileProgress.mermat === '1' ? <i className='fas fa-check-circle text-green' /> : <i className='fas fa-angle-right' />}
                                                </div>
                                                <input type="file" ref={fileMermatRef} style={{ display: 'none' }} onChange={handleMermatUpload} />
                                            </div>


                                            <div className='setup-items mb-2'>
                                                <div className="media style-1" onClick={POFUpload}>
                                                    <i className='fa fa-file-alt fs-20 me-3' />
                                                    <div className="media-body">
                                                        <h6>Proof of Address</h6>
                                                        <span>We need to verify business address</span>
                                                    </div>
                                                    {profileProgress.pof == '1' ? <i className='fas fa-check-circle text-green' /> : <i className='fas fa-angle-right' />}
                                                </div>
                                                <input type="file" ref={filePOFRef} style={{ display: 'none' }} onChange={handlePOFUpload} />
                                            </div>

                                            <div className='setup-items mb-2'>
                                                <div className="media style-1" onClick={IDUpload}>
                                                    <i className='fa fa-file-alt fs-20 me-3' />
                                                    <div className="media-body">
                                                        <h6>Director's ID</h6>
                                                        <span>We need to verify your identity</span>
                                                    </div>
                                                    {profileProgress.director_id == '1' ? <i className='fas fa-check-circle text-green' /> : <i className='fas fa-angle-right' />}
                                                </div>
                                                <input type="file" ref={fileIDRef} style={{ display: 'none' }} onChange={handleIDUpload} />
                                            </div>

                                            <div className='setup-items mb-2' data-bs-toggle="modal" data-bs-target="#SetBVN">
                                                <div className="media style-1">
                                                    <i className='fa fa-user fs-20 me-3' />
                                                    <div className="media-body">
                                                        <h6>BVN</h6>
                                                        <span>Verify your BVN</span>
                                                    </div>
                                                    {profileProgress.bvn_update == '1' ? <i className='fas fa-check-circle text-green' /> : <i className='fas fa-angle-right' />}
                                                </div>
                                            </div>
                                            <div className='setup-items mb-0' data-bs-toggle="modal" data-bs-target="#SetPin">
                                                <div className="media style-1">
                                                    <i className='fa fa-shield-alt fs-20 me-3' />
                                                    <div className="media-body">
                                                        <h6>PIN</h6>
                                                        <span>Transaction pin setup</span>
                                                    </div>
                                                    {profileProgress.pin_setup == '1' ? <i className='fas fa-check-circle text-green' /> : <i className='fas fa-angle-right' />}
                                                </div>
                                            </div>

                                            {/* <Link to="/index"><p className='text-secondary text-center mt-3 mb-0 fs-16 font-w500'>Proceed to dashboard</p></Link> */}

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="SetPin">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <h3 className="text-center mb-2 text-secondary">Set Pin</h3>
                            <p className='sub-text text-center'>Kindly set your pin to secure your account</p>
                            <form>
                                <div className="row">
                                    <div className="otp-boxex">
                                        <OtpInput
                                            value={pin}
                                            onChange={setPin}
                                            numInputs={4}
                                            inputStyle={'form-control otp-input otp-hidden-input'}
                                            renderSeparator={<span className="m-2"> - </span>}
                                            renderInput={(props) => <input id="otp-input" type="password" name="otp_code" {...props} />}
                                        />
                                        <input type="hidden" id="otp" value={pin} />
                                    </div>
                                </div>
                                <div className="text-center mt-4 pb-3">
                                    <button type="button" onClick={(e) => { Myfunctions.SetPin(e, navigate, setLoading) }} className="btn btn-primary btn-block">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="SetBVN">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <h3 className="text-center mb-2 text-secondary">Verify your BVN</h3>
                            <form action='#' onSubmit={(e) => { Myfunctions.ForgotPassword(e, navigate, setLoading) }}>
                                <div className="form-group mb-4 mt-3">
                                    <label className="mb-1"><strong>Enter BVN </strong></label>
                                    <input type="email" name='email' className="form-control" placeholder='Enter your BVN' />
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary btn-block">Proceed</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AccountSetup;
