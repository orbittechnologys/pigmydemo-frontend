import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Loader from "./Loader";
import { AiFillPlusCircle } from "react-icons/ai";
import { Modal } from "react-bootstrap";
import { BASE_URL } from "../constants";

const ViewAccount = () => {
  const [loading, setLoading] = useState(false);
  const [editdata, setEditData] = useState([]);
  const [updateAcc, setUpdateAcc] = useState(null);
  const [accNo, setAccNo] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://pigmy.uur.co.in:8443/customer/id/${id}`)
      .then((result) => {
        console.log(result.data.data);
        setEditData(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleSave = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/accounts/updateCustomerAccountNo`,
        {
          accountNumber: accNo,
          id: updateAcc.id,
        }
      );
      console.log(res.data);
      alert("Updated Successfully");
    } catch (error) {
      console.log(error);
      alert("Error while updating");
    } finally {
      handleClose();
      window.location.reload();
    }
  };

  return (
    <div className="container-fluid">
      {loading ? (
        <Loader />
      ) : (
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "start",
            alignContent: "start",
          }}
        >
          <div className="container d-flex justify-content-center mt-2 mb-5">
            <h2 style={{ color: "#597E52" }}>
              All Account Details Of {editdata?.customerName}{" "}
            </h2>
          </div>
          <div className="container d-flex justify-content-end mb-4">
            <Link to={`/cutomerbankaccount/${editdata.id}`}>
              <button
                style={{
                  fontSize: "18px",
                  fontFamily: "serif",
                  background: "#597E52",
                  color: "white",
                }}
                className="btn"
              >
                Add Account{" "}
              </button>
            </Link>
          </div>

          {editdata &&
            editdata.customerAccount?.map((val, index) => {
              return (
                <div className="col-lg-4 mb-5">
                  <div key={index + 1}>
                    <p style={{ fontSize: "20px" }}>
                      <span className="fw-bold">Customer Name </span>:{" "}
                      {editdata?.customerName}
                    </p>
                    <p style={{ fontSize: "20px" }}>
                      <span className="fw-bold">Account Number </span>:{" "}
                      {val.accountNumber}
                    </p>
                    <p style={{ fontSize: "20px" }}>
                      <span className="fw-bold">Account Code </span>:{" "}
                      {val.accountCode}
                    </p>
                    <p style={{ fontSize: "20px" }}>
                      {" "}
                      <span className="fw-bold">Account Type </span> :{" "}
                      {val.accountType}
                    </p>
                    <p style={{ fontSize: "20px" }}>
                      {" "}
                      <span className="fw-bold">Account Balance </span>:{" "}
                      {val.balance.toFixed(2)}
                    </p>
                    <p style={{ fontSize: "20px" }}>
                      {" "}
                      <span className="fw-bold">
                        Account Created Date{" "}
                      </span>: {val.date}
                    </p>
                    <button
                      type="button"
                      style={{ marginLeft: "10px" }}
                      className="btn btn-primary"
                      onClick={() => {
                        setUpdateAcc(val);
                        setAccNo(val.accountNumber);
                        handleShow();
                      }}
                    >
                      Edit Account
                    </button>
                  </div>
                </div>
              );
            })}

          <Modal show={show} onHide={handleClose} style={{ marginTop: "10em" }}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p style={{ fontSize: "20px" }}>
                <span className="fw-bold">Account Number </span>:
                <input
                  style={{ marginLeft: "1em" }}
                  value={accNo}
                  onChange={(e) => setAccNo(e.target.value)}
                />{" "}
              </p>
              <p style={{ fontSize: "20px" }}>
                <span className="fw-bold">Account Code </span>:{" "}
                {updateAcc?.accountCode}
              </p>
              <p style={{ fontSize: "20px" }}>
                {" "}
                <span className="fw-bold">Account Type </span> :{" "}
                {updateAcc?.accountType}
              </p>
              <p style={{ fontSize: "20px" }}>
                {" "}
                <span className="fw-bold">Account Balance </span>:{" "}
                {updateAcc?.balance.toFixed(2)}
              </p>
              <p style={{ fontSize: "20px" }}>
                {" "}
                <span className="fw-bold">Account Created Date </span>:{" "}
                {updateAcc?.date}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={() => handleSave()}>Save Changes</button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default ViewAccount;
