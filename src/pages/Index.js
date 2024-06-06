import React from 'react'
import SideDashboard from '../Components/SideDashboard'
import TopDashboard from '../Components/TopDashboard'
import Images from './Images'
import { Link, useNavigate } from 'react-router-dom';



function Index() {
  return (
    <>
    <TopDashboard/>
    <SideDashboard/>
    <div className="content-body vh-80">
        <div className="container-fluid">                   
            <div class="row">
                <div className='title'>
                    <h3 className='extra'>Overview of your account activities</h3>
                </div>
               <div class="col-xl-6 col-xxl-12">
                 <div class="row">
                    <div class="col-sm-6">
                        <div class="card-bx stacked card">
                            <div class="card-info">
                                <div class="d-flex pt-2 justify-content-between">
                                    <div className=''>
                                         <p class="mb-1 text-dark fs-12 mb-2">Your Billing Account</p>
                                        <h2 class="num-text text-dark mb-6 font-w600"><img src={Images.wallet} className="me-2 wallet-icon" alt='wallet'/>51,900,000.00</h2>    
                                    </div>
                                    <div class="mb-2">
                                        <select class="form-control h-43">
                                            <option selected>Account</option>
                                            <option></option>
                                        </select>
                                    </div>                               
                                </div>
                                <div class="d-flex">
                                       <Link class="btn btn-primary btn-sm float-end mt-5" to="#">View All Accounts</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="card-bx stacked card">
                            <div class="card-info">
                                <div class="d-flex justify-content-between">
                                    <div className='mb-6'>
                                        <h2 class="num-text text-dark font-w600 mb-3">My Registered Wallet</h2>
                                        <p class="mb-1 text-dark fs-12">Manage your wallet profile and <br/> activities ease</p>
                                    </div>
                                    <img src={Images.lady} className="mb-2" alt='wallet'/>
                                </div>
                                <div class="d-flex justify-content-between flex-wrap align-items-center">
                                       <Link class="btn btn-primary btn-sm float-end" to="#">Change Wallet</Link>
                                       <Link class="btn btn-primary btn-sm float-end" to="#">Add New Wallet</Link>
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

export default Index
