import React from 'react';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './Components/Scroll';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Verify from './pages/Verify';
import Index from './pages/Index';
import Product from './pages/Product';
import ApiKeys from './pages/ApiKeys';
import Report from './pages/Report';
import Settings from './pages/Settings';
import Otp from './pages/Otp';
import ForgotPassword from './pages/ForgotPassword';
import SetPin from './pages/SetPin';
import AccountSetup from './pages/AccountSetup';
import CreateProfile from './pages/CreateProfile';
import DirectorProfile from './pages/DirectorProfile';
import UpdatePassword from './pages/UpdatePassword';
import Transfer from './pages/Transfer';


function App() {
  return (
    <React.Fragment>
           <ReactNotifications />
            <Router>
             <ScrollToTop />
               <Routes>
                  <Route path="/" element={<Signin/>} />   
                  <Route path="/signup" element={<Signup/>} />  
                  <Route path="/signin" element={<Signin/>} /> 
                  <Route path="/create-profile" element={<CreateProfile/>} />  
                  <Route path="/director-profile" element={<DirectorProfile/>} />  
                  <Route path="/verify" element={<Verify/>} />
                  <Route path="/verify" element={<Verify/>} /> 
                  <Route path="/Account-setup" element={<AccountSetup/>} /> 
                  <Route path="/Otp"  element={<Otp/>}/>
                  <Route path="/set-pin"  element={<SetPin/>}/>
                  <Route path="/forgot-password"  element={<ForgotPassword/>}/>
                  <Route path="/reset_password"  element={<UpdatePassword/>}/>
                  <Route path="/reset_password/:token"  element={<UpdatePassword/>}/>
                  <Route path="/index" element={<Index/>} /> 
                  <Route path="/product" element={<Product/>} /> 
                  <Route path="/api" element={<ApiKeys/>} /> 
                  <Route path="/report" element={<Report/>} /> 
                  <Route path="/transfer" element={<Transfer/>} /> 
                  <Route path="/settings" element={<Settings/>} /> 
                  <Route exact path="/settings/:id" element={<Settings/>} /> 

               </Routes>
            </Router>
      </React.Fragment>
  );
}

export default App;
