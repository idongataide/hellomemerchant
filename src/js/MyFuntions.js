import { } from 'react-router-dom';
import Apphelpers from './Apphelpers';
import ReducerAction from './Context/ReducerAction'
import { dispatcher } from './Context/State'




const Myfunctions = {}



Myfunctions.flashTimer = null
Myfunctions.flash = (status, text, hide = true) => {
   dispatcher({ type: ReducerAction.error, status: status, payload: text })
   //check the old timer
   if (Myfunctions.flashTimer) {
      clearTimeout(Myfunctions.flashTimer)
   }
   //if auto hide is enable
   if (hide) {
      Myfunctions.flashTimer = setTimeout(() => {
         dispatcher({ type: ReducerAction.error, status: status, payload: null })
      }, 7000)
   }
}






Myfunctions.create = async (e, navigate, setLoading) => {
    e.preventDefault()
    return new Promise((resolve, reject) => {
 
    let { fname, lname, email, business_name, sponsor} = e.target.elements
    fname = fname && fname.value.trim()
    lname = lname && lname.value.trim()
    business_name = business_name && business_name.value.trim()
    email = email && email.value.trim()
    sponsor = sponsor && sponsor.value.trim()

   let password = document.querySelector(".password").value
   let confirm_password = document.querySelector(".confirm_password").value

   const regexUpercase = /(?=.*?[A-Z])/;
   const regexCharacter = /(?=.*?[0-9])/;
 
   let medium_category = document.querySelector('.medium')
   let medium = medium_category ? medium_category.options[medium_category.selectedIndex]?.getAttribute('data-value') : '';
 

   if (!fname || fname === '') {
      return Apphelpers.flashMessage("error", "Kindly enter firstname")
   }

   if (!lname || lname === '') {
      return Apphelpers.flashMessage("error", "Kindly enter lastname")
   }

   if (!business_name || business_name === '') {
      return Apphelpers.flashMessage("error", "Kindly enter business name")
   }
    
   if (!email || email === '') {
        return Apphelpers.flashMessage("error", "A valid email is required")
   }
 
   if (email.includes('*')) {
        return Apphelpers.flashMessage("error", "Invalid Email format")
   }
   
   if (!password || password === '') {
      return Apphelpers.flashMessage("error", "Kindly insert password")
   }

   if (!regexCharacter.test(password)) {
      return Apphelpers.flashMessage("error", "Password should contain atleast one character")
   }

   if (!regexUpercase.test(password)) {
      return Apphelpers.flashMessage("error", "Password should contain atleast a capital letter")
   }

   if (password.length < 8) {
      return Apphelpers.flashMessage("error", "Password Length too short")
   }

   if (!confirm_password || confirm_password === '') {
      return Apphelpers.flashMessage("error", "Kindly confirm your password")
   }
   
   if (confirm_password != password) {
      return Apphelpers.flashMessage("error", "Confirm Password doesn't match")
   }

   if (!medium || medium === '') {
        return Apphelpers.flashMessage("error", "How did you hear about us?")
   }

 
   let bodyData = JSON.stringify({
       first_name: fname,
       last_name: lname,
       email: email,
       business_name: business_name,
       password: password,
       medium: medium,
       sponsor: sponsor

   });
 
 
    let sendData = {
       url: Apphelpers.url.create,
       method: 'POST',
       headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "h-auth-signature": Apphelpers.signature,
      },
       body: bodyData
    }

    setLoading(true);
 
    Apphelpers.sendRequest(sendData, res => {
       setLoading(false);
       if (res.status === '00') {
           localStorage.setItem('email', email)
           navigate('/otp')
           return Apphelpers.flashMessage("success", res.message)
       } else {
          return Apphelpers.flashMessage("error", res.message)
       }
   });
 
 });
};

