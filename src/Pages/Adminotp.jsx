import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'

const Adminotp = () => {
    const [uuid, setOtp] = useState('')
    const [status, setStatus] = useState('')
    const [newPassword, setpassword] = useState('')
    const [loading, setloading]=useState(false)

    const navigate = useNavigate()



    const SubmitOtp = (e) => {
        setloading(true)

        //console.log(formValues.username)
        e.preventDefault();
        axios.patch(`https://unioncooperativesocietylimited.in:8443/admin/password/forget/${uuid}/${newPassword}`, {
            uuid: uuid,
            newPassword: newPassword

        }).then((response) => {
            console.log(response.data);
            if (response.data.status === 200) {
                navigate('/')
            }

        })
            .catch(error => {
                console.log(error)
                setStatus('otp not valid.');
            })
            .finally(()=>{
                setloading(false)
            })

    }

    return (
        <div>
            <div className='container mt-2' style={{ textAlign: 'center' }} >

                <h2 className='fw-bold' style={{fontFamily:'serif', color:'#4F6F52'}}> ONE TIME PASSWORD</h2>



                <form onSubmit={SubmitOtp}>
                    <div className='mb-3 mt-3' style={{display:'flex', justifyContent:'center'}}>
                        <input type='text' value={uuid} name='otp' className='form-control ' placeholder='Enter your unique id received on your registered email' required onChange={(e) => setOtp(e.target.value)} />
                    </div>

                    <div className='mb-3 mt-3' style={{display:'flex', justifyContent:'center'}}>
                        <input type='text' value={newPassword} name='otp' className='form-control ' placeholder='Enter your new password' onChange={(e) => setpassword(e.target.value)}
                            pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*._-])[A-Za-z0-9!@#$%^&*._-]{8,}$"
                            title="Password must contain at least one capital letter, one number, one special character, and be at least 6 and max 15 characters long."
                            required />
                    </div>

                    <input type='submit' className='btn btn-dark' value='Verify Otp' />
                </form>

                <div width={50} height={40}>
                    {loading && <Loader width={30} height={30} />}
                </div>

                <p className='text-danger'> {status}</p>



            </div>
        </div>




    )
}

export default Adminotp