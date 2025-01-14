import axios from "axios";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Cutomerbankaccount = () => {
  const [loading, setLoading] = useState(false);

  const [AccountNumber, setAccountNumber] = useState(null);
  const [AccountType, setAccountType] = useState(null);
  const [Balance, setBalance] = useState(null);
  const [AccountCode, setAccountCode] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  const navigate = useNavigate();

  const { custId } = useParams();

  const data = {
    accountCode: AccountCode,
    accountNumber: AccountNumber,
    accountType: AccountType,
    balance: Balance,
    customerId: custId,
    date: `${startDate?.getFullYear()}-${(startDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${startDate.getDate().toString().padStart(2, "0")}`,
  };

  const AddAccount = async (e) => {
    console.log(data);
    e.preventDefault();
    setLoading(true);

    const url = `https://unioncooperativesocietylimited.in:8443/customer/addAccount`;

    try {
      const response = await axios.post(url, data);

      console.log(response.data.data);

      navigate(`/viewaccount/${custId}`);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Customer Account Number already exit");
      } else if (error.response && error.response.status === 404) {
        alert("Customer Not Found");
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="p-5">
          <h3
            className="d-flex justify-content-center fw-bold"
            style={{ fontFamily: "serif", color: "#EB5A3C" }}
          >
            Add Account
          </h3>

          <form onSubmit={AddAccount}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <tr className="me-2">
                <th style={{ width: "80vw", padding: "2% 0 2% 0" }}>
                  Account Number
                </th>
                <input
                  type="text"
                  value={AccountNumber}
                  className="form-control"
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </tr>
              <tr className="me-2">
                <th style={{ width: "80vw", padding: "2% 0 2% 0" }}>
                  Account Type
                </th>
                <select
                  value={AccountType}
                  className="form-control"
                  onChange={(e) => setAccountType(e.target.value)}
                >
                  <option value="">Select Acount Type</option>
                  <option value="SAVING_BANK_ACCOUNT">
                    Saving Bank Account
                  </option>
                  <option value="LOAN">Loan</option>
                  <option value="DAILY_DEPOSIT">Daily Deposit</option>
                  <option value="UNION_GOLD_SCHEME">Union Gold Scheme</option>
                  <option value="UMRAH_RECURRING_DEPOSIT">
                    Umrah Recurring Deposit
                  </option>
                  <option value="RECURRING_DEPOSIT_ACCOUNT">
                    Recurring Deposit Account
                  </option>
                </select>
              </tr>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <tr className="me-2">
                <th style={{ width: "80vw", padding: "2% 0 2% 0" }}>Balance</th>
                <input
                  type="text"
                  value={Balance}
                  className="form-control"
                  onChange={(e) => setBalance(e.target.value)}
                />
              </tr>
              <tr className="me-2">
                <th style={{ width: "80vw", padding: "2% 0 2% 0" }}>
                  Account Code
                </th>
                <input
                  type="text"
                  value={AccountCode}
                  className="form-control"
                  onChange={(e) => setAccountCode(e.target.value.toUpperCase())}
                />
              </tr>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <tr className="">
                <th
                  style={{
                    opacity: "50%",
                    width: "80vw",
                    padding: "2% 0 2% 0",
                  }}
                >
                  Joining Date
                </th>
                <DatePicker
                  className="border border-light p-2 rounded-lg"
                  selected={startDate}
                  onChange={(startDate) => setStartDate(startDate)}
                  dateFormat="dd/MM/yy"
                />
              </tr>
            </div>

            <div
              className="mt-5"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <tr className='me-2'>
                    <th style={{  width: '100vw', padding: '2% 0 2% 0' }}>Customer Id</th>
                    <input type='text'  className='form-control'  />
                </tr> */}

              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Cutomerbankaccount;
