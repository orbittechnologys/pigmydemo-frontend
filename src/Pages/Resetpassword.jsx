import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Resetpassword = () => {
  const Navigate = useNavigate();

  const [email, setemail] = useState("");
  const [status, setstatus] = useState("");
  const [loading, setLoading] = useState(false);

  const resetpass = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post(
        `https://pigmy.uur.co.in:8443/agent/password/verifyEmailBeforeUpdatePassword/${email}`,
        email
      )
      .then((respose) => {
        console.log(respose.data);

        if (respose.data.status === 200) {
          Navigate("/otp");
        }
      })
      .catch((err) => {
        console.log(err);
        setstatus("Email not Valid");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h1
        className="mt-3 fw-bold"
        style={{ fontFamily: "serif", color: "#EB5A3C" }}
      >
        Enter Your Email
      </h1>
      <form onSubmit={resetpass}>
        <input
          className="form-control"
          value={email}
          type="text"
          placeholder="Enter Email"
          onChange={(e) => setemail(e.target.value)}
        />
        <p>{status}</p>
        <input className="btn btn-dark mt-3" type="submit" />
      </form>
      <div width={50} height={40}>
        {loading && <Loader width={30} height={30} />}
      </div>
    </div>
  );
};

export default Resetpassword;
