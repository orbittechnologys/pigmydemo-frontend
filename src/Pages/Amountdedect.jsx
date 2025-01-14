import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

const Amountdedect = () => {
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [selectedid, setselectedid] = useState(null);
  const [phone, setphone] = useState(null);
  const [typephone, setTypephone] = useState(null);
  const [ddAccNo, setDDAccNo] = useState(null);
  const [selectedtype, setselectedtype] = useState(null);
  const [amount, setamount] = useState(null);
  const [allamount, setallamount] = useState(null);
  // const [accountTypes, setAccountTypes] = useState([]);
  const [isPigmy, setIsPigmy] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [ddAccount,setDDAccount] = useState(null);
  const [secAccNo, setSecAccNo] = useState(null);

  const [account,setAccount] = useState(null);



  const navigate = useNavigate();
  const data = {
    selectedtype: selectedtype,
    selectedid: phone,
    amount: amount,
  };

  const pigmyType = async () => {
    setLoading(true);
    try {
      console.log(data);
      // Use axios.put and pass data in the request body
      const response = await axios.put(
        "https://unioncooperativesocietylimited.in:8443/customer/withDrawalOfAmount",
        null,
        {
          params: {
            accountNumber: ddAccNo,
            withdrawAmount: amount,
          },
        }
      );
      console.log(response.data); // Log the response if needed
      alert("withdrawal Success");
      navigate("/commission");
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

  const Alltypewithdrawal = async () => {
    setLoading1(true);
    try {
      console.log(data);
      // Use axios.put and pass data in the request body
      const response = await axios.put(
        "https://unioncooperativesocietylimited.in:8443/transaction/withdrawalOfAllAccountTypeAmount",
        null,
        {
          params: {
            accountNumber:secAccNo,
            withdrawalAmount: allamount,
          },
        }
      );
      console.log(response.data); // Log the response if needed
      alert("withdrawal Success");
      navigate("/allacctransaction");
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
      setLoading1(false);
    }
  };

  useEffect(() => {
    getAllCustomer();
  }, [phone]);

  const getAllCustomer = () => {
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
      boxShadow:isHovered ?  'rgba(0, 0, 0, 0.35) 0px 5px 15px':'none',
      padding: isHovered ? '0 0 6% 0' : 'none',
      animation : isHovered ? 'easy-out 1s delay .5s':'none',
      animation : isHovered ? ' delay .5s':'none'
    },

    divHoverPigmy: {
      
      padding: isPigmy ? '0 0 20% 0' : 'none',
      boxShadow:isPigmy ?  'rgba(0, 0, 0, 0.35) 0px 5px 15px':'none',
      animation : isPigmy ? 'easy-out 1s delay .5s':'none',
      animation : isPigmy ? 'delay .5s':'none'
    },
  };

  const handleDDAccountSearch = async() => {
    try {
      const res = await axios.get(`${BASE_URL}/accounts/app/fetchAccount/${ddAccNo}`);
      console.log(res.data);
      if(res.data.data.accountType != "DAILY_DEPOSIT"){
        alert('Please enter DD account number only');
      }else{
        setDDAccount(res.data.data);
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  const handleAccountSearch = async() => {
    try {
      const res = await axios.get(`${BASE_URL}/accounts/app/fetchAccount/${secAccNo}`);
      console.log(res.data);
      if(res.data.data.accountType == "DAILY_DEPOSIT" || res.data.data.accountType == "LOAN"){
        alert('Please use DD withdrawal, If entered Loan cannot withdraw Loan');
      }else{
        setAccount(res.data.data);
      }
      
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div
      className="container mt-5"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div
        className="col-lg-6"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="container">
          <div
           style={isPigmy ? { ...styles.div, ...styles.divHoverPigmy } : styles.div}
           onMouseEnter={() => setIsPigmy(true)}
           onMouseLeave={() => setIsPigmy(false)}
           >
            <div className="px-5">
              <h3 className="mt-5 fw-bold" style={{ fontFamily: "serif",color:'#EB5A3C' }}>
              Daily Deposit Withdrawal Amount
              </h3>

              <div className="mt-5">
                <tr >
                 
                    <th>Enter Account Number</th>
                    <td>
                    <input
                      type="text"
                      value={typephone}
                      onChange={(e) =>
                        setDDAccNo(e.target.value.toUpperCase())
                      }
                      className="form-control"
                    />
                    </td>
                    
                    <td>
                    <button className="btn btn-success" style={{backgroundColor:'#EB5A3C'}} type="button" onClick={() => handleDDAccountSearch()}>
                      Search
                    </button>
                    </td>
                   
                </tr>
                {ddAccount ? (
                  <>
               
                  <tr >
                   
                   <th>Account Number</th>
                   <td> {ddAccount?.accountNumber} </td>
                 
               </tr>
               <tr>
                
                   <th>Account Balance</th>
                   <td> {ddAccount?.balance} </td>
                 
               </tr>
               <tr>
                
                   <th>Customer ID</th>
                   <td> {ddAccount?.customer?.id} </td>
                 
               </tr>
               <tr>
                
                   <th>Customer Name</th>
                   <td> {ddAccount?.customer?.customerName} </td>
                 
               </tr>
               <tr>
                
                   <th>Customer Mobile</th>
                   <td> {ddAccount?.customer?.phone}  </td>
                 
               </tr>
                 
                  

                  <tr>
                  <p>
                    <th>Enter Amount</th>
                    <input
                      type="text"
                      className="form-control"
                      value={amount}
                      onChange={(e) => setamount(e.target.value)}
                    />
                  </p>
                </tr>
                <div>
                <input
                  onClick={pigmyType}
                  style={{ backgroundColor: "#010042" }}
                  className="btn btn-dark mt-3"
                  type="submit"
                  value="WITHDRAW"
                />
              </div>
                  </>
                ):``

                }

              </div>
              <div>{loading && <Loader width={30} height={30} />}</div>
              
            </div>
          </div>
        </div>
      </div>

      <div
        className="col-lg-6"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="container">
          <div
           style={isPigmy ? { ...styles.div, ...styles.divHoverPigmy } : styles.div}
           onMouseEnter={() => setIsPigmy(true)}
           onMouseLeave={() => setIsPigmy(false)}
           >
            <div className="px-5">
              <h3 className="mt-5 fw-bold" style={{ fontFamily: "serif",color:'#EB5A3C' }}>
               All Type Withdrawal Amount
              </h3>

              <div className="mt-5">
                <tr >
                 
                    <th>Enter Account Number</th>
                    <td>
                    <input
                      type="text"
                      value={typephone}
                      onChange={(e) =>
                        setSecAccNo(e.target.value.toUpperCase())
                      }
                      className="form-control"
                    />
                    </td>
                    
                    <td>
                    <button className="btn btn-success" style={{backgroundColor:'#EB5A3C'}} type="button" onClick={() => handleAccountSearch()}>
                      Search
                    </button>
                    </td>
                   
                </tr>
                {account ? (
                  <>
               
                  <tr >
                   
                   <th>Account Number</th>
                   <td> {account?.accountNumber} </td>
                 
               </tr>
               <tr>
                
                   <th>Account Balance</th>
                   <td> {account?.balance} </td>
                 
               </tr>
               <tr>
                
                   <th>Customer ID</th>
                   <td> {account?.customer?.id} </td>
                 
               </tr>
               <tr>
                
                   <th>Customer Name</th>
                   <td> {account?.customer?.customerName} </td>
                 
               </tr>
               <tr>
                
                   <th>Customer Mobile</th>
                   <td> {account?.customer?.phone}  </td>
                 
               </tr>
                 
                  

                  <tr>
                  <p>
                    <th>Enter Amount</th>
                    <input
                      type="text"
                      className="form-control"
                      value={allamount}
                      onChange={(e) => setallamount(e.target.value)}
                    />
                  </p>
                </tr>
                <div>
                <input
                  onClick={Alltypewithdrawal}
                  style={{ backgroundColor: "#010042" }}
                  className="btn btn-dark mt-3"
                  type="submit"
                  value="WITHDRAW"
                />
              </div>
                  </>
                ):``

                }

              </div>
              <div>{loading && <Loader width={30} height={30} />}</div>
              
            </div>
          </div>
        </div>
      </div>

      {/* <div
        className="col-lg-6"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="container">
          <div 
        style={isHovered ? { ...styles.div, ...styles.divHover } : styles.div}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          >
            <div>
              <h3 style={{ fontFamily: "serif" ,color:'#EB5A3C'}} className="mt-5 fw-bold">
                All Type Withdrawal Amount
              </h3>
              <div className="mt-5">
                <tr>
                  <p className="next">
                    <th>Enter Phone Number</th>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setphone(e.target.value.toUpperCase())}
                      className="form-control"
                    />
                  </p>
                </tr>
              </div>
              <div className="mt-2">
                <tr>
                  <p className="next">
                    <th style={{ marginLeft: "5px" }}>Select Account</th>
                    <select
                      value={selectedtype}
                      name="AccountType"
                      className="form-control"
                      onChange={(e) => setselectedtype(e.target.value)}
                    >
                      <option value="">Select Account</option>
                      {customer.map((type, index) => (
                        type.accountType !== "DAILY_DEPOSIT" && type.accountType !== "LOAN" && (

                          <option key={index} value={type.accountType}>
                          {type.accountType}
                        </option>
                          )
                      ))}
                    </select>
                  </p>
                </tr>
                <tr>
                  <p>
                    <th>Enter Amount</th>
                    <input
                      type="text"
                      className="form-control"
                      value={allamount}
                      onChange={(e) => setallamount(e.target.value)}
                    />
                  </p>
                </tr>
              </div>
              <div>{loading1 && <Loader width={30} height={30} />}</div>
              <div>
                <input
                  onClick={Alltypewithdrawal}
                  style={{ backgroundColor: "#010042" }}
                  className="btn btn-dark mt-3"
                  type="submit"
                  value="withdraw"
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Amountdedect;
