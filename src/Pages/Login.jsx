import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import Cookies from 'js-cookie';


function Login() {
  const navigate = useNavigate();
  const [status, setLoginStatus] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adminName, setAdminName] = useState('');

  const formSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .get(`https://unioncooperativesocietylimited.in:8443/admin/validate/email/${email}/${password}`)
      .then((response) => {

        console.log(response.data.data);

        if (response.data.status === 200) {
          setAdminName(response.data.data); // Set adminName in state
          Cookies.set('email', email);
          setLoginStatus('');


        }
        // console.log(adminName.adminName)
      })
      .catch((err) => {
        console.log(err);
        setLoginStatus('Invalid password or email');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // useEffect to handle the local storage update
  React.useEffect(() => {
    if (adminName.adminName) {
      Cookies.set('user', adminName.adminName);
      Cookies.set('Id', adminName.id);
      Cookies.set('pic', adminName.adminProfilePic);
      Cookies.set('role', adminName.role);
      navigate('/adminverify');
    }
  }, [adminName, navigate]);


  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <body style={{ width: '100vw', height: '100vh' }}>
      <div className='container' style={{ width: '400px' }}>
        <div className='row'>
          <div style={{ marginTop: '17%', borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
            <img src='uniologo.jpeg' alt='not found' width={350} height={150} />
            <h3 style={{ textAlign: 'center' }}>Welcome to Union Bank</h3>

            <form onSubmit={formSubmit} style={{ marginTop: '10%' }}>
              <div className='mt-2 mb-3'>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='form-control'
                  placeholder='Enter your Email'
                  required
                />
              </div>
              <div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='form-control'
                  placeholder='Enter your password'
                  required
                />
                <label className='mt-2 mb-2' >
                  Show Password
                  <input style={{ marginLeft: '5px' }} type='checkbox' checked={showPassword} onChange={togglePassword} />
                </label>
              </div>
              <div width={50} height={40}>
                {loading && <Loader width={30} height={30} />}
              </div>
              <div>
                <input
                  type='submit'
                  style={{ background: 'rgba(71, 108, 62, 1)' }}
                  className='btn form-control mt-2 mb-2 text-white'
                  value='Login'
                />
                <Link to='/adminresetpass' style={{ textDecoration: 'none', color: 'rgba(71, 108, 62, 1)' }}><p>Forgot Password</p></Link>


                <p className='text-danger'>{status}</p>

                {/* <a href='https://drive.google.com/uc?export=download&id=1HmmLwCva-hDuIz0ZFQ_3mbqFDkjQlfsF' download='client-app.zip'>
                  <p className='text-danger mt-2'>Download client app from here</p>
                </a> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Login;
