import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const Commission = () => {
  const [customer, setCustomer] = useState([]);
  const [currentpage, setcurrentpage] = useState(0); // Start from page 1
  const [date, setdate] = useState(null);
  const [custid, setcustid] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchAccNo, setSearchAccNo] = useState(null);
  const [showRow, setShowRow] = useState(false);
  const [accDetails, setAccDetails] = useState(null);
  const [selectedvalue, setselectedvalue] = useState("id");
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
      .get(
        `https://orbitpay.uur.co.in/commisssion/getAllCommission/${currentpage}/${recordsperpages}/${selectedvalue}`,
      )
      .then((response) => {
        console.log(response);
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
    axios
      .get("https://orbitpay.uur.co.in/commisssion/findByCustomerIdAndDate", {
        params: {
          customerId: custid,
          localDate: date,
        },
      })
      .then((response) => {
        setSearchResults(response.data.data);
        setLoading(false);
        setShowRow(false);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          alert("Data not found");
        } else {
          console.log(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const searchByAccountNo = () => {
    setLoading(true);
    if (searchAccNo) {
      axios
        .get(`https://orbitpay.uur.co.in/commisssion/id/${searchAccNo}`)
        .then((response) => {
          setAccDetails(response.data.data);
          setLoading(false);
          setShowRow(true);
        })
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            alert("Data not found");
          } else {
            console.log(err);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const dataToDisplay = custid ? searchResults : customer;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container-fluid p-5">
          <h1
            className="fw-bold"
            style={{
              textAlign: "center",
              fontFamily: "serif",
              color: "#EB5A3C",
            }}
          >
            Daily Deposit Profit
          </h1>
          <div className="d-flex justify-content-end">
            <p style={{ display: "flex", justifyContent: "end" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search by Customer ID"
                value={custid}
                onChange={(e) => setcustid(e.target.value)}
              />
              <input
                type="date"
                style={{ marginLeft: "2%" }}
                className="form-control"
                value={date}
                onChange={(e) => setdate(e.target.value)}
              />
            </p>
            <p>
              <button
                className="btn"
                style={{
                  marginRight: "5px",
                  marginLeft: "5px",
                  color: "white",
                  background: "#EB5A3C",
                }}
                onClick={searchCustomers}
              >
                Search
              </button>
            </p>
          </div>
          <div className="d-flex justify-content-end">
            <p>
              <input
                type="text"
                className="form-control"
                placeholder="Search by Withdrawal ID"
                value={searchAccNo}
                onChange={(e) => setSearchAccNo(e.target.value)}
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
                onClick={searchByAccountNo}
              >
                Search
              </button>
            </p>
          </div>

          <div
            className="container-fluid"
            style={{ overflowY: "scroll", height: "450px" }}
          >
            <table className="table table-hover table-bordered table-striped ">
              <thead
                className="table-success"
                style={{ position: "sticky", top: -1 }}
              >
                <tr style={{ fontSize: "20px" }}>
                  <th>S. no</th>
                  <th>Withdrawal ID</th>
                  <th>Customer ID</th>
                  <th>Agent ID</th>
                  <th>Account Type</th>
                  <th>Pre Balance</th>
                  <th>Date</th>
                  <th>Commission</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Cur Balance</th>
                </tr>
              </thead>
              <tbody>
                {showRow ? (
                  <tr style={{ fontSize: "20px" }}>
                    <td>1</td>
                    <td>{accDetails?.id}</td>
                    <td>{accDetails?.customerId}</td>
                    <td>{accDetails?.accountType}</td>
                    <td>{accDetails?.preBalance}</td>
                    <td>{accDetails?.date}</td>
                    <td>{accDetails?.deductedAmount}</td>
                    <td>{accDetails?.type}</td>
                    <td>{accDetails?.withdrawalAmount}</td>
                    <td>{accDetails?.curBalance}</td>
                  </tr>
                ) : (
                  dataToDisplay.reverse().map((val, index) => {
                    tc += val.deductedAmount;
                    return (
                      <React.Fragment key={val.id}>
                        <tr style={{ fontSize: "20px" }}>
                          <td style={{ fontSize: "20px" }}>{index + 1}</td>
                          <td style={{ fontSize: "20px" }}>{val.id}</td>
                          <td style={{ fontSize: "20px" }}>{val.customerId}</td>
                          <td style={{ fontSize: "20px" }}>{val.agentId}</td>
                          <td style={{ fontSize: "20px" }}>
                            {val.accountType}
                          </td>
                          <td style={{ fontSize: "20px" }}>
                            {val.preBalance.toFixed(2)}
                          </td>
                          <td style={{ fontSize: "20px" }}>{val.date}</td>
                          <td style={{ fontSize: "20px" }}>
                            {val.deductedAmount.toFixed(2)}
                          </td>
                          <td style={{ fontSize: "20px" }}>{val.type}</td>
                          <td style={{ fontSize: "20px" }}>
                            {val.withdrawalAmount.toFixed(2)}
                          </td>
                          <td style={{ fontSize: "20px" }}>
                            {val.curBalance.toFixed(2)}
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <h5>Total Commission : {tc.toFixed(2)}</h5>

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
                  <option value="id">Withdrawal Id</option>
                  <option value="customerId">Customer Id</option>
                  <option value="accountType">Account Type</option>
                  <option value="curBalance">Cur Balance</option>
                  <option value="preBalance">Pre Balance</option>
                  <option value="date">Date</option>
                  <option value="deductedAmount">Commission</option>
                  <option value="withdrawalAmount">Withdrawal Amount</option>
                </select>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Commission;
