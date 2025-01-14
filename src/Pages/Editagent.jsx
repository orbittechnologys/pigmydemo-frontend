import React, { useEffect, useState } from 'react'
// import { RxAvatar } from "react-icons/rx"
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AWS from "aws-sdk";
import { Upload } from 'antd';
import Loader from './Loader';
import uploadToAzureStorage from './uploadToAzureStorage';

const Editagent = () => {


    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [aadharCardFile, setAadharCardFile] = useState(null);
    const [panCardFile, setPanCardFile] = useState(null);
    const [profileImageFile, setProfileImageFile] = useState(null);

    const [editdata, seteditdata] = useState({
        agentName: '',
        phone: '',
        email: '',
        aadhaarNumber: '',
        address: '',
        designation: '',
        status: '',
        password: '',
        agentAadharCardImage: '',
        agentProfileImage: '',
        agentPanCardImage: '',
        
    });

   

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`https://unioncooperativesocietylimited.in:8443/agent/id/${id}`)
            .then((result) => {
                console.log(result.data.data);
                seteditdata({ ...result.data.data });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Function to upload Aadhar Card Image
    // const uploadFileAdhar = async () => {
    //     if(!aadharCardFile){
    //         alert("Please Select AadharCard Image");
    //         return
    //     }
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
    //         Key: `Pigmi/Agent/AdharCard/${aadharCardFile.name}`,
    //         Body: aadharCardFile,
    //     };

    //     try {
    //         await s3.putObject(params).promise();
    //         const adharCardfileURL = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/Pigmi/Agent/AdharCard/${aadharCardFile.name}`;
    //         console.log(adharCardfileURL);
    //         seteditdata({ ...editdata, agentAadharCardImage: adharCardfileURL });
    //         alert('Aadhar Card File uploaded successfully.');
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const uploadFileAdhar = async () => {

        const folderName = "Pigmy/Agent/AdharCard/";
    
        if(aadharCardFile){
          
          const blobName = aadharCardFile.name;
          const adharCardfileURL = await uploadToAzureStorage(aadharCardFile,folderName, blobName);
          seteditdata({ ...editdata, agentAadharCardImage: adharCardfileURL });
          alert("Aadhaar uploaded successfully.");
            
        }
        
      };

    // Function to upload PAN Card Image
    // const uploadFilePan = async () => {
    //     if(!panCardFile){
    //         alert("Please Select Pan Image");
    //         return;
    //     }
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
    //         Key: `Pigmi/Agent/PanCard/${panCardFile.name}`,
    //         Body: panCardFile,
    //     };

    //     try {
    //         await s3.putObject(params).promise();
    //         const agentPanCardImage = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/Pigmi/Agent/PanCard/${panCardFile.name}`;
    //         console.log(agentPanCardImage);
    //         seteditdata({ ...editdata, agentPanCardImage: agentPanCardImage });
    //         alert('PAN Card File uploaded successfully.');
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };


    const uploadFilePan = async () => {

        const folderName = "Pigmy/Agent/PanCard/";
    
        if(panCardFile){
          
          const blobName = panCardFile.name;
          const agentPanCardImage = await uploadToAzureStorage(panCardFile,folderName, blobName);
          console.log(agentPanCardImage)
          seteditdata({ ...editdata, agentPanCardImage: agentPanCardImage });
          alert("Pan uploaded successfully.");
            
        }
        
      };

    // Function to upload Profile Image
    // const uploadFileProfile = async () => {

    //     if(!profileImageFile){
    //         alert("Please Select Profile Image");
    //         return;
    //     }

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
    //         Key: `Pigmi/Agent/ProfileImages/${profileImageFile.name}`,
    //         Body: profileImageFile,
    //     };

    //     try {
    //         await s3.putObject(params).promise();
    //         const agentProfileImage = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/Pigmi/Agent/ProfileImages/${profileImageFile.name}`;
    //         console.log(agentProfileImage);
    //         seteditdata({ ...editdata, agentProfileImage: agentProfileImage });
    //         alert('Profile Image File uploaded successfully.');
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };


    const uploadFileProfile = async () => {

        const folderName = "Pigmy/Agent/ProfileImages/";
    
        if(profileImageFile){
          
          const blobName = profileImageFile.name;
          const agentProfileImage = await uploadToAzureStorage(profileImageFile,folderName, blobName);
          console.log(agentProfileImage)
          seteditdata({ ...editdata, agentProfileImage: agentProfileImage });
          alert("Profil Image uploaded successfully.");
            
        }
        
      };

    

    // Function to handle file change for Aadhar Card Image
    const handleAadharCardFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setAadharCardFile(selectedFile); 
    };

    // Function to handle file change for PAN Card Image
    const handlePanCardFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setPanCardFile(selectedFile);
    };

    // Function to handle file change for Profile Image
    const handleProfileImageFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setProfileImageFile(selectedFile);
    };

    useEffect(() => {
        // Call upload function when aadharCardFile changes
        if (aadharCardFile) {
            uploadFileAdhar();
        }
    }, [aadharCardFile]);


    useEffect(() => {
        // Call upload function when aadharCardFile changes
        if (panCardFile) {
            uploadFilePan();
        }
    }, [panCardFile]);

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
            agentName: editdata.agentName,
            phone: editdata.phone,
            email: editdata.email,
            aadhaarNumber: editdata.aadhaarNumber,
            address: editdata.address,
            designation: editdata.designation,
            status: editdata.status,
            password: editdata.password,
            agentAadharCardImage: editdata.agentAadharCardImage,
            agentPanCardImage: editdata.agentPanCardImage,
            agentProfileImage: editdata.agentProfileImage,
            id: id,
            
        };
        console.log(data);
        axios
            .put('https://unioncooperativesocietylimited.in:8443/agent/updateAgent', data)
            .then((response) => {
                console.log(response);
                alert('Update successfully');
                navigate('/agent');
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



                <div className='container-fluid' >
                    <div className='row'>
                        <div className='d-flex justify-content-center mt-5' >
                            <h2 className='fw-bold' style={{fontFamily:"serif"}}> Edit Agent</h2>
                        </div>


                        <div className='container-fluid' style={{display:'flex', justifyContent:'center'}}>
                            <div className='m-3'>
                                <img width={140} height={150} src={editdata.agentAadharCardImage} alt='not found' />
                            </div>
                            <div className='m-3'>
                                <img width={140} height={150} src={editdata.agentPanCardImage} alt='not found' />
                            </div>
                            <div className='m-3'>
                                <img width={140} height={150} src={editdata.agentProfileImage} alt='not found' />
                            </div>

                        </div>

                        <div className='container-fluid p-5'>
                            <form onSubmit={editform}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <tr className='me-3'>
                                        <th style={{ width: '80vw', padding: '2% 0 2% 0' }}>Full Name</th>
                                        <input type='text' value={editdata.agentName} className='form-control' onChange={e => seteditdata({ ...editdata, agentName: e.target.value })} />
                                    </tr>

                                    <tr className='me-3'>
                                        <th style={{  width: '80vw', padding: '2% 0 2% 0' }}>Mobile No.</th>
                                        <input type='tel' value={editdata.phone} className='form-control' onChange={e => seteditdata({ ...editdata, phone: e.target.value })} />
                                    </tr>

                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <tr className='me-3'>
                                        <th style={{ width: '80vw', padding: '2% 0 2% 0' }}>Email ID</th>
                                        <input value={editdata.email} className='form-control' onChange={e => seteditdata({ ...editdata, email: e.target.value })} />
                                    </tr>
                                    <tr>
                                        <th style={{ width: '80vw', padding: '2% 0 2% 0' }}>Aadhaar card No.</th>
                                        <input type='text' value={editdata.aadhaarNumber} className='form-control' onChange={e => seteditdata({ ...editdata, aadhaarNumber: e.target.value })} />
                                    </tr>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <tr className='me-3'>
                                        <th style={{ width: '80vw', padding: '2% 0 2% 0' }}>Designation</th>
                                        <input type='text' value={editdata.designation} className='form-control' onChange={(e) => seteditdata({ ...editdata, designation: e.target.value })} />
                                    </tr>
                                    <tr>
                                        <th style={{ width: '80vw', padding: '2% 0 2% 0' }}>Status</th>
                                        <input type='text' value={editdata.status} className='form-control' onChange={e => seteditdata({ ...editdata, status: e.target.value })} readOnly />
                                    </tr>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <tr className='me-3'>
                                        <th style={{ width: '80vw', padding: '2% 0 2% 0' }}>Agent  Aadhaar Card Image</th>
                                        <input type='file'  className='form-control' accept='.png, .jpg, .jpeg' onChange={handleAadharCardFileChange} />
                                        {/* <input onClick={uploadFileAdhar} value={Upload} className='btn btn-success m-2' readOnly /> */}
                                    </tr>
                                    <tr className='me-3'>
                                        <th style={{  width: '80vw', padding: '2% 0 2% 0' }}>Agent Pan Image</th>
                                        <input type='file'  className='form-control' accept='.png, .jpg, .jpeg' onChange={handlePanCardFileChange} />
                                        {/* <input onClick={uploadFilePan} value={Upload} className='btn btn-success m-2' readOnly /> */}
                                    </tr>


                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <tr className='me-3'>
                                        <th style={{  width: '80vw', padding: '2%  0 2% 0' }}>Address</th>
                                        <textarea type='text' value={editdata.address} className='form-control' onChange={e => seteditdata({ ...editdata, address: e.target.value })} />
                                    </tr>
                                    <tr className='me-3'>
                                        <th style={{ width: '80vw', padding: '2% 0 2% 0' }}>Agent Profile</th>
                                        <input type='file'  className='form-control' accept='.png, .jpg, .jpeg' onChange={handleProfileImageFileChange} />
                                        {/* <input onClick={uploadFileProfile} value={Upload} className='btn btn-success m-2' readOnly /> */}
                                    </tr>

                                </div>

                                

                                <div style={{ display: "flex", justifyContent: 'end', alignItems: 'end' }}>

                                    <input type='submit' value='Submit' className='btn btn-success' />
                                </div>
                            </form>
                            <Link to='/resetpassword'><button className='btn btn-dark mt-2' >Reset Password</button></Link>

                        </div>
                    </div>
                </div>

            )}
        </>

    )
}

export default Editagent
