import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "./Loader";

const AgentCustomer = () => {
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // State for the input value
  const [searchResults, setSearchResults] = useState([]);
  const [accDetails, setAccDetails] = useState(null);
  const [phone, setPhone] = useState(null);
  const [showRow, setShowRow] = useState(false);

  const { id } = useParams();

  const AgentCustomer = () => {
    axios
      .get("https://orbitpay.uur.co.in/agent/getCustomers", {
        params: {
          agentId: id,
        },
      })
      .then((response) => {
        console.log("Customer Data", response.data.data);
        setCustomer(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    AgentCustomer();
  }, [id]);

  const handleSearchInput = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchCustomers = () => {
    const filteredResults = customer.filter((customer) => {
      return (
        customer.customerName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        customer.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setSearchResults(filteredResults);
    if (filteredResults.length === 0) {
      alert("No data found");
    }
  };

  const searchByAccountNo = () => {
    if (phone) {
      const PhonefilteredResults = customer.filter((customer) => {
        return customer.phone.includes(phone);
      });
      setAccDetails(PhonefilteredResults);
      console.log("phone Data", PhonefilteredResults);
      setShowRow(true);
      if (PhonefilteredResults.length === 0) {
        alert("No data found");
      }
    }
  };

  const dataToDisplay = searchQuery ? searchResults : customer;

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
            Agent Customers
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              margin: "1% 3% 1% ",
            }}
          ></div>
          <div
            className="d-flex justify-content-end"
            style={{ margin: "1% 3%" }}
          >
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
                {showRow
                  ? accDetails.map((val, index) => {
                      return (
                        <tr key={index}>
                          <td style={{ fontSize: "20px" }}>{val.id}</td>
                          <td style={{ fontSize: "20px" }}>
                            {val?.customerName}
                          </td>
                          <td style={{ fontSize: "20px" }}>
                            {val?.aadhaarNumber}
                          </td>
                          <td style={{ fontSize: "20px" }}>{val?.agentId}</td>
                          <td style={{ fontSize: "20px" }}>{val?.age}</td>
                          <td style={{ fontSize: "20px" }}>{val?.gender}</td>
                          <td style={{ fontSize: "20px" }}>
                            {val?.joiningTime}
                          </td>
                          <td style={{ fontSize: "20px" }}>{val?.address}</td>
                          <td style={{ fontSize: "20px" }}>{val?.phone}</td>
                          <td>
                            <Link
                              style={{ textDecoration: "none" }}
                              to={`/viewdocuments/${val?.id}`}
                            >
                              View Documents
                            </Link>
                          </td>
                          <td>
                            <Link
                              style={{ textDecoration: "none" }}
                              to={`/editcustomer/${val?.id}`}
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
                              to={`/viewaccount/${val?.id}`}
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
                      );
                    })
                  : dataToDisplay.map((val, index) => {
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
                    })}
              </tbody>
            </table>

            {/* <p> <button className="btn btn-warning text-white" onClick={prepage} disabled={currentpage === 1}>pre</button> <button className="btn btn-warning text-white" onClick={nextpage} disabled={currentpage === 5}>next</button> </p> */}
          </div>
        </div>
      )}
    </>
  );
};

export default AgentCustomer;