Myfunctions.CreateProfile = async (formData, navigate, setLoading) => {
   const { businessType, industry, country, state, incorporation, RcNumeber, email, Website, business_address, phone, city, phonecode} = formData;

   let token = sessionStorage.getItem('token')
   
   if (!token) {
      return Apphelpers.flashMessage("error", "Invalid token");
   }

   if (!businessType) {
       return Apphelpers.flashMessage("error", "Kindly select Business Type");
   }

   if (!industry) {
       return Apphelpers.flashMessage("error", "Kindly select Business Industry");
   }

   if (!incorporation) {
       return Apphelpers.flashMessage("error", "Kindly enter Business Incorporation Date");
   }

   if (!RcNumeber) {
       return Apphelpers.flashMessage("error", "Kindly enter Rc Number");
   }

   if (!email) {
       return Apphelpers.flashMessage("error", "Kindly enter Business Email");
   }

   if (!Website) {
       return Apphelpers.flashMessage("error", "Kindly enter Website");
   }

   if (!business_address) {
       return Apphelpers.flashMessage("error", "Kindly enter business address");
   }

   if (!phone) {
       return Apphelpers.flashMessage("error", "Kindly enter phone number");
   }

   if (!country) {
       return Apphelpers.flashMessage("error", "Kindly select a Country");
   }

   if (!state) {
       return Apphelpers.flashMessage("error", "Kindly select a State");
   }

   if (!city) {
       return Apphelpers.flashMessage("error", "Kindly enter a City");
   }

   
   const bodyData = JSON.stringify({
       country: country,
       phone_country_code: phonecode,
       phone_number: phone,
       business_email: email,
       business_industry: industry,
       business_type: businessType,
       website: Website,
       rc_number: RcNumeber,
       incorporation_date: incorporation,
       state,
       city,
       business_address,
   });

   const sendData = {
       url: Apphelpers.url.create_profile,
       method: 'POST',
       headers: {
           "Accept": "application/json",
           "Content-Type": "application/json",
           "h-auth-signature": Apphelpers.signature,
           "user-auth": token
       },
       body: bodyData,
   };

   setLoading(true);

   Apphelpers.sendRequest(sendData, (res) => {
       setLoading(false);
       if (res.status === '00') {
          navigate('/director-profile');
          return Apphelpers.flashMessage("success", res.message);
       } else {
           return Apphelpers.flashMessage("error", res.message);
       }
   });
};


Myfunctions.DirectorProfile = (formData, navigate, setLoading) => {
   setLoading(true);

   const token = sessionStorage.getItem('token');

   const { phone, phonecode, dob, city, address, gender, country, state } = formData;

   if (!gender || gender === '') {
       return Apphelpers.flashMessage("error", "Kindly select gender");
   }
   if (!phone || phone === '') {
       return Apphelpers.flashMessage("error", "Kindly enter phone number");
   }
   if (!dob || dob === '') {
       return Apphelpers.flashMessage("error", "Kindly enter date of birth");
   }
   if (!country || country === '') {
       return Apphelpers.flashMessage("error", "Kindly select a Country");
   }
   if (!state || state === '') {
       return Apphelpers.flashMessage("error", "Kindly select a Country");
   }
   if (!city || city === '') {
       return Apphelpers.flashMessage("error", "Kindly select a city");
   }
   if (!address || address === '') {
       return Apphelpers.flashMessage("error", "Kindly enter your address");
   }


   const bodyData = JSON.stringify({
       country: country,
       phone_country_code: phonecode,
       phone_number: phone,
       state: state,
       city: city,
       gender: gender,
       dob: dob,
       address: address,
   });

   const sendData = {
       url: Apphelpers.url.director_profile,
       method: 'POST',
       headers: {
           "Accept": "application/json",
           "Content-Type": "application/json",
           "h-auth-signature": Apphelpers.signature,
           "user-auth": token,
       },
       body: bodyData
   };

   Apphelpers.sendRequest(sendData, res => {
       setLoading(false);
       if (res.status === '00') {
           navigate('/account-setup');
           Apphelpers.flashMessage("success", res.message);
       } else {
           Apphelpers.flashMessage("error", res.message);
       }
   });

};


Myfunctions.ProfileProgress = async (navigate, setProfileProgress) => {
   let token = sessionStorage.getItem('token');

   if (!token || token === '') {
       return Apphelpers.flashMessage("error", "Invalid request");
   }

   let sendData = {
       url: Apphelpers.url.profile_progress,
       method: 'POST',
       headers: {
           "Accept": "application/json",
           "Content-Type": "application/json",
           "h-auth-signature": Apphelpers.signature,
           "user-auth": token,
       },
       body: JSON.stringify({}),
   };

   Apphelpers.sendRequest(sendData, (res) => {
       if (res.status === '00') {
           const profileProgress = res;
           setProfileProgress(profileProgress);
           console.log(res)
           if (res.business_profile !== '1') {
               navigate('/create-profile');
           } else if (res.director_profile !== 1) {
               navigate('/director-profile');
           } else if (res.cac !== '1' || res.director_id !== '1' || res.mermat !== '1' || res.pin_setup !== '1' || res.pof !== '1') {
               navigate('/account-setup');
           } else {
               navigate('/index');
           }
       } else {
           Apphelpers.flashMessage("error", res.message);
       }
   });
};



