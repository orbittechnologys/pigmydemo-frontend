import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Otp = () => {
  const [uuid, setOtp] = useState("");
  const [status, setStatus] = useState("");
  const [newPassword, setpassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const SubmitOtp = (e) => {
    setLoading(true);
    //console.log(formValues.username)
    e.preventDefault();
    axios
      .patch(
        `https://orbitpay.uur.co.in/agent/password/forget/${uuid}/${newPassword}`,
        {
          uuid: uuid,
          newPassword: newPassword,
        },
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 200) {
          navigate("/agent");
        }
      })
      .catch((error) => {
        console.log(error);
        setStatus("otp not valid.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="container mt-2" style={{ textAlign: "center" }}>
        <h1
          className="fw-bold"
          style={{ fontFamily: "serif", color: "#EB5A3C" }}
        >
          {" "}
          ONE TIME PASSWORD
        </h1>

        <form onSubmit={SubmitOtp}>
          <div className="mb-3 mt-3">
            <input
              type="text"
              value={uuid}
              name="otp"
              className="form-control"
              placeholder="Enter your unique id received on your registered email"
              required
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <div className="mb-3 mt-3">
            <input
              type="text"
              value={newPassword}
              name="otp"
              className="form-control"
              placeholder="Enter your new password"
              onChange={(e) => setpassword(e.target.value)}
              pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*._-])[A-Za-z0-9!@#$%^&*._-]{8,}$"
              title="Password must contain at least one capital letter, one number, one special character, and be at least 6 and max 15 characters long."
              required
            />
          </div>

          <input type="submit" className="btn btn-dark" value="Verify Otp" />
        </form>
        <div width={50} height={40}>
          {loading && <Loader width={30} height={30} />}
        </div>

        <p className="text-danger"> {status}</p>
      </div>
    </div>
  );
};

export default Otp;
