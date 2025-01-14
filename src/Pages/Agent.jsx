

import React, { useEffect, useState } from 'react';
import { Switch } from 'antd';
import axios from 'axios';
import Loader from './Loader';
import { Link } from 'react-router-dom';
import { GrFormSearch } from "react-icons/gr";
import { AiFillPlusCircle } from "react-icons/ai";

const Agent = () => {
  const [agent, setAgent] = useState([]);
  const [query, setSearchQuery] = useState(''); // State for the input value
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    Allagent();
  }, []);

  const handleSearchInput = (event) => {
    setSearchQuery(event.target.value);
  };

  const Allagent = () => {
    axios
      .get('https://unioncooperativesocietylimited.in:8443/agent/getAllAgents')
      .then((response) => {
        console.log(response.data.data);
        setAgent(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  // const greenColor = "linear-gradient(180deg, rgba(5, 255, 0, 0.87) 0%, rgba(5, 250, 0, 0.4) 100%)"
  // const redColor = "linear-gradient(180deg, #E33A3A 0%, #AF3939 100%)"

  const handleSwitchChange = (agentId, status) => {
    const Id_status = status ? 'offline' : 'online';
    const endpoint = `https://unioncooperativesocietylimited.in:8443/agent/${Id_status}/${agentId}`;
  
    axios
      .patch(endpoint)
      .then((res) => {
        console.log(res.data);
  
        // Update the local state with the new status
        setAgent((prevAgent) =>
          prevAgent.map((agent) =>
            agent.id === agentId ? { ...agent, status: !status } : agent
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  


  const searchCustomers = () => {
    axios
      .get(`https://unioncooperativesocietylimited.in:8443/agent/getAgentByIdOrAgentByName/${query}`)
      .then((response) => {
        console.log(response.data.data);
        setSearchResults(response.data.data); // Set the search results in state
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const dataToDisplay = query ? searchResults : agent;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='container-fluid 100vh 100vw' style={{ padding: '1%' }}>
          <div className='row'>
            <h1 className='fw-bold' style={{ textAlign: 'center' ,fontFamily:'serif',color:'#4F6F52'}}>All Agents</h1>
            <div style={{display:"flex",justifyContent:"end" }}>

              

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginRight: "2%" }}>
                <p><input
                  className='form-control'
                  style={{ width: '100%' }}
                  placeholder='Search By Name'
                  value={query}
                  onChange={handleSearchInput} // Handle input changes
                /></p>
                {/* <div style={{ marginLeft: '180px', position: 'absolute' }}>
                  <p><GrFormSearch style={{ opacity: '50%' }} fontSize={25} /></p>
                </div> */}
              <button className='btn' style={{marginTop:'-20px', marginLeft: '5px', padding: '6px 25px', background:'#4F6F52',color:'white' }} onClick={searchCustomers}>Search</button>
              </div>

              <div>
              <Link to='/addagent'>
              <button style={{ fontSize: '16px',fontFamily:'serif',background:"#4F6F52",color:'whitesmoke' }}  className='btn'>Add Agent </button>
              </Link>
              </div>
              
            </div>

            <div className='container-fluid'>
              <div className='row'>
                {
                  dataToDisplay.map((val, index) => (
                    <div className='col-lg-2 mt-5' style={{marginLeft:'3%', width:'250px',textAlign: 'center',boxShadow:'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}} key={index}>

                      
                          <div style={{width:'225px',height:'120px',
                          background: val.status ? 'linear-gradient(180deg, rgba(5, 255, 0, 0.87) 0%, rgba(5, 250, 0, 0.4) 100%)' : 'linear-gradient(180deg, #E33A3A 0%, #AF3939 100%)',
                          borderRadius:'10px'  }} 
                          onClick={() => handleSwitchChange(val.id, val.status)}
                          
                          >
                            

                            
                          </div>
                            <Link to={`/agentedit/${val.id}`} style={{ textDecoration: 'none' }}>
                          <img src={val.agentProfileImage} style={{marginTop:'-20%', width: '100px', height: '90px', borderRadius: '50%',border:'5px solid white' }} alt='not found' />
                        </Link>
                        <div style={{width:'240px',overflow:'hidden'}}>
                          <h4 style={{textAlign:'center', fontSize:'24px', marginTop:'-2%'}}>{val.agentName}</h4>
                          </div>
                          <div style={{width:'240px',overflow:'hidden'}}>

                          <h6 style={{textAlign:'center', fontSize:'14px', marginTop:'-1%'}}>{val.email}</h6>
                          </div>
                          <h4 style={{textAlign:'center', fontSize:'18px',marginTop:'-1%'}}>{val.id}</h4>
                          <h4 style={{textAlign:'center', fontSize:'15px', marginTop:'-1%',
                          color:val.status? 'rgba(5, 255, 0, 0.87)' : '#E33A3A'}}>
                            {val.status? 'online':'offline'}</h4>
                            <Link style={{textDecoration:'none'}} to={`/agentCustomer/${val.id}`}>
                            <h6>View</h6>
                            </Link>
                        
                          {/* <p style={{textAlign:'center'}}>
                            <Switch
                              defaultChecked={val.status}
                              checkedChildren='online'
                              unCheckedChildren='offline'
                              style={{
                                backgroundColor: val.status ? 'rgba(5, 255, 0, 0.87)' : '#E33A3A',
                                borderColor: val.status ? 'rgba(5, 255, 0, 0.87)' : '#AF3939', }}
                              onChange={(checked) => handleSwitchChange(val.id, checked)}
                              
                            />
                          </p> */}
                        
                      </div>
                   
                  ))

                }
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Agent;



// background: linear-gradient(180deg, rgba(5, 255, 0, 0.87) 0%, rgba(5, 250, 0, 0.4) 100%);
