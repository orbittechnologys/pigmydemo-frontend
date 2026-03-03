import React, { useEffect, useState } from "react";
import { Switch } from "antd";
import axios from "axios";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { GrFormSearch } from "react-icons/gr";
import { AiFillPlusCircle } from "react-icons/ai";

const Alladmin = () => {
  const [agent, setAgent] = useState([]);
  const [userName, setuserName] = useState(""); // State for the input value
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Allagent();
  }, []);

  const handleSearchInput = (event) => {
    setuserName(event.target.value);
  };

  const Allagent = () => {
    axios
      .get("https://orbitpay.uur.co.in//admin/getAllAdmin")
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

  const searchCustomers = () => {
    axios
      .get(`https://orbitpay.uur.co.in/admin/getAdminbyname/${userName}`)
      .then((response) => {
        console.log(response.data.data);
        setSearchResults(response.data.data); // Set the search results in state
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const dataToDisplay = userName ? searchResults : agent;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container-fluid 100vh 100vw">
          <h1
            className="fw-bold"
            style={{
              display: "flex",
              justifyContent: "center",
              fontFamily: "serif",
              marginTop: "1%",
              color: "#EB5A3C",
            }}
          >
            All Admin
          </h1>

          <div className="row">
            <div style={{ display: "flex", justifyContent: "end" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  marginRight: "2%",
                }}
              >
                <p>
                  <input
                    className="form-control"
                    style={{ width: "100%" }}
                    placeholder="Search By Name"
                    value={userName}
                    onChange={handleSearchInput} // Handle input changes
                  />
                </p>

                <p>
                  <button
                    className="btn"
                    style={{
                      marginLeft: "5px",
                      padding: "6px 25px",
                      background: "#EB5A3C",
                      color: "white",
                    }}
                    onClick={searchCustomers}
                  >
                    Search
                  </button>
                </p>
              </div>

              <div>
                <p>
                  <Link to="/addadmin">
                    <button
                      style={{
                        fontSize: "16px",
                        fontFamily: "serif",
                        background: "#EB5A3C",
                        color: "whitesmoke",
                      }}
                      className="btn"
                    >
                      Add Admin{" "}
                    </button>
                  </Link>
                </p>
              </div>
            </div>

            <div className="container-fluid">
              <div className="row">
                {dataToDisplay.map((val, index) => (
                  // <div className='col-lg-3 mt-5' style={{ textAlign: 'center' }} key={index}>

                  //   <div className='card' style={{ border: '1px solid black', height: '100%' }}>
                  //     <a style={{ textDecoration: 'none' }}>
                  //       <div className='card-header' style={{ border: 'none' }}>
                  //         <img width={200} height={150} style={{ borderRadius: '20px' }} src={val.adminProfilePic} alt='not found' />
                  //       </div>
                  //     </a>

                  //     <div className='card-body' style={{ textAlign: 'justify' }}>
                  //       <h6>{val.adminName}</h6>
                  //       <h6>{val.email}</h6>
                  //       <h6>{val.phone}</h6>
                  //       <h6 style={{ fontSize: '12px' }}>{val.address}</h6>

                  //     </div>
                  //   </div>
                  // </div>

                  <div
                    className="col-lg-2 mt-5"
                    style={{
                      marginLeft: "3%",
                      width: "250px",
                      textAlign: "center",
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    }}
                    key={index}
                  >
                    <div
                      style={{
                        width: "225px",
                        height: "120px",
                        background:
                          "linear-gradient(180deg, rgba(5, 255, 0, 0.87) 0%, rgba(5, 250, 0, 0.4) 100%)",
                        borderRadius: "10px",
                      }}
                    >
                      <img
                        src={val.adminProfilePic}
                        style={{
                          width: "100px",
                          height: "90px",
                          borderRadius: "50%",
                          marginTop: "40%",
                          border: "5px solid white",
                        }}
                        alt="not found"
                      />
                    </div>
                    <div style={{ width: "240px", overflow: "hidden" }}>
                      <h4
                        style={{
                          textAlign: "center",
                          marginTop: "22%",
                          fontSize: "26px",
                        }}
                      >
                        {val.adminName}
                      </h4>
                    </div>
                    <div style={{ width: "240px", overflow: "hidden" }}>
                      <h4
                        style={{
                          textAlign: "center",
                          fontSize: "15px",
                          marginBottom: "15%",
                        }}
                      >
                        {val.email}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Alladmin;
