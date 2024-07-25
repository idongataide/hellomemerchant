import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import useBoundStore from '../js/Store/useStore';
import SideDashboard from '../Components/SideDashboard';
import TopDashboard from '../Components/TopDashboard';
import Myfunctions from '../js/MyFuntions';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

function Transfer() {
    const WalletBalance = useBoundStore(state => state.user.WalletBalance);
    const BeneficiaryData = useBoundStore(state => state.user.BeneficiaryData);
    const BankList = useBoundStore(state => state.user.BankList);
    const [loading, setLoading] = useState(false);
    const [validating, setValidating] = useState(false);
    const [bankCode, setBankCode] = useState('');
    const [Beneficiary, setBeneficiary] = useState(null);

    const filterOption = (input, option) => 
    option.children.toLowerCase().includes(input.toLowerCase());

    const handleBankChange = (value) => {
        setBankCode(value);
    };

    useEffect(() => {
        Myfunctions.BankList();
        Myfunctions.WalletBalance();
        Myfunctions.RefreshToken();
        setBeneficiary(BeneficiaryData);
    }, []);

    const handleTransfer = (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = {
            bank_code: bankCode,
            beneficiary_id: Beneficiary?.beneficiary_id,
            beneficiary_account_id: Beneficiary?.beneficiary_account_id,
            bank: Beneficiary?.bank,
        };
        Myfunctions.Transfer(e, formData, setLoading);
    };

    return (
        <>
            <TopDashboard />
            <SideDashboard />
            <div className="content-body vh-80">
                <div className="container">
                    <div className="row">
                        <div className='title'>
                            <h3 className='pages-head'>Send Money</h3>
                        </div>
                        <div className="col-xl-6 col-lg-9 col-md-12 m-auto">
                            <div className="row bg-transfer">
                                <h3 className="text-dark mb-3">
                                    Wallet Balance &#8358; {Myfunctions.numberFormat(WalletBalance?.balance)}
                                </h3>
                                <form onSubmit={handleTransfer}>
                                    <div className='col-md-12'>
                                        <div className="form-group">
                                            <label className="form-label mb-1">Beneficiary Bank </label>
                                            <Select showSearch className='form-control bg-white p-0' filterOption={filterOption} onChange={handleBankChange}>
                                                {BankList && BankList?.bank instanceof Array ? BankList?.bank.map(bank => (
                                                    <Option key={bank.id} value={bank.code}>
                                                        {bank.name}
                                                    </Option>
                                                )) : <Option>Loading...</Option>}
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label">Beneficiary Account Number</label>
                                        <input type="text" className="form-control mb-2 account_number" placeholder='10 digit number' maxLength={10} name='account_number' onKeyUp={(e) => { Myfunctions.VerifyAccountNumber(e, bankCode, setValidating) }} />
                                        <div style={{ float: 'right' }}> 
                                            {validating ? <span className='spinner-border'></span> : ''}
                                            <span id="accountName" className='text-primary- fs-8 account_name' style={{ float: 'right' }}></span>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label">Transfer Amount</label>
                                        <input type="tel" className="transfer_amount formatNumber form-control" placeholder='' />
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label">Description</label>
                                        <input type="text" className="naration form-control" placeholder='' />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block w-80 m-auto mt-4" disabled={loading}>
                                        {loading && <span className='spinner-border'></span>}{loading ? 'Loading...' : 'Proceed'}
                                    </button>
                                    <a href="#" id="ConfirmTransfer" role="button" data-bs-toggle="modal" data-bs-target="#OutPreviewTransaction" style={{ display: 'none' }}>type</a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <OutPreviewTransaction />
        </>
    );
}

export default Transfer;

export const OutPreviewTransaction = () => {
    const confirmdata = useBoundStore(state => state.user.TransferPreview);
    const fetch_charges = useBoundStore(state => state.user.FetchCharges);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        Myfunctions.FetchCharges();
    }, []);


    const handleConfirmClick = () => {
        setLoading(true);
        document.querySelector('#OpenPinModal').click();
        setLoading(false);
    };

    return (
        <>
            <div className="modal fade" id="OutPreviewTransaction">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content pb-4">
                        <div className="modal-header">
                            <button type="button" className="btn-close" id="ClosePreviewOut" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body Modals pb-2">
                            <div className='divborder'>
                                <h3>Preview</h3>
                                <p>Kindly confirm the details of your transfer</p>
                                <div className="row">
                                    <ul className="PreviewDetails">
                                        <li className="details">
                                            <span className="detailstitle">Recipient</span>
                                            <span className="detailsdesc"> {confirmdata?.account_name}</span>
                                        </li>
                                        <li className="details">
                                            <span className="detailstitle">Bank name</span>
                                            <span className="detailsdesc"> {confirmdata?.bank_name}</span>
                                        </li>
                                        <li className="details">
                                            <span className="detailstitle">Account Number</span>
                                            <span className="detailsdesc"> {confirmdata?.account_number}</span>
                                        </li>
                                        <li className="details">
                                            <span className="detailstitle">Amount</span>
                                            <span className="detailsdesc"> &#8358;{confirmdata?.amount}</span>
                                        </li>
                                        <li className="details">
                                            <span className="detailstitle">Charges</span>
                                            <span className="detailsdesc"> &#8358;{fetch_charges?.charge}</span>
                                        </li>
                                        <li className="details">
                                            <span className="detailstitle">Date</span>
                                            <span className="detailsdesc"> {confirmdata?.transferDate}</span>
                                        </li>
                                        <li className="details">
                                            <span className="detailstitle">Narration</span>
                                            <span className="detailsdesc"> {confirmdata?.remark}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="text-center mt-4 pb-2">
                                <button onClick={handleConfirmClick} className="btn btn-primary btn-block" disabled={loading}>
                                    {loading && <span className='spinner-border'></span>}{loading ? 'Processing...' : 'Confirm'}
                                </button>
                                <a href="#" id="OpenPinModal" role="button" data-bs-toggle="modal" data-bs-target="#OutTransferPin" style={{ display: 'none' }}>type</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <OutTransferPin />
        </>
    );
};

export const OutTransferPin = () => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handlePinSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        Myfunctions.ConfirmPin({ otp, navigate, setLoading });
    };

    return (
        <>
            <div className="modal fade" id="OutTransferPin">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content pb-4">
                        <div className="modal-header">
                            <button type="button" id="closeTransferPinOut" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body Modals p-4 OTPScreen">
                            <h3>One more step</h3>
                            <p>Enter your transaction pin to validate transfer</p>
                            <form onSubmit={handlePinSubmit}>
                                <div className="row">
                                    <div className="otp-boxex ">
                                        <OtpInput
                                            value={otp}
                                            onChange={setOtp}
                                            numInputs={4}
                                            inputStyle={'form-control otp-input'}
                                            renderSeparator={<span className="m-2"> - </span>}
                                            renderInput={(props) => <input {...props} type='password' />}
                                        />
                                    </div>
                                    <input type="hidden" className='OutTransferPin' id="otp" value={otp} />
                                </div>
                                <div className="text-center mt-4 pb-3">
                                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                        {loading && <span className='spinner-border'></span>}{loading ? 'Processing...' : 'Confirm'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
