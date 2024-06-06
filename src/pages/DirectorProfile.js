import React, { useEffect, useState } from 'react'
import Images from './Images'
import { Link, useNavigate} from 'react-router-dom'
import Myfunctions from '../js/MyFuntions'
import Apphelpers from '../js/Apphelpers'
import { appState } from '../js/Context/State'
import { Select } from 'antd';
import { Country, State } from 'country-state-city';
const { Option } = Select;



function DirectorProfile() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [gender, setGender] = useState(null);

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [stateOptions, setStateOptions] = useState([]);

    useEffect(() => {
        document.title = "Merchant Signup - Hellome Merchant"
     }, [])


     const handleSubmit = (e) => {
        e.preventDefault();
            const formData = {
                gender,
                phone: e.target.elements.phone.value.trim(),
                dob: e.target.elements.dob.value.trim(),
                country: selectedCountry ? selectedCountry.name : null,
                countryIsoCode: selectedCountry ? selectedCountry.isoCode : null,
                phonecode: selectedCountry ? selectedCountry.phonecode : null,
                state: selectedState,
                city: e.target.elements.city.value.trim(),
                address: e.target.elements.business_address.value.trim(),
            };
        
            Myfunctions.DirectorProfile(formData, navigate, setLoading);
        };

  return (
    <div>

        <div class="SignupBody authincation">
                <div class="container">
                    <div class="row justify-content-center h-100- align-items-center">
                        <div class="col-xl-8 col-lg-9 col-md-12">
                            <div class="authincation-content">
                                <div class="row no-gutters">
                                    <div class="col-xl-12">
                                        <div class="auth-form">
                                            <div class="text-center mb-3">
                                                <img className='logo-img' src={Images.logo} alt=""/>
                                            </div>
                                            <h3 class="text-center mb-3">Create Profile</h3>
                                            <form onSubmit={handleSubmit} action="#">
                                               <div className='row'>                                                    
                                                    <h4 className='mb-3'>Personal Details</h4>
                                                    <div className='mb-3 col-md-6'>
                                                        <div class="form-group">
                                                            <label class="mb-1"><strong>Gender</strong></label>
                                                            <Select
                                                                showSearch
                                                                className="form-control bg-white p-0"
                                                                value={gender}
                                                                onChange={setGender}
                                                                 >
                                                                <Option value="Male">Male</Option>
                                                                <Option value="Female">Female</Option>
                                                            </Select>
                                                        </div>                                          
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <div class="form-group">
                                                            <label class="mb-1"><strong>Phone Number</strong></label>
                                                            <input name='phone' type="text" class="phone form-control" placeholder="Phone Number"/>
                                                        </div>
                                                    </div> 
                                                    <div className='col-md-6'>
                                                        <div class="form-group">
                                                            <label class="mb-1"><strong>Date Of Birth</strong></label>
                                                            <input name='dob' type="date" class="dob form-control" placeholder="Pick Date"/>
                                                        </div>
                                                    </div>
                                                    <div className='mb-3 col-md-6'>
                                                        <div className="form-group">
                                                            <label className="mb-1"><strong>Country</strong></label>
                                                            <Select
                                                                showSearch
                                                                className='form-control bg-white p-0'
                                                                value={selectedCountry ? selectedCountry.name : undefined}
                                                                onChange={(value) => {
                                                                    const country = Country.getAllCountries().find(country => country.name === value);
                                                                    setSelectedCountry(country);
                                                                    setSelectedState(null);
                                                                }}
                                                            >
                                                                {Country.getAllCountries().map(country => (
                                                                    <Option key={country.isoCode} value={country.name}>
                                                                        {country.name}
                                                                    </Option>
                                                                ))}
                                                            </Select>

                                                        </div>
                                                    </div>
                                                    <div className='mb-3 col-md-6'>
                                                        <div className="form-group">
                                                            <label className="mb-1"><strong>State</strong></label>
                                                            <Select
                                                                showSearch
                                                                className='form-control bg-white p-0'
                                                                value={selectedState}
                                                                onChange={(value) => setSelectedState(value)}
                                                                disabled={!selectedCountry}                                                             >
                                                                {selectedCountry && State.getStatesOfCountry(selectedCountry.isoCode).map(state => (
                                                                    <Option key={state.name} value={state.name}>
                                                                        {state.name}
                                                                    </Option>
                                                                ))}
                                                           </Select>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <div className="form-group">
                                                            <label className="mb-1"><strong>City</strong></label>
                                                            <input name='city' type="text" className="dob form-control" placeholder="Enter City" />
                                                        </div>
                                                    </div>
                                                    <div className='mb-3 col-md-12'>
                                                        <div className="form-group">
                                                            <label className="mb-1"><strong>Business Address</strong></label>
                                                            <input name='business_address' type="text" className="address form-control" placeholder="Business Address" />
                                                        </div>
                                                    </div>     
                                                     
                                                    <button type="submit" className="btn btn-primary btn-block w-80 m-auto mt-3" disabled={loading}>
                                                       {loading && <span className='spinner-border'></span>}{loading ? 'Loading in...' : 'Create'}
                                                    </button>

                                                </div>
                                            </form>                                          
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      
    </div>
  )
}

export default DirectorProfile
