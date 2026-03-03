import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const AdminVerify = ({ setIsLoggedIn }) => {
  const [uuid, setOtp] = useState("");
  const [status, setStatus] = useState("");

  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const SubmitOtp = (e) => {
    setloading(true);

    //console.log(formValues.username)
    e.preventDefault();
    axios
      .get("https://orbitpay.uur.co.in/admin/otp", {
        params: {
          otp: uuid,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 200) {
          setIsLoggedIn(true); // Set login status to true
          navigate("/dashboard"); // Redirect to the dashboard
        }
      })
      .catch((error) => {
        console.log(error);
        setStatus("otp not valid.");
      })
      .finally(() => {
        setloading(false);
      });
  };

  return (
    <div>
      <div className="container mt-5" style={{ textAlign: "center" }}>
        <h1 className="fw-bold" style={{ fontFamily: "serif" }}>
          {" "}
          Verify OTP
        </h1>

        <form onSubmit={SubmitOtp}>
          <div
            className="mb-3 mt-3"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <input
              type="text"
              value={uuid}
              name="otp"
              className="form-control w-25"
              placeholder="Enter your otp"
              required
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <input type="submit" className="btn btn-success" value="Verify Otp" />
        </form>

        <div width={50} height={40}>
          {loading && <Loader width={30} height={30} />}
        </div>

        <p className="text-danger"> {status}</p>
      </div>
    </div>
  );
};

export default AdminVerify;
