import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Navbar from "./Components/Navbar";
import Addagent from "./Pages/Addagent";
import { useEffect, useState } from "react";
import Dashboard from "./Pages/Dashboard";
import Agent from "./Pages/Agent";
import Customer from "./Pages/Customer";
import Addcustomer from "./Pages/Addcustomer";
import Resetpassword from "./Pages/Resetpassword";
import Otp from "./Pages/Otp";
import Editagent from "./Pages/Editagent";
// import Loader from './Pages/Loader.jsx';
import Veiwcustomer from "./Pages/Veiwcustomer";
import Editcustomer from "./Pages/Editcustomer";
import Cutomerbankaccount from "./Pages/Cutomerbankaccount.jsx";
// import Loadersp from './Pages/Loader.jsx';
import Csvfile from "./Pages/Csvfile.jsx";
import AddAdmin from "./Pages/AddAdmin.jsx";
import Alladmin from "./Pages/Alladmin.jsx";
import Adminedit from "./Pages/Adminedit.jsx";
import Adminresetpass from "./Pages/Adminresetpass.jsx";
import Adminotp from "./Pages/Adminotp.jsx";
import Amountdedect from "./Pages/Amountdedect.jsx";
import Commision from "./Pages/Commision.jsx";
import AdminVerify from "./Pages/AdminVerify.jsx";
import ViewAccount from "./Pages/ViewAccount.jsx";
import Viewdocuments from "./Pages/Viewdocuments.jsx";
import Deposite from "./Pages/Deposite.jsx";
import AllLoan from "./Pages/AllLoan.jsx";
import AllAccTransaction from "./Pages/AllAccTransaction.jsx";
import EditAmountPigmy from "./Pages/EditAmountPigmy.jsx";
import EditAllAmount from "./Pages/EditAllAmount.jsx";
import AgentCustomer from "./Pages/AgentCustomer.jsx";

