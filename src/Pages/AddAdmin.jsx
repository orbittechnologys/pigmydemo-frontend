import axios from 'axios';
import React, { useState } from 'react'
import Loader from './Loader'
import { useNavigate } from 'react-router-dom';
import AWS from "aws-sdk";
import uploadToAzureStorage from './uploadToAzureStorage';

const AddAdmin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [adminName, setadminName] = useState(null);
    const [address, setaddress] = useState(null);
    const [phone, setphone] = useState(null);
    const [email, setemail] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [ProfileImagesfileURL, setFileUrlProfile] = useState("User.jpg");

    const navigate = useNavigate()

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    const data = {
        adminName: adminName,
        address: address,
        phone: phone,
        email: email,
        password: password,
        adminProfilePic: ProfileImagesfileURL,
        // role: "ADMIN"


    }

    const Submitadmin = (e) => {
        console.log(data)
        setLoading(true)
        e.preventDefault()
        axios.post("https://unioncooperativesocietylimited.in:8443/admin/save", data)
            .then((response) => {

                console.log(response)
                alert('admin saved successfully')
                navigate('/alladmin')

            })
            .catch(err => {
                if (err.response && err.response.status === 409) {
                    alert("Admin Already Exists");
                    console.log(err);
                } else {
                    console.log(err);
                }
            })
            .finally(() => {
                setLoading(false)

            })
    }

    // // Function to upload file to s3
    // const uploadFileProfile = async (file) => {

    //     if (!file) {
    //         alert("Please select a file before uploading.");
    //         return;
    //     }
    //     // S3 Bucket Name
    //     const S3_BUCKET = "awsbucket99999";

    //     // S3 Region
    //     const REGION = 'ap-south-1';

    //     // S3 Credentials
    //     AWS.config.update({
    //         accessKeyId: "AKIAYFMI43FZSI5XSR4D",
    //         secretAccessKey: "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",
    //     });
    //     const s3 = new AWS.S3({
    //         params: { Bucket: S3_BUCKET },
    //         region: REGION,
    //     });

    //     // Files Parameters

    //     const params = {
    //         Bucket: S3_BUCKET,
    //         // Key: "unionpigmyimages/" + file.name,
    //         Key: "Pigmi/Admin/ProfileImages/" + file.name,
    //         // Key: "unionpigmyimages/" + file.name,
    //         Body: file,
    //     };

    //     // Uploading file to s3

    //     var upload = s3
    //         .putObject(params)
    //         .on("httpUploadProgress", (evt) => {
    //             // File uploading progress
    //             // console.log(
    //             //   "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
    //             // );
    //             // setUploadPercent("Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%")
    //         })
    //         .promise();

    //     await upload.then((err, data) => {
    //         console.log(err);
    //         // const fileURL = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/unionpigmyimages/${file.name}`;
    //         const ProfileImagesfileURL = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/Pigmi/Admin/ProfileImages/${file.name}`;
    //         // Fille successfully uploaded
    //         console.log(ProfileImagesfileURL)
    //         setFileUrlProfile(ProfileImagesfileURL)
    //         alert("File uploaded successfully.");
    //     });
    // };


    const uploadFileProfile = async (file) => {

        const folderName = "Pigmy/Admin/ProfileImage/";
    
        if(file){
          
          const blobName = file.name;
          const url = await uploadToAzureStorage(file,folderName, blobName);
          setFileUrlProfile(url);
          console.log(url)
          alert("Profileimage uploaded successfully.");
        }
        
      };


    // Function to handle file and store it to file state
    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        if (!file) {
          return;
        }
      
        // Changing file state
        setFileUrlProfile(file);
      
        
        await uploadFileProfile(file);
       
    };





    return (

        <>
            {
                loading ? (
                    <Loader />
                ) : (

                    <>
                        <h1 className='mt-3 fw-bold' style={{ display: 'flex', justifyContent: 'center', fontFamily: 'serif', color:'#EB5A3C' }}>Add Admin</h1>




                        <div className='mt-1' style={{ display: 'flex', justifyContent: 'center' }} >
                            

                            <div className='mt-3' style={{ display: 'flex', justifyContent: 'center' }}>
                                <img width={180} src={ProfileImagesfileURL} alt='not found' />
                            </div>


                        </div>

                        <div className='container_fluid p-5' style={{ display: 'flex', justifyContent: 'center' }}>

                            <div className='row'>
                                <form onSubmit={Submitadmin}>



                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <tr className='me-3'>
                                            <th style={{  width: '80vw', padding: '2% 0 2% 0' }}>Admin Name</th>
                                            <input type='text' value={adminName} className='form-control' onChange={(e) => setadminName(e.target.value)}


                                                required />
                                        </tr>
                                        <tr className='me-3'>
                                            <th style={{ width: '80vw', padding: '2% 0 2% 0' }}>Address</th>
                                            <textarea value={address} className='form-control' onChange={e => setaddress(e.target.value)}
                                                required />
                                        </tr>

                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <tr className='me-3'>
                                            <th style={{ width: '80vw', padding: '2%  0 2% 0' }}>Phone No</th>
                                            <input type='text' value={phone} className='form-control' onChange={e => setphone(e.target.value)}
                                                pattern="[6-9]{1}[0-9]{9}" // Add your desired pattern for a 10-digit mobile number
                                                title="Please enter a valid 10-digit mobile number" // Add a title for accessibility
                                                required
                                            />
                                        </tr>
                                        <tr className='me-3'>
                                            <th style={{ width: '80vw', padding: '2% 0 2% 0' }}>Email</th>
                                            <input type='email' value={email} className='form-control' onChange={e => setemail(e.target.value)}

                                                required />
                                        </tr>

                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <tr className='me-3'>
                                            <th style={{width: '80vw', padding: '2%  0 2% 0' }}>Profile Image</th>
                                            <input type='file' className='form-control' accept='.png, .jpg, .jpeg' onChange={handleFileChange} />
                                            {/* <input onClick={uploadFileProfile} className='btn btn-success m-2' value='Upload' readOnly /> */}
                                        </tr>
                                        <tr style={{marginTop:'3%'}}>
                                            <th style={{ width: '80vw', padding: '0 0 1% 0' }}>Set Password</th>
                                            {showPassword ? (
                                                <input type='text' value={password} className='form-control' onChange={(e) => setPassword(e.target.value)}
                                                    pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*._-])[A-Za-z0-9!@#$%^&*._-]{6,}$"
                                                    title="Password must contain at least one Upper case,one Lower case, one number, one special character, and atleast 6 and max 15 characters long."
                                                    required />
                                            ) : (
                                                <input
                                                    type='password' value={password} className='form-control' onChange={(e) => setPassword(e.target.value)}
                                                    pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*._-])[A-Za-z0-9!@#$%^&*._-]{6,}$"
                                                    title="Password must contain at least one Upper case,one Lower case, one number, one special character, and atleast 6 and max 15 characters long."
                                                    required
                                                />
                                            )}
                                            <label> Show Password
                                                <input style={{ marginLeft: '5px' }} type='checkbox' checked={showPassword} onChange={togglePassword} />
                                            </label>
                                        </tr>

                                    </div>

                                    <div style={{ display: "flex", justifyContent: 'end', alignItems: 'end' }}>
                                        <button type='submit' className='btn btn-success' style={{ backgroundColor:"#EB5A3C"}}>Save</button>
                                    </div>

                                </form>
                            </div>

                        </div>
                    </>
                )
            }
        </>
    )
}

export default AddAdmin
