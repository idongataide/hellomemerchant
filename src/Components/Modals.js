import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Myfunctions from '../js/MyFuntions'



export const CreateApplication = () => {

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

 
    return (
 
       <>
          <div class="modal fade" id="CreateApplication" data-bs-keyboard="false" data-bs-backdrop="static" aria-modal="true" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Create A New Application</h5>                       
                    </div>
                    <form onSubmit={(e) => {Myfunctions.GenerateSecretKey(e, navigate, setLoading)}}>
                        <div className="modal-body ">
                            <div className="form-group mb-3">
                                <label className="mb-1"><strong>Name</strong></label>
                                <input type="text" name='key_name'  className="form-control" placeholder="Enter application name" />
                            </div>
                            <div className="form-group mb-3">
                                <label className="mb-1"><strong>Description</strong></label>
                                <textarea class="form-control" name="description" rows="10"></textarea>
                            </div>                     
                            </div>
                            <div class="modal-footer">
                                <button type="button"  id="cancel"  class="btn btn-link me-2" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" disabled={loading} className="btn btn-primary">{loading && <span className='spinner-border'></span>} {loading ? 'Processing...' : 'Create Application'}</button>
                            </div>
                    </form>    
                </div>
            </div>
        </div>

       </>
    )
}

export const SetWebhookURL = () => {

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

 
    return (
 
       <>
          <div class="modal fade" id="CreateWebHook" data-bs-keyboard="false" data-bs-backdrop="static" aria-modal="true" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Create A New Application</h5>                       
                    </div>
                    <form onSubmit={(e) => {Myfunctions.SetWebhookURL(e, setLoading)}}>
                        <div className="modal-body ">
                            <div className="form-group mb-3">
                                <label className="mb-1"><strong>Name</strong></label>
                                <input type="text" name='webhook_name'  className="form-control" placeholder="Enter application name" />
                            </div>
                            <div className="form-group mb-3">
                                <label className="mb-1"><strong>Webhook URL</strong></label>
                                <input type="text" name='webhook_url'  className="form-control" placeholder="Enter application name" />
                            </div>
                            <div className="form-group mb-3">
                                <label className="mb-1"><strong>Description</strong></label>
                                <textarea class="form-control" name="webhook_url_description" rows="10"></textarea>
                            </div>                     
                            </div>
                            <div class="modal-footer">
                                <button type="button"  id="closeWebhook"  class="d-none- btn btn-link me-2" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" disabled={loading} className="btn btn-primary">{loading && <span className='spinner-border'></span>} {loading ? 'Processing...' : 'Set Web Hook'}</button>
                            </div>
                    </form>    
                </div>
            </div>
        </div>

       </>
    )
}


export const WhitelistIP  = () => {

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

 
    return (
 
       <>
          <div class="modal fade" id="WhitelistIP" aria-modal="true" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Whitelist IP</h5>   
                        <button type="button" className="btn-close" id='CloseOldEmail' data-bs-dismiss="modal" aria-label="Close"></button>                    
                    </div>
                    <form onSubmit={(e) => {Myfunctions.WhitelistIP(e, setLoading)}}>
                        <div className="modal-body ">
                            <div className="form-group mb-3">
                                <label className="mb-1"><strong>Name</strong></label>
                                <input type="text" name='ip_address'  className="form-control mt-3" placeholder="Enter an IP Address" />
                            </div>                 
                            </div>
                            <div class="modal-footer">
                                <button type="button"  id="closeWhiteList"  class="btn btn-link me-2" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" disabled={loading} className="btn btn-primary">{loading && <span className='spinner-border'></span>} {loading ? 'Processing...' : 'Whitelist IP'}</button>
                            </div>
                    </form>    
                </div>
            </div>
        </div>

       </>
    )
}

export const RaiseDispute  = () => {

    const [loading, setLoading] = useState(false)
    const [format, setFormat] = useState('');


 
    return (
 
       <>
          <div class="modal fade" id="RaiseDispute" aria-modal="true" role="dialog">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Raise Dispute</h5>   
                            <button type="button" className="btn-close" id='closeWhiteList' data-bs-dismiss="modal" aria-label="Close"></button>                    
                        </div>
                        <form onSubmit={(e) => { Myfunctions.RaiseDispute(e, setLoading) }}>
                            <div className="modal-body pb-0 pt-2">
                                <div className="form-group mb-3">
                                    <label className="mb-1"><strong>Transaction ID</strong></label>
                                    <input type="text" name='transaction_id' className="form-control" placeholder="Enter Transaction ID" />
                                </div> 
                                <div class="form-group  mt-3">
                                    <label className='mb-1'><strong>Select Format</strong></label>
                                    <select className="form-control bg-white h-60 mt-3 mt-sm-0" name="format" value={format} onChange={(e) => setFormat(e.target.value)}>
                                        <option value="">Select format</option>
                                        <option value="Transfer">Transfer</option>
                                        <option value="Account Funding">Account Funding</option>
                                    </select>                                                      
                                </div>  
                                <div className="form-group mt-3">
                                    <label className='mb-1'><strong>Description</strong></label>
                                    <textarea className="form-control" name="dispute_desc" rows="10"></textarea>
                                </div>  
                            </div>
                            <div class="modal-footer">
                                <button type="button" id="closeDispute" class="btn btn-link me-2" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" disabled={loading} className="btn btn-primary">
                                    {loading && <span className='spinner-border'></span>} 
                                    {loading ? 'Processing...' : 'Raise Dispute'}
                                </button>
                            </div>
                        </form>    
                    </div>
                </div>
            </div>
       </>
    )
}

export const ProceedLogout = () => {

    const navigate = useNavigate();

    return (

     <>
        <div class="modal fade " id="LogOut" aria-modal="true" role="dialog">
          <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
              <div class="modal-content">
                  <div class="modal-header text-center">
                      <h5 class="modal-title">Logout</h5>   
                  </div>
                  <form>
                    <div className="modal-body text-center ">
                        <p>Are you sure you would like to exit the app</p>     
                    </div>
                    <div className="modal-footer">
                        <button type='button' data-bs-dismiss="modal"  className="btn btn-link me-2">Cancel</button>                 
                        <button data-bs-dismiss="modal" onClick={(e) => Myfunctions.logOut(e, navigate)} className="btn btn-primary">Log out</button> 
                    </div>
                  </form>    
              </div>
          </div>
      </div>

     </>
  )
}