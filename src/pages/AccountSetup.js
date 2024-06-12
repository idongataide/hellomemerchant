import React, { useEffect, useRef, useState } from 'react';
import Images from './Images';
import { Link, useNavigate } from 'react-router-dom';
import Myfunctions from '../js/MyFuntions';
import OtpInput from 'react-otp-input';
import { Select } from 'antd';
import { useStoreSelector } from '../js/Store/useStore';
import useInactivityTimeout from '../js/useInactivityTimeout';

const { Option } = Select;  

function AccountSetup() {
    const navigate = useNavigate();
    
    const { profileProgress, setProfileProgress } = useStoreSelector(["profileProgress", "setProfileProgress"]);
    const { securityQuestions, setSecurityQuestions } = useStoreSelector(["securityQuestions", "setSecurityQuestions"]);


    useEffect(() => {
        console.log(profileProgress,'lls')
        Myfunctions.ProfileProgress(navigate, setProfileProgress);
        Myfunctions.SecurityQuestions(setSecurityQuestions);
    }, [navigate]);

    const [pin, setPin] = useState('');
    const [loading, setLoading] = useState(false);

    const fileInputCACRef = useRef(null);

    const CACUpload = () => {
        fileInputCACRef.current.click();
    };

    const handleCACUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            Myfunctions.uploadCAC(file, navigate, setProfileProgress);
            event.target.value = null;
        }
    };

    const fileMermatRef = useRef(null);

    const MermatUpload = () => {
        fileMermatRef.current.click();
    };

    const handleMermatUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            Myfunctions.uploadMermat(file, navigate, setProfileProgress);
            event.target.value = null;
            
        }
    };

    const filePOFRef = useRef(null);

    const POFUpload = () => {
        filePOFRef.current.click();
    };

    const handlePOFUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            Myfunctions.uploadPOF(file, navigate, setProfileProgress);
            event.target.value = null;
        }
    };

    const fileIDRef = useRef(null);

    const IDUpload = () => {
        fileIDRef.current.click();
    };

    const handleIDUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            Myfunctions.IDcard(file, navigate, setProfileProgress);
            event.target.value = null;
        }
    };

    const [questions, setQuestions] = useState([
        { question_id: null, question: '', answer: '' },
        { question_id: null, question: '', answer: '' },
        { question_id: null, question: '', answer: '' },
    ]);

    const handleSecurity = (e) => {
        e.preventDefault();
        const formData = {
            questions: questions,
        };

        Myfunctions.SetupQuestion(formData,  setLoading);
    };

    const handleQuestionChange = (index, value, option) => {
        const newQuestions = [...questions];
        newQuestions[index] = { ...newQuestions[index], question_id: value, question: option['data-question'] };
        setQuestions(newQuestions);
    };

    const handleAnswerChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index] = { ...newQuestions[index], answer: value };
        setQuestions(newQuestions);
    };

    useInactivityTimeout();

    return (
        <div>
            <div className="LoginBody authincation h-100- py-5">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="authincation-content">
                                <div className="row no-gutters">
                                    <div className="col-xl-12">
                                        <div className="auth-form">
                                            <div className="text-center mb-3">
                                                 <Link to="/">  <img className='logo-img w-40' src={Images.logo} alt="" /></Link> 
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
                                                        <span>Verify your bvn</span>
                                                    </div>
                                                    {profileProgress.bvn_update == '1' ? <i className='fas fa-check-circle text-green' /> : <i className='fas fa-angle-right' />}
                                                </div>
                                            </div>
                                            <div className='setup-items mb-2' data-bs-toggle="modal" data-bs-target="#SecurityQuestions">
                                                <div className="media style-1">
                                                    <i className='fa fa-key fs-20 me-3' />
                                                    <div className="media-body">
                                                        <h6>Security Questions</h6>
                                                        <span>Setup security questions</span>
                                                    </div>
                                                    {profileProgress.pin_setup == '1' ? <i className='fas fa-check-circle text-green' /> : <i className='fas fa-angle-right' />}
                                                </div>
                                            </div>
                                            <a id="OpnePin" data-bs-toggle="modal"class="d-none" data-bs-target="#SetPin">open</a>


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
                            <button type="button" id="closePin" className="btn-close" data-bs-dismiss="modal"></button>
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
                                    <button type="button" onClick={(e) => { Myfunctions.SetPin(e, navigate,  setLoading, setProfileProgress) }}  disabled={loading} className="btn btn-primary btn-block">{loading && <span className='spinner-border'></span>}{loading ? 'Processing...' : 'Submit'}</button>
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
                            <button type="button" id="closeBVN" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <h3 className="text-center mb-2 text-secondary">Verify your BVN</h3>
                            <form action='#' onSubmit={(e) => { Myfunctions.BVN(e, setLoading, setProfileProgress) }}>
                                <div className="form-group mb-4 mt-3">
                                    <label className="mb-1"><strong>Enter BVN </strong></label>
                                    <input type="text" name='bvn' className="form-control" placeholder='Enter your BVN' />
                                </div>
                                <div className="text-center">
                                    <button type="submit" disabled={loading} className="btn btn-primary btn-block">{loading && <span className='spinner-border'></span>}{loading ? 'Processing...' : 'Submit'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="SecurityQuestions">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" id="closeSecurityQuestions" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body py-0">
                            <h3 className="text-center text-secondary">Set Security Question</h3>
                            <p className='mb-4 text-red text-center'>Kindly answer atleast 2 questions</p>
                            <form action='#' onSubmit={handleSecurity}>
                                <div className='mb-3 col-md-12'>
                                    <div className="form-group mb-4">
                                        <label className="mb-2"><strong>Question 1</strong></label>
                                        <Select 
                                            className="w-100 form-control bg-white- p-0"
                                            placeholder="Select a security question"
                                            onChange={(value, option) => handleQuestionChange(0, value, option)}
                                            dropdownStyle={{ zIndex: 2000 }}
                                            showSearch
                                            >
                                            {securityQuestions?.questions?.data && Array.isArray(securityQuestions.questions.data) ?
                                                securityQuestions.questions.data.map((e, i) =>
                                                    <Option key={i} value={e.question_id} data-question={e.question}>{e.question}</Option>
                                                )
                                                : <Option>Loading ...</Option>
                                            }
                                        </Select>
                                        <input type="text" style={{height:'50px'}} name='answer_1' placeholder='Kindly provide an answer' className='form-control mt-3' onChange={(e) => handleAnswerChange(0, e.target.value)} />

                                    </div>
                                    <div className="form-group mb-4">
                                        <label className="mb-2"><strong>Question 2</strong></label>
                                        <Select
                                            showSearch
                                            className="w-100 form-control bg-white- p-0"
                                            placeholder="Select a security question"
                                            onChange={(value, option) => handleQuestionChange(1, value, option)}
                                            dropdownStyle={{ zIndex: 2000 }}
                                            >
                                            {securityQuestions?.questions?.data && Array.isArray(securityQuestions.questions.data) ?
                                                securityQuestions.questions.data.map((e, i) =>
                                                    <Option key={i} value={e.question_id} data-question={e.question}>{e.question}</Option>
                                                )
                                                : <Option>Loading ...</Option>
                                            }
                                        </Select>
                                        <input type="text" style={{height:'50px'}} name='answer_2' placeholder='Kindly provide an answer' className='form-control mt-3' onChange={(e) => handleAnswerChange(1, e.target.value)} />

                                    </div>
                                    <div className="form-group mb-4">
                                        <label className="mb-2"><strong>Question 3</strong></label>
                                        <Select
                                            dropdownStyle={{ zIndex: 2000 }}
                                            showSearch
                                            className="w-100 form-control bg-white- p-0"
                                            placeholder="Select a security question"
                                            onChange={(value, option) => handleQuestionChange(2, value, option)}
                                            >
                                            {securityQuestions?.questions?.data && Array.isArray(securityQuestions.questions.data) ?
                                                securityQuestions.questions.data.map((e, i) =>
                                                    <Option key={i} value={e.question_id} data-question={e.question}>{e.question}</Option>
                                                )
                                                : <Option>Loading ...</Option>
                                            }
                                        </Select>
                                        <input type="text" style={{height:'50px'}} name='answer_3' placeholder='Kindly provide an answer' className='form-control mt-3' onChange={(e) => handleAnswerChange(2, e.target.value)} />

                                    </div>
                                </div>
                                <div className="text-center mt-4 mb-5">
                                    <button type="submit" disabled={loading} className="btn btn-primary btn-block">{loading && <span className='spinner-border'></span>}{loading ? 'Processing...' : 'Submit'}</button>
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
