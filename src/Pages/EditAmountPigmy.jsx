import React, { useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
// import { useParams } from "react-router-dom";

const EditAmountPigmy = () => {
  const [amountadd, setamountadd] = useState(null);
  const [amountLess, setamountLess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [Account, setAccount] = useState(null);

  const navigate = useNavigate();

  const { pigmyId } = useParams();

  const pigmyTypeADD = async () => {
    setLoading(true);
    console.log(pigmyId, amountadd);
    try {
      // Use axios.put and pass data in the request body
      const response = await axios.patch(
        `https://orbitpay.uur.co.in:8443/transaction/updateTransactionToAddAmount/${pigmyId}/${amountadd}`,
      );
      console.log(response.data); // Log the response if needed
      alert("Amount Changes Success");
      navigate("/dashboard");
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

  const pigmyTypeLESS = async () => {
    setLoading1(true);
    console.log(pigmyId, amountLess);
    try {
      // Use axios.put and pass data in the request body
      const response = await axios.patch(
        `https://orbitpay.uur.co.in:8443/transaction/updateTransactionToLessAmount/${pigmyId}/${amountLess}`,
      );
      console.log(response.data); // Log the response if needed
      alert("Amount Changes Success");
      navigate("/dashboard");
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

  return (
    <div className="container-fluid">
      <div>
        <h2
          className="mt-4 fw-bold"
          style={{ fontFamily: "serif", textAlign: "center", color: "#EB5A3C" }}
        >
          Select Edit Of Amount
        </h2>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: "2%" }}
        >
          <div>
            <select
              value={Account}
              className="form-control"
              onChange={(e) => setAccount(e.target.value)}
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <option value="">Select Type of Amount</option>
              <option value="Add">Add Amount</option>
              <option value="Less">Less Amount</option>
            </select>

            {Account === "Add" && (
              <div className="mt-2" style={{ alignItems: "center" }}>
                <tr>
                  <p>
                    <th>Enter Amount</th>
                    <input
                      type="text"
                      className="form-control"
                      value={amountadd}
                      onChange={(e) => setamountadd(e.target.value)}
                    />
                  </p>
                </tr>
                <div>{loading && <Loader width={30} height={30} />}</div>

                <div>
                  <input
                    onClick={pigmyTypeADD}
                    style={{ backgroundColor: "#010042" }}
                    className="btn btn-dark mt-3"
                    type="submit"
                    value="Add Amount"
                  />
                </div>
              </div>
            )}

            {Account === "Less" && (
              <div className="mt-2" style={{ alignItems: "center" }}>
                <tr>
                  <p>
                    <th>Enter Amount</th>
                    <input
                      type="text"
                      className="form-control"
                      value={amountLess}
                      onChange={(e) => setamountLess(e.target.value)}
                    />
                  </p>
                </tr>
                <div>{loading1 && <Loader width={30} height={30} />}</div>
                <div>
                  <input
                    onClick={pigmyTypeLESS}
                    style={{ backgroundColor: "#010042" }}
                    className="btn btn-dark mt-3"
                    type="submit"
                    value="Less Amount"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAmountPigmy;
