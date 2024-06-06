import React from 'react'
import Images from './Images'
import TopDashboard from '../Components/TopDashboard'
import SideDashboard from '../Components/SideDashboard'
import { Link, useNavigate } from 'react-router-dom';


function ApiKeys() {
  return (
    <>  
        <TopDashboard/>
        <SideDashboard/>
        <div className="content-body vh-80">
            <div className="container-fluid">                   
                <div class="row">
                    <div className='title'>
                        <h3 className='pages-head'>Applications</h3>
                        <p className='pages-p'>Monitor your applications on the go</p>
                    </div>
                    <div class="col-xl-12 col-xxl-12">
                        <div class="row">                   
                            <div class="col-sm-12">
                                <div class="card-bx stacked apikeys bg-black card">
                                    <div class="card-info">
                                        <div class="d-flex justify-content-between">
                                            <div className='mb-6-'>
                                                <h2 class="font-w600 mb-3 text-white">How it works</h2>
                                                <p class="text-white mb-6">Authenticate your API requests by including your tokens or keys to <br/>the Authorization header of each request you make. You can manage <br/> your API keys from this module</p>
                                                <div class="d-flex">
                                                    <Link class="btn btn-primary btn-sm float-end" to="#">Create A New Application </Link>
                                                </div>   
                                            </div>
                                            <img src={Images.api} className="mb-2" alt='wallet'/>
                                        </div>                                                                  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-12">
                        <div class="card overflow-hidden min-h-350">                           
                            <div class="card-body p-0">
                                <div class="table-responsive">
                                    <table class="table header-border table-hover verticle-middle">
                                        <thead>
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">MERCHANT REFERENCE</th>
                                                <th scope="col">CREATED BY</th>
                                                <th scope="col">POLICY</th>
                                                <th scope="col">DATE CREATED</th>
                                                <th scope="col">STATUS</th>
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
            </div>    
        </div>
    </>
  )
}

export default ApiKeys