Myfunctions.uploadCAC = async (file, navigate, setProfileProgress) => {


   return new Promise((resolve, reject) => {

    let token = sessionStorage.getItem('token')


    if (!token || token === '') {
      return Apphelpers.flashMessage("error", "Invalid request");
    }

    if (!file || file === '') {
       return Apphelpers.flashMessage("error", "Kindly update a valid File")
    }
   
  
     let formData = new FormData()
     formData.append('file', file)
 
     let sendData = {
       url: Apphelpers.url.upload_cac,
       method: 'POST',
       headers: {
         // "Accept": "application/json",
         // "Content-Type": "application/json",
         "h-auth-signature": Apphelpers.signature,
         "user-auth": token
       },
       body: formData,
     };
 
     Apphelpers.sendRequest(sendData, (res) => {
       if (res.status === '00') {
         return Apphelpers.flashMessage("success", res.message);
       } else {
         return Apphelpers.flashMessage("error", res.message);
       }
     });
   });
};


Myfunctions.uploadMermat  = async (file, navigate, setProfileProgress) => {


   return new Promise((resolve, reject) => {

    let token = sessionStorage.getItem('token')


    if (!token || token === '') {
      return Apphelpers.flashMessage("error", "Invalid request");
    }

    if (!file || file === '') {
       return Apphelpers.flashMessage("error", "Kindly update a valid File")
    }
   
  
     let formData = new FormData()
     formData.append('file', file)
 
     let sendData = {
       url: Apphelpers.url.upload_mermat,
       method: 'POST',
       headers: {
         // "Accept": "application/json",
         // "Content-Type": "application/json",
         "h-auth-signature": Apphelpers.signature,
         "user-auth": token
       },
       body: formData,
     };
 
     Apphelpers.sendRequest(sendData, (res) => {
       if (res.status === '00') {
         // Myfunctions.ProfileProgress(navigate, setProfileProgress)
         return Apphelpers.flashMessage("success", res.message);
       } else {
         return Apphelpers.flashMessage("error", res.message);
       }
     });
   });
};


Myfunctions.IDcard  = async (file) => {


   return new Promise((resolve, reject) => {

    let token = sessionStorage.getItem('token')


    if (!token || token === '') {
      return Apphelpers.flashMessage("error", "Invalid request");
    }

    if (!file || file === '') {
       return Apphelpers.flashMessage("error", "Kindly update a valid File")
    }
   
  
     let formData = new FormData()
     formData.append('file', file)
 
     let sendData = {
       url: Apphelpers.url.upload_id,
       method: 'POST',
       headers: {
         // "Accept": "application/json",
         // "Content-Type": "application/json",
         "h-auth-signature": Apphelpers.signature,
         "user-auth": token
       },
       body: formData,
     };
 
     Apphelpers.sendRequest(sendData, (res) => {
       if (res.status === '00') {
         return Apphelpers.flashMessage("success", res.message);
       } else {
         return Apphelpers.flashMessage("error", res.message);
       }
     });
   });
};

Myfunctions.uploadPOF  = async (file, navigate, setProfileProgress) => {


   return new Promise((resolve, reject) => {

    let token = sessionStorage.getItem('token')


    if (!token || token === '') {
      return Apphelpers.flashMessage("error", "Invalid request");
    }

    if (!file || file === '') {
       return Apphelpers.flashMessage("error", "Kindly update a valid File")
    }
   
  
     let formData = new FormData()
     formData.append('file', file)
 
     let sendData = {
       url: Apphelpers.url.upload_pof,
       method: 'POST',
       headers: {
         // "Accept": "application/json",
         // "Content-Type": "application/json",
         "h-auth-signature": Apphelpers.signature,
         "user-auth": token
       },
       body: formData,
     };
 
     Apphelpers.sendRequest(sendData, (res) => {
       if (res.status === '00') {
         Myfunctions.ProfileProgress(navigate, setProfileProgress)
         return Apphelpers.flashMessage("success", res.message);
       } else {
         return Apphelpers.flashMessage("error", res.message);
       }
     });
   });
};

// Myfunctions.Signin = async (e, navigate, setLoading) => {
//   e.preventDefault();
//   return new Promise((resolve, reject) => {
//     let { email, password } = e.target.elements;
//     email = email && email.value.trim();
//     password = password && password.value.trim();

//     if (!email || email === '') {
//       return Apphelpers.flashMessage("error", "Kindly enter email");
//     }

//     if (!password || password === '') {
//       return Apphelpers.flashMessage("error", "Kindly enter password");
//     }

//     let bodyData = JSON.stringify({
//       email: email,
//       password: password,
//     });

//     let sendData = {
//       url: Apphelpers.url.signin,
//       method: 'POST',
//       headers: {
//         "Accept": "application/json",
//         "Content-Type": "application/json",
//         "h-auth-signature": Apphelpers.signature,
//       },
//       body: bodyData,
//     };
//     setLoading(true);

