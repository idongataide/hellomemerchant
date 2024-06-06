import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import TopDashboard from '../Components/TopDashboard'
import SideDashboard from '../Components/SideDashboard'


function Settings() {
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
                                        <Link class="nav-link ps-0 active" data-bs-toggle="tab" to="#Profile"> Profile</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" data-bs-toggle="tab" to="#Users"> Users</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" data-bs-toggle="tab" to="#Webhooks">Webhooks</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" data-bs-toggle="tab" to="#Whitelists">IP Whitelists</Link>
                                    </li>                                
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane fade show active" id="Profile">
                                        <div class="pt-2">
                                            <form className=''> 
                                                <h4 className='mt-5'>Wallet Information</h4>
                                                <div className='col-xl-8 col-lg-8 col-md-12'>                                                    
                                                    <div class="mt-3">
                                                        <label class="form-label">Primary Business Account</label>
                                                        <input type="text" class="form-control" placeholder='Enter business  name'/>
                                                    </div> 
                                                    <div class="mt-3">
                                                        <label class="form-label">E-mail</label>
                                                        <input type="text" class="form-control" placeholder='Enter e-mail address'/>
                                                    </div> 
                                                    <div class="mt-3">
                                                        <label class="form-label">Address</label>
                                                        <input type="text" class="form-control" placeholder='Enter business address'/>
                                                    </div> 
                                                    <div class="mt-3">
                                                        <label class="form-label">Business phone number</label>
                                                        <input type="text" class="form-control" placeholder='Enter phone number'/>
                                                    </div> 
                                                    <div class="mt-3">
                                                        <label class="form-label">E-mail</label>
                                                        <input type="email" class="form-control" placeholder='Enter e-mail address'/>
                                                    </div>                                                    
                                                </div>
                                                <h4 className='mt-5'>Business Details</h4>
                                                <div className='col-xl-8 col-lg-8 col-md-12'>                                                    
                                                    <div class="mt-3">
                                                        <label class="form-label">Business Name</label>
                                                        <input type="text" class="form-control" placeholder='Enter business name'/>
                                                    </div> 
                                                    <div class="mt-3">
                                                        <label class="form-label">Business Description</label>
                                                        <textarea class="form-control" rows="20"></textarea>
                                                    </div>
                                                    <div class="mt-3"> 
                                                        <label className='form-label'>Business Industry</label>
                                                        <select class="form-control bg-white h-60 mt-3 mt-sm-0">
                                                            <label>Business Industry</label>
                                                            <option> Select industry</option>
                                                            <option> Select industry</option>                                                       
                                                        </select>
                                                    </div> 
                                                    <div class="mt-3"> 
                                                        <label  className='form-label'>Business Type</label>
                                                        <select class="form-control bg-white h-60 mt-3 mt-sm-0">
                                                            <label>Business Type</label>
                                                            <option> Select business type</option>
                                                            <option> Select industry</option>                                                       
                                                        </select>
                                                    </div> 
                                                    <div class="mt-3">
                                                        <label class="form-label">Website</label>
                                                        <input type="text" class="form-control" placeholder='Enter website'/>
                                                    </div> 
                                                    <div class="mt-3">
                                                        <label class="form-label">Business Address</label>
                                                        <textarea class="form-control" rows="20"></textarea>
                                                    </div> 
                                                    <div className='row'>                                                        
                                                        <div className='col-md-6'>
                                                            <div class="mt-3">
                                                                <label class="form-label">Incorporation Number</label>
                                                                <input type="text" class="form-control" placeholder='Incorporation Number'/>
                                                            </div> 
                                                        </div>
                                                        <div className='col-md-6'>
                                                            <div class="mt-3">
                                                                <label class="form-label">Business Incorporation Date</label>
                                                                <input type="text" class="form-control" placeholder='Business Incorporation Date'/>
                                                            </div> 
                                                        </div>
                                                    </div>
                                                    <h4 className='mt-4'>User Details</h4>
                                                    <div className='row'> 
                                                        <div className='col-md-6'>
                                                            <div class="mt-3">
                                                                <label class="form-label">Full name</label>
                                                                <input type="text" class="form-control" placeholder='Full name'/>
                                                            </div> 
                                                        </div>
                                                        <div className='col-md-6'>
                                                            <div class="mt-3">
                                                                <label class="form-label">User e-mail</label>
                                                                <input type="text" class="form-control" placeholder='User e-mail'/>
                                                            </div> 
                                                        </div>
                                                        <div className='col-md-12'>
                                                            <div class="mt-3">
                                                                <label class="form-label">Current password</label>
                                                                <input type="text" class="form-control" placeholder='Enter business  name'/>
                                                            </div> 
                                                        </div>                                                        
                                                        <div class="d-flex justify-content-end">
                                                            <button class="btn btn-primary btn-xs mt-5" to="#">Update Details</button>
                                                        </div>
                                                    </div>    
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
                                    <div class="tab-pane fade" id="Webhooks" role="tabpanel">
                                        <div class="pt-4">
                                            <div class="row p-0 mb-4">                                               
                                                <div className='col-md-12 align-items-center d-flex justify-content-end'>
                                                        <button class="btn btn-primary btn-xs mt-2" to="#">Add New Webhook</button>
                                                </div>                       
                                            </div>
                                          <div class="card overflow-hidden min-h-350">                           
                                                <div class="card-body p-0">
                                                    <div class="table-responsive">
                                                        <table class="table header-border table-hover verticle-middle">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col"></th>
                                                                    <th scope="col">Name</th>
                                                                    <th scope="col">Webhook URL</th>
                                                                    <th scope="col">Description</th>
                                                                    <th scope="col">Authentication</th>                                                                  
                                                                    <th scope="col"></th>
                                                                </tr>
                                                            </thead>
                                                            {/* <tbody>
                                                                <tr>
                                                                    <th></th>
                                                                    <td>Hellome@hellomemoney.com</td>                                            
                                                                    <td>HelloMe Money</td>   
                                                                    <td>Client Super Admin</td>                                            
                                                                    <td>08166720294</td>      
                                                                    <td>08166720294</td>      
                                                                                                             
                                                                </tr>    
                                                            </tbody> */}
                                                        </table>
                                                        <div className='w-100'>
                                                                <h3 className='no-data mt-5'>No Data</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="Whitelists" role="tabpanel">
                                        <div class="pt-4">
                                            <div class="row p-0 mb-4">                                               
                                                <div className='col-md-12 align-items-center d-flex justify-content-end'>
                                                        <button class="btn btn-primary btn-xs mt-2" to="#">Add New IP</button>
                                                </div>                       
                                            </div>
                                          <div class="card overflow-hidden min-h-350">                           
                                                <div class="card-body p-0">
                                                    <div class="table-responsive">
                                                        <table class="table header-border table-hover verticle-middle">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col"></th>
                                                                    <th scope="col">Added By</th>
                                                                    <th scope="col">IP Address</th>
                                                                    <th scope="col">Date Created</th>
                                                                    <th scope="col"></th>
                                                                </tr>
                                                            </thead>
                                                            {/* <tbody>
                                                                <tr>
                                                                    <th></th>
                                                                    <td>Hellome@hellomemoney.com</td>                                            
                                                                    <td>HelloMe Money</td>   
                                                                    <td>Client Super Admin</td>                                            
                                                                    <td>08166720294</td>      
                                                                    <td>08166720294</td>      
                                                                                                             
                                                                </tr>    
                                                            </tbody> */}
                                                        </table>
                                                        <div className='w-100'>
                                                                <h3 className='no-data mt-5'>No Data</h3>
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
        </div>
    </>
  )
}

export default Settings
