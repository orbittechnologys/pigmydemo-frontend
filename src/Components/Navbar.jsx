import React, { useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import * as ImIcons from 'react-icons/im';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [user, setUser] = useState({
    Name: '',
    Id: '',
    pic: '',
  });

  const Navigator = useNavigate();

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    const storedUser = {
      Name: Cookies.get('user'),
      Id: Cookies.get('Id'),
      pic: Cookies.get('pic'),
    };

    setUser(storedUser);
  }, []);


  const logout = () => {
    // Clear cookies instead of localStorage
    Cookies.remove('user');
    Cookies.remove('Id');
    Cookies.remove('pic');
    
    localStorage.clear()
    Navigator('/');

  };



  return (
    <>
      <div className='navbartop'>
        <IconContext.Provider value={{ color: '#fff' }}>
          <div className='navbar' style={{ display: 'flex', justifyContent: 'space-between', width: '100vw' }}>
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>

            <div style={{ marginRight: '2%', display:'flex' }}>

              <Link to={`/adminedit/${user.Id}`} style={{ display: 'flex', textDecoration: 'none', justifyContent: 'center', color: "white" }}>
                <h6 className='mt-3' style={{fontFamily:'serif',fontSize:'22px',marginRight:'5px'}}>{user.Name}</h6>
                <img style={{ borderRadius: '30px', marginLeft: '5px' }} width={60} height={60} src={user.pic} alt='not found' />
              </Link>
                {/* <div style={{marginLeft:'25px'}}>
              <button style={{fontSize:'12px'}} onClick={logout} className='btn btn-outline-danger text-white mt-3'>
                <ImIcons.ImSwitch className='m-1' />
                Log out
              </button>
              </div> */}


            </div>


          </div>


              
          <nav style={{ display: 'flex', justifyContent: 'space-between' }} className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>

              
              {SidebarData.map((item, index) => {
                return (

                  <li key={index} style={{fontFamily:'serif'}} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>

                  </li>
                );
              })}
              

              <div className="logout-button-container" >
                <li>

                  <button style={{ marginLeft: '15%' }} onClick={logout} className='btn btn-outline-danger text-white'>
                    <ImIcons.ImSwitch className='m-2' />
                    Log out
                  </button>

                </li>
              </div>
            </ul>
          </nav>
        </IconContext.Provider>
      </div>
    </>
  );
}

export default Navbar;