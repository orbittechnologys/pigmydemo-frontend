import axios from "axios";
import React, { useEffect } from "react";
import AWS from "aws-sdk";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import uploadToAzureStorage from "./uploadToAzureStorage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Addcustomer = () => {
  const [loading, setLoading] = useState(false);

  const [customerName, setcustomerName] = useState(null);
  const [age, setAge] = useState(null);
  const [email, setemail] = useState("");
  const [agentId, setagentId] = useState(null);
  const [aadhaarNumber, setaadhaarNumber] = useState(null);
  const [phone, setphone] = useState(null);
  const [gender, setgender] = useState(null);
  const [address, setaddress] = useState(null);

  const [AdharCardfileURL, setFileUrlAdhar] = useState(
    "https://cdn.icon-icons.com/icons2/3001/PNG/512/default_filetype_file_empty_document_icon_187718.png"
  );
  const [ProfileImagesfileURL, setFileUrlProfile] = useState(
    "https://cdn.icon-icons.com/icons2/3001/PNG/512/default_filetype_file_empty_document_icon_187718.png"
  );
  const [getagentId, setgetagentId] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  // const [showPassword,setShowPassword]=useState(false)

  // const togglePassword=()=>{
  //     setShowPassword(!showPassword)
  // }

  const navigate = useNavigate();

  const customervalue = {
    customerName: customerName,
    age: age,
    email: email?.length == 0 ? null : email,
    agentId: agentId,
    phone: phone,
    gender: gender,
    address: address,
    aadhaarNumber: aadhaarNumber,
    customerAadharImage: AdharCardfileURL,
    customerProfilePic: ProfileImagesfileURL,
    joiningTime: `${startDate?.getFullYear()}-${(startDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${startDate.getDate().toString().padStart(2, "0")}`,
  };

  const addcustomer = (e) => {
    console.log(customervalue);
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        "https://unioncooperativesocietylimited.in:8443/customer/save",
        customervalue
      )
      .then((response) => {
        console.log(response.data.data);
        const custId = response.data.data?.id;
        alert("customer saved");
        navigate(`/cutomerbankaccount/${custId}`);
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          alert("Customer Already Exists");
          console.log(err);
        } else {
          console.log(err);
        }
      })

      .finally(() => {
        setLoading(false); // Set loading to false when request is completed
      });
  };

  useEffect(() => {
    getagentid();
  }, []);

  const getagentid = () => {
    axios
      .get("https://unioncooperativesocietylimited.in:8443/agent/getAllAgents")
      .then((response) => {
        console.log(response.data.data);
        setgetagentId(response.data.data);
      });
  };

  // for uploading adharCard Images

  // Function to upload file to s3
  // const uploadFileAdhar = async (file) => {

  //   if (!file) {
  //     alert("Please select a file before uploading.");
  //     return;
  //   }

  //   // S3 Bucket Name
  //   const S3_BUCKET = "awsbucket99999";

  //   // S3 Region
  //   const REGION = 'ap-south-1';

  //   // S3 Credentials
  //   AWS.config.update({
  //     accessKeyId: "AKIAYFMI43FZSI5XSR4D",
  //     secretAccessKey: "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",
  //   });
  //   const s3 = new AWS.S3({
  //     params: { Bucket: S3_BUCKET },
  //     region: REGION,
  //   });

  //   // Files Parameters

  //   const params = {
  //     Bucket: S3_BUCKET,
  //     Key: "Pigmi/Customer/AdharCard/" + file.name,

  //     Body: file,
  //   };

  //   // Uploading file to s3

  //   var upload = s3
  //     .putObject(params)
  //     .on("httpUploadProgress", (evt) => {
  //       // File uploading progress
  //       // console.log(
  //       //   "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
  //       // );
  //       // setUploadPercent("Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%")
  //     })
  //     .promise();

  //   await upload.then((err, data) => {
  //     console.log(err);
  //     // const fileURL = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/unionpigmyimages/${file.name}`;
  //     const AdharCardfileURL = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/Pigmi/Customer/AdharCard/${file.name}`;
  //     // Fille successfully uploaded
  //     console.log(AdharCardfileURL)
  //     setFileUrlAdhar(AdharCardfileURL)
  //     alert("File uploaded successfully.");
  //   });
  // };

  const uploadFileAdhar = async (file) => {
    const folderName = "Pigmy/Customer/AdharCard/";

    if (file) {
      const blobName = file.name;
      const AdharCardfileURL = await uploadToAzureStorage(
        file,
        folderName,
        blobName
      );
      setFileUrlAdhar(AdharCardfileURL);
      alert("Aadhaar Card uploaded successfully.");
    }
  };

  // for uploading Profile Images

  // Function to upload file to s3
  // const uploadFileProfile = async (file) => {

  //   if (!file) {
  //     alert("Please select a file before uploading.");
  //     return;
  //   }

  //   // S3 Bucket Name

  //   const S3_BUCKET = "awsbucket99999";

  //   // S3 Region
  //   const REGION = 'ap-south-1';

  //   // S3 Credentials
  //   AWS.config.update({
  //     accessKeyId: "AKIAYFMI43FZSI5XSR4D",
  //     secretAccessKey: "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",
  //   });
  //   const s3 = new AWS.S3({
  //     params: { Bucket: S3_BUCKET },
  //     region: REGION,
  //   });

  //   // Files Parameters

  //   const params = {
  //     Bucket: S3_BUCKET,
  //     // Key: "unionpigmyimages/" + file.name,
  //     Key: "Pigmi/Customer/ProfileImages/" + file.name,
  //     // Key: "unionpigmyimages/" + file.name,
  //     Body: file,
  //   };

  //   // Uploading file to s3

  //   var upload = s3
  //     .putObject(params)
  //     .on("httpUploadProgress", (evt) => {
  //       // File uploading progress
  //       // console.log(
  //       //   "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
  //       // );
  //       // setUploadPercent("Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%")
  //     })
  //     .promise();

  //   await upload.then((err, data) => {
  //     console.log(err);
  //     // const fileURL = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/unionpigmyimages/${file.name}`;
  //     const ProfileImagesfileURL = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/Pigmi/Customer/ProfileImages/${file.name}`;
  //     // Fille successfully uploaded
  //     console.log(ProfileImagesfileURL)
  //     setFileUrlProfile(ProfileImagesfileURL)
  //     alert("File uploaded successfully.");
  //   });
  // };

  const uploadFileProfile = async (file) => {
    const folderName = "Pigmy/Customer/ProfileImages/";

    if (file) {
      const blobName = file.name;
      const PanCardURL = await uploadToAzureStorage(file, folderName, blobName);
      console.log(PanCardURL);
      setFileUrlProfile(PanCardURL);
      alert("Profile Image uploaded successfully.");
    }
  };

  // Function to handle file and store it to file state
  const handleFileChangeAAdhar = async (e) => {
    // Uploaded file
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // Changing file state
    setFileUrlAdhar(file);

    await uploadFileAdhar(file);

    // await uploadFileProfile(file);
  };

  const handleFileChangeProfile = async (e) => {
    // Uploaded file
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // Changing file state
    setFileUrlProfile(file);

    await uploadFileProfile(file);
    // await uploadFileProfile(file);
  };

  return (
    <div className="container-fluid p-3">
      {loading ? (
        <Loader />
      ) : (
        <div className="row">
          <div className="d-flex justify-content-center">
            <h1
              className="fw-bold"
              style={{ fontFamily: "serif", color: "#4F6F52" }}
            >
              {" "}
              Add Customer
            </h1>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              className="mt-3"
              style={{
                display: "flex",
                justifyContent: "center",
                marginLeft: "5%",
              }}
            >
              <img width={180} src={AdharCardfileURL} alt="not found" />
            </div>

            <div
              className="mt-3"
              style={{
                display: "flex",
                justifyContent: "center",
                marginLeft: "5%",
              }}
            >
              <img width={180} src={ProfileImagesfileURL} alt="not found" />
            </div>
          </div>

          <div className="col-lg-12 p-5">
            <form onSubmit={addcustomer}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <tr className="me-3">
                  <th style={{ width: "80vw", padding: "2% 0 2% 0" }}>
                    Full Name
                  </th>
                  <input
                    type="text"
                    value={customerName}
                    className="form-control"
                    onChange={(e) => setcustomerName(e.target.value)}
                    required
                  />
                </tr>

                <tr className="me-3">
                  <th style={{ width: "80vw", padding: "2% 0 2% 0" }}>Age</th>
                  <input
                    type="tel"
                    value={age}
                    className="form-control"
                    onChange={(e) => setAge(e.target.value)}
                    required
                    pattern="[0-9]{2}" // Add your desired pattern for a 10-digit mobile number
                    title="Please enter a valid number" // Add a title for accessibility
                  />
                </tr>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <tr className="me-3">
                  <th style={{ width: "80vw", padding: "2% 0 2% 0" }}>
                    Email ID
                  </th>
                  <input
                    type="email"
                    value={email}
                    className="form-control"
                    onChange={(e) => setemail(e.target.value)}
                    title="Enter  Valid Email"
                  />
                </tr>
                <tr>
                  <p>
                    <th style={{ width: "80vw", padding: "4% 0 2% 0" }}>
                      Select Agent ID
                    </th>
                    <select
                      value={agentId}
                      name="AccountType"
                      className="form-control"
                      onChange={(e) => setagentId(e.target.value)}
                    >
                      <option value="">Select Id</option>
                      {getagentId.map((type, index) => (
                        <>
                          <option key={index} value={type.id}>
                            {type.id}
                          </option>
                        </>
                      ))}
                    </select>
                  </p>
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
                  <th style={{ width: "80vw", padding: "2% 0 2% 0" }}>
                    Aadhaar Card Image
                  </th>
                  <input
                    type="file"
                    className="form-control"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleFileChangeAAdhar}
                  />
                  {/* <input onClick={uploadFileAdhar} className='btn btn-success m-2' value='Upload' readOnly /> */}
                </tr>
                <tr className="me-2">
                  <th style={{ width: "80vw", padding: "2%  0 2% 0" }}>
                    Profile Image
                  </th>
                  <input
                    type="file"
                    className="form-control"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleFileChangeProfile}
                  />
                </tr>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <tr className="me-3">
                  <th style={{ width: "80vw", padding: "2%  0 2% 0" }}>
                    Phone
                  </th>
                  <input
                    type="text"
                    value={phone}
                    className="form-control"
                    onChange={(e) => setphone(e.target.value)}
                    pattern="[6-9]{1}[0-9]{9}" // Add your desired pattern for a 10-digit mobile number
                    title="Please enter a valid 10-digit mobile number" // Add a title for accessibility
                    required
                  />
                </tr>
                <tr>
                  <th style={{ width: "80vw", padding: "2% 0 2% 0" }}>
                    Gender
                  </th>

                  <select
                    value={gender}
                    className="form-control"
                    onChange={(e) => setgender(e.target.value)}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {/* <input type='text'  value={gender} className='form-control' onChange={e=>setgender(e.target.value)} 
                                    
                                    required /> */}
                </tr>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <tr className="me-3">
                  <th style={{ width: "80vw", padding: "2% 0 2% 0" }}>
                    Aadhaar Number
                  </th>
                  <input
                    type="text"
                    value={aadhaarNumber}
                    className="form-control"
                    onChange={(e) => setaadhaarNumber(e.target.value)}
                    pattern="[0-9]{12}" // Add your desired pattern for a 10-digit mobile number
                    title="Please enter a valid 12-digit Aadhar Number" // Add a title for accessibility
                    required
                  />
                </tr>
                <tr className="me-3">
                  <th style={{ width: "80vw", padding: "2% 0 2% 0" }}>
                    Address
                  </th>
                  <input
                    value={address}
                    className="form-control"
                    onChange={(e) => setaddress(e.target.value)}
                    required
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
                  justifyContent: "end",
                  alignItems: "end",
                }}
              >
                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Addcustomer;

{
  /* <tr>
                                    <th style={{  width: '80vw', padding: '2%  0 2% 0' }}>Set Password</th>
                                    {showPassword ? (
                                        <input
                                            type='text'
                                            
                                            value={customervalue.password}
                                            className='form-control'
                                            onChange={e=>setcustomervalue(e.target.value)}
                                        />
                                    ) : (
                                        <input
                                            type='password'
                                            value={customervalue.password}
                                            className='form-control'
                                            onChange={e=>setcustomervalue(e.target.value)}
                                        />
                                    
                                    )}
                                    <label>
                                        Show Password
                                        <input
                                            type='checkbox'
                                            checked={showPassword}
                                            onChange={togglePassword}
                                        />
                                    </label>
                                </tr> */
}
