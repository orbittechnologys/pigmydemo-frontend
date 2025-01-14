import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from './Loader';

const Viewdocuments = () => {
    const [imageData, setImageData]=useState([])
    const [loading, setLoading] = useState(false);
    const {id} =useParams()
    
    useEffect(() => {
        setLoading(true);
        axios
          .get(`https://unioncooperativesocietylimited.in:8443/customer/id/${id}`)
          .then((result) => {
            console.log(result.data.data);
            setImageData(result.data.data);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setLoading(false);
          });
      }, [id]);


    return (
        <div className='container'>
            {
                loading ? (
                    <Loader/>
                ):(
                    <div className='row mt-5'>
                        <h2 className='mb-5 fw-bold' style={{textAlign:"center",fontFamily:'serif',color:'#EB5A3C'}}> All Documents of {imageData?.customerName}</h2>
                <div className='col-lg-6'>
                    <div >

                    <p style={{textAlign:'center'}}><label className='fw-bold'>Aadhaar card Image</label></p>
                    
                    <div style={{display:'flex', justifyContent:'center',alignContent:'center'}}>
                    <img alt='aadhar card' width={500} src={imageData?.customerAadharImage} />
                    </div>
                    </div>
                </div>
                <div className='col-lg-6'>
                <p style={{textAlign:'center'}}><label className='fw-bold'>Profile Image</label></p>
                    <div style={{display:'flex', justifyContent:'center',alignContent:'center'}}>
                        <img alt='Profile'  width={500} src={imageData?.customerProfilePic} />
                        </div>
                </div>
            </div>
                )
            }
            
        </div>
    )
}

export default Viewdocuments
