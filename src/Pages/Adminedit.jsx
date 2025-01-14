import React, { useEffect, useState } from "react";
// import { RxAvatar } from "react-icons/rx"
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AWS from "aws-sdk";
// import { Upload } from 'antd';
import Loader from "./Loader";
import Cookies from "js-cookie";
import uploadToAzureStorage from "./uploadToAzureStorage";

const Adminedit = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState();
  const [editdata, seteditdata] = useState({
    adminName: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    adminProfilePic: "",
  });

  const [user, setUser] = useState({
    role: "",
  });

  useEffect(() => {
    const storedUser = {
      role: Cookies.get("role"),
    };

    setUser(storedUser);
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://pigmy.uur.co.in:8443/admin/id/${id}`)
      .then((result) => {
        console.log(result.data.data);
        seteditdata({ ...result.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Function to upload Profile Image
  //    const uploadFileProfile = async () => {

  //     if (!profileImageFile) {
  //         alert("Please select a file before uploading.");
  //         return;
  //       }

  //     const S3_BUCKET = 'awsbucket99999';
  //     const REGION = 'ap-south-1';

  //     AWS.config.update({
  //         accessKeyId: "AKIAYFMI43FZSI5XSR4D",
  //         secretAccessKey: "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",
  //     });

  //     const s3 = new AWS.S3({
  //         params: { Bucket: S3_BUCKET },
  //         region: REGION,
  //     });

  //     const params = {
  //         Bucket: S3_BUCKET,
  //         Key: `Pigmi/Admin/ProfileImages/${profileImageFile.name}`,
  //         Body: profileImageFile,
  //     };

  //     try {
  //         await s3.putObject(params).promise();
  //         const agentProfileImage = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/Pigmi/Admin/ProfileImages/${profileImageFile.name}`;
  //         console.log(agentProfileImage);
  //         seteditdata({ ...editdata, adminProfilePic: agentProfileImage });
  //         alert('Profile Image uploaded successfully.');
  //     } catch (error) {
  //         console.error(error);
  //     }
  // };

  const uploadFileProfile = async () => {
    const folderName = "Pigmy/Admin/ProfileImage/";

    if (profileImageFile) {
      const blobName = profileImageFile.name;
      const AdminProfileImage = await uploadToAzureStorage(
        profileImageFile,
        folderName,
        blobName
      );
      seteditdata({ ...editdata, adminProfilePic: AdminProfileImage });
      alert("Profileimage uploaded successfully.");
    }
  };

  // Function to handle file change for Profile Image
  const handleProfileImageFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    setProfileImageFile(selectedFile);
  };

  useEffect(() => {
    // Call upload function when aadharCardFile changes
    if (profileImageFile) {
      uploadFileProfile();
    }
  }, [profileImageFile]);

  // ... (rest of the code)

  const editform = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      adminName: editdata.adminName,
      phone: editdata.phone,
      email: editdata.email,
      address: editdata.address,
      password: editdata.password,
      adminProfilePic: editdata.adminProfilePic,
      id: id,
      role: user.role,
    };
    console.log(data);
    axios
      .put("https://pigmy.uur.co.in:8443/admin/updateAdmin", data)
      .then((response) => {
        console.log(response);
        alert("Update successfully");
        navigate("/alladmin");
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when request is completed
      });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="d-flex justify-content-center mt-5">
              <h2 className="fw-bold" style={{ fontFamily: "serif" }}>
                {" "}
                Edit Admin
              </h2>
            </div>

            <div
              className="mt-3"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img
                style={{ borderRadius: "20px" }}
                width={200}
                height={200}
                src={editdata.adminProfilePic}
                alt="not found"
              />
            </div>

            <div className="col-lg-12">
              <div className="p-5">
                <form onSubmit={editform}>
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
                        value={editdata.adminName}
                        className="form-control"
                        onChange={(e) =>
                          seteditdata({
                            ...editdata,
                            adminName: e.target.value,
                          })
                        }
                      />
                    </tr>

                    <tr className="me-3">
                      <th style={{ width: "80vw", padding: "2% 0 2% 0" }}>
                        Mobile No
                      </th>
                      <input
                        type="tel"
                        value={editdata.phone}
                        className="form-control"
                        onChange={(e) =>
                          seteditdata({ ...editdata, phone: e.target.value })
                        }
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
                        value={editdata.email}
                        className="form-control"
                        onChange={(e) =>
                          seteditdata({ ...editdata, email: e.target.value })
                        }
                      />
                    </tr>
                    <tr className="me-3">
                      <th style={{ width: "80vw", padding: "2%  0 2% 0" }}>
                        Address
                      </th>
                      <textarea
                        type="text"
                        value={editdata.address}
                        className="form-control"
                        onChange={(e) =>
                          seteditdata({ ...editdata, address: e.target.value })
                        }
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
                      <th style={{ width: "100vw", padding: "2% 0 2% 0" }}>
                        Admin Profile image
                      </th>
                      <input
                        type="file"
                        name="adminProfilePic"
                        accept=".png, .jpg, .jpeg"
                        className="form-control"
                        onChange={handleProfileImageFileChange}
                      />
                      {/* <input onClick={uploadFileProfile} value={Upload} className='btn btn-success m-2' readOnly /> */}
                    </tr>
                  </div>
                  <div
                    className="mt-3"
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "end",
                    }}
                  >
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-success"
                    />
                  </div>
                </form>

                <Link to="/adminresetpass">
                  <button className="btn btn-dark mt-2">Reset Password</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Adminedit;
