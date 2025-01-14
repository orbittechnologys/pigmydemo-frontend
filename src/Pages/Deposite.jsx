import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from 'react-router-dom'
import Loader from "./Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Deposite = () => {
//   const [Type, setType] = useState(null);
  const [amountAll, setAmountAll] = useState(null);
  const [amount, setAmount] = useState(null);
  const [phoneAll, setPhoneAll] = useState(null);
  const [phone, setPhone] = useState(null);
  const [loading1, setLoadings] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPigmy, setIsPigmy] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [selectedtype, setselectedtype] = useState(null);
  const [selectedAccNumber, setselectedAccNumber] = useState(null);
  const [selectedAgentId, setselectedAgentId] = useState([]);
  const [agentCustomer, setAgentCustomer] = useState([]);
  const [selectedCustomer, setselectedCustomer] = useState([]);
  const [selectedTypeBalance, setSelectedTypeBalance] = useState('');
  const [selectedAccountnumber, setselectedAccountnumber] = useState(null);
  const [mode, setMode] = useState(null);
  const [modeAll, setModeAll] = useState(null);
  const [agent, setAgent] = useState([]);

  const navigate = useNavigate();


  const Allagent = () => {
    axios
      .get('https://unioncooperativesocietylimited.in:8443/agent/getAllAgents')
      .then((response) => {
        console.log(response.data.data);
        setAgent(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    Allagent();
  }, []);

  const AgentCustomer = () => {
    axios
      .get('https://unioncooperativesocietylimited.in:8443/agent/getCustomers',{
       params:{
         agentId : selectedAgentId

       }
      
      })
      .then((response) => {
        console.log("Customer Data",response.data.data);
         setAgentCustomer(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    AgentCustomer();
  }, [selectedAgentId]);

  const fetchAccountBalance = () => {
    // Find the customer whose name matches the selectedCustomer
    const customer = agentCustomer?.find((customer) => customer.id === selectedCustomer);
  
    console.log("inside Customer", customer);
    // Find the account whose type matches the selectedtype
    const account = customer?.customerAccount?.filter((account) => account?.accountType === selectedtype);
    console.log("inside account", account);

  const accNumber =account?.find((number)=>number.accountNumber === selectedAccNumber)
    console.log("Account Data", accNumber)
    // Set the balance of the selected account type
    setSelectedTypeBalance(accNumber?.balance); // Set balance or empty string if not found
  };
  
  useEffect(() => {
    fetchAccountBalance();
  }, [selectedtype, agentCustomer, selectedCustomer,selectedAccNumber]);

  const DepositLoan = async () => {
    setLoadings(true);
    try {
      console.log(amount, phone,selectedAccountnumber);

      if(mode === null){
       
          alert("Please Select Mode")
        
      }

      // Use axios.put and pass data in the request body
      const response = await axios.put(
        "https://unioncooperativesocietylimited.in:8443/transaction/depositOfLoanAmount",
        null,
        {
          params: {
            accountNumber: selectedAccountnumber,
            depositAmount: amount,
            mode:mode,
            phone: phone,
          },
        }
      );
      console.log(response.data); // Log the response if needed
      alert("Deposite Success");
      navigate("/loandetails");
    } catch (error) {
      if (error.response && error.response.status === 402) {
        alert("Customer Account Type Not Found");
      } else if (error.response && error.response.status === 403) {
        alert("Insufficient Balance");
      } else if (error.response && error.response.status === 404) {
        alert("Customer Not Found");
      } else {
        console.error(error);
      }
    } finally {
      setLoadings(false);
    }
  };

  const DepositAll = async () => {

    console.log("Sending Data",selectedAccNumber, amountAll, modeAll, selectedCustomer);

    setLoading(true);

    try {
  
      

      // Use axios.put and pass data in the request body
      const response = await axios.post(
        "https://unioncooperativesocietylimited.in:8443/transaction/newDepositAmount/v2",
        null,
        {
          params: {
            accountNumber: selectedAccNumber,
            customerId: selectedCustomer,
            depositAmount: amountAll,
            mode:modeAll,
          },
        }
      );
      console.log(response.data); // Log the response if needed
      alert("Deposite Success");
      // navigate("/allacctransaction");
      window.location.reload()
    } catch (error) {
      if (error.response && error.response.status === 402) {
        alert("Customer Account Type Not Found");
      } else if (error.response && error.response.status === 403) {
        alert("Insufficient Balance");
      } else if (error.response && error.response.status === 404) {
        alert("Customer Not Found");
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getAllCustomer();
  }, [phoneAll]);

  const getAllCustomer = () => {
    axios
      .get(
        `https://unioncooperativesocietylimited.in:8443/customer/findCustomerByPhoneNumber/${phoneAll}`
      )
      .then((response) => {
        console.log(response.data.data.customerAccount);
        setCustomer(response.data.data.customerAccount);

        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  
  useEffect(() => {
    getAllCustomerAccountNumber();
  }, [phone]);

  const getAllCustomerAccountNumber = () => {
    axios
      .get(
        `https://unioncooperativesocietylimited.in:8443/customer/findCustomerByPhoneNumber/${phone}`
      )
      .then((response) => {
        console.log(response.data.data.customerAccount);
        setCustomer(response.data.data.customerAccount);

        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const styles = {
    div: {
      display: "flex",
      justifyContent: "center",  
    },
    divHover: {
      boxShadow: isHovered ? "rgba(0, 0, 0, 0.35) 0px 5px 15px" : "none",
      padding: isHovered ? "0 0 14% 0" : "none",
      animation: isHovered ? "easy-out 1s delay .5s" : "none",
      animation: isHovered ? " delay .5s" : "none",
     
    },

    divHoverPigmy: {
      padding: isPigmy ? "0 0 5% 0" : "none",
      boxShadow: isPigmy ? "rgba(0, 0, 0, 0.35) 0px 5px 15px" : "none",
      animation: isPigmy ? "easy-out 1s delay .5s" : "none",
      animation: isPigmy ? "delay .5s" : "none",
    },
  };

  return (
    <div
      className="container mt-5"
      style={{ display: "flex", justifyContent: "center" }}
    >
      {/* <div
        className="col-lg-6"
        style={{ display: "flex", justifyContent: "center" }}
      >
          <div className="container">
            <div
              style={
                isHovered ? { ...styles.div, ...styles.divHover } : styles.div
              }
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="mt-5">
                <h3 className="fw-bold" style={{ fontFamily: "serif",color:'#EB5A3C' }}> Loan Deposit Only</h3>
                <div>
                    <tr>
                    <p>
                    <th>Enter Phone Number</th>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Phone number"
                      pattern="[6-9]{1}[0-9]{9}"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </p>

                  <p>
                      <th>Enter Account Number</th>
                      <select
                        value={selectedAccountnumber}
                        name="AccountType"
                        className="form-control"
                        onChange={(e) => setselectedAccountnumber(e.target.value)}
                      >
                        <option value="">Select Account Number</option>
                        {customer.map((type, index) => (
                          // Only render the option if the account type is not "LOAN"
                          type.accountType === "LOAN" && (
                            <option key={index} value={type.accountNumber}>
                              {type.accountNumber}
                            </option>
                          )
                        ))}
                      </select>
                    </p>
                  <p >
                    <th>Enter Amount</th>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </p>
                  </tr>
                  <tr>
               
                  </tr>
                  <tr>
                  <p>
                    <select value={mode} onChange={(e) => setMode(e.target.value)} className="form-control">
                      <option value=''>Select Mode</option>
                      <option value='UPI'>UPI</option>
                      <option value='Cash'>Cash</option>
                    </select> 
                  </p>
                  </tr>
                  </div>

                  <div>{loading1 && <Loader width={30} height={30} />}</div>

                  <div>
                    <input
                      onClick={DepositLoan}
                      style={{ backgroundColor: "#010042" }}
                      className="btn btn-dark mt-3"
                      type="submit"
                      value="Deposit"
                    />
                  </div>
                  </div>
              </div>
            
          </div>
        </div> */}
        <div
        className="col-lg-6"
        style={{ display: "flex", justifyContent: "center" }}
      >
          <div className="container">
            <div
              style={
                isPigmy
                  ? { ...styles.div, ...styles.divHoverPigmy }
                  : styles.div
              }
              onMouseEnter={() => setIsPigmy(true)}
              onMouseLeave={() => setIsPigmy(false)}
            >
              <div className="mt-5">
                <h3 className="fw-bold" style={{ fontFamily: "serif",color:'#EB5A3C' }}>All Type Deposit</h3>

                <div >

                <p>
                    <th>Select Agent Id</th>
                    <select
                        value={selectedAgentId}
                        name="AccountType"
                        className="form-control"
                        onChange={(e) => setselectedAgentId(e.target.value)}
                      >
                        <option value="">Select Agent Id</option>
                        {agent.map((type, index) => (
                          // Only render the option if the account type is not "LOAN"
                           
                            <option key={index} value={type.id}>
                              {type.id}
                            </option>
                          
                        ))}
                      </select>
                  </p>

                  <p>
                      <th>Select Customer Name</th>
                      <select
                        value={selectedCustomer}
                        name="AccountType"
                        className="form-control"
                        onChange={(e) => setselectedCustomer(e.target.value)}
                      >
                        <option value="">Select Customer Name</option>
                        {agentCustomer.map((type, index) => (
                          // Only render the option if the account type is not "LOAN"
                          
                            <option key={index} value={type.id}>
                              {type.customerName} 
                              {/* [{selectedAccNumber} {selectedtype}] */}
                            </option>
                          
                        ))}
                      </select>
                    </p>


                    <p>
                    <th>Select Account Type</th>
                    <select
                      value={selectedtype}
                      name="AccountType"
                      className="form-control"
                      onChange={(e) => setselectedtype(e.target.value)}
                    >
                      <option value="">Select Account Type</option>
                      {agentCustomer && agentCustomer
                        .filter((customer) => customer.id === selectedCustomer)
                        .map((customer) => {
                          // Create a Set to store unique account types
                          const uniqueAccountTypes = new Set();
                          customer.customerAccount.forEach((val) => {
                            uniqueAccountTypes.add(val.accountType);
                          });
                          // Map over the unique account types and create options
                          return Array.from(uniqueAccountTypes).map((accountType, index) => (
                            <option key={index} value={accountType}>
                              {accountType}
                            </option>
                          ));
                        })
                      }
                    </select>
                  </p>

                    <p>
                    <th>Select Account Number</th>
                      <select
                        id="accountNumber"
                        value={selectedAccNumber}
                        name="AccountNumber"
                        className="form-control"
                        onChange={(e) => setselectedAccNumber(e.target.value)}
                      >
                        <option value="">Select Account Number</option>
                        {agentCustomer && agentCustomer
                          .filter((customer) => customer.id === selectedCustomer)
                          .map((customer) =>
                            customer.customerAccount
                              .filter((account) => account.accountType === selectedtype) // Filter accounts by selected account type
                              .map((account, index) => (
                                <option key={index} value={account.accountNumber}>
                                  {account.accountNumber}
                                </option>
                              ))
                          )
                        }
                      </select>
                    </p>

                    <p>Account Balance : {selectedTypeBalance}</p>
                  <p >
                    <th>Enter Amount</th>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Amount"
                      value={amountAll}
                      onChange={(e) => setAmountAll(e.target.value)}
                    />
                  </p>

                  
                  <p>
                    <select value={modeAll} onChange={(e) => setModeAll(e.target.value)} className="form-control">
                      <option value=''>Select Mode</option>
                      <option value='UPI'>UPI</option>
                      <option value='Cash'>Cash</option>
                    </select> 
                  </p>
                 

                  
                  <div>{loading && <Loader width={30} height={30} />}</div>

                  <div>
                    <input
                      onClick={DepositAll}
                      style={{ backgroundColor: "#010042" }}
                      className="btn btn-dark mt-3"
                      type="submit"
                      value="Deposit"
                    />
                  </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Deposite;
