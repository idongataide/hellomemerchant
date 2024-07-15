import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Images from '../pages/Images'
import Myfunctions from '../js/MyFuntions'
import useBoundStore from '../js/Store/useStore';
import useInactivityTimeout from '../js/useInactivityTimeout';
import { CreateApplication, ProceedLogout, SetWebhookURL } from './Modals';



function TopDashboard() {

    const RefreshToken = useBoundStore(state => state.user.RefreshToken);
    const userProfile = useBoundStore(state => state.user.userProfile);
    const setProfileProgress = useBoundStore(state => state.user.setProfileProgress);


    const navigate = useNavigate();

    useEffect(() => {

        Myfunctions.addEventListenersToTelInputs()
        Myfunctions.RefreshToken()  
        let secret_key = localStorage.getItem('secret_key')
        let webhook_status = localStorage.getItem('webhook_status')
        if (secret_key != 1) {
            navigate('/api')
            document.querySelector('#CreateAPI').click();
        } else if(webhook_status != 1) {
            navigate('/settings/Webhook')
            document.querySelector('#CreateHook').click();
        }
    }, []);


    useInactivityTimeout()
    return (
        <div>
        <Link to="#" id="CreateAPI" role="button" data-bs-toggle="modal" data-bs-target="#CreateApplication" style={{ display: 'none' }}>type</Link>
        <Link to="#" id="CreateHook" role="button" data-bs-toggle="modal" data-bs-target="#CreateWebHook" style={{ display: 'none' }}>type</Link>
      
        <div id="main-wrapper-">
            <div class="nav-header">
                <Link to="/index" className="brand-logo">
                <img src={Images.logo} alt="Logo" />
                </Link>
            </div>
                    
            <div class="header">
                <div class="header-content">
                    <nav class="navbar navbar-expand">
                        <div class="collapse navbar-collapse justify-content-between">
                            <div class="header-left">
                                <div class="sub-header">
                                    <div class="me-auto">
                                        <p>Welcome Back</p>
                                        <h5 class="dashboard_bar">{RefreshToken?.first_name} {RefreshToken?.last_name}</h5>
                                    </div>
                                </div>
                            </div>
                            <ul class="navbar-nav header-right main-notification">
                                
                                <li class="nav-item dropdown header-profile">
                                    <Link class="nav-link" href="#" role="button" data-bs-toggle="dropdown">
                                        <img className='img-icon' src="/assets/images/img.png" width="20" alt=""/>                                       
                                    </Link>
                                    <div class="dropdown-menu dropdown-menu-end">                                        
                                        <Link data-bs-toggle="modal" data-bs-target="#LogOut" class="dropdown-item ai-icon">
                                            <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" class="text-danger" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                            <span class="ms-2">Logout </span>
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    
                </div>
            </div>
         </div>
         <CreateApplication/>
         <SetWebhookURL/>
         <ProceedLogout/>

    </div>
  )
}

export default TopDashboard



 
