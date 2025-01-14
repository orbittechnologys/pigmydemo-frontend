import React, { useEffect, useState } from 'react'
// import { RxAvatar } from "react-icons/rx"
import axios from 'axios'
import AWS from "aws-sdk";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import uploadToAzureStorage from './uploadToAzureStorage';

const Editcustomer = () => {



    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [aadharCardFile, setAadharCardFile] = useState(null);
    const [profileImageFile, setProfileImageFile] = useState(null);

    const [editdata, seteditdata] = useState(

        {
            customerName: '', phone: '', email: '', address: '', agentId: '', gender: '',
            customerAadharImage: '',
            customerProfilePic: '',
            accountNumber: '',
            accountCode: '',
            balance: '',
            accountType: '',
            aadhaarNumber:''

        }
    )


    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true);
        axios.get(`https://unioncooperativesocietylimited.in:8443/customer/id/${id}`)
            .then(result => {
                console.log(result.data.data)
                seteditdata({ ...result.data.data })
            }).catch(err => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false); // Set loading to false when request is completed
            });
    },[id])


    

    // Function to handle file change for Aadhar Card Image
    const handleAadharCardFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setAadharCardFile(selectedFile);
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
    },[aadharCardFile]);

    useEffect(() => {
        // Call upload function when aadharCardFile changes
        if (profileImageFile) {
            uploadFileProfile();
        }
    },[profileImageFile]);


    // Function to upload Aadhar Card Image
    // const uploadFileAdhar = async () => {
    //     if(!aadharCardFile) {
    //         alert('Select Aadhar Image');
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
    //         Key: `Pigmi/Customer/AdharCard/${aadharCardFile.name}`,
    //         Body: aadharCardFile,
    //     };

    //     try {
    //         await s3.putObject(params).promise();
    //         const adharCardfileURL = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/Pigmi/Customer/AdharCard/${aadharCardFile.name}`;
    //         console.log(adharCardfileURL);
    //         seteditdata({ ...editdata, customerAadharImage: adharCardfileURL });
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
          seteditdata({ ...editdata, customerAadharImage: adharCardfileURL });
          alert("Aadhaar uploaded successfully.");
            
        }
        
      };


    // // Function to upload Profile Image
    // const uploadFileProfile = async () => {

    //     if(!profileImageFile)
    //     {
    //         alert('Select Profile Image');
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
    //         Key: `Pigmi/Customer/ProfileImages/${profileImageFile.name}`,
    //         Body: profileImageFile,
    //     };

    //     try {
    //         await s3.putObject(params).promise();
    //         const customerProfilePic = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/Pigmi/Customer/ProfileImages/${profileImageFile.name}`;
    //         console.log(customerProfilePic);
    //         seteditdata({ ...editdata, customerProfilePic: customerProfilePic });
    //         alert('Profile Image File uploaded successfully.');
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };


    const uploadFileProfile = async () => {

        const folderName = "Pigmy/Agent/ProfileImages/";
    
        if(profileImageFile){
          
          const blobName = profileImageFile.name;
          const customerProfilePic = await uploadToAzureStorage(profileImageFile,folderName, blobName);
          console.log(customerProfilePic)
          seteditdata({ ...editdata, customerProfilePic: customerProfilePic });
          alert("Profile Image uploaded successfully.");
            
        }
        
      };






    const editform = (e) => {
        setLoading(true);
        e.preventDefault()
        console.log(editdata);
        const data = {
            customerName: editdata.customerName,
            aadhaarNumber: editdata.aadhaarNumber,
            age: editdata.age,
            email: editdata.email,
            agentId: editdata.agentId,
            phone: editdata.phone,
            gender: editdata.gender,
            address: editdata.address,
            customerAadharImage: editdata.customerAadharImage,
            customerProfilePic: editdata.customerProfilePic,
            joiningTime:editdata.joiningTime,
            customerUniqueCode:editdata.customerUniqueCode,


            // accountNumber: editdata.customerAccount && editdata.customerAccount.length > 0 && editdata.customerAccount[0].accountNumber,
            // accountType: editdata.customerAccount && editdata.customerAccount.length > 0 && editdata.customerAccount[0].accountType,
            // accountCode: editdata.customerAccount && editdata.customerAccount.length > 0 && editdata.customerAccount[0].accountCode,
            // balance: editdata.customerAccount && editdata.customerAccount.length > 0 && editdata.customerAccount[0].balance,
            id: id,
        }
        console.log(data)
        axios.put("https://unioncooperativesocietylimited.in:8443/customer/updateCustomer", data)
            .then((response) => {
                console.log(response)
                alert('update successfully')
                navigate('/customer')

            }).catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false); // Set loading to false when request is completed
            });
    }



    return (

        <>
            {loading ? (
                <Loader />
            ) : (

        <div className='container-fluid' >
            <div className='row'>
                <div className='d-flex justify-content-center mt-5' >
                    <h2 className='fw-bold' style={{fontFamily:'serif', color:'#EB5A3C'}}> Edit Customer</h2>
                </div>


                <div style={{ display: 'flex', justifyContent: 'center' }} >
                    <div className='mt-3' style={{ display: 'flex', justifyContent: 'center',marginLeft:'5%', border:'1px solid black' }}>
                        <img  style={{ maxWidth: 180, maxHeight: 180, objectFit: 'fit' }} src={editdata.customerAadharImage} alt='not found' />
                    </div >

                    <div className='mt-3' style={{ display: 'flex', justifyContent: 'center',marginLeft:'5%',border:'1px solid black' }}>
                        <img  style={{ maxWidth: 180, maxHeight: 180, objectFit: 'cover' }} src={editdata.customerProfilePic} alt='not found' />
                    </div>
                </div>

                <div className='col-lg-12 p-5'>
                    <form onSubmit={editform}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <tr className='me-3'>
                                <th style={{  width: '80vw', padding: '2% 0 2% 0' }}>Full Name</th>
                                <input type='text' value={editdata.customerName} className='form-control' onChange={e => seteditdata({ ...editdata, customerName: e.target.value })} />
                            </tr>

                            <tr className='me-3'>
                                <th style={{  width: '80vw', padding: '2% 0 2% 0' }}>Mobile No</th>
                                <input type='tel' value={editdata.phone} className='form-control' onChange={e => seteditdata({ ...editdata, phone: e.target.value })} />
                            </tr>

                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <tr className='me-3'>
                                <th style={{  width: '80vw', padding: '2% 0 2% 0' }}>Email ID</th>
                                <input value={editdata.email} className='form-control' onChange={e => seteditdata({ ...editdata, email: e.target.value })} />
                            </tr>
                            <tr>
                                <th style={{  width: '80vw', padding: '2% 0 2% 0' }}>Age</th>
                                <input type='text' value={editdata.age} className='form-control' onChange={e => seteditdata({ ...editdata, age: e.target.value })} />
                            </tr>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <tr className='me-3'>
                                <th style={{  width: '80vw', padding: '2%  0 2% 0' }}>Address</th>
                                <input type='text' value={editdata.address} className='form-control' onChange={e => seteditdata({ ...editdata, address: e.target.value })} />
                            </tr>
                            <tr className='me-3'>
                                    <th style={{ width: '80vw', padding: '2% 0 2% 0' }}>Gender</th>
                                    
                                        <select
                                            className='form-control'
                                            value={editdata.gender}
                                            onChange={(e) => seteditdata({ ...editdata, gender: e.target.value })}
                                        >
                                            <option value='male'>Male</option>
                                            <option value='female'>Female</option>
                                            <option value='other'>Other</option>
                                        </select>
                                </tr>
                        </div>



                        {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <tr className='me-3'>
                                <th style={{  width: '80vw', padding: '2%  0 2% 0' }}>Account Number</th>
                                <input
                                    type='text'
                                    value={editdata.customerAccount && editdata.customerAccount.length > 0 && editdata.customerAccount[0].accountNumber || ''}
                                    className='form-control'
                                    onChange={e => seteditdata({ ...editdata, accountNumber: e.target.value })}
                                />
                            </tr>
                            <tr className='me-3'>
                                <th style={{  width: '80vw', padding: '2% 0 2% 0' }}>Account Type</th>
                                <input
                                    type='text'
                                    value={editdata.customerAccount && editdata.customerAccount.length > 0 && editdata.customerAccount[0].accountType}
                                    className='form-control'
                                    onChange={e => seteditdata({ ...editdata, accountType: e.target.value })}
                                />
                            </tr>
                        </div> */}
                        {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <tr className='me-3'>
                                <th style={{  width: '80vw', padding: '2%  0 2% 0' }}>Account Code</th>
                                <input
                                    type='text'
                                    value={editdata.customerAccount && editdata.customerAccount && editdata.customerAccount[0].accountCode}
                                    className='form-control'
                                    onChange={e => seteditdata({ ...editdata, accountCode: e.target.value })}
                                />
                            </tr>
                            <tr className='me-3'>
                                <th style={{  width: '80vw', padding: '2% 0 2% 0' }}>Balance</th>
                                <input
                                    type='text'
                                    value={editdata.customerAccount && editdata.customerAccount.length > 0 && editdata.customerAccount[0].balance}
                                    className='form-control'
                                    onChange={e => seteditdata({ ...editdata, balance: e.target.value })}
                                />
                            </tr>
                        </div> */}
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <tr className='me-3'>
                                <th style={{  width: '100vw', padding: '2%  0 1% 0' }}>Aadhaar Number</th>
                                <input type='text' value={editdata.aadhaarNumber} className='form-control' onChange={e => seteditdata({ ...editdata, aadhaarNumber: e.target.value })} />
                            </tr>
                            <tr className='me-3'>
                                <th style={{  width: '100vw', padding: '2%  0 1% 0' }}>Agent Id</th>
                                <input type='text' value={editdata.agentId} className='form-control' onChange={e => seteditdata({ ...editdata, agentId: e.target.value })} />
                            </tr>
                           
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <tr className='me-2'>
                                <th style={{  width: '80vw', padding: '1% 0 2% 0' }}>Customer Aadhaar Card Image</th>
                                <input type='file' name='agentAadharCardImage' accept='.png, .jpg, .jpeg' className='form-control' onChange={handleAadharCardFileChange} />
                                {/* <input onClick={uploadFileAdhar} value='Upload' className='btn btn-success m-2' readOnly /> */}
                            </tr>
                            <tr className='me-3'>
                                <th style={{  width: '80vw', padding: '2% 0 2% 0' }}>Customer Profile Image</th>
                                <input type='file' name='agentProfileImage' accept='.png, .jpg, .jpeg' className='form-control' onChange={handleProfileImageFileChange} />
                                {/* <input onClick={uploadFileProfile} value='Upload' className='btn btn-success m-2' readOnly /> */}
                            </tr>


                        </div>

                        <div className='mt-3' style={{ display: "flex", justifyContent: 'end', alignItems: 'end' }}>

                            <input type='submit' value='Submit' className='btn btn-success' />
                        </div>
                    </form>


                </div>
            </div>
        </div>
          )}
          </>

    )
}

export default Editcustomer
