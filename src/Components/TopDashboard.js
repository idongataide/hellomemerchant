import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Images from '../pages/Images';
import Myfunctions from '../js/MyFuntions';
import useBoundStore from '../js/Store/useStore';
import useInactivityTimeout from '../js/useInactivityTimeout';
import { CreateApplication, ProceedLogout, SetWebhookURL } from './Modals';

function TopDashboard() {
    const RefreshToken = useBoundStore(state => state.user.RefreshToken);
    const userProfile = useBoundStore(state => state.user.userProfile);
    const setProfileProgress = useBoundStore(state => state.user.setProfileProgress);

    const navigate = useNavigate();

    useEffect(() => {
        Myfunctions.addEventListenersToTelInputs();
        Myfunctions.RefreshToken();
        
        let secret_key = localStorage.getItem('secret_key');
        let webhook_status = localStorage.getItem('webhook_status');
        if (secret_key != 1) {
            navigate('/api');
            document.querySelector('#CreateAPI').click();
        } else if (webhook_status != 1) {
            navigate('/settings/Webhook');
            document.querySelector('#CreateHook').click();
        }

        const handleHamburgerClick = () => {
            document.getElementById('root').classList.toggle('menu-toggle');
        };

        const hamburger = document.querySelector('.hamburger');
        if (hamburger) {
            hamburger.addEventListener('click', handleHamburgerClick);
        }

        return () => {
            if (hamburger) {
                hamburger.removeEventListener('click', handleHamburgerClick);
            }
        };
    }, [navigate]);

    useInactivityTimeout();

    return (
        <div>
            <Link to="#" id="CreateAPI" role="button" data-bs-toggle="modal" data-bs-target="#CreateApplication" style={{ display: 'none' }}>type</Link>
            <Link to="#" id="CreateHook" role="button" data-bs-toggle="modal" data-bs-target="#CreateWebHook" style={{ display: 'none' }}>type</Link>

            <div id="main-wrapper">
                <div className="nav-header">
                    <Link to="/index" className="brand-logo">
                        <img src={Images.logo} className='desk' alt="Logo" />
                    </Link>
                    <div className="nav-control">
                        <div className="hamburger">
                            <span className="line"></span>
                            <span className="line"></span>
                            <span className="line"></span>
                        </div>
                    </div>
                </div>

                <div className="header">
                    <div className="header-content">
                        <nav className="navbar navbar-expand">
                            <div className="collapse navbar-collapse justify-content-between">
                                <div className="header-left">
                                    <div className="sub-header">
                                        <div className="me-auto">
                                            <p>Welcome Back</p>
                                            <h5 className="dashboard_bar">{RefreshToken?.first_name} {RefreshToken?.last_name}</h5>
                                        </div>
                                    </div>
                                </div>
                                <ul className="navbar-nav header-right main-notification">
                                    <Link to='/settings'>
                                        <li className='nav-item'>
                                            <i className='fa fa-cog' style={{fontSize:'30px'}}></i>
                                        </li>
                                    </Link>
                                    <li className="nav-item dropdown header-profile">
                                        <Link className="nav-link" to="#" role="button" data-bs-toggle="dropdown">
                                            <img className="img-icon" src="/assets/images/img.png" width="20" alt="" />
                                        </Link>
                                        <div className="dropdown-menu dropdown-menu-end">
                                            <Link data-bs-toggle="modal" data-bs-target="#LogOut" className="dropdown-item ai-icon">
                                                <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" className="text-danger" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                                    <polyline points="16 17 21 12 16 7"></polyline>
                                                    <line x1="21" y1="12" x2="9" y2="12"></line>
                                                </svg>
                                                <span className="ms-2">Logout </span>
                                            </Link>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <CreateApplication />
            <SetWebhookURL />
            <ProceedLogout />
        </div>
    );
}

export default TopDashboard;
