import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';

const AllLoan = () => {
    const [customer, setCustomer] = useState([]);
    const [currentpage, setcurrentpage] = useState(0); // Start from page 1
    const [startDate, setstartDate] = useState(null);
    const [endDate, setendDate] = useState(null);
    const [phone, setphone] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedvalue, setselectedvalue] = useState('id');
    const [offset, setOffset] = useState(0);

    let tc = 0;

    useEffect(() => {
        getAllCommission();
    }, [selectedvalue, currentpage]);

    const recordsperpages = 10;

    const prepage = () => {

        setcurrentpage(currentpage - 1);

    };

    const nextpage = () => {
        if (currentpage < offset) {
            setcurrentpage(currentpage + 1);
        }
    };

    const getAllCommission = () => {
        setLoading(true);
        axios
            .get(`https://unioncooperativesocietylimited.in:8443/transaction/getAllLoan/${currentpage}/${recordsperpages}/${selectedvalue}`)
            .then((response) => {
                console.log(response)
                setCustomer(response.data.data.content);
                setOffset(response.data.data.totalPages);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };

    const searchCustomers = () => {
        setLoading(true);
        console.log(phone,startDate, endDate)
        axios
            .get(`https://unioncooperativesocietylimited.in:8443/transaction/getAllLoanTransactions/${phone}/${startDate}/${endDate}`)
            .then((response) => {
                console.log(response.data)
                setSearchResults(response.data);
                setLoading(false);
                
            })
            .catch((err) => {
                if (err.response && err.response.status === 404) {
                    alert('Data not found');
                } else {
                    console.log(err);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

   

    const dataToDisplay = phone ? searchResults : customer;

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className='container-fluid'>
                    <div style={{ padding: '5px 10px' }}>
                    <h1 className='fw-bold' style={{textAlign:"center", marginTop:'1%', fontFamily:'serif',color:'#4F6F52'}}> Loan Account Details</h1>
                        <div className='d-flex justify-content-end'>
                            <p style={{ display: 'flex', justifyContent: 'end' }}>
                            <div>
                                <th style={{color:'#4F6F52'}}>Phone Number</th>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Search by phone No'
                                    value={phone}
                                    onChange={(e) => setphone(e.target.value)}
                                />
                                </div>
                                <div style={{marginLeft:'2%',marginRight:'2%'}}>
                                <th style={{color:'#4F6F52'}}>Start Date</th>
                                <input
                                    type='date'
                                    style={{ marginLeft: '2%' }}
                                    className='form-control'
                                    value={startDate}
                                    onChange={(e) => setstartDate(e.target.value)}
                                    />
                                    </div>
                                    <div style={{marginLeft:'2%',marginRight:'2%'}}>
                                <th style={{color:'#4F6F52'}}>End Date</th>
                                <input
                                    type='date'
                                    style={{ marginLeft: '2%' }}
                                    className='form-control'
                                    value={endDate}
                                    onChange={(e) => setendDate(e.target.value)}

                                />
                                </div>
                            </p>

                            
                            <p>
                                <button className='btn' style={{ marginRight: '5px', marginLeft: '5px' ,marginTop:'30%',background:'#4F6F52',color:'white'}} onClick={searchCustomers}>
                                    Search
                                </button>
                            </p>
                        </div>
                      

                        <div className='container-fluid' style={{ overflowY: 'scroll', height: '450px' }}>
                            <table className='table table-hover table-bordered table-striped '>
                                <thead className='table-success' style={{ position: 'sticky', top: -1 }}>
                                    <tr style={{ fontSize: '20px' }}>
                                        <th>S. no</th>
                                        <th>Deposit ID</th>
                                        <th>Customer ID</th>
                                        <th>Agent ID</th>
                                        <th>Date</th>
                                        <th>Pre Balance</th>
                                        <th>Account Type</th>
                                        <th>Account Number</th>
                                        <th>Amount</th>
                                        <th>Type</th>
                                        <th>Cur Balance</th>
                                     
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                       
                                        dataToDisplay.map((val, index) => {
                                           
                                            return (
                                                <React.Fragment key={val.id}>
                                                    <tr style={{ fontSize: '20px' }}>
                                                        <td style={{ fontSize: '20px' }}>{index + 1}</td>
                                                        <td style={{ fontSize: '20px' }}>{val.id}</td>
                                                        <td style={{ fontSize: '20px' }}>{val.customerId}</td>
                                                        <td style={{ fontSize: '20px' }}>{val.agentId}</td>
                                                        <td style={{ fontSize: '20px' }}>{val.date}</td>
                                                        <td style={{ fontSize: '20px' }}>{val.preBalance.toFixed(2)}</td>
                                                        <td style={{ fontSize: '20px' }}>{val.accountType}</td>
                                                        <td style={{ fontSize: '20px' }}>{val.accountNumber}</td>
                                                        <td style={{ fontSize: '20px' }}>{val.amount.toFixed(2)}</td>
                                                        <td style={{ fontSize: '20px' }}>{val.type}</td>
                                                        <td style={{ fontSize: '20px' }}>{val.curBalance.toFixed(2)}</td>
                                                      
                                                    </tr>
                                                </React.Fragment>
                                            );
                                        })
                                    
                                }
                                </tbody>
                            </table>
                        </div>
                        

                        <nav>
                            <ul className='pagination justify-content-center'>
                                <li className={`page-item${currentpage === 0 ? ' disabled' : ''}`}>
                                    <a href='#' className='page-link' onClick={prepage}>
                                        Pre
                                    </a>
                                </li>

                                {[...Array(offset).keys()].map((n, i) => {
                                    const pageNumber = n + 1;

                                    if (pageNumber === 1 || pageNumber === 2 || pageNumber === currentpage || pageNumber === currentpage - 1 || pageNumber === currentpage + 1 || pageNumber === offset) {
                                        return (
                                            <li className={`page-item${currentpage === pageNumber ? ' active' : ''}`} key={i}>
                                                <a href='#' style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} className='page-link' onClick={() => setcurrentpage(pageNumber)}>
                                                    {pageNumber}
                                                </a>
                                            </li>
                                        );
                                    } else if (pageNumber === offset - 2) {
                                        // Show ellipsis for the middle numbers
                                        return (
                                            <li key={i} className='page-item disabled'>
                                                <span className='page-link'>...</span>
                                            </li>
                                        );
                                    } else {
                                        return null; // Hide other page numbers
                                    }
                                })}


                                <li className={`page-item${currentpage === offset ? ' disabled' : ''}`}>
                                    <a href='#' className='page-link' onClick={nextpage}>
                                        Next
                                    </a>
                                </li>

                                <li className='page-item'>
                                    <select
                                        value={selectedvalue}
                                        onChange={(e) => setselectedvalue(e.target.value)}
                                        className='form-control'
                                    >
                                        <option value='id'>Withdrawal Id</option>
                                        <option value='customerId'>Customer Id</option>
                                        <option value='accountType'>Account Type</option>
                                        <option value='curBalance'>Cur Balance</option>
                                        <option value='preBalance'>Pre Balance</option>
                                        <option value='date'>Date</option>
                                        <option value='deductedAmount'>Commission</option>
                                        <option value='withdrawalAmount'>Withdrawal Amount</option>
                                    </select>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};

export default AllLoan;
