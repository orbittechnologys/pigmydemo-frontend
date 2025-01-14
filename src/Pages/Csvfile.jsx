import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';

const Csvfile = () => {
  const [AgentId, setAgentId] = useState(null);
  const [selectedDate, setSelectDate] = useState('');
  const [loading2, setLoading2] = useState(false);
  const [loading1, setLoadings] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Account, setAccount] = useState(null)
  const [accountType, setAccountType] = useState(null)
  const [phone, setPhone] = useState(null)
  const [startDate, setStartdate] = useState(null)
  const [endDate, setEnddate] = useState(null)
  const [phonedata, setphonedata] = useState(null)
  const [selectstartdate, setselectstartdate] = useState(null)
  const [selectenddate, setselectenddate ] = useState(null)
  
 


  const handleAgentIdChange = (e) => {
    setAgentId(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectDate(e.target.value);
  };

  const Csvfile = (e) => {
    e.preventDefault();
    setLoadings(true);
    console.log(AgentId, selectedDate)

    axios
      .get(`https://unioncooperativesocietylimited.in:8443/transaction/csv/${AgentId}/${selectedDate}`)
      .then((response) => {
        // Extract CSV data from the response
        console.log(response)
        const csvData = response.data;


        // Create a Blob containing the CSV data
        const blob = new Blob([csvData], { type: 'text/csv' });

        // Create a download link
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `transaction${AgentId}_${selectedDate}data.csv`;
        link.click();

        // Clean up
        URL.revokeObjectURL(link.href);
        console.log(response.data)
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          alert("Data not found");
          console.log(err);
        } else {
          console.log(err);
        }
      })
      .finally(() => {
        setLoadings(false); // Set loading to false when request is completed
      });
  };

  useEffect(() => {
    searchByAccountNo()
  }, [phone])


  const searchByAccountNo = () => {
    if (phone) {
      axios
        .get(`https://unioncooperativesocietylimited.in:8443/customer/findCustomerByPhoneNumber/${phone}`)
        .then((response) => {
          console.log(response.data.data.customerAccount);
          setphonedata(response.data.data.customerAccount);
          setLoading(false); // Set the search results in state

        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }


  const Csvfile_For_Type = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(phone, accountType, startDate,endDate)

    axios
      .get(`https://unioncooperativesocietylimited.in:8443/transaction/customerTransactionCSV/${phone}/${accountType}/${startDate}/${endDate}`)
      .then((response) => {
        // Extract CSV data from the response
        console.log(response)
        const csvData = response.data;


        // Create a Blob containing the CSV data
        const blob = new Blob([csvData], { type: 'text/csv' });

        // Create a download link
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `transaction_${phone}_${accountType}_${startDate}_${endDate}_data.csv`;
        link.click();

        // Clean up
        URL.revokeObjectURL(link.href);
        console.log(response.data)
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          alert("Data not found");
          console.log(err);
        } else {
          console.log(err);
        }
      })
      .finally(() => {
        setLoading(false); // Set loading to false when request is completed
      });
  };


  const Csvfile_All = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(AgentId, selectedDate)

    axios
      .get(`https://unioncooperativesocietylimited.in:8443/transaction/customerTransactionCsvForAllAccountTypes/${phone}/${startDate}/${endDate}`)
      .then((response) => {
        // Extract CSV data from the response
        console.log(response)
        const csvData = response.data;


        // Create a Blob containing the CSV data
        const blob = new Blob([csvData], { type: 'text/csv' });

        // Create a download link
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `transaction_${phone}_${startDate}_${endDate}_data.csv`;
        link.click();

        // Clean up
        URL.revokeObjectURL(link.href);
        console.log(response.data)
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          alert("Data not found");
          console.log(err);
        } else {
          console.log(err);
        }
      })
      .finally(() => {
        setLoading(false); // Set loading to false when request is completed
      });
  };


  const Csvfile_AllTransaction = (e) => {
    e.preventDefault();
    setLoading2(true);
    console.log(AgentId, selectedDate)

    axios
      .get(`https://unioncooperativesocietylimited.in:8443/transaction/generateAllCustomersCsvForAllAccountTypes/${selectstartdate}/${selectenddate}`)
      .then((response) => {
        // Extract CSV data from the response
        console.log(response)
        const csvData = response.data;


        // Create a Blob containing the CSV data
        const blob = new Blob([csvData], { type: 'text/csv' });

        // Create a download link
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `transaction_${selectstartdate}_${selectenddate}_data.csv`;
        link.click();

        // Clean up
        URL.revokeObjectURL(link.href);
        console.log(response.data)
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          alert("Data not found");
          console.log(err);
        } else {
          console.log(err);
        }
      })
      .finally(() => {
        setLoading2(false); // Set loading to false when request is completed
      });
  };

  return (

    <div className='container-fluid'>
      <h1 className='mt-3 fw-bold' style={{ textAlign: 'center',fontFamily:"serif",color:'#4F6F52' }}>Download Reports</h1>
      <div className='row'>



        <div className='col-lg-4' style={{ display: 'flex', justifyContent: 'center' }}>
          <div>
            <h3 style={{fontFamily:'serif', color:'#4F6F52'}} className='mt-5'>Reports For Daily Deposit</h3>
            <div className='mt-5'>
              <tr>
                <th>Agent ID</th>
                <td>
                  <input type='text' value={AgentId} className='form-control' onChange={handleAgentIdChange} />
                </td>
              </tr>
            </div>
            <div className='mt-5'>
              <tr>
                <th>Select Date</th>
                <td>
                  <input type='date' value={selectedDate} className='form-control' onChange={handleDateChange} />
                </td>
              </tr>
            </div>
            <div>
              {loading1 && <Loader width={30} height={30} />}
            </div>
            <div>
              <input onClick={Csvfile} style={{ backgroundColor: '#010042' }} className='btn btn-dark mt-3' type='submit' value='Download' />
            </div>
          </div>
        </div>



        <div className='col-lg-4' style={{ display: 'flex', justifyContent: 'center' }}>
          <div >



            <h3 style={{ width: '30vw', fontSize: '25px', fontFamily:"serif",color:'#4F6F52'  }} className='mt-5'> Reports For All Account Types</h3>
            <select value={Account} className='form-control' onChange={e => setAccount(e.target.value)}>

              <option value=''>Select Type of Account</option>
              <option value='Type'>Single Type</option>
              <option value='alltype'>All Type</option>
            </select>
            {Account === 'Type' && (
              <>

                <p className='m-2'>
                  <label>Enter Phone Number</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter Phone number'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  /></p>

                <p className='m-2'>
                  <label>Enter Account Type</label>
                  <select value={accountType} name='AccountType' className='form-control' onChange={(e) => setAccountType(e.target.value)}>

                    <option value='' disabled>Select Account Type</option>
                    {phonedata && phonedata.map((type, index) => (
                      <option key={index} value={type.accountType}>{type?.accountType}</option>
                    ))}
                  </select>
                </p>

                <p className='m-2'>
                  <label>Enter Start Date</label>
                  <input
                    type='date'
                    className='form-control'

                    value={startDate}
                    onChange={(e) => setStartdate(e.target.value)}
                  /></p>

                <p className='m-2'>
                  <label>Enter End Date</label>
                  <input
                    type='date'
                    className='form-control'

                    value={endDate}
                    onChange={(e) => setEnddate(e.target.value)}
                  /></p>

                <div>
                  <input onClick={Csvfile_For_Type} style={{ backgroundColor: '#010042' }} className='btn btn-dark mt-3' type='submit' value='Download' />
                </div>
              </>
            )}

            {Account === 'alltype' && (
              <>
                <p className='m-2'>
                  <label>Enter Phone Number</label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter Phone Number'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  /></p>


                <p className='m-2'>
                  <label>Enter Start Date</label>
                  <input
                    type='date'
                    className='form-control'

                    value={startDate}
                    onChange={(e) => setStartdate(e.target.value)}
                  /></p>

                <p className='m-2'>
                  <label>Enter End Date</label>
                  <input
                    type='date'
                    className='form-control'
                    placeholder='Enter other End Date'
                    value={endDate}
                    onChange={(e) => setEnddate(e.target.value)}
                  /></p>



                <div>
                  <input onClick={Csvfile_All} style={{ backgroundColor: '#010042' }} className='btn btn-dark mt-3' type='submit' value='Download' />
                </div>
              </>
            )}

            <div>
              {loading && <Loader width={30} height={30} />}
            </div>

          </div>
        </div>


        <div className='col-lg-4' style={{ display: 'flex', justifyContent: 'center' }}>
          <div>
            <h3 style={{fontFamily:'serif', color:'#4F6F52'}} className='mt-5'>Reports For All Customers</h3>
            <div className='mt-5'>
              <tr>
                <th>Start Date</th>
                <td>
                  <input type='date' value={selectstartdate} className='form-control' onChange={(e)=>setselectstartdate(e.target.value)} />
                </td>
              </tr>
            </div>
            <div className='mt-5'>
              <tr>
                <th>End Date</th>
                <td>
                  <input type='date' value={selectenddate} className='form-control' onChange={(e)=>setselectenddate(e.target.value)} />
                </td>
              </tr>
            </div>
            <div>
              {loading2 && <Loader width={30} height={30} />}
            </div>
            <div>
              <input onClick={Csvfile_AllTransaction} style={{ backgroundColor: '#010042' }} className='btn btn-dark mt-3' type='submit' value='Download' />
            </div>
          </div>
        </div>




      </div>

    </div>



  );
};

export default Csvfile;
