import React from 'react'
import Images from './Images'
import TopDashboard from '../Components/TopDashboard'
import SideDashboard from '../Components/SideDashboard'
import { Link, useNavigate } from 'react-router-dom';
import { CreateApplication } from '../Components/Modals';
import Myfunctions from '../js/MyFuntions';
import useBoundStore from '../js/Store/useStore';
import { useEffect } from 'react';


function ApiKeys() {
   


    const GetKey = useBoundStore(state => state.user.GetKey);

    useEffect(() => {
        Myfunctions.FetchSecretKey()
    }, []);


    
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
                                                    <Link  data-bs-toggle="modal" data-bs-target="#CreateApplication" class="btn btn-primary btn-sm float-end" to="#">Create A New Application </Link>
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
                                                <th scope="col">APPLICATION NAME</th>
                                                <th scope="col">CREATED BY</th>
                                                <th scope="col">DESCRIPTION</th>
                                                <th scope="col">KEY</th>
                                                <th scope="col">STATUS</th>
                                                <th scope="col">ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <th></th>
                                            <th>{GetKey?.application_name}</th>
                                            <td>{GetKey?.created_by}</td>                                            
                                            <td>{GetKey?.description}</td>                                            
                                            <td>{GetKey?.secret_key ? GetKey.secret_key.slice(-20) + '...' : ''}</td>                                            
                                            <td>
                                                {GetKey?.key_status === '1' ? (
                                                    <span className="badge badge-sm bg-success">Active</span>
                                                ) : (
                                                    <span className="badge badge-sm bg-danger">Inactive</span>
                                                )}
                                            </td>                                            
                                            <th scope="col">
                                                <span className="badge bg-danger badge-sm">Delete</span>
                                            </th>
                                        </tr>
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
        <CreateApplication/>
    </>
  )
}

export default ApiKeys
