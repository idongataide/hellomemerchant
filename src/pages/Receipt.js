import React, { useState, useEffect } from 'react';
import useBoundStore from '../js/Store/useStore';
import SideDashboard from '../Components/SideDashboard';
import TopDashboard from '../Components/TopDashboard';
import Myfunctions from '../js/MyFuntions';
import Images from './Images';
import { useParams } from 'react-router-dom';


function Receipt() {
    
    
    
    const { transaction_id } = useParams();
    
    useEffect(() => {
        Myfunctions.TransferReceipt(transaction_id);
    }, [transaction_id]);
    
    const Receipt = useBoundStore(state => state.user.TransferReceipt);

    console.log(Receipt,'TransferReceiptXXX')

    return (
        <>
            <TopDashboard />
            <SideDashboard />
            <div className="content-body vh-80">
                <div className="container">
                    <div className="row">                       
                        <div className="col-xl-6 col-lg-9 col-md-12 m-auto">
                            <div className='divborder'>
                                <div className="text-end mb-2 rounded" style={{backgroundColor: '#075ea3'}}>
                                    <img className='logo-img' src={Images.logoWhite} alt="" />
                                </div>
                                <div className="row">
                                    <ul className="receipt PreviewDetails">  
                                        <li className="details">
                                            <span className="detailstitle" style={{textTransform:'capitalize'}}>Online Transaction Receipt</span>
                                            <span className="detailsdesc"> {Receipt?.date}</span>
                                        </li>                                      
                                        <li className="details">
                                            <span className="detailstitle">Transaction Type:</span>
                                            <span className="detailsdesc"> {Receipt?.transaction_type}</span>
                                        </li>
                                        <li className="details">
                                            <span className="detailstitle">Account Number:</span>
                                            <span className="detailsdesc"> {Receipt?.recipient_account_number}</span>
                                        </li>
                                        <li className="details">
                                            <span className="detailstitle">Recipient Bank:</span>
                                            <span className="detailsdesc"> {Receipt?.bank}</span>
                                        </li>   
                                        <li className="details">
                                            <span className="detailstitle">Recipient:</span>
                                            <span className="detailsdesc"> {Receipt?.recipient_account_name}</span>
                                        </li>                                    
                                        <li className="details">
                                            <span className="detailstitle">Amount:</span>
                                            <span className="detailsdesc"> &#8358;{Receipt?.amount}</span>
                                        </li>
                                        <li className="details">
                                            <span className="detailstitle">Session ID:</span>
                                            <span className="detailsdesc"> {transaction_id}</span>
                                        </li>                                      
                                        <li className="details">
                                            <span className="detailstitle">Narration:</span>
                                            <span className="detailsdesc"> {Receipt?.narration}</span>
                                        </li>
                                    </ul>                                   
                                </div>
                                 <div className='copyright'>
                                    <p className='mb-0'>Copyright reserved @ 2024 HelloMe Money Limited</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Receipt;

