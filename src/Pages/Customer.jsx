import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import "../App.css";
import { AiFillPlusCircle } from "react-icons/ai";

const Customer = () => {
  const [customer, setCustomer] = useState([]);
  const [currentpage, setcurrentpage] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // State for the input value
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState(null);
  const [showRow, setShowRow] = useState(false);
  const [accDetails, setAccDetails] = useState(null);
  const [offset, setOffset] = useState(0);

  const field = "id";

  useEffect(() => {
    getAllCustomer();
  }, [currentpage]);

  const recordsperpages = 10;
  // const lastindex = currentpage * recordsperpages;
  // const firstindex = lastindex - recordsperpages;
  // const records = customer.slice(firstindex, lastindex);
  // const npage = Math.ceil(customer.length / recordsperpages)
  // const numbers = [...Array(npage + 1).keys()].slice(1);
  // // const field = 'id'
  // // const pageSize = 3
  // // const offset = 0

  // const prepage = () => {
  //     if (currentpage !== 1) {
  //         setcurrentpage(currentpage - 1)
  //     }
  // }

  // const nextpage = () => {
  //     if (currentpage !== npage) {
  //         setcurrentpage(currentpage + 1)
  //     }
  // }

  const prepage = () => {
    setcurrentpage(currentpage - 1);
    getAllCustomer(currentpage - 1);
  };

  const nextpage = () => {
    if (currentpage < offset) {
      setcurrentpage(currentpage + 1);
    }
    getAllCustomer(currentpage + 1);
  };

  const handleSearchInput = (event) => {
    setSearchQuery(event.target.value);
  };

  const getAllCustomer = () => {
    axios
      .get(
        `https://pigmy.uur.co.in:8443//customer/getAllCustomers/${currentpage}/${recordsperpages}/${field}`
      )
      .then((response) => {
        console.log(response.data.data.content);
        setCustomer(response.data.data.content);
        setOffset(response.data.data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };
  // const No_withdrawal = () => {
  //     console.log(localdate)
  //     setLoading(true);

  //     axios
  //         .get(`https://pigmy.uur.co.in:8443/transaction/getCustomersWithNoTransactionsToday/${'Pigmy'}/${localdate}`)
  //         .then((response) => {
  //             console.log(response.data);
  //             setpigmyResult(response.data);
  //             setShowRow(true);
  //             // Set the search results in state

  //         })
  //         .catch(err => {
  //             if (err.response && err.response.status === 404) {
  //                 alert("No Data Found");
  //                 console.log(err);
  //             } else {
  //                 console.log(err);
  //             }
  //         })
  //         .finally(() => {
  //             setLoading(false);
  //         })
  // };

  const searchCustomers = () => {
    axios
      .get(`https://pigmy.uur.co.in:8443/customer/query/${searchQuery}`)
      .then((response) => {
        console.log(response.data);
        setSearchResults(response.data.data);
        setLoading(false); // Set the search results in state
        setShowRow(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const searchByAccountNo = () => {
    if (phone) {
      axios
        .get(
          `https://pigmy.uur.co.in:8443/customer/findCustomerByPhoneNumber/${phone}`
        )
        .then((response) => {
          console.log(response.data.data);
          setAccDetails(response.data.data);
          setLoading(false); // Set the search results in state
          setShowRow(true);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  };
  // Determine which data to display in the table
  const dataToDisplay = searchQuery ? searchResults : customer;

  const downloadCsv = async () => {
    try {
      const res = await axios.get(
        "https://pigmy.uur.co.in:8443/transaction/generateCsvForAllCustomers",
        { responseType: "blob" }
      );

      const blob = new Blob([res.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "AllCustomers.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container-fluid p-3">
          <h1
            className="fw-bold"
            style={{
              textAlign: "center",
              fontFamily: "serif",
              color: "#EB5A3C",
            }}
          >
            Customers
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              margin: "1% 3% 1% ",
            }}
          >
            <div>
              <Link to="/addcustomer">
                <button
                  style={{
                    fontSize: "16px",
                    fontFamily: "serif",
                    background: "#EB5A3C",
                    color: "whitesmoke",
                  }}
                  className="btn"
                >
                  Add Customer{" "}
                </button>
              </Link>
            </div>
          </div>
          <div
            className="d-flex justify-content-between flex-wrap flex-md-nowrap "
            style={{ margin: "1% 3%" }}
          >
            <div className="mb-md-0 mb-lg-0 mb-4">
              <button
                style={{
                  marginRight: "5px",
                  marginLeft: "5px",

                  padding: "5px 10px",
                  background: "#EB5A3C",
                  color: "white",
                  borderRadius: "5px",
                  border: "none",
                }}
                onClick={downloadCsv}
              >
                Download CSV
              </button>
            </div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <p>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Name or ID"
                    value={searchQuery}
                    onChange={handleSearchInput} // Handle input changes
                  />
                </p>
                <p>
                  <button
                    className="btn "
                    style={{
                      marginRight: "5px",
                      marginLeft: "5px",
                      background: "#EB5A3C",
                      color: "white",
                    }}
                    onClick={searchCustomers}
                  >
                    Search
                  </button>
                </p>
              </div>

              <p>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Phone No"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)} // Handle input changes
                />
              </p>
              <p>
                <button
                  className="btn"
                  style={{
                    marginRight: "5px",
                    marginLeft: "5px",
                    background: "#EB5A3C",
                    color: "white",
                  }}
                  onClick={searchByAccountNo}
                >
                  Search
                </button>
              </p>
            </div>
          </div>

          {/* <div className='container-fluid' style={{ display: 'flex', justifyContent: 'end' }}>
                        <p style={{marginRight:'10px',marginTop:'10px'}}>Check For Skip NN</p>
                            <p style={{ display: 'flex', justifyContent: 'end' }}>
                                
                                <input type='date' className='form-control' style={{ marginLeft: '1%' }} placeholder='Date'
                                    value={localdate}
                                    onChange={(e)=>setlocaldate(e.target.value)} // Handle input changes
                                />
                            </p>
                            <p><button className='btn btn-warning ' style={{ marginLeft: '5px' }} onClick={No_withdrawal}>Search</button></p>

                        </div> */}

          <div
            className="container-fluid"
            style={{ overflowY: "scroll", height: "450px" }}
          >
            <table
              className="table table-hover table-bordered table-striped"
              style={{ overflowX: "scroll", width: "2000px" }}
            >
              <thead
                className="table-success"
                style={{ position: "sticky", top: -1 }}
              >
                <tr style={{ textAlign: "center" }}>
                  {/* <th>S. no</th> */}
                  <th style={{ fontSize: "20px" }}>Customer ID</th>
                  <th style={{ fontSize: "20px" }}>Customer Name</th>
                  <th style={{ fontSize: "20px" }}>Aadhar Number</th>
                  <th style={{ fontSize: "20px" }}>Agent ID</th>
                  <th style={{ fontSize: "20px" }}>Age</th>
                  <th style={{ fontSize: "20px" }}>Gender</th>
                  <th style={{ fontSize: "20px" }}>Joining Date</th>
                  <th style={{ fontSize: "20px" }}>Address</th>
                  <th style={{ fontSize: "20px" }}>Phone No</th>
                  <th style={{ fontSize: "20px" }}>Documents</th>
                  <th style={{ fontSize: "20px" }}>Action</th>
                  <th style={{ fontSize: "20px" }}>View Account</th>
                </tr>
              </thead>
              <tbody>
                {showRow ? (
                  <tr>
                    <td style={{ fontSize: "20px" }}>{accDetails.id}</td>
                    <td style={{ fontSize: "20px" }}>
                      {accDetails?.customerName}
                    </td>
                    <td style={{ fontSize: "20px" }}>
                      {accDetails?.aadhaarNumber}
                    </td>
                    <td style={{ fontSize: "20px" }}>{accDetails?.agentId}</td>
                    <td style={{ fontSize: "20px" }}>{accDetails?.age}</td>
                    <td style={{ fontSize: "20px" }}>{accDetails?.gender}</td>
                    <td style={{ fontSize: "20px" }}>
                      {accDetails?.joiningTime}
                    </td>
                    <td style={{ fontSize: "20px" }}>{accDetails?.address}</td>
                    <td style={{ fontSize: "20px" }}>{accDetails?.phone}</td>
                    <td>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/viewdocuments/${accDetails?.id}`}
                      >
                        View Documents
                      </Link>
                    </td>
                    <td>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/editcustomer/${accDetails?.id}`}
                      >
                        <p
                          style={{
                            backgroundColor: "orange",
                            color: "white",
                            textAlign: "center",
                          }}
                        >
                          Edit
                        </p>
                      </Link>
                    </td>
                    <td>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/viewaccount/${accDetails?.id}`}
                      >
                        <p
                          style={{
                            backgroundColor: "green",
                            color: "white",
                            textAlign: "center",
                          }}
                        >
                          View Account
                        </p>
                      </Link>
                    </td>
                  </tr>
                ) : (
                  dataToDisplay.map((val, index) => {
                    return (
                      <React.Fragment key={val.id}>
                        <tr>
                          <td>{val.id}</td>
                          {/* <td>{index + 1}</td> */}
                          <td style={{ fontSize: "20px" }}>
                            {val.customerName}
                          </td>
                          <td style={{ fontSize: "20px" }}>
                            {val.aadhaarNumber}
                          </td>
                          <td style={{ fontSize: "20px" }}>{val.agentId}</td>
                          <td style={{ fontSize: "20px" }}>{val.age}</td>
                          <td style={{ fontSize: "20px" }}>{val.gender}</td>
                          <td style={{ fontSize: "20px" }}>
                            {val.joiningTime}
                          </td>
                          <td style={{ fontSize: "20px" }}>{val.address}</td>
                          <td style={{ fontSize: "20px" }}>{val.phone}</td>
                          <td>
                            <Link
                              style={{ textDecoration: "none" }}
                              to={`/viewdocuments/${val.id}`}
                            >
                              View Documents
                            </Link>
                          </td>
                          <td>
                            <Link
                              style={{ textDecoration: "none" }}
                              to={`/editcustomer/${val.id}`}
                            >
                              <p
                                style={{
                                  backgroundColor: "orange",
                                  color: "white",
                                  textAlign: "center",
                                }}
                              >
                                Edit
                              </p>
                            </Link>
                          </td>
                          <td>
                            <Link
                              style={{ textDecoration: "none" }}
                              to={`/viewaccount/${val.id}`}
                            >
                              <p
                                style={{
                                  backgroundColor: "green",
                                  color: "white",
                                  textAlign: "center",
                                }}
                              >
                                View Account
                              </p>
                            </Link>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </table>

            {/* <p> <button className="btn btn-warning text-white" onClick={prepage} disabled={currentpage === 1}>pre</button> <button className="btn btn-warning text-white" onClick={nextpage} disabled={currentpage === 5}>next</button> </p> */}
          </div>
          {/* <nav>
                        <ul className='pagination'>
                            <li className='page-item'>
                                <a href='#' className='page-link'
                                    onClick={prepage}>Pre</a>

                            </li>
                            {
                                numbers.map((n, i) => (
                                    <li className={`page-item${currentpage === n ? 'active' : ''}`} key={i}>
                                        <a href='#' className='page-link'
                                            onClick={() => setcurrentpage(n)}>
                                            {n}
                                        </a>

                                    </li>
                                ))
                            }


                            <li className='page-item'>
                                <a href='#' className='page-link'
                                    onClick={nextpage}>Next</a>

                            </li>

                        </ul>
                    </nav> */}

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
                  pageNumber === offset - 1
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
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Customer;
