import React from 'react'
import { Link } from 'react-router-dom'
import Images from '../pages/Images'



function TopDashboard() {
  return (
    <div>
      
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
                                        <h5 class="dashboard_bar">Saito Akintona</h5>
                                    </div>
                                </div>
                            </div>
                            <ul class="navbar-nav header-right main-notification">
                                
                                <li class="nav-item dropdown header-profile">
                                    <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown">
                                        <img className='img-icon' src="/assets/images/img.png" width="20" alt=""/>                                       
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-end">                                        
                                        <a href="#" class="dropdown-item ai-icon">
                                            <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" class="text-danger" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                            <span class="ms-2">Logout </span>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    
                </div>
            </div>
         </div>
    </div>
  )
}

export default TopDashboard
