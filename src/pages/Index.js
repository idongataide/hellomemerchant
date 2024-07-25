import React, { useEffect } from 'react'
import SideDashboard from '../Components/SideDashboard'
import TopDashboard from '../Components/TopDashboard'
import Images from './Images'
import { Link, useNavigate } from 'react-router-dom';
import Myfunctions from '../js/MyFuntions';
import useBoundStore from '../js/Store/useStore';



function Index() {


    const WalletBalance = useBoundStore(state => state.user.WalletBalance);
    const RefreshToken = useBoundStore(state => state.user.RefreshToken);
    const GetAccount = useBoundStore(state => state.user.GetAccount);


    useEffect(() => {
        Myfunctions.WalletBalance()
        Myfunctions.AccountDetails()
        Myfunctions.RefreshToken() 
    }, []);


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
               <div class="col-xl-12 col-xxl-12">
                 <div class="row">
                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="card-bx stacked card">
                            <div className="card-info">
                                <div className="d-flex pt-2 justify-content-between">
                                    <div>
                                        <p className="mb-1 text-dark fs-12 mb-2">Your Billing Account</p>
                                        <h2 className="num-text text-dark mb-6 font-w600">
                                            <img src={Images.wallet} className="me-2 wallet-icon" alt="wallet" />
                                            &#8358; {Myfunctions.numberFormat(WalletBalance ? WalletBalance.balance : '')}
                                        </h2>
                                    </div>
                                    <div className="mb-2">
                                        <select className="form-control h-43">
                                            <option selected>Account</option>
                                            {GetAccount && GetAccount?.details?.data.map((account, index) => (
                                                <option key={index} value={account.account_number}>
                                                    {account.account_name} - {account.account_number}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <Link className="btn btn-primary btn-sm float-end mt-5" to="#">
                                        View All Accounts
                                    </Link>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-lg-6 col-md-12 col-sm-12">
                        <div class="card-bx stacked card">
                            <div class="card-info wall">
                                <div class="d-flex justify-content-between">
                                    <div className='mb-6'>
                                        <h2 class="num-text text-dark font-w600 mb-3">My Registered Wallet</h2>
                                        <p class="mb-1 text-dark fs-12">Manage your wallet profile and <br/> activities ease</p>
                                    </div>
                                    <img src={Images.lady} className="mb-2" alt='wallet'/>
                                </div>
                                <div class="d-flex justify-content-between flex-wrap align-items-center">
                                       <Link class="btn btn-primary btn-sm float-end" to="#">Change Wallet</Link>
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
