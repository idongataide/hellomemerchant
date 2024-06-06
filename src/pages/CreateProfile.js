import React, { useEffect, useState } from 'react';
import Images from './Images';
import { useNavigate } from 'react-router-dom';
import Myfunctions from '../js/MyFuntions';
import { Select } from 'antd';
import { Country, State } from 'country-state-city';
import useStore, { useStoreSelector } from '../js/Store/useStore';

const { Option } = Select;


function CreateProfile() {

    const navigate = useNavigate();

    const { setProfileProgress } = useStoreSelector(["SetProfileProgress"]);

    useEffect(() => {
        Myfunctions.ProfileProgress(navigate, setProfileProgress)
     }, [])

    const [loading, setLoading] = useState(false);

    const OPTIONS = ['Private Unlimited', 'LTD', 'Plc', 'Old Public Company', 'Private Unlimited Nsc', 'Assurance Company', 'Oversea Company', 'Eeig', 'Icvc Securities', 'Icvc Warrants', 'Royal Charter', 'Unregitered Company', 'Others'];
    const BusinessIndustry = ['Agric content services', 'Agriculture/Farming', 'Art Dealers', 'Boat Dealers'];

    const [selectedBusinessType, setSelectedBusinessType] = useState(null);
    const [selectedIndustry, setSelectedIndustry] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            businessType: selectedBusinessType,
            industry: selectedIndustry,
            country: selectedCountry ? selectedCountry.name : null,
            countryIsoCode: selectedCountry ? selectedCountry.isoCode : null,
            state: selectedState,
            phonecode: selectedCountry ? selectedCountry.phonecode : null,
            incorporation: e.target.elements.incorporation.value.trim(),
            RcNumeber: e.target.elements.RcNumeber.value.trim(),
            email: e.target.elements.email.value.trim(),
            Website: e.target.elements.Website.value.trim(),
            business_address: e.target.elements.business_address.value.trim(),
            phone: e.target.elements.phone.value.trim(),
            city: e.target.elements.city.value.trim(),
        };

        Myfunctions.CreateProfile(formData, navigate, setLoading);
    };

    return (
        <div>
            <div className="SignupBody authincation">
                <div className="container">
                    <div className="row justify-content-center h-100- align-items-center">
                        <div className="col-xl-8 col-lg-9 col-md-12">
                            <div className="authincation-content">
                                <div className="row no-gutters">
                                    <div className="col-xl-12">
                                        <div className="auth-form">
                                            <div className="text-center mb-4">
                                                <img className='logo-img' src={Images.logo} alt="" />
                                            </div>
                                            <h3 className="text-center mb-4">Create Business Profile</h3>
                                            <form onSubmit={handleSubmit} action="#">
                                                <div className='row'>
                                                    <div className='mb-3 col-md-6'>
                                                        <div className="form-group">
                                                            <label className="mb-1"><strong>Business Type</strong></label>
                                                            <Select
                                                                showSearch
                                                                className='form-control bg-white business_type p-0'
                                                                placeholder="Select Business Type"
                                                                value={selectedBusinessType}
                                                                onChange={setSelectedBusinessType}
                                                                options={OPTIONS.map((item) => ({
                                                                    value: item,
                                                                    label: item,
                                                                }))}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='mb-3 col-md-6'>
                                                        <div className="form-group">
                                                            <label className="mb-1"><strong>Business Industry</strong></label>
                                                            <Select
                                                                showSearch
                                                                className='form-control bg-white business_industry p-0'
                                                                placeholder="Select Business Industry"
                                                                value={selectedIndustry}
                                                                onChange={setSelectedIndustry}
                                                                options={BusinessIndustry.map((item) => ({
                                                                    value: item,
                                                                    label: item,
                                                                }))}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <div className="form-group">
                                                            <label className="mb-1"><strong>Business Incorporation Date</strong></label>
                                                            <input name='incorporation' type="date" className="Incorporation form-control" placeholder="Business Incorporation Date" />
                                                        </div>
                                                    </div>
                                                    <div className='mb-3 col-md-6'>
                                                        <div className="form-group">
                                                            <label className="mb-1"><strong>Business RcNumber</strong></label>
                                                            <input name='RcNumeber' type="text" className="rc_number form-control" placeholder="Business RcNumber" />
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <div className="form-group">
                                                            <label className="mb-1"><strong>Business Email</strong></label>
                                                            <input name='email' type="email" className="email form-control" placeholder="Enter mail" />
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <div className="form-group">
                                                            <label className="mb-1"><strong>Phone Number</strong></label>
                                                            <input name='phone' type="text" className="phone form-control" placeholder="Phone Number" />
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <div className="form-group">
                                                            <label className="mb-1"><strong>Website</strong></label>
                                                            <input name='Website' type="text" className="website form-control" placeholder="Website" />
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
                                                                disabled={!selectedCountry}
                                                            >
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

export default CreateProfile;
