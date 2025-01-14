import React, { useState } from 'react'
// import { RxAvatar } from "react-icons/rx"
import axios from 'axios'
import AWS from "aws-sdk";
import { useNavigate } from 'react-router-dom'
import Loader from './Loader';
import uploadToAzureStorage from './uploadToAzureStorage';

const Addagent = () => {
    const [loading, setLoading] = useState(false);


    const [agentName, setAgentName] = useState(null)
    const [aadhaarNumber, setAadhaarNumber] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState(null);
    const [Id, setid] = useState(null);
    const [address, setAddress] = useState(null);
    const [status, setStatus] = useState('True');
    const [showPassword, setShowPassword] = useState(false);
    const [file, setFile] = useState(null);
    const [AdharCardfileURL, setFileUrlAdhar] = useState("https://cdn.icon-icons.com/icons2/3001/PNG/512/default_filetype_file_empty_document_icon_187718.png");
    const [PanCardfileURL, setFileUrlPan] = useState("https://cdn.icon-icons.com/icons2/3001/PNG/512/default_filetype_file_empty_document_icon_187718.png");
    const [ProfileImagesfileURL, setFileUrlProfile] = useState("User.jpg");

    const navigate = useNavigate()




    const data = {

        agentName: agentName,
        aadhaarNumber: aadhaarNumber,
        email: email,
        phone: phone,
        password: password,
        designation: "AGENT",
        address: address,
        status: status,
        agentAadharCardImage: AdharCardfileURL,
        agentPanCardImage: PanCardfileURL,
        agentProfileImage: ProfileImagesfileURL,
        id: Id



    }


    const togglePassword = () => {
        setShowPassword(!showPassword);
    }



    const signupform = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(data)

        axios.post("https://unioncooperativesocietylimited.in:8443/agent/save", data)
        .then((response) => {
            
            console.log(response)
            alert("Thank you for Registration")
            navigate('/agent')
              
            
        })
        .catch((err) => {
            if (err.response && err.response.status === 409) {
              alert("Agent Id Allready Exists");
              console.log(err);
            } else {
              console.log(err);
            }
          })
            .finally(() => {
                setLoading(false); // Set loading to false when request is completed
            });


    }



    // for uploading adharCard Images

    // // Function to upload file to s3
    // const uploadFileAdhar = async (file) => {

    //     if (!file) {
    //         alert("Please select a file before uploading.");
    //         return;
    //       }

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
    //         Key: "Pigmi/Agent/AdharCard/" + file.name,

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
    //         const AdharCardfileURL = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/Pigmi/Agent/AdharCard/${file.name}`;
    //         // Fille successfully uploaded
    //         console.log(AdharCardfileURL)
    //         setFileUrlAdhar(AdharCardfileURL)
    //         alert("File uploaded successfully.");
    //     });
    // };


    const uploadFileAdhar = async (file) => {

        const folderName = "Pigmy/Agent/AdharCard/";
    
        if(file){
          
          const blobName = file.name;
          const AdharCardUrl = await uploadToAzureStorage(file,folderName, blobName);
          setFileUrlAdhar(AdharCardUrl)
          alert("Aadhaar uploaded successfully.");
            
        }
        
      };



    // for uploading Pan Card Images

    // Function to upload file to s3
    // const uploadFilePan = async (file) => {

    //     if (!file) {
    //         alert("Please select a file before uploading.");
    //         return;
    //       }


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
    //         Key: "Pigmi/Agent/PanCard/" + file.name,
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
    //         const PanCardfileURL = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/Pigmi/Agent/PanCard/${file.name}`;
    //         // Fille successfully uploaded
    //         console.log(PanCardfileURL)
    //         setFileUrlPan(PanCardfileURL)
    //         alert("File uploaded successfully.");
    //     });
    // };


    const uploadFilePan = async (file) => {

        const folderName = "Pigmy/Agent/PanCard/";
    
        if(file){
          
          const blobName = file.name;
          const PanCardURL = await uploadToAzureStorage(file,folderName, blobName);
          console.log(PanCardURL)
          setFileUrlPan(PanCardURL)
          alert("Pan uploaded successfully.");
            
        }
        
      };

    // for uploading Profile Images

    // Function to upload file to s3
    // const uploadFileProfile = async (file) => {

    //     if (!file) {
    //         alert("Please select a file before uploading.");
    //         return;
    //       }


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
    //         Key: "Pigmi/Agent/ProfileImages/" + file.name,
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
    //         const ProfileImagesfileURL = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/Pigmi/Agent/ProfileImages/${file.name}`;
    //         // Fille successfully uploaded
    //         console.log(ProfileImagesfileURL)
    //         setFileUrlProfile(ProfileImagesfileURL)
    //         alert("File uploaded successfully.");
    //     });
    // };


    const uploadFileProfile = async (file) => {

        const folderName = "Pigmy/Agent/ProfileImages/";
    
        if(file){
          
          const blobName = file.name;
          const ProfileURL = await uploadToAzureStorage(file,folderName, blobName);
          console.log(ProfileURL)
          setFileUrlProfile(ProfileURL)
          alert("Pan uploaded successfully.");
            
        }
        
      };


    // Function to handle file and store it to file state
    const handleFileChangeAadhar = async (e) => {
        // Uploaded file
        const file = e.target.files[0];

        if (!file) {
          return;
        }
      
        // Changing file state
        setFileUrlAdhar(file);
      
        
        await uploadFileAdhar(file);
    };


    const handleFileChangePan = async (e) => {
        // Uploaded file
        const file = e.target.files[0];

        if (!file) {
          return;
        }
      
        // Changing file state
        setFileUrlPan(file);
      
        
        await uploadFilePan(file);
    };


    const handleFileChangeProfile = async (e) => {
        // Uploaded file
        const file = e.target.files[0];

        if (!file) {
          return;
        }
      
        // Changing file state
        setFileUrlProfile(file);

        await uploadFileProfile(file)
      
    };

   




    return (
        <>

            {loading ? (
                <Loader />
            ) : (


                <div className='container-fluid' >
                    <div className='row'>
                        <div className='d-flex justify-content-center' >
                            <h1 className='fw-bold' style={{fontFamily:'serif',color:'#4F6F52'}}>Add Agent</h1>
                        </div>
                        {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw' }} >
                        <RxAvatar size={180} />
                    </div> */}
                        <div className='container mt-3' style={{ display: 'flex', justifyContent: 'center' }}>
                       
                            <div style={{ display: 'flex', justifyContent: 'center',marginLeft:'5%' }}>
                                <img width={200} height={200} src={AdharCardfileURL} alt='not found'/>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center',marginLeft:'5%' }}>
                                <img width={200} height={200} src={PanCardfileURL} alt='not found'/>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center',marginLeft:'5%' }}>
                                <img width={200} height={200} src={ProfileImagesfileURL} alt='not found'/>
                            </div>

                        

                    </div>
                        <div >
                            <form onSubmit={signupform}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <tr className='me-2'>
                                        <th style={{  width: '80vw', padding: '2% 0 2% 0' }}>Full Name</th>
                                        <input type='text' value={agentName} className='form-control' onChange={(e) => setAgentName(e.target.value)} required />
                                    </tr>
                                    <tr className='me-2'>
                                        <th style={{  width: '80vw', padding: '2% 0 2% 0' }}>Mobile No</th>
                                        <input
                                            type='tel'
                                            value={phone}
                                            className='form-control'
                                            onChange={(e) => setPhone(e.target.value)}
                                            pattern="[6-9]{1}[0-9]{9}" // Add your desired pattern for a 10-digit mobile number
                                            title="Please enter a valid 10-digit mobile number" // Add a title for accessibility
                                            required
                                        />
                                    </tr>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <tr className='me-2'>
                                        <th style={{  width: '80vw', padding: '2% 0 2% 0' }}>Email ID</th>
                                        <input type='email' value={email} className='form-control' onChange={(e) => setEmail(e.target.value)} required />
                                    </tr>
                                    <tr className='me-2'>
                                        <th style={{  width: '80vw', padding: '2% 0 2% 0' }}>Aadhaar Card No</th>
                                        <input type='text' value={aadhaarNumber} className='form-control'
                                         pattern="[0-9]{12}" // Add your desired pattern for a 10-digit mobile number
                                         title="Please enter a valid 12-digit Aadhar Number" // Add a title for accessibility
                                         required
                                         onChange={(e) => setAadhaarNumber(e.target.value)}  />
                                    </tr>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <tr className='me-2'>
                                        <th style={{  width: '80vw', padding: '2% 0 2% 0' }}>Designation</th>
                                        <input type='text' value={"AGENT"} className='form-control' required readOnly />
                                    </tr>
                                    <tr className='me-2'>
                                        <th style={{  width: '80vw', padding: '2%  0 2% 0' }}>Address</th>
                                        <input type='text' value={address} className='form-control' onChange={(e) => setAddress(e.target.value)} required />
                                    </tr>

                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <tr className='me-2'>
                                        <th style={{  width: '80vw', padding: '1% 0 1% 0' }}>Enter Your Agent ID</th>
                                        <input type='text' value={Id} className='form-control' onChange={(e) => setid(e.target.value)} required />
                                    </tr>
                                    <tr className='me-2'>
                                        <th style={{  width: '80vw', padding: '1%  0 1% 0' }}> Aadhaar Card Image</th>
                                        <input type='file' className='form-control' accept='.png, .jpg, .jpeg' onChange={handleFileChangeAadhar} />
                                        {/* <input onClick={uploadFileAdhar} value='Upload' className='btn btn-success m-2' readOnly/> */}
                                    </tr>

                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <tr className='me-1'>
                                        <th style={{  width: '80vw', padding: '2% 0 2% 0' }}>Pan Card Image</th>
                                        <input type='file' className='form-control' accept='.png, .jpg, .jpeg' onChange={handleFileChangePan} />
                                        {/* <input onClick={uploadFilePan} value='Upload' className='btn btn-success m-2' readOnly/> */}
                                    </tr>
                                    <tr className='me-1'>
                                        <th style={{  width: '80vw', padding: '2%  0 2% 0' }}>Profile Image</th>
                                        <input type='file' className='form-control' accept='.png, .jpg, .jpeg' onChange={handleFileChangeProfile} />
                                        {/* <input onClick={uploadFileProfile} value='Upload' className='btn btn-success m-2' readOnly/> */}
                                    </tr>

                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <tr className='me-2'>
                                        <th style={{  width: '80vw', padding: '2%  0 2% 0' }}>Status</th>
                                        <input type='text' value='True' className='form-control' onChange={(e) => setStatus(e.target.value)} readOnly />
                                    </tr>
                                    <tr className='me-2'>
                                        <th style={{  width: '80vw', padding: '5%  0 2% 0' }}>Set Password</th>
                                        {showPassword ? (
                                            <input type='text' value={password} className='form-control' onChange={(e) => setPassword(e.target.value)}
                                                pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*._-])[A-Za-z0-9!@#$%^&*._-]{6,}$"
                                                title="Password must contain at least one Upper case,one Lower case, one number, one special character, and atleast 6 and max 15 characters long."
                                                required />
                                        ) : (
                                            <input
                                                type='password' value={password} className='form-control' onChange={(e) => setPassword(e.target.value)}
                                                pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*._-])[A-Za-z0-9!@#$%^&*]{6,}$"
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
                                    <button type='submit' className='btn btn-success'>Save</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            )}
        </>

    )
}

export default Addagent
