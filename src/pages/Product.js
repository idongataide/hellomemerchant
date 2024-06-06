import React from 'react'
import Images from './Images'
import TopDashboard from '../Components/TopDashboard'
import SideDashboard from '../Components/SideDashboard'


function Product() {
  return (
    <>  
    <TopDashboard/>
    <SideDashboard/>
    <div className="content-body vh-80">
        <div className="container-fluid">                   
            <div class="row">
                <div className='title'>
                    <h3 className='pages-head'>Products & APIs</h3>
                    <p className='pages-p'>Browse our products and APIs</p>
                </div>
               <div class="col-xl-12 col-xxl-12">
                 <div class="row">                   
                    <div class="col-sm-12">
                        <div class="card-bx stacked product card">
                            <div class="card-info">
                                <div class="d-flex justify-content-between">
                                    <div className='mb-6'>
                                        <h2 class="font-w600 mb-3">Welcome to our Product and API Module</h2>
                                        <p class="mb-1 ">Get familiar with our products, features, <br/>APIs and integration</p>
                                    </div>
                                    <img src={Images.programming} className="mb-2" alt='wallet'/>
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

export default Product
