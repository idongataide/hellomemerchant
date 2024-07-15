import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopDashboard from '../Components/TopDashboard';
import SideDashboard from '../Components/SideDashboard';
import { SetWebhookURL, WhitelistIP } from '../Components/Modals';
import Myfunctions from '../js/MyFuntions';
import useBoundStore from '../js/Store/useStore';

function Settings() {
    const FetchWebHook = useBoundStore(state => state.user.FetchWebHook);
    const FetchIP = useBoundStore(state => state.user.FetchIP);
    const FetchProfile = useBoundStore(state => state.user.FetchProfile);
    const FetchBusiness = useBoundStore(state => state.user.FetchBusiness);


    const [loading, setLoading] = useState(false);

    useEffect(() => {
        Myfunctions.FetchWebHook();
        Myfunctions.FetchIP();
        Myfunctions.FetchProfile()     
        Myfunctions.FetchBusinessProfile()      
    }, []);

    return (
    <>
        <TopDashboard/>
        <SideDashboard/>
        <div className="content-body vh-80">
            <div className="container-fluid">                   
                <div class="row">
                    <div className='title'>
                        <h3 className='pages-head'>Settings</h3>
                        <p className='pages-p'>Update your settings</p>
                    </div>
                    <div className='settings'>
                            <div class="custom-tab-1">
                                <ul class="nav nav-tabs">                                   
                                    <li class="nav-item">
                                        <Link class="nav-link active" data-bs-toggle="tab" to="#Webhooks">Webhooks</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" data-bs-toggle="tab" to="#Whitelists">IP Whitelists</Link>
                                    </li>    
                                    <li class="nav-item">
                                        <Link class="nav-link" data-bs-toggle="tab" to="#Profile"> Profile</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" data-bs-toggle="tab" to="#Users"> Users</Link>
                                    </li>                            
                                </ul>
                                <div class="tab-content">                                  
                                    <div class="tab-pane  show active fade" id="Webhooks" role="tabpanel">
                                        <div class="pt-4">
                                            <div class="row p-0 mb-4">                                               
                                                <div className='col-md-12 align-items-center d-flex justify-content-end'>
                                                        {/* <button class="btn btn-primary btn-xs mt-2"  to="#">Add New Webhook</button> */}
                                                </div>                       
                                            </div>
                                            {/* data-bs-toggle="modal" data-bs-target="#CreateWebHook" */}
                                          <div class="card overflow-hidden min-h-350">                           
                                                <div class="card-body p-0">
                                                    <div class="table-responsive">
                                                        <table class="table header-border table-hover verticle-middle">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col"></th>
                                                                    <th scope="col">S/n</th>
                                                                    <th scope="col">Name</th>
                                                                    <th scope="col">Webhook URL</th>
                                                                    <th scope="col">Description</th>                                                                  
                                                                    <th scope="col">Action</th>
                                                                </tr>
                                                            </thead>
                                                            {FetchWebHook && FetchWebHook instanceof Array ? FetchWebHook.map((e, i) => (
                                                                <tr key={i}>
                                                                    <td></td>
                                                                    <td>{i + 1}</td>
                                                                    <td>{e?.name}</td>
                                                                    <td>{e?.webhook_url}</td>
                                                                    <td>{e?.description}</td>
                                                                    <td>{e?.authentication == 1 ? <span className="badge badge-sm bg-success">Active</span> : <span className="badge bg-danger badge-sm">Inactive</span>}</td>
                                                                </tr> 
                                                            )) : 'Loading ...'
                                                            }
                                                        </table>
                                                       
                                                    </div>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="Whitelists" role="tabpanel">
                                        <div class="pt-4">
                                            <div class="row p-0 mb-4">                                               
                                                <div className='col-md-12 align-items-center d-flex justify-content-end'>
                                                        <button data-bs-toggle="modal" data-bs-target="#WhitelistIP"  class="btn btn-primary btn-xs mt-2" to="#">Add New IP</button>
                                                </div>                       
                                            </div>
                                          <div class="card overflow-hidden min-h-350">                           
                                                <div class="card-body p-0">
                                                    <div class="table-responsive">
                                                         <table class="table header-border table-hover verticle-middle">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col"></th>
                                                                    <th scope="col">S/n</th>
                                                                    <th scope="col">Added By</th>
                                                                    <th scope="col">IP Address</th>
                                                                    <th scope="col">Date Created</th>
                                                                    <th scope="col">Action</th>
                                                                </tr>
                                                            </thead>
                                                            {FetchIP && FetchIP instanceof Array ? FetchIP.map((e, i) => (
                                                                <tr key={i}>
                                                                    <td></td>
                                                                    <td>{i + 1}</td>
                                                                    <td>{e?.added_by}</td>
                                                                    <td>{e?.ip_address}</td>
                                                                    <td>{e?.entry_date}</td>
                                                                    <td><span data-bs-toggle="modal" onClick={(j) => Myfunctions.getId(e?.ip_address)} data-bs-target="#DeleteIp" id={`getId + ${e?.ip_address}`} className="badge bg-danger badge-sm badge-danger"> Delete</span></td>
                                                                </tr> 
                                                            )) : 'Loading ...'
                                                            }
                                                        </table>

                                                    </div>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="Profile">
                                        <div className="pt-2">
                                            <form className=''>
                                                <h4 className='mt-5'>Profile Information</h4>
                                                <div className='col-xl-8 col-lg-8 col-md-12'>
                                                    <div className="mt-3">
                                                        <label className="form-label">First Name</label>
                                                        <input type="text" className="form-control" placeholder='Enter first name' defaultValue={FetchProfile?.first_name}  />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="form-label">Last Name</label>
                                                        <input type="text" className="form-control" placeholder='Enter last name' defaultValue={FetchProfile?.last_name}  />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="form-label">E-mail</label>
                                                        <input type="email" className="form-control" placeholder='Enter e-mail address' defaultValue={FetchProfile?.email}  />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="form-label">Phone number</label>
                                                        <input type="text" className="form-control" placeholder='Enter phone number' defaultValue={FetchProfile?.phone}  />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="form-label">Address</label>
                                                        <input type="text" className="form-control" placeholder='Enter address' defaultValue={FetchProfile?.address}  />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="form-label">Date of Birth</label>
                                                        <input type="date" className="form-control" defaultValue={FetchProfile?.dob}  />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="form-label">Gender</label>
                                                        <select className="form-control" defaultValue={FetchProfile?.gender}>
                                                            <option value="">Select gender</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                            <option value="other">Other</option>
                                                        </select>
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="form-label">Country</label>
                                                        <input type="text" className="form-control" placeholder='Enter country' defaultValue={FetchProfile?.country}  />
                                                    </div>
                                                </div>

                                                <h4 className='mt-5'>Business Information</h4>
                                                <div className='col-xl-8 col-lg-8 col-md-12'>
                                                    <div className="mt-3">
                                                        <label className="form-label">Business Name</label>
                                                        <input type="text" className="form-control" placeholder='Enter business name' defaultValue={FetchBusiness?.business_name} />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="form-label">Business Description</label>
                                                        <textarea className="form-control" placeholder='Enter business description' defaultValue={FetchBusiness?.business_description}></textarea>
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="form-label">Business Email</label>
                                                        <input type="email" className="form-control" placeholder='Enter business email' defaultValue={FetchBusiness?.business_email}  />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="form-label">Business Industry</label>
                                                        <input type="text" className="form-control" placeholder='Enter business industry' defaultValue={FetchBusiness?.business_industry} />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="form-label">Business Type</label>
                                                        <input type="text" className="form-control" placeholder='Enter business type' defaultValue={FetchBusiness?.business_type}/>
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="form-label">Website</label>
                                                        <input type="url" className="form-control" placeholder='Enter website URL' defaultValue={FetchBusiness?.website} />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="form-label">RC Number</label>
                                                        <input type="text" className="form-control" placeholder='Enter RC number' defaultValue={FetchBusiness?.rc_number} />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="form-label">Incorporation Date</label>
                                                        <input type="date" className="form-control" defaultValue={FetchBusiness?.incorporation_date} />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="form-label">Country</label>
                                                        <input type="text" className="form-control" placeholder='Enter country' defaultValue={FetchBusiness?.country} />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="form-label">Phone Code</label>
                                                        <input type="text" className="form-control" placeholder='Enter phone code' defaultValue={FetchBusiness?.phone_code} />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="form-label">Phone</label>
                                                        <input type="text" className="form-control" placeholder='Enter phone number' defaultValue={FetchBusiness?.phone} />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="form-label">Address</label>
                                                        <input type="text" className="form-control" placeholder='Enter address' defaultValue={FetchBusiness?.address} />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="form-label">City</label>
                                                        <input type="text" className="form-control" placeholder='Enter city' defaultValue={FetchBusiness?.city} />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="form-label">State</label>
                                                        <input type="text" className="form-control" placeholder='Enter state' defaultValue={FetchBusiness?.state} />
                                                    </div>
                                                </div>

                                                <div className='col-xl-8 col-lg-8 col-md-12 mt-4'>
                                                    <button className="btn btn-primary btn-sm" type="submit">Save Changes</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="Users" role="tabpanel">
                                        <div class="pt-4">
                                            <div class="row p-0 mb-4">
                                                <div className='col-md-5'>
                                                    <div class="input-group search-area right d-lg-inline-flex">
                                                        <input type="text" class="form-control h-60" placeholder="Search"/>
                                                        <div class="input-group-append">
                                                            <span class="input-group-text h-60">
                                                                <Link to="#">
                                                                    <i class="flaticon-381-search-2"></i>
                                                                </Link>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className='col-md-7 align-items-center d-flex justify-content-end'>
                                                        <button class="btn btn-primary btn-xs mt-2" to="#">Create New User</button>
                                                </div>                       
                                            </div>
                                          <div class="card overflow-hidden min-h-350">                           
                                                <div class="card-body p-0">
                                                    <div class="table-responsive">
                                                        <table class="table header-border table-hover verticle-middle">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col"></th>
                                                                    <th scope="col">Email Address</th>
                                                                    <th scope="col">Full Name</th>
                                                                    <th scope="col">Roles</th>
                                                                    <th scope="col">Phone Number</th>
                                                                    <th scope="col">Status</th>
                                                                    <th scope="col">Status</th>
                                                                    <th scope="col"></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <th></th>
                                                                    <td>Hellome@hellomemoney.com</td>                                            
                                                                    <td>HelloMe Money</td>   
                                                                    <td>Client Super Admin</td>                                            
                                                                    <td>08166720294</td>      
                                                                    <td><span class="badge badge-success">Active</span></td>                                            
                                                                    <td>Jan, 15th 2024</td>                                            
                                                                    <td>
                                                                        <div class="dropdown">
                                                                            <button type="button" class="btn btn-success light sharp" data-bs-toggle="dropdown">
                                                                                <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg>
                                                                            </button>
                                                                            <div class="dropdown-menu">
                                                                                <Link class="dropdown-item" to="#">Add Role</Link>
                                                                                <Link class="dropdown-item" to="#">Block User</Link>
                                                                            </div>
                                                                        </div>
                                                                    </td>                                            
                                                                </tr>                                                                                                                               
                                                                <tr>
                                                                    <th></th>
                                                                    <td>Hellome@hellomemoney.com</td>                                            
                                                                    <td>HelloMe Money</td>   
                                                                    <td>Client Super Admin</td>                                            
                                                                    <td>08166720294</td>      
                                                                    <td><span class="badge badge-success">Active</span></td>                                            
                                                                    <td>Jan, 15th 2024</td>                                            
                                                                    <td>
                                                                        <div class="dropdown">
                                                                            <button type="button" class="btn btn-success light sharp" data-bs-toggle="dropdown">
                                                                                <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="24" height="24"/><circle fill="#000000" cx="5" cy="12" r="2"/><circle fill="#000000" cx="12" cy="12" r="2"/><circle fill="#000000" cx="19" cy="12" r="2"/></g></svg>
                                                                            </button>
                                                                            <div class="dropdown-menu">
                                                                                <Link class="dropdown-item" to="#">Add Role</Link>
                                                                                <Link class="dropdown-item" to="#">Block User</Link>
                                                                            </div>
                                                                        </div>
                                                                    </td>                                            
                                                                </tr>                                                                                                                               
                                                            </tbody>
                                                        </table>
                                                        {/* <div className='w-100'>
                                                                <h3 className='no-data mt-5'>No Data</h3>
                                                        </div> */}
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
        </div>

        <div class="modal fade " id="DeleteIp" aria-modal="true" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header m-auto">
                        <h4 className='mt-2 text-center'>Delete IP Address <br/><span id="IP_Id"></span></h4>   
                    </div>
                    <form onSubmit={(e) => {Myfunctions.DeleteIP(e, setLoading)}}>
                        <div className="modal-body text-center">
                            <input type='hidden' name="ip_address" id="IP_Id" className='IP_Id' />
                            <p>Are you sure you would like to Delete</p>     
                        </div>
                        <div className="modal-footer">
                            <button type='button' data-bs-dismiss="modal"  className="btn closeIP btn-xs btn-link me-2">Cancel</button>                 
                            <button  className="btn btn-xs btn-primary" disabled={loading}>{loading && <span className='spinner-border'></span>}{loading ? 'Processing...' : 'Delete'}</button> 
                        </div>
                    </form>    
                </div>
            </div>
        </div>

        <WhitelistIP/>
        <SetWebhookURL/>
        
    </>
  )
}

export default Settings
