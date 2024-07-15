import React from 'react'
import Images from '../pages/Images'
import { Link, useLocation } from 'react-router-dom'
import { ProceedLogout } from './Modals';


function SideDashboard() {

   const location = useLocation();

   const isLinkActive = (link) => {
     return location.pathname.includes(link) ? 'mm-active' : '';
   };

  return (
    <>

        <div class="deznav">
            <div class="deznav-scroll">
                
                <ul class="metismenu" id="menu">                
                
                    <li className={isLinkActive('/index')}>
                        <Link to="/index" class="ai-icon" aria-expanded="false">
                            <img src={Images.d1} alt='icons'/>
                            <span class="nav-text">Dashboard</span>
                        </Link>
                    </li>
                    <li className={isLinkActive('/product')}>
                        <Link to="/product" class="ai-icon" aria-expanded="false">
                            <img src={Images.d2} alt='icons'/>
                            <span class="nav-text">Product</span>
                         </Link>
                    </li>
                    <li className={isLinkActive('/transfer')}>
                        <Link to="/transfer" class="ai-icon" aria-expanded="false">
                            <img src={Images.d5} alt='icons'/>
                            <span class="nav-text">Transfer</span>
                         </Link>
                    </li>
                    <li className={isLinkActive('/api')}>
                        <Link to="/api" class="ai-icon" aria-expanded="false">
                            <img src={Images.d3} alt='icons'/>
                            <span class="nav-text">API Keys</span>
                        </Link>
                    </li>
                    <li className={isLinkActive('/report')}>
                        <Link to="/report" class="ai-icon" aria-expanded="false">
                            <img src={Images.d4} alt='icons'/>
                            <span class="nav-text">Report</span>
                        </Link>
                    </li>
                    {/* <li className={isLinkActive('/settings')}>
                        <Link to="/settings" class="ai-icon" aria-expanded="false">
                            <img src={Images.d4} alt='icons'/>
                            <span class="nav-text">Settings</span>
                        </Link>
                    </li> */}
                
                </ul>

                <ul class="metismenu mt-120" id="menu">                    
                
                    <li>
                        <Link href="#" class="ai-icon" data-bs-toggle="modal" data-bs-target="#LogOut" aria-expanded="false">
                            <i class="fa fa-sign-out-alt"></i>
                            <span class="nav-text">Logout</span>
                        </Link>
                    </li>                
                
                </ul>
            </div>
        </div>
      <ProceedLogout/>
    </>
  )
}

export default SideDashboard
