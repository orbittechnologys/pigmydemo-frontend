import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from './Loader';

const ViewCustomer = () => {
    const [loading, setLoading] = useState(false);
    const [viewCustomer, setViewCustomer] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetchCustomer();
    }, [id]);

    const fetchCustomer = () => {
        setLoading(true);
        axios.get(`https://unioncooperativesocietylimited.in:8443/transaction/findByTransactionId/${id}`)
            .then((response) => {
                console.log(response.data.data)
                setViewCustomer(response.data.data);
                // setViewCustomer(response.data.data.transaction);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false); // Set loading to false when request is completed
            });
    };

    return (
        <div className='container mt-5' style={{ width: '700px' }}>
            <div className='card' >
                <div className='card-body'>
                
            {loading ? (
                <Loader />
            ) : (


                    <div className='container' style={{ textAlign: "start", width: '500px' }}>
                        <p className='fw-bold fs-4' style={{color:'#EB5A3C'}}>Customer Details:</p>
                        {/* <p className='fw-bold fs-4'>agentId: <span className='fw-bold fs-5'>{viewCustomer && viewCustomer.agentId}</span></p> */}
                        {/* <p className='fw-bold fs-4'>agentName:<span className='fw-bold fs-5'> {viewCustomer && viewCustomer.agentName}</span></p> */}
                        <p className='fw-bold '>Customer Name: <span >{ viewCustomer && viewCustomer.customerName}</span></p>
                        <p className='fw-bold '>Customer ID: <span >{ viewCustomer && viewCustomer.customerId}</span></p>
                        <p className='fw-bold '>Customer Account Balance:<span > {viewCustomer && viewCustomer.customerAccountBalance}</span></p>
                        
                        <p className='fw-bold fs-4' style={{color:'#EB5A3C'}}>Transaction Details:</p>


                        {
                            viewCustomer && viewCustomer.transaction && (
                                <>
                             <p className='fw-bold '>Account Number: <span >{viewCustomer.transaction.accountNumber}</span></p>
                             <p className='fw-bold '>Account Type: <span >{viewCustomer.transaction.accountType}</span></p>
                             <p className='fw-bold '>Agent ID: <span >{viewCustomer.transaction.agentId}</span></p>
                             <p className='fw-bold '>Amount: <span >{viewCustomer.transaction.amount}</span></p>
                             <p className='fw-bold '>Customer ID: <span >{viewCustomer.transaction.customerId}</span></p>
                             <p className='fw-bold '>Transaction ID: <span>{viewCustomer.transaction.id}</span></p>
                             <p className='fw-bold '>Mode: <span>{viewCustomer.transaction.mode}</span></p>
                             
                             </>
                            )
                        }

                        
                        
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewCustomer;
