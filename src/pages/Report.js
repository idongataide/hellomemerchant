import React, { useEffect, useState } from 'react'
import TopDashboard from '../Components/TopDashboard'
import SideDashboard from '../Components/SideDashboard'
import { Link, useNavigate } from 'react-router-dom';
import Myfunctions from '../js/MyFuntions';
import useBoundStore from '../js/Store/useStore';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { RaiseDispute } from '../Components/Modals';


function Report() {
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('');
    const [pdfUrl, setPdfUrl] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reportType, setReportType] = useState('');
    const [noData, setNoData] = useState(false);

    const transactions = useBoundStore(state => state.user.FetchTransactions);
    const wallets = useBoundStore(state => state.user.FetchWallets);
    const activities = useBoundStore(state => state.user.FetchActivities);
    const disputes = useBoundStore(state => state.user.FetchDisputes);

    const ExportReport = useBoundStore(state => state.user.ExportReport);


    useEffect(() => {
        Myfunctions.FetchTransactions();    
        Myfunctions.FetchWallets();    
        Myfunctions.FetchActivities();    
        Myfunctions.FetchDisputes(); 
    }, []);

    useEffect(() => {
        if (!loading && ExportReport?.data?.length) {
            generatePDF();
        } else if (!loading && ExportReport && !ExportReport.data?.length) {
            setNoData(true);
        }
    }, [ExportReport, loading]);

    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: "landscape",
        });
        const tableData = ExportReport?.data.map((item) => [
            item.trans_type,
            item.amount,
            item.trans_date,
            item.transaction_reference,
            item.balance_before,
            item.after_balance,
            item.funded_by || '-',
            item.switch_id,
            item.bank,
        ]);

        if (!tableData || tableData == undefined || !tableData.length ) {
            setNoData(true);
            return;
        }

        doc.autoTable({
            head: [['Trans Type', 'Amount', 'Trans Date', 'Transaction Reference', 'Balance Before', 'After Balance', 'Funded By', 'Switch ID', 'Bank']],
            body: tableData,
        });

        const pdfUrl = doc.output('bloburl');
        setPdfUrl(pdfUrl);
        setNoData(false);
        console.log(pdfUrl, 'pdfUrl');
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filteredTransactions = filter ? transactions.filter(transaction => transaction.trans_type === filter) : transactions;

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        generatePDF();

        const formData = {
            from: startDate,
            to: endDate,
            category: reportType,
        };

        Myfunctions.Export(e, formData, setLoading)

    };

    const [searchTerm, setSearchTerm] = useState('');
    const [pendingFilter, setPendingFilter] = useState(false);
    const [closedFilter, setClosedFilter] = useState(false);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handlePendingFilterChange = (e) => {
        setPendingFilter(e.target.checked);
    };

    const handleClosedFilterChange = (e) => {
        setClosedFilter(e.target.checked);
    };

    const filteredDisputes = disputes?.data?.filter(dispute => {
        const matchesSearch = dispute.ticket_no.includes(searchTerm);
        const matchesPending = pendingFilter ? dispute.dispute_status === 'Processing' : true;
        const matchesClosed = closedFilter ? dispute.dispute_status === 'Closed' : true;

        return matchesSearch && matchesPending && matchesClosed;
    }) || [];

    const navigate = useNavigate();

    const handleRowClick = (transaction_ref) => {
      navigate(`/transfer/receipt/${transaction_ref}`);
    };
  
  return (
    <>
        <TopDashboard/>
        <SideDashboard/>
        <div className="content-body vh-80">
            <div className="container-fluid">                   
                <div class="row">
                    <div className='d-flex justify-content-between'>
                        <div className=''>
                            <div className='title'>
                                <h3 className='pages-head'>Reports</h3>
                                <p className='pages-p'>Overview of all your reports</p>
                            </div>
                        </div>                       
                    </div>  
                    <div className=''>
                            <div class="custom-tab-1">
                                <ul class="nav nav-tabs">
                                    <li class="nav-item">
                                        <Link class="nav-link ps-0 active" data-bs-toggle="tab" to="#Transactions"> Transactions</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" data-bs-toggle="tab" to="#Wallet"> Wallet</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" data-bs-toggle="tab" to="#Session">Session calls</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" data-bs-toggle="tab" to="#Activities">Accounts Activity</Link>
                                    </li>                                    
                                    <li class="nav-item">
                                        <Link class="nav-link" data-bs-toggle="tab" to="#Dispute">Dispute</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" data-bs-toggle="tab" to="#Exports">Exports</Link>
                                    </li>
                                </ul>
                                <div class="tab-content">
                                    <div class="tab-pane fade show active" id="Transactions" role="tabpanel">
                                        <div class="pt-4">
                                            <div className="card overflow-hidden min-h-350">
                                                <div className='d-flex justify-content-between p-4'>
                                                    <div className=''>
                                                        <div className='title'>
                                                            <h4 className=''>All Transactions</h4>
                                                            List of all transactions performed
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <select className="form-control h-43" onChange={handleFilterChange}>
                                                            <option value="">Filter by</option>
                                                            <option value="Debit">Debit</option>
                                                            <option value="Credit">Credit</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="card-body p-0">
                                                    <div className="table-responsive">
                                                        <table className="table header-border table-hover verticle-middle">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">ID</th>
                                                                    <th scope="col">Ledger Token</th>
                                                                    <th scope="col">Currency</th>
                                                                    <th scope="col">Type</th>
                                                                    <th scope="col">Category</th>
                                                                    <th scope="col">Amount</th>
                                                                    <th scope="col">Charge</th>
                                                                    <th scope="col">Date</th>
                                                                    <th scope="col">Status</th>
                                                                    <th scope="col">Reference</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {filteredTransactions && filteredTransactions instanceof Array && filteredTransactions.length > 0 ? (
                                                                    filteredTransactions.map((transaction, i) => (
                                                                        <tr key={i} onClick={() => handleRowClick(transaction.trans_ref)}>
                                                                            <th>{i + 1}</th>
                                                                            <td>{transaction.ledger_token}</td>
                                                                            <td>{transaction.currency_code}</td>
                                                                            <td>
                                                                                <span className={`badge badge-sm ${transaction.trans_type === 'Debit' ? 'bg-danger' : 'bg-success'}`}>
                                                                                    {transaction.trans_type}
                                                                                </span>
                                                                            </td>
                                                                            <td>{transaction.trans_category}</td>
                                                                            <td> &#8358;{Myfunctions.numberFormat(transaction.amount)}</td>
                                                                            <td> &#8358;{Myfunctions.numberFormat(transaction.charge)}</td>
                                                                            <td>{transaction.trans_date}</td>
                                                                            <td>
                                                                                <span className={`badge badge-sm ${transaction.trans_status === 'Successful' ? 'bg-success' : 'bg-danger'}`}>
                                                                                    {transaction.trans_status}
                                                                                </span>
                                                                            </td>
                                                                            <td>{transaction.trans_ref}</td>
                                                                        </tr>
                                                                    ))
                                                                ) : (
                                                                    <tr>
                                                                        <td colSpan="9" className="text-center">No data found</td>
                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
 
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="Wallet">
                                        <div className="pt-4">
                                            <div className="card overflow-hidden min-h-350">
                                                <div className='d-flex justify-content-between p-4'>
                                                    <div className=''>
                                                        <div className='title'>
                                                            <h4 className=''>All Wallets</h4>
                                                            List of all wallet accounts
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-body p-0">
                                                    <div className="table-responsive">
                                                        <table className="table header-border table-hover verticle-middle">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">ID</th>
                                                                    <th scope="col">Bank</th>
                                                                    <th scope="col">Account Number</th>
                                                                    <th scope="col">Account Name</th>
                                                                    <th scope="col">Status</th>
                                                                    <th scope="col">Entry Date</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {wallets && wallets?.data instanceof Array && wallets?.data.length > 0 ? (
                                                                    wallets?.data.map((wallet, i) => (
                                                                        <tr key={i}>
                                                                            <th>{i + 1}</th>
                                                                            <td>{wallet.bank}</td>
                                                                            <td>{wallet.account_number}</td>
                                                                            <td>{wallet.account_name}</td>
                                                                            <td>
                                                                                <span className={`badge badge-sm ${wallet.account_status === '1' ? 'bg-success' : 'bg-danger'}`}>
                                                                                    {wallet.account_status === '1' ? 'Active' : 'Inactive'}
                                                                                </span>
                                                                            </td>
                                                                            <td>{wallet.entry_date}</td>
                                                                        </tr>
                                                                    ))
                                                                ) : (
                                                                    <tr>
                                                                        <td colSpan="6" className="text-center">No data found</td>
                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="Session">
                                        <div class="pt-4">
                                            <div class="card overflow-hidden min-h-350">                           
                                                <div class="card-body p-0">
                                                    <div class="table-responsive">
                                                        <table class="table header-border table-hover verticle-middle">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col"></th>
                                                                    <th scope="col">Product</th>
                                                                    <th scope="col">End Point</th>
                                                                    <th scope="col">Status</th>
                                                                    <th scope="col">IP Address</th>
                                                                    <th scope="col">Date</th>
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
                                    <div class="tab-pane fade" id="Activities">
                                        <div class="pt-4">
                                            <div className="card overflow-hidden min-h-350">
                                                <div className='d-flex justify-content-between p-4'>
                                                    <div className=''>
                                                        <div className='title'>
                                                            <h4 className=''>All Activities</h4>
                                                            List of all account activities
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-body p-0">
                                                    <div className="table-responsive">
                                                        <table className="table header-border table-hover verticle-middle">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">ID</th>
                                                                    <th scope="col">Account Number</th>
                                                                    <th scope="col">Account Name</th>
                                                                    <th scope="col">Bank</th>
                                                                    <th scope="col">Amount</th>
                                                                    <th scope="col">Charge</th>
                                                                    <th scope="col">Reference</th>
                                                                    <th scope="col">Narration</th>
                                                                    <th scope="col">Switch ID</th>
                                                                    <th scope="col">Date</th>
                                                                    <th scope="col">Status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {activities && activities?.data instanceof Array && activities?.data.length > 0 ? (
                                                                    activities?.data.map((activity, i) => (
                                                                        <tr key={i}>
                                                                            <th>{i + 1}</th>
                                                                            <td>{activity.account_number}</td>
                                                                            <td>{activity.account_name}</td>
                                                                            <td>{activity.bank_name}</td>
                                                                            <td>&#8358; {Myfunctions.numberFormat(activity.amount)}</td>
                                                                            <td>&#8358; {Myfunctions.numberFormat(activity.charge)}</td>
                                                                            <td>{activity.transaction_reference}</td>
                                                                            <td>{activity.narration}</td>
                                                                            <td>{activity.switch_id.slice(0, 10) + '...'}</td>
                                                                            <td>{activity.date}</td>
                                                                            <td>
                                                                                <span className={`badge badge-sm ${activity.status === 'Successful' ? 'bg-success' : 'bg-danger'}`}>
                                                                                    {activity.status}
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                ) : (
                                                                    <tr>
                                                                        <td colSpan="11" className="text-center">No data found</td>
                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="tab-pane fade" id="Dispute">
                                        <div className="pt-4">
                                            <div className="row p-0 mb-4">
                                                <div className='col-md-5'>
                                                    <div className="input-group search-area right d-lg-inline-flex">
                                                        <input
                                                            type="text"
                                                            className="form-control h-60"
                                                            placeholder="Search by Ticket No."
                                                            value={searchTerm}
                                                            onChange={handleSearchChange}
                                                        />
                                                        <div className="input-group-append">
                                                            <span className="input-group-text h-60">
                                                                <Link href="#">
                                                                    <i className="flaticon-381-search-2"></i>
                                                                </Link>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-md-2'>
                                                    <button data-bs-toggle="modal" data-bs-target="#RaiseDispute" className="btn btn-primary btn-xs mt-2">Raise Dispute</button>
                                                </div>
                                                <div className='col-md-5'>
                                                    <div className="basic-form justify-content-end d-flex">
                                                        <form>
                                                            <div className="mb-3">
                                                                <div className="form-check form-check-inline">
                                                                    <label className="form-check-label">
                                                                        <input type="checkbox" className="form-check-input" value="" checked={pendingFilter} onChange={handlePendingFilterChange}/>
                                                                        Pending Disputes
                                                                    </label>
                                                                </div>
                                                                <div className="form-check form-check-inline">
                                                                    <label className="form-check-label">
                                                                        <input type="checkbox" className="form-check-input" value="" checked={closedFilter} onChange={handleClosedFilterChange}/>
                                                                        Closed Disputes
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card overflow-hidden min-h-350">
                                                <div className="card-body p-0">
                                                    <div className="table-responsive">
                                                        <table className="table header-border table-hover verticle-middle">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">Ticket No</th>
                                                                    <th scope="col">Transaction ID</th>
                                                                    <th scope="col">Format</th>
                                                                    <th scope="col">Description</th>
                                                                    <th scope="col">Status</th>
                                                                    <th scope="col">Date Created</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {filteredDisputes.length > 0 ? (
                                                                    filteredDisputes.map((dispute, index) => (
                                                                        <tr key={index}>
                                                                            <td>{dispute.ticket_no}</td>
                                                                            <td>{dispute.transaction_id}</td>
                                                                            <td>{dispute.format}</td>
                                                                            <td>{dispute.description}</td>
                                                                            <td>{dispute.dispute_status}</td>
                                                                            <td>{dispute.entry_date}</td>
                                                                        </tr>
                                                                    ))
                                                                ) : (
                                                                    <tr>
                                                                        <td colSpan="6" className="text-center">No Data</td>
                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="Exports">
                                        <div class="pt-4">
                                          <form className=''>
                                                <div className='col-xl-4 col-lg-5 col-md-12'>  
                                                    <div class="mt-3">
                                                        <label className='form-label'>Select Report Type </label>
                                                        <select className="form-control bg-white h-60 mt-3 mt-sm-0" value={reportType} onChange={(e) => setReportType(e.target.value)} >
                                                            <option value="">Select transaction type</option>
                                                            <option value="Transfer">Transfer</option>
                                                            <option value="Account Funding">Account Funding</option>
                                                        </select>                                                      
                                                    </div>                                                
                                                    <div className="mt-3">
                                                        <label className="form-label">Start Date</label>
                                                        <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                                    </div>
                                                    <div className="mt-3">
                                                        <label className="form-label">End Date</label>
                                                        <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                                    </div>
                                                    <div className="d-flex justify-content-end">
                                                        <button className="btn btn-primary btn-xs mt-3"  disabled={loading} onClick={handleSubmit}>{loading ? 'Processing...' : 'Export'}</button>
                                                    </div>
                                                </div>
                                            </form>
                                            {noData && (
                                                <div className="mt-3">
                                                    <p>No transactions for the selected date range</p>
                                                </div>
                                            )}
                                            {pdfUrl && !noData && (
                                                <div className="mt-3">
                                                    <iframe src={pdfUrl} width="100%" height="500px" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                        </div>
                    </div>
                    
                </div>    
            </div>    
        </div>
        <RaiseDispute/>
    </>
  )
}

export default Report
