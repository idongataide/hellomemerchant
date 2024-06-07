import React, { useState } from 'react'
import TopDashboard from '../Components/TopDashboard'
import SideDashboard from '../Components/SideDashboard'
import { Link } from 'react-router-dom';


function Report() {

    const [accountType, setAccountType] = useState('personal');
      
    const handleAccountTypeChange = (event) => {
      setAccountType(event.target.value);
    };
  
  return (
    <>
        <TopDashboard/>
        <SideDashboard/>
        <div className="content-body vh-80">
            <div className="container-fluid">                   
                <div class="row">
                    <div className='d-flex justify-content-between'>
                        <div className=''>
                            <div className='title'>
                                <h3 className='pages-head'>Reports</h3>
                                <p className='pages-p'>Overview of all your reports</p>
                            </div>
                        </div>
                        <div class="mt-2">
                            <select class="form-control h-43">
                                <option selected>Filter by</option>
                                <option>Jakarta, IDN</option>
                                <option>Surabaya, IDN</option>
                            </select>
                        </div>
                    </div>  
                    <div className=''>
                            <div class="custom-tab-1">
                                <ul class="nav nav-tabs">
                                    <li class="nav-item">
                                        <Link class="nav-link ps-0 active" data-bs-toggle="tab" href="#Transactions"> Transactions</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" data-bs-toggle="tab" href="#Wallet"> Wallet</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" data-bs-toggle="tab" href="#Session">Session calls</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" data-bs-toggle="tab" href="#Activity">Accounts Activity</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" data-bs-toggle="tab" href="#Webhooks">Webhooks</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" data-bs-toggle="tab" href="#Dispute">Dispute</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" data-bs-toggle="tab" href="#Exports">Exports</Link>
                                    </li>
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane fade show active" id="Transactions" role="tabpanel">
                                        <div class="pt-4">
                                          <div class="card overflow-hidden min-h-350">                           
                                                <div class="card-body p-0">
                                                    <div class="table-responsive">
                                                        <table class="table header-border table-hover verticle-middle">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col"></th>
                                                                    <th scope="col">Product</th>
                                                                    <th scope="col">End Point</th>
                                                                    <th scope="col">Status</th>
                                                                    <th scope="col">IP Address</th>
                                                                    <th scope="col">Date</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {/* <tr>
                                                                    <th></th>
                                                                    <td>MCH-05345453489234</td>                                            
                                                                    <td>Admin</td>   
                                                                    <td>12th May, 2024</td>                                            
                                                                    <td>Open Source</td>      
                                                                    <td>Active</td>                                            
                                                                </tr>
                                                                */}                                                                
                                                            </tbody>
                                                        </table>
                                                        <div className='w-100'>
                                                                <h3 className='no-data mt-5'>No Data</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>
                                    <div className="tab-pane fade wallet" id="Wallet">
                                        <div className="pt-4">
                                            <div className="row p-0 mb-4">
                                            <div className='col-md-6'>
                                                <div className="input-group search-area right d-lg-inline-flex">
                                                <input type="text" className="form-control h-60" placeholder="Search by Account No. Phone,"/>
                                                <div className="input-group-append">
                                                    <span className="input-group-text h-60">
                                                    <Link href="#">
                                                        <i className="flaticon-381-search-2"></i>
                                                    </Link>
                                                    </span>
                                                </div>
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className="basic-form justify-content-end d-flex">
                                                <form>
                                                    <div className="mb-3">
                                                    <div className="form-check form-check-inline">
                                                        <label className="form-check-label">
                                                             <input type="radio" name="account-type" className="form-check-input" value="personal"
                                                              checked={accountType === 'personal'} onChange={handleAccountTypeChange}/>
                                                              Personal
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <label className="form-check-label">
                                                        <input type="radio" name="account-type" className="form-check-input" value="business"
                                                            checked={accountType === 'business'} onChange={handleAccountTypeChange} />
                                                            Business
                                                        </label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <label className="form-check-label">
                                                        <input 
                                                            type="radio"  name="account-type"  className="form-check-input" value="virtual" 
                                                            checked={accountType === 'virtual'} onChange={handleAccountTypeChange} />
                                                            Virtual Account
                                                        </label>
                                                    </div>
                                                    </div>
                                                </form>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="card overflow-hidden min-h-350">
                                            <div className="card-body p-0">
                                                <div className="table-responsive">
                                                <table className={`table header-border table-hover verticle-middle ${accountType === 'personal' ? 'active' : ''}`}>
                                                    <thead>
                                                    <tr>
                                                        <th scope="col"></th>
                                                        <th scope="col">Client ID</th>
                                                        <th scope="col">Account No</th>
                                                        <th scope="col">Names</th>
                                                        <th scope="col">Phone</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Status</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <th></th>
                                                        <td colSpan="6">No Data</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table className={`table header-border table-hover verticle-middle ${accountType === 'business' ? 'active' : ''}`}>
                                                    <thead>
                                                    <tr>
                                                        <th scope="col"></th>
                                                        <th scope="col">BVN</th>
                                                        <th scope="col">Account No</th>
                                                        <th scope="col">Company Name</th>
                                                        <th scope="col">RC Number</th>
                                                        <th scope="col">Date</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <th></th>
                                                        <td colSpan="6">No Data</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <table className={`table header-border table-hover verticle-middle ${accountType === 'virtual' ? 'active' : ''}`}>
                                                    <thead>
                                                    <tr>
                                                        <th scope="col"></th>
                                                        <th scope="col">Account No.</th>
                                                        <th scope="col">Merchant Name</th>
                                                        <th scope="col">Merchant ID</th>
                                                        <th scope="col">Reference</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Status</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <th></th>
                                                        <td colSpan="6">No Data</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    <div class="tab-pane fade" id="Session">
                                        <div class="pt-4">
                                            <div class="card overflow-hidden min-h-350">                           
                                                <div class="card-body p-0">
                                                    <div class="table-responsive">
                                                        <table class="table header-border table-hover verticle-middle">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col"></th>
                                                                    <th scope="col">Product</th>
                                                                    <th scope="col">End Point</th>
                                                                    <th scope="col">Status</th>
                                                                    <th scope="col">IP Address</th>
                                                                    <th scope="col">Date</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {/* <tr>
                                                                    <th></th>
                                                                    <td>MCH-05345453489234</td>                                            
                                                                    <td>Admin</td>   
                                                                    <td>12th May, 2024</td>                                            
                                                                    <td>Open Source</td>      
                                                                    <td>Active</td>                                            
                                                                </tr>
                                                                */}                                                                
                                                            </tbody>
                                                        </table>
                                                        <div className='w-100'>
                                                                <h3 className='no-data mt-5'>No Data</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="Activity">
                                        <div class="pt-4">
                                            <div class="card overflow-hidden min-h-350">                           
                                                <div class="card-body p-0">
                                                    <div class="table-responsive">
                                                        <table class="table header-border table-hover verticle-middle">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col"></th>
                                                                    <th scope="col">Account No.</th>
                                                                    <th scope="col">Type</th>
                                                                    <th scope="col">Transacation ID</th>
                                                                    <th scope="col">Amount</th>
                                                                    <th scope="col">Date</th>
                                                                    <th scope="col">Remark</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {/* <tr>
                                                                    <th></th>
                                                                    <td>MCH-05345453489234</td>                                            
                                                                    <td>Admin</td>   
                                                                    <td>12th May, 2024</td>                                            
                                                                    <td>Open Source</td>      
                                                                    <td>Active</td>                                            
                                                                    <td>Active</td>                                            
                                                                </tr>
                                                                */}                                                                
                                                            </tbody>
                                                        </table>
                                                        <div className='w-100'>
                                                                <h3 className='no-data mt-5'>No Data</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                              </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="Webhooks">
                                        <div class="pt-4">
                                            <div class="row p-0 mb-5">
                                                <div className='col-md-6 mt-2'>
                                                    <div class="input-group search-area right d-lg-inline-flex mt-4">
                                                        <input type="text" class="form-control h-60" placeholder="Search"/>
                                                        <div class="input-group-append">
                                                            <span class="input-group-text h-60">
                                                                <Link href="#">
                                                                    <i class="flaticon-381-search-2"></i>
                                                                </Link>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-md-5'>
                                                    <label class="form-label">Filter By</label>
                                                    <select class="form-control bg-white h-60 mt-3 mt-sm-0">
                                                        <label>Filter </label>
                                                        <option> All</option>
                                                        <option> Weekly (2021)</option>
                                                        <option> Daily (2021)</option>
                                                    </select>
                                                </div>   
                                                <div className='col-md-1 mt-3'>
                                                    <div class="d-flex justify-content-end">
                                                        <button class="btn btn-primary btn-xs mt-4" href="#">Clear</button>
                                                    </div> 
                                                </div>                       
                                            </div>                       
                                             <div class="card overflow-hidden min-h-350">    
                                                <div class="card-body p-0">
                                                    <div class="table-responsive">
                                                        <table class="table header-border table-hover verticle-middle">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col"></th>
                                                                    <th scope="col">Session ID </th>
                                                                    <th scope="col">Transaction ID</th>
                                                                    <th scope="col">Amount</th>
                                                                    <th scope="col">To Account</th>
                                                                    <th scope="col">Status</th>
                                                                    <th scope="col">Date Created</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {/* <tr>
                                                                    <th></th>
                                                                    <td>MCH-05345453489234</td>                                            
                                                                    <td>Admin</td>   
                                                                    <td>12th May, 2024</td>                                            
                                                                    <td>Open Source</td>      
                                                                    <td>Active</td>                                            
                                                                    <td>Active</td>                                            
                                                                </tr>
                                                                */}                                                                
                                                            </tbody>
                                                        </table>
                                                        <div className='w-100'>
                                                                <h3 className='no-data mt-5'>No Data</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                             </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="Dispute">
                                        <div class="pt-4">
                                            <div class="row p-0 mb-4">
                                                    <div className='col-md-6'>
                                                        <div class="input-group search-area right d-lg-inline-flex">
                                                            <input type="text" class="form-control h-60" placeholder="Search by Account No. Phone,"/>
                                                            <div class="input-group-append">
                                                                <span class="input-group-text h-60">
                                                                    <Link href="#">
                                                                        <i class="flaticon-381-search-2"></i>
                                                                    </Link>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>                                                     
                                                    <div className='col-md-6'>
                                                        <div class="basic-form justify-content-end d-flex">
                                                                <form>
                                                                    <div class="mb-3">                                                                      
                                                                        <div class="form-check form-check-inline">
                                                                            <label class="form-check-label">
                                                                                <input type="checkbox" class="form-check-input" value=""/>Pending Disputes
                                                                            </label>
                                                                        </div>
                                                                        <div class="form-check form-check-inline disabled">
                                                                            <label class="form-check-label">
                                                                                <input type="checkbox" class="form-check-input" value="" disabled=""/>Closed Disputes
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div> 
                                                    </div>                       
                                                </div>                       
                                                <div class="card overflow-hidden min-h-350">    
                                                    <div class="card-body p-0">
                                                        <div class="table-responsive">
                                                            <table class="table header-border table-hover verticle-middle">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col"></th>
                                                                        <th scope="col">Session ID </th>
                                                                        <th scope="col">Transaction ID</th>
                                                                        <th scope="col">Amount</th>
                                                                        <th scope="col">To Account</th>
                                                                        <th scope="col">Status</th>
                                                                        <th scope="col">Date Created</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {/* <tr>
                                                                        <th></th>
                                                                        <td>MCH-05345453489234</td>                                            
                                                                        <td>Admin</td>   
                                                                        <td>12th May, 2024</td>                                            
                                                                        <td>Open Source</td>      
                                                                        <td>Active</td>                                            
                                                                        <td>Active</td>                                            
                                                                    </tr>
                                                                    */}                                                                
                                                                </tbody>
                                                            </table>
                                                            <div className='w-100'>
                                                                    <h3 className='no-data mt-5'>No Data</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="Exports">
                                        <div class="pt-4">
                                           <form className=''> 
                                                <div className='col-xl-4 col-lg-5 col-md-12'>
                                                    <select class="form-control bg-white h-60 mt-3 mt-sm-0">
                                                        <label>Select Report Type </label>
                                                        <option> All</option>
                                                        <option> Weekly (2021)</option>
                                                        <option> Daily (2021)</option>
                                                    </select>
                                                    <div class="mt-3">
                                                        <label class="form-label">Start Date</label>
                                                        <input type="date" class="form-control"/>
                                                    </div> 
                                                    <div class="mt-3">
                                                        <label class="form-label">End Date</label>
                                                        <input type="date" class="form-control"/>
                                                    </div> 
                                                    <div class="d-flex justify-content-end">
                                                        <button class="btn btn-primary btn-xs mt-3" href="#">Generate</button>
                                                    </div>
                                                </div>
                                            </form>
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

export default Report