//     Apphelpers.sendRequest(sendData, (res) => {
//       setLoading(false);
//       if (res.status === '00') {
//          sessionStorage.setItem('token', res.jwt)
//          Myfunctions.ProfileProgress(navigate); 
//       }  else {
//          return Apphelpers.flashMessage("error", res.message);
//       }
//     });
//   });
// };


Myfunctions.Signin = async (e, navigate, setLoading, setUserData, setProfileProgress) => {
   e.preventDefault();

   let { email, password } = e.target.elements;
   email = email && email.value.trim();
   password = password && password.value.trim();

   if (!email || email === '') {
       return Apphelpers.flashMessage("error", "Kindly enter email");
   }

   if (!password || password === '') {
       return Apphelpers.flashMessage("error", "Kindly enter password");
   }

   let bodyData = JSON.stringify({
       email: email,
       password: password,
   });

   let sendData = {
       url: Apphelpers.url.signin,
       method: 'POST',
       headers: {
           "Accept": "application/json",
           "Content-Type": "application/json",
           "h-auth-signature": Apphelpers.signature,
       },
       body: bodyData,
   };
   setLoading(true);

   Apphelpers.sendRequest(sendData, (res) => {
       setLoading(false);
       if (res.status === '00') {
           const userProfile = res;
           sessionStorage.setItem('token', res.jwt);
           setUserData(userProfile);
           Myfunctions.ProfileProgress(navigate, setProfileProgress);
       } else {
           return Apphelpers.flashMessage("error", res.message);
       }
   });
};

Myfunctions.ForgotPassword = async (e, navigate, setLoading) => {

   e.preventDefault()
   return new Promise((resolve, reject) => {
    
   let {email, password} = e.target.elements;
   email = email && email.value.trim()
   password = password && password.value.trim()
 
 
 
   if (!email || email === '') {
      return Apphelpers.flashMessage("error", "Kindly enter email")
   }
 
   if (!password || password === '') {
      return Apphelpers.flashMessage("error", "Kindly enter password")
   }
 
 
   let bodyData = JSON.stringify({
       email: email,
       password: password
   });
 
 
    let sendData = {
       url: Apphelpers.url.signin,
       method: 'POST',
       headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "h-auth-signature": Apphelpers.signature,
      },
       body: bodyData
    }
    setLoading(true);
    Apphelpers.sendRequest(sendData, res => {
       if (res.status === '00') {
           setLoading(false);
           navigate('/index')
           return Apphelpers.flashMessage("success", res.message)
       } else {
          return Apphelpers.flashMessage("error", res.message)
       }
   });
 
 });
};
  
Myfunctions.handleOTP = async (e, navigate, setLoading) => {

   e.preventDefault()
   return new Promise((resolve, reject) => {
 
   let email = localStorage.getItem('email')
   let otp_code = document.getElementById("otp").value;
 
 
   if (!email || email === '') {
      return Apphelpers.flashMessage("error", "Kindly enter email")
   }
 
   if (!otp_code || otp_code === '') {
      return Apphelpers.flashMessage("error", "Kindly enter OTP Code")
   }
 
 
   let bodyData = JSON.stringify({
       email: email,
       otp: otp_code,
   });
 
 
    let sendData = {
       url: Apphelpers.url.verify_otp,
       method: 'POST',
       headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "h-auth-signature": Apphelpers.signature,
      },
       body: bodyData
    }
    
    setLoading(true);
    Apphelpers.sendRequest(sendData, res => {
       setLoading(false);
       if (res.status === '00') {
           localStorage.setItem('token', res.user_token)
           navigate('/signin')
           return Apphelpers.flashMessage("success", res.message)
       } else {
          return Apphelpers.flashMessage("error", res.message)
       }
   });
 
 });
 };
 

 Myfunctions.SetPin = async (e, navigate, setLoading) => {

   e.preventDefault()
   return new Promise((resolve, reject) => {
 
   let token = sessionStorage.getItem('token')
   let pin = document.getElementById("otp").value;
 
 
   if (!token || token === '') {
      return Apphelpers.flashMessage("error", "Invalid request")
   }
 
   if (!pin || pin === '') {
      return Apphelpers.flashMessage("error", "Kindly set your pin")
   }
 
 
   let bodyData = JSON.stringify({
      token: token,
      pin: pin,
   });
 

    let sendData = {
       url: Apphelpers.url.set_pin,
       method: 'POST',
       headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "h-auth-signature": Apphelpers.signature,
          "user-auth": token
      },
       body: bodyData
    }
    setLoading(true);

    Apphelpers.sendRequest(sendData, res => {
      setLoading(false);
       if (res.status === '00') {
           return Apphelpers.flashMessage("success", res.message)
       } else {
          return Apphelpers.flashMessage("error", res.message)
       }
   });
 
 });
 };
  




export default Myfunctions;
