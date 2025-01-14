import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import Cookies from "js-cookie";
import { GoCodeReview } from "react-icons/go";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Dashboard = () => {
  const [transaction, setTransaction] = useState([]);
  const [currentpage, setcurrentpage] = useState(0);
  const [selectdate, setSelectdate] = useState("");
  const [localdate, setlocaldate] = useState(null);
  const [searchId, setId] = useState(null);
  const [idResult, setidResult] = useState([]);
  const [showRow, setShowRow] = useState(false);
  const [Pigmyresult, setpigmyResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedvalue, setselectedvalue] = useState("id");
  const [startDate,setStartDate] = useState(new Date());
  const [endDate,setEndDate] = useState(new Date());

  const [offset, setOffset] = useState(0);
  const [user, setUser] = useState({
    role: "",
  });

  useEffect(() => {
    const storedUser = {
      role: Cookies.get("role"),
    };

    setUser(storedUser);
  }, []);

  const field = selectedvalue;

  const recordsperpages = 10;

  const prepage = () => {
    setcurrentpage(currentpage - 1);
  };

  const nextpage = () => {
    if (currentpage < offset) {
      setcurrentpage(currentpage + 1);
    }
  };

  const searchCustomers = () => {
    console.log(searchId, selectdate);
    setLoading(true);

    axios
      .get(
        "https://unioncooperativesocietylimited.in:8443/transaction/findByAgentIdAndDate",
        {
          params: {
            agentId: searchId,
            localDate: selectdate,
          },
        }
      )
      .then((response) => {
        console.log(response.data.data);
        setidResult(response.data.data);
        // Set the search results in state
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          alert("No Data Found");
          console.log(err);
        } else {
          console.log(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const No_withdrawal = () => {
    console.log(localdate);
    setLoading(true);

    axios
      .get(
        `https://unioncooperativesocietylimited.in:8443/transaction/getCustomersWithNoTransactionsToday/${"DAILY_DEPOSIT"}/${localdate}`
      )
      .then((response) => {
        console.log(response.data);
        setpigmyResult(response.data);
        setShowRow(true);
        // Set the search results in state
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          alert("No Data Found");
          console.log(err);
        } else {
          console.log(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const GetAlltransaction = () => {
    axios
      .get(
        `https://unioncooperativesocietylimited.in:8443/transaction/getAllTransactions/${currentpage}/${recordsperpages}/${field}`
      )
      .then((response) => {
        // console.log(response)
        console.log("Res",response.data.data)

        setTransaction(response.data.data.content);
        setOffset(response.data.data.totalPages);
        setShowRow(false);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Set loading to false in case of an error
      });
  };

  useEffect(() => {
    GetAlltransaction();
  }, [selectedvalue, currentpage]);

  const handleSearchInput = (e) => {
    // setId(e.target.value.toUpperCase())
    setSelectdate(e.target.value);
  };

  const Iddata = searchId ? idResult : transaction;

  // const alldata =localdate ? Pigmyresult : Iddata

  const generateCSV = async() => {
      try {

        const sd = `${startDate?.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, "0")}-${startDate.getDate().toString().padStart(2, "0")}`
        const ed = `${endDate?.getFullYear()}-${(endDate.getMonth() + 1).toString().padStart(2, "0")}-${endDate.getDate().toString().padStart(2, "0")}`
        const response = await axios.get(`https://unioncooperativesocietylimited.in:8443/transaction/generateCsvForDailyDeposit/${sd}/${ed}`)

        const csvData = response.data;


        // Create a Blob containing the CSV data
        const blob = new Blob([csvData], { type: 'text/csv' });

        // Create a download link
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `transaction_DailyDeposit_${sd}_${ed}`;
        link.click();

        // Clean up
        URL.revokeObjectURL(link.href);
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="container-fluid">
          <div className="row">
            <h1
              className="mt-3 fw-bold"
              style={{ textAlign: "center", fontFamily: "serif",color:'#4F6F52' }}
            >
              {" "}
              Daily Deposit
            </h1>

            

            <div
              className="container-fluid"
              style={{ display: "flex", justifyContent: "end" }}
            >
              <p style={{ display: "flex", justifyContent: "end" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Agent ID"
                  value={searchId}
                  onChange={(e) => setId(e.target.value)} // Handle input changes
                />
                <input
                  type="date"
                  className="form-control"
                  style={{ marginLeft: "1%" }}
                  placeholder="Date"
                  value={selectdate}
                  onChange={handleSearchInput} // Handle input changes
                />
              </p>
              <p>
                <button
                  className="btn "
                  style={{ marginLeft: "5px",background:'#4F6F52',color:'white' }}
                  onClick={searchCustomers}
                >
                  Search
                </button>
              </p>
            </div>

            <div
              className="container-fluid"
              style={{ display: "flex", justifyContent: "end" }}
            >
              <p style={{ marginRight: "10px", marginTop: "10px" }}>
                Check For Skip NN
              </p>
              <p style={{ display: "flex", justifyContent: "end" }}>
                <input
                  type="date"
                  className="form-control"
                  style={{ marginLeft: "1%" }}
                  placeholder="Date"
                  value={localdate}
                  onChange={(e) => setlocaldate(e.target.value)} // Handle input changes
                />
              </p>
              <p>
                <button
                  className="btn  "
                  style={{ marginLeft: "5px", background:'#4F6F52',color:'white' }}
                  onClick={No_withdrawal}
                >
                  Search
                </button>
              </p>
            </div>

            <div
              className="container-fluid"
              style={{ display: "flex", justifyContent: "end" }}
            >
              <p style={{ marginRight: "10px", marginTop: "10px" }}>
                Start Date
              </p>
              <DatePicker className='border border-light p-2 rounded-lg' selected={startDate} onChange={(startDate) => setStartDate(startDate)} dateFormat="dd/MM/yy"/>

              <p style={{ marginRight: "10px", marginTop: "10px" }}>
                End Date
              </p>
              <DatePicker className='border border-light p-2 rounded-lg' selected={endDate} onChange={(startDate) => setEndDate(startDate)} dateFormat="dd/MM/yy"/>

              <p>
                <button
                  className="btn  "
                  style={{ marginLeft: "5px", background:'#4F6F52',color:'white' }}
                  onClick={() => generateCSV()}
                >
                  Generate CSV
                </button>
              </p>
            </div>

            <div>
              <div
                className="container-fluid"
                style={{ overflowY: "scroll", height: "450px" }}
              >
                <table className="table table-bordered table-striped table-hover">
                  <thead
                    className="table-success"
                    style={{ position: "sticky", top: -1 }}
                  >
                    <tr style={{ fontSize: "20px" }}>
                      <th>S.no</th>
                      <th>Transaction ID</th>
                      <th>Customer ID</th>
                      <th>Account Number</th>
                      <th>Agent ID</th>
                      <th> Account Type </th>
                      <th>Date </th>
                      <th> Amount</th>
                      <th> Action </th>
                    </tr>
                  </thead>

                  <tbody>
                    {showRow
                      ? Pigmyresult.filter((val) =>
                          val.customerAccount.some(
                            (account) => account.accountType === "DAILY_DEPOSIT"
                          )
                        ).map((val, index) => {
                          return (
                            <tr key={index}>
                              <td key={index}>{index + 1}</td>
                              <td style={{ fontSize: "20px" }}>
                                Not Available
                              </td>
                              <td style={{ fontSize: "20px" }}>{val.id}</td>
                              <td style={{ fontSize: "20px" }}>
                                {
                                  val.customerAccount.find(
                                    (account) => account.accountType === "DAILY_DEPOSIT"
                                  )?.accountNumber
                                }
                              </td>
                              <td style={{ fontSize: "20px" }}>
                                {val.agentId}
                              </td>
                              <td style={{ fontSize: "20px" }}>DAILY DEPOSIT</td>
                              <td style={{ fontSize: "20px" }}>{localdate}</td>
                              <td style={{ fontSize: "20px" }}>NA</td>
                              {/* <td style={{ fontSize: '18px' }}><Link style={{ textDecoration: 'none' }} to={`/viewcustomer/${val.id}`}><p style={{ backgroundColor: 'orange', color: 'white', textAlign: 'center' }}>View</p></Link></td> */}
                            </tr>
                          );
                        })
                      : Iddata.map((val, index) => {
                          return (
                            <tr>
                              <td key={index}>{index + 1}</td>
                              <td style={{ fontSize: "20px" }}>{val.id}</td>
                              <td style={{ fontSize: "20px" }}>
                                {val.customerId}
                              </td>
                              <td style={{ fontSize: "20px" }}>
                                {val.accountNumber}
                              </td>
                              <td style={{ fontSize: "20px" }}>
                                {val.agentId}
                              </td>
                              <td style={{ fontSize: "20px" }}>
                                {val.accountType}
                              </td>
                              <td style={{ fontSize: "20px" }}>
                                {val.localDateTime}
                              </td>
                              <td style={{ fontSize: "20px" }}>{val.amount}</td>
                              <td style={{ fontSize: "18px",display :'flex' }}>
                                <Link
                                  style={{ textDecoration: "none", color:'#4F6F52' }}
                                  to={`/viewcustomer/${val.id}`}
                                >
                                  <p>
                                  <GoCodeReview />
                                  </p>
                                </Link>
                                {user.role === "SUPERADMIN" && (
                                  <Link
                                    to={`/pigmyedit1.2.3.01/${val.id}`}
                                    style={{ textDecoration: "none" ,marginLeft:'25%'}}
                                  >
                                    <p
                                      
                                    >
                                       <CiEdit />
                                    </p>
                                  </Link>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <nav>
            <ul className="pagination justify-content-center">
              <li
                className={`page-item${currentpage === 0 ? " disabled" : ""}`}
              >
                <a href="#" className="page-link" onClick={prepage}>
                  Pre
                </a>
              </li>

              {[...Array(offset).keys()].map((n, i) => {
                const pageNumber = n + 1;

                if (
                  pageNumber === 1 ||
                  pageNumber === 2 ||
                  pageNumber === currentpage ||
                  pageNumber === currentpage - 1 ||
                  pageNumber === currentpage + 1 ||
                  pageNumber === offset
                ) {
                  return (
                    <li
                      className={`page-item${
                        currentpage === pageNumber ? " active" : ""
                      }`}
                      key={i}
                    >
                      <a
                        href="#"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        className="page-link"
                        onClick={() => setcurrentpage(pageNumber)}
                      >
                        {pageNumber}
                      </a>
                    </li>
                  );
                } else if (pageNumber === offset - 2) {
                  // Show ellipsis for the middle numbers
                  return (
                    <li key={i} className="page-item disabled">
                      <span className="page-link">...</span>
                    </li>
                  );
                } else {
                  return null; // Hide other page numbers
                }
              })}

              <li
                className={`page-item${
                  currentpage === offset ? " disabled" : ""
                }`}
              >
                <a href="#" className="page-link" onClick={nextpage}>
                  Next
                </a>
              </li>

              <li className="page-item">
                <select
                  value={selectedvalue}
                  onChange={(e) => setselectedvalue(e.target.value)}
                  className="form-control"
                >
                  <option value="id">Transaction ID</option>
                  <option value="customerId">Customer Id</option>
                  <option value="accountnumber">Account Number</option>
                  <option value="agent id">Agent ID</option>
                  <option value="amount">Amount</option>
                  <option value="accounttype">Account Type</option>
                  <option value="date">Date</option>
                </select>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