const App = () => {
  const initialLoginStatus = localStorage.getItem("isLoggedIn") === "true";
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoginStatus);

  // Store login status in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/adminverify"
          element={<AdminVerify setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/*"
          element={
            isLoggedIn ? (
              <div>
                <Routes>
                  <Route
                    path="/dashboard"
                    element={
                      <div>
                        <Navbar />
                        <Dashboard />
                      </div>
                    }
                  />

                  <Route
                    path="/amountdect"
                    element={
                      <div>
                        <Navbar />
                        <Amountdedect />
                      </div>
                    }
                  />

                  <Route
                    path="/deposite"
                    element={
                      <div>
                        <Navbar />
                        <Deposite />
                      </div>
                    }
                  />

                  <Route
                    path="/agent"
                    element={
                      <div>
                        <Navbar />
                        <Agent />
                      </div>
                    }
                  />
                  <Route
                    path="/commission"
                    element={
                      <div>
                        <Navbar />
                        <Commision />
                      </div>
                    }
                  />

                  <Route
                    path="/loandetails"
                    element={
                      <div>
                        <Navbar />
                        <AllLoan />
                      </div>
                    }
                  />

                  <Route
                    path="/allacctransaction"
                    element={
                      <div>
                        <Navbar />
                        <AllAccTransaction />
                      </div>
                    }
                  />

                  <Route
                    path="/pigmyedit1.2.3.01/:pigmyId"
                    element={
                      <div>
                        <Navbar />
                        <EditAmountPigmy />
                      </div>
                    }
                  />

                  <Route
                    path="/editAllaccount1.2.3.00/:pigmyId"
                    element={
                      <div>
                        <Navbar />
                        <EditAllAmount />
                      </div>
                    }
                  />

                  <Route
                    path="/alladmin"
                    element={
                      <div>
                        <Navbar />
                        <Alladmin />
                      </div>
                    }
                  />

                  <Route
                    path="/adminedit/:id"
                    element={
                      <div>
                        <Navbar />
                        <Adminedit />
                      </div>
                    }
                  />

                  <Route
                    path="/viewaccount/:id"
                    element={
                      <div>
                        <Navbar />
                        <ViewAccount />
                      </div>
                    }
                  />

                  <Route
                    path="/viewdocuments/:id"
                    element={
                      <div>
                        <Navbar />
                        <Viewdocuments />
                      </div>
                    }
                  />

                  <Route
                    path="/csvfile"
                    element={
                      <div>
                        <Navbar />
                        <Csvfile />
                      </div>
                    }
                  />
                  <Route
                    path="/customer"
                    element={
                      <div>
                        <Navbar />
                        <Customer />
                      </div>
                    }
                  />
                  <Route
                    path="/agentCustomer/:id"
                    element={
                      <div>
                        <Navbar />
                        <AgentCustomer />
                      </div>
                    }
                  />
                  <Route
                    path="/addcustomer"
                    element={
                      <div>
                        <Navbar />
                        <Addcustomer />
                      </div>
                    }
                  />

                  <Route
                    path="/editcustomer/:id"
                    element={
                      <div>
                        <Navbar />
                        <Editcustomer />
                      </div>
                    }
                  />

                  <Route
                    path="/cutomerbankaccount/:custId"
                    element={
                      <div>
                        <Navbar />
                        <Cutomerbankaccount />
                      </div>
                    }
                  />

                  <Route
                    path="/addagent"
                    element={
                      <div>
                        <Navbar />
                        <Addagent />
                      </div>
                    }
                  />

                  <Route
                    path="/addadmin"
                    element={
                      <div>
                        <Navbar />
                        <AddAdmin />
                      </div>
                    }
                  />

                  <Route
                    path="/agentedit/:id"
                    element={
                      <div>
                        <Navbar />
                        <Editagent />
                      </div>
                    }
                  />

                  <Route
                    path="/viewcustomer/:id"
                    element={
                      <div>
                        <Navbar />
                        <Veiwcustomer />
                      </div>
                    }
                  />

                  <Route
                    path="/resetpassword"
                    element={
                      <div>
                        <Navbar />
                        <Resetpassword />
                      </div>
                    }
                  />

                  <Route
                    path="/adminresetpass"
                    element={
                      <div>
                        <Adminresetpass />
                      </div>
                    }
                  />

                  <Route
                    path="/adminotp"
                    element={
                      <div>
                        <Adminotp />
                      </div>
                    }
                  />

                  <Route
                    path="/Otp"
                    element={
                      <div>
                        <Navbar />
                        <Otp />
                      </div>
                    }
                  />
                </Routes>
              </div>
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

// function App() {

//   const initialLoginStatus = localStorage.getItem('isLoggedIn') === 'true';
//   const [isLoggedIn, setIsLoggedIn] = useState(initialLoginStatus);

//   // Store login status in local storage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('isLoggedIn', isLoggedIn);
//   }, [isLoggedIn]);

//   return (
//     <div className="App">
//       <Router>
//         <Routes>

//           <Route path='/' element={<Login />} />

//           <Route path='/dashboard' element={
//             <div>
//               <Navbar />
//               <Dashboard />
//             </div>
//           } />

// <Route path='/adminverify' element={
//             <div>

//               <AdminVerify />
//             </div>
//           } />

// <Route path='/amountdect' element={
//             <div>
//               <Navbar />
//               <Amountdedect />
//             </div>
//           } />

//           <Route path='/agent' element={
//             <div>
//               <Navbar />
//               <Agent />
//             </div>
//           } />

// <Route path='/commission' element={
//             <div>
//               <Navbar />
//               <Commision />
//             </div>
//           } />

//           <Route path='/alladmin' element={
//             <div>
//               <Navbar />
//               <Alladmin />
//             </div>
//           } />

//           <Route path='/adminedit/:id' element={
//             <div>
//               <Navbar />
//               <Adminedit />
//             </div>
//           } />

//           <Route path='/csvfile' element={
//             <div>
//               <Navbar />
//               <Csvfile />
//             </div>
//           } />

//           <Route path='/customer' element={
//             <div>
//               <Navbar />
//               <Customer />
//             </div>
//           } />

//           <Route path='/addcustomer' element={
//             <div>
//               <Navbar />
//               <Addcustomer />
//             </div>
//           } />

//           <Route path='/editcustomer/:id' element={
//             <div>
//               <Navbar />
//               <Editcustomer />
//             </div>
//           } />

//           <Route path='/cutomerbankaccount/:custId' element={
//             <div>
//               <Navbar />
//               <Cutomerbankaccount />
//             </div>
//           } />

//           <Route path='/addagent' element={
//             <div>
//               <Navbar />
//               <Addagent />
//             </div>
//           } />

//           <Route path='/addadmin' element={
//             <div>
//               <Navbar />
//               <AddAdmin />
//             </div>
//           } />

//           <Route path='/agentedit/:id' element={
//             <div>
//               <Navbar />
//               <Editagent />
//             </div>
//           } />

//           <Route path='/viewcustomer/:id' element={
//             <div>
//               <Navbar />
//               <Veiwcustomer />
//             </div>
//           } />

//           <Route path='/resetpassword' element={
//             <div>
//               <Navbar />
//               <Resetpassword />
//             </div>
//           } />

//           <Route path='/adminresetpass' element={
//             <div>

//               <Adminresetpass />
//             </div>
//           } />

//           <Route path='/adminotp' element={
//             <div>

//               <Adminotp />
//             </div>
//           } />

//           <Route path='/Otp' element={
//             <div>
//               <Navbar />
//               <Otp />
//             </div>
//           } />

//         </Routes>
//       </Router>

//     </div>
//   );
// }

// export default App;
