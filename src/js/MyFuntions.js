import Apphelpers from './Apphelpers';
import ReducerAction from './Context/ReducerAction'
import { dispatcher } from './Context/State'
import useBoundStore from './Store/useStore';




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



Myfunctions.logOut = (e, navigate) => {
    e.preventDefault()
    localStorage.clear();
    sessionStorage.clear();
    navigate('/signin');
}
 
 Myfunctions.getId = (IP_id) => {
    document.querySelector('.IP_Id').value = IP_id  
    document.querySelector('#IP_Id').innerHTML = IP_id  
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

//    if (!businessType || businessType === '') {
//        return Apphelpers.flashMessage("error", "Kindly select Business Type");
//    }

   if (!industry || industry === '') {
       return Apphelpers.flashMessage("error", "Kindly select Business Industry");
   }

   if (!incorporation || incorporation === '') {
       return Apphelpers.flashMessage("error", "Kindly enter Business Incorporation Date");
   }

   if (!RcNumeber || RcNumeber === '') {
       return Apphelpers.flashMessage("error", "Kindly enter Rc Number");
   }

   if (!email || email === '') {
       return Apphelpers.flashMessage("error", "Kindly enter Business Email");
   }
   if (!phone || phone === '') {
    return Apphelpers.flashMessage("error", "Kindly enter phone number");
   }

   if (!Website || Website === '') {
       return Apphelpers.flashMessage("error", "Kindly enter Website");
   }

   if (!country || country === '') {
       return Apphelpers.flashMessage("error", "Kindly select a Country");
   }

   if (!state || state === '') {
       return Apphelpers.flashMessage("error", "Kindly select a State");
   }

   if (!city || city === '') {
       return Apphelpers.flashMessage("error", "Kindly enter a City");
   }

   if (!business_address || business_address === '') {
    return Apphelpers.flashMessage("error", "Kindly enter business address");
  }
   
   const bodyData = JSON.stringify({
       country: country,
       phone_country_code: phonecode,
       phone_number: phone,
       business_email: email,
       business_industry: industry,
    //    business_type: businessType,
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

    const token = sessionStorage.getItem('token');
    const { phone, phonecode, dob, city, address, gender, country, state } = formData;
 
    const calculateAge = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };
 
    if (!gender || gender === '') {
        return Apphelpers.flashMessage("error", "Kindly select gender");
    }
    if (!phone || phone === '') {
        return Apphelpers.flashMessage("error", "Kindly enter phone number");
    }
    if (!dob || dob === '') {
        return Apphelpers.flashMessage("error", "Kindly enter date of birth");
    }
    if (calculateAge(dob) < 18) {
        return Apphelpers.flashMessage("error", "You must be at least 18 years old");
    }
    if (!country || country === '') {
        return Apphelpers.flashMessage("error", "Kindly select a Country");
    }
    if (!state || state === '') {
        return Apphelpers.flashMessage("error", "Kindly select a State");
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
 
    setLoading(true);
 
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
 

Myfunctions.ProfileProgress = async (navigate) => {

    const setUser = useBoundStore.getState().setUser;

    
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
            Myfunctions.RefreshToken()
            const setProfileProgress = res;
            setUser('setProfileProgress', setProfileProgress);
            localStorage.setItem('secret_key', res.secret_key)
            if (res.business_profile !== '1') {
                navigate('/create-profile');
            } else if (res.director_profile !== 1) {
                navigate('/director-profile');
            } else if (res.cac !== '1' || res.director_id !== '1' || res.mermat !== '1' || res.pin_setup !== '1' || res.pof !== '1' ||res.kyb_status !== '0' ||  res.security_question !== 1) {
            // } else if (res.cac !== '1' || res.director_id !== '1' || res.mermat !== '1' || res.pin_setup !== '1' || res.pof !== '1' ||res.kyb_status !== '1' ||  res.security_question !== 1) {
                navigate('/account-setup');
            }  else{
                navigate('/index')
            }
        } else {
            // Apphelpers.flashMessage("error", res.message);
        }
    });
};


Myfunctions.uploadCAC = async (file, navigate) => {
    let token = sessionStorage.getItem('token');

    if (!token || token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }

    if (!file) {
        return Apphelpers.flashMessage("error", "Kindly update a valid File");
    }

    let formData = new FormData();
    formData.append('file', file);

    let sendData = {
        url: Apphelpers.url.upload_cac,
        method: 'POST',
        headers: {
            "h-auth-signature": Apphelpers.signature,
            "user-auth": token
        },
        body: formData,
    };

    Apphelpers.sendRequest(sendData, (res) => {
        if (res.status === '00') {
            Myfunctions.ProfileProgress(navigate);
            return Apphelpers.flashMessage("success", res.message);
        } else {
            return Apphelpers.flashMessage("error", res.message);
        }
    });
};


Myfunctions.uploadMermat  = async (file, navigate) => {


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
         Myfunctions.ProfileProgress(navigate)
         return Apphelpers.flashMessage("success", res.message);
       } else {
         return Apphelpers.flashMessage("error", res.message);
       }
     });
   });
};


Myfunctions.IDcard  = async (file, navigate) => {


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
         Myfunctions.ProfileProgress(navigate)
         return Apphelpers.flashMessage("success", res.message);
       } else {
         return Apphelpers.flashMessage("error", res.message);
       }
     });
   });
};

Myfunctions.uploadPOF  = async (file, navigate) => {


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
         Myfunctions.ProfileProgress(navigate)
         return Apphelpers.flashMessage("success", res.message);
       } else {
         return Apphelpers.flashMessage("error", res.message);
       }
     });
   });
};


Myfunctions.Signin = async (e, navigate, setLoading) => {

   const setUser = useBoundStore.getState().setUser;


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
       if (res.status === '00') {
           setLoading(false);
           sessionStorage.setItem('token', res.jwt);         
           sessionStorage.setItem('user_token', res.user_token);
           sessionStorage.setItem('wallet_token', res.wallet_token);
           localStorage.setItem('webhook_status', res.webhook_status)        
           const userProfile = res;
           setUser('userProfile', userProfile);
           Myfunctions.ProfileProgress(navigate);
       } else {
           setLoading(false);
           return Apphelpers.flashMessage("error", res.message);
       }
   });
};

Myfunctions.RefreshToken = async () => {

    const setUser = useBoundStore.getState().setUser;


    let token = sessionStorage.getItem('token');

    if (!token || token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }

    let bodyData  = JSON.stringify({
        jwt: token
    })

    let sendData = {
        url: Apphelpers.url.refreshToken,
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "h-auth-signature": Apphelpers.signature,
            "user-auth": token,
        },
        body: bodyData,
    };

    Apphelpers.sendRequest(sendData, (res) => {
        if (res.status === '00') {      
            const RefreshToken = res;
            setUser('RefreshToken', RefreshToken);
        } else {
            // Apphelpers.flashMessage("error", res.message);
        }
    });
   
 };

Myfunctions.ForgotPassword = async (e, navigate, setLoading) => {

   e.preventDefault()
   return new Promise((resolve, reject) => {
    
   let {email} = e.target.elements;
   email = email && email.value.trim()
 
 
 
   if (!email || email === '') {
      return Apphelpers.flashMessage("error", "Kindly enter email")
   }
 
 
   let bodyData = JSON.stringify({
       email: email,
   });
 
 
    let sendData = {
       url: Apphelpers.url.account_reset_otp,
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
       if (res.status === true) {
           setLoading(false);
           localStorage.setItem('password_email', email)
           navigate('/verify')
           return Apphelpers.flashMessage("success", res.message)
       } else {
          return Apphelpers.flashMessage("error", res.message)
       }
   });
 
 });
};


Myfunctions.UpdatePassword = async (e, navigate, setLoading) => {

   e.preventDefault()


   let code = localStorage.getItem('pass_token')
   let new_password = document.querySelector(".change_password").value
   let confirm_password = document.querySelector(".confirm_change_password").value

   const regexUpercase = /(?=.*?[A-Z])/;
   const regexCharacter = /(?=.*?[0-9])/;


   if (!new_password || new_password === '') {
      return Apphelpers.flashMessage("error", "Kindly insert password")
   }
   if (!regexCharacter.test(new_password)) {
      return Apphelpers.flashMessage("error", "Password Should contain atleast one character")
   }
   if (!regexUpercase.test(new_password)) {
      return Apphelpers.flashMessage("error", "Password Should contain atleast a capital letter")
   }
   if (new_password.length < 8) {
      return Apphelpers.flashMessage("error", "New Password Length too short")
   }
   if (!confirm_password || confirm_password === '') {
      return Apphelpers.flashMessage("error", "Kindly confirm your password")
   }
   if (confirm_password != new_password) {
      return Apphelpers.flashMessage("error", "Confirm Password doesn't match")
   }


   let bodyData = JSON.stringify({
       token: code,
       password: new_password,
   });

   let sendData = {
       url: Apphelpers.url.reset_password,
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
           navigate('/signin')
       } else {
           return Apphelpers.flashMessage("error", res.message);
       }
   });
};
  

Myfunctions.checkPassword = (e, setPasswordCondition) => {
   e.preventDefault()

   let password = document.querySelector(".setnewpassword").value

   const regexUpercase = /(?=.*?[A-Z])/;
   const regexCharacter = /(?=.*?[0-9])/;

   if (!regexCharacter.test(password)) {
      document.getElementById("character").checked = false
      const character = false
      setPasswordCondition('character', character)
   } else {
      document.getElementById("character").checked = true
      const character = true
      setPasswordCondition('character', character)
   }

   if (!regexUpercase.test(password)) {
      document.getElementById("uppercase").uppercase = false
      const uppercase = false
      setPasswordCondition('uppercase', uppercase)
   } else {
      document.getElementById("uppercase").checked = true
      const uppercase = true
      setPasswordCondition('uppercase', uppercase)
   }

   if (password.length < 8) {
      document.getElementById("length").checked = false
      const length = false
      setPasswordCondition('length', length)
   } else {
      document.getElementById("length").checked = true
      const length = true
      setPasswordCondition('length', length)
   }
}


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
           document.querySelector('#closePin').click()
           Myfunctions.ProfileProgress(navigate)
           return Apphelpers.flashMessage("success", res.message)
       } else {
          return Apphelpers.flashMessage("error", res.message)
       }
   });
 
 });
 };

 Myfunctions.BVN = async (e, setLoading, navigate) => {

    e.preventDefault()
    return new Promise((resolve, reject) => {

    let { bvn } = e.target.elements;
    bvn = bvn && bvn.value.trim();
  
    let token = sessionStorage.getItem('token')
  
  
    if (!token || token === '') {
       return Apphelpers.flashMessage("error", "Invalid request")
    }
  
    if (!bvn || bvn === '') {
       return Apphelpers.flashMessage("error", "Kindly Input BVN")
    }
  
  
    let bodyData = JSON.stringify({
       token: token,
       bvn: bvn,
    });
  
 
     let sendData = {
        url: Apphelpers.url.verify_bvn,
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
            Myfunctions.ProfileProgress(navigate)
            document.querySelector('#closeBVN').click()
            return Apphelpers.flashMessage("success", res.message)
        } else {
           return Apphelpers.flashMessage("error", res.message)
        }
    });
  
  });
};

Myfunctions.SecurityQuestions = async () => {

    const setUser = useBoundStore.getState().setUser;


    let token = sessionStorage.getItem('token');
    if (!token || token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }

    let sendData = {
        url: Apphelpers.url.fetch_questions,
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
        if (res.status === true) {      
            const GetQuestions = res;
            setUser('securityQuestions', GetQuestions);
        } else {
            // Apphelpers.flashMessage("error", res.message);
        }
    });
   
 };
  

Myfunctions.SetupQuestion = async (formData, setLoading) => {
    const { questions } = formData;

    let token = sessionStorage.getItem('token');

    if (!token || token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }

    const selectedQuestions = questions.filter(q => q.question_id && q.question && q.answer);

    if (selectedQuestions.length < 2) {
        return Apphelpers.flashMessage("error", "Kindly select at least 2 questions and provide answers");
    }

    const questionIds = new Set();
    for (const question of selectedQuestions) {
        if (questionIds.has(question.question_id)) {
            return Apphelpers.flashMessage("error", "Please select different questions.");
        }
        questionIds.add(question.question_id);
    }

    let allPromises = selectedQuestions.map(question => {
        let bodyData = JSON.stringify({
            question_id: question.question_id,
            question: question.question,
            answer: question.answer,
        });

        let sendData = {
            url: Apphelpers.url.set_security_question,
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "h-auth-signature": Apphelpers.signature,
                "user-auth": token,
            },
            body: bodyData,
        };

        setLoading(true);

        return new Promise(resolve => {
            Apphelpers.sendRequest(sendData, (res) => {
                setLoading(false);
                if (!res.status) {
                    resolve(res.message);
                } else {
                    resolve(null);
                }
            });
        });
    });

    let errorMessages = await Promise.all(allPromises);

    errorMessages = errorMessages.filter(message => message !== null);

    if (errorMessages.length > 0) {
        errorMessages.forEach(message => Apphelpers.flashMessage("error", message));
    } else {
        document.querySelector('#OpnePin').click()
        document.querySelector('#closeSecurityQuestions').click()
        Apphelpers.flashMessage("success", "Security questions have been successfully set.");
    }
};

Myfunctions.WhitelistIP = async (e, setLoading) => {

    const setUser = useBoundStore.getState().setUser;

    e.preventDefault();

    let { ip_address } = e.target.elements;
    ip_address = ip_address && ip_address.value.trim();

    let token = sessionStorage.getItem('token');
    let user_token = sessionStorage.getItem('user_token')

    if (!token || token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }

    if (!ip_address || ip_address === '') {
        return Apphelpers.flashMessage("error", "Kindly enter An IP Address");
    }

    let bodyData = JSON.stringify({
        user_token: user_token,
        ip_address: ip_address,
    });

    let sendData = {
        url: Apphelpers.url.whitelist_ip,
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "h-auth-signature": Apphelpers.signature,
            "user-auth": token,
        },
        body: bodyData,
    };

    
    setLoading(true);

    Apphelpers.sendRequest(sendData, (res) => {
        setLoading(false);
        if (res.status === '00') { 
            Myfunctions.RefreshToken()
            Myfunctions.FetchIP()
            document.querySelector('#closeWhiteList').click()         
            return Apphelpers.flashMessage("success", res.message);
        } else {
            return Apphelpers.flashMessage("error", res.message);
        }
    });
};

Myfunctions.DeleteIP = async (e, setLoading) => {

    const setUser = useBoundStore.getState().setUser;

    e.preventDefault();

    let { ip_address } = e.target.elements;
    ip_address = ip_address && ip_address.value.trim();



    let token = sessionStorage.getItem('token');
    let user_token = sessionStorage.getItem('user_token')

    if (!token || token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }

    if (!ip_address || ip_address === '') {
        return Apphelpers.flashMessage("error", "Kindly enter An IP Address");
    }

    let bodyData = JSON.stringify({
        user_token: user_token,
        ip_address: ip_address,
    });

    let sendData = {
        url: Apphelpers.url.delete_ip,
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "h-auth-signature": Apphelpers.signature,
            "user-auth": token,
        },
        body: bodyData,
    };

    
    setLoading(true);

    Apphelpers.sendRequest(sendData, (res) => {
        setLoading(false);
        if (res.status === '00') { 
            Myfunctions.RefreshToken()
            Myfunctions.FetchIP()
            document.querySelector('.closeIP').click()         
            return Apphelpers.flashMessage("success", res.message);
        } else {
            return Apphelpers.flashMessage("error", res.message);
        }
    });
};

Myfunctions.SetWebhookURL = async (e, setLoading) => {

    const setUser = useBoundStore.getState().setUser;

    e.preventDefault();

    let { webhook_name, webhook_url, webhook_url_description } = e.target.elements;
    webhook_name = webhook_name && webhook_name.value.trim();
    webhook_url = webhook_url && webhook_url.value.trim();
    webhook_url_description = webhook_url_description && webhook_url_description.value.trim();



    let token = sessionStorage.getItem('token');
    let user_token = sessionStorage.getItem('user_token')



    if (!token || token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }

    if (!webhook_name || webhook_name === '') {
        return Apphelpers.flashMessage("error", "Kindly enter Web Hook Name");
    }
    if (!webhook_url || webhook_url === '') {
        return Apphelpers.flashMessage("error", "Kindly enter Web Hook URL");
    }
    if (!webhook_url_description || webhook_url_description === '') {
        return Apphelpers.flashMessage("error", "Kindly enter API Description");
    }

    let bodyData = JSON.stringify({
        user_token: user_token,
        name: webhook_name,
        webhook_url: webhook_url,
        description: webhook_url_description,
    });

    let sendData = {
        url: Apphelpers.url.set_webhook,
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "h-auth-signature": Apphelpers.signature,
            "user-auth": token,
        },
        body: bodyData,
    };

    
    setLoading(true);

    Apphelpers.sendRequest(sendData, (res) => {
        setLoading(false);
        if (res.status === '00') { 
            Myfunctions.RefreshToken()
            document.querySelector('#closeWebhook').click()         
            return Apphelpers.flashMessage("success", res.message);
        } else {
            document.querySelector('#closeWebhook').click()         
            return Apphelpers.flashMessage("error", res.message);
        }
    });
};

Myfunctions.GenerateSecretKey = async (e, navigate, setLoading) => {

    const setUser = useBoundStore.getState().setUser;

    e.preventDefault();

    let { key_name, description } = e.target.elements;
    key_name = key_name && key_name.value.trim();
    description = description && description.value.trim();



    let token = sessionStorage.getItem('token');

    if (!token || token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }

    if (!key_name || key_name === '') {
        return Apphelpers.flashMessage("error", "Kindly enter API Name");
    }
    if (!description || description === '') {
        return Apphelpers.flashMessage("error", "Kindly enter API Description");
    }

    let bodyData = JSON.stringify({
        key_name: key_name,
        description: description,
    });

    let sendData = {
        url: Apphelpers.url.generate_key,
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "h-auth-signature": Apphelpers.signature,
            "user-auth": token,
        },
        body: bodyData,
    };

    
    setLoading(true);

    Apphelpers.sendRequest(sendData, (res) => {
        setLoading(false);
        if (res.status === '00') { 
            Myfunctions.ProfileProgress(navigate)
            document.querySelector('#cancel').click() 
            document.querySelector('.modal-backdrop').classList.add('hide')
            document.querySelector('.modal-backdrop').classList.remove('show')
            document.querySelector('.modal-backdrop').classList.remove('modal-backdrop')        
            return Apphelpers.flashMessage("success", res.message);
        } else {
            return Apphelpers.flashMessage("error", res.message);
        }
    });
};


Myfunctions.AccountDetails = async () => {

    const setUser = useBoundStore.getState().setUser;


    let token = sessionStorage.getItem('token');
    if (!token || token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }

    let sendData = {
        url: Apphelpers.url.account_details,
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
            const GetAccount = res;
            setUser('GetAccount', GetAccount);
        } else {
            // Apphelpers.flashMessage("error", res.message);
        }
    });
   
};


Myfunctions.WalletBalance = async () => {

    const setUser = useBoundStore.getState().setUser;

    
    let token = sessionStorage.getItem('token');
    let user_token = sessionStorage.getItem('user_token');
    let wallet_token = sessionStorage.getItem('wallet_token');

    if (!token || token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }

    let bodyData = JSON.stringify({
        user_token: user_token,
        wallet_token : wallet_token
    })

    let sendData = {
        url: Apphelpers.url.wallet_balance,
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "h-auth-signature": Apphelpers.signature,
            "user-auth": token,
        },
        body: bodyData,
    };

    Apphelpers.sendRequest(sendData, (res) => {
        if (res.status === '00') {      
            const WalletBalance = res;
            setUser('WalletBalance', WalletBalance);
        } else {
            // Apphelpers.flashMessage("error", res.message);
        }
    });
   
 };
  
 Myfunctions.FetchSecretKey = async () => {

    const setUser = useBoundStore.getState().setUser;


    let token = sessionStorage.getItem('token');
    
    if (!token || token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }

    let sendData = {
        url: Apphelpers.url.fetch_key,
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
            const GetKey = res;
            setUser('GetKey', GetKey);
        } else {
            // Apphelpers.flashMessage("error", res.message);
        }
    });
   
 };

 Myfunctions.FetchIP = async () => {

    const setUser = useBoundStore.getState().setUser;


    let token = sessionStorage.getItem('token');
    let user_token = sessionStorage.getItem('user_token')

    if (!token || token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }
    if (!user_token || user_token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }


    
    let bodyData = JSON.stringify({
        user_token: user_token,
    });
    let sendData = {
        url: Apphelpers.url.fetchIpaddress,
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "h-auth-signature": Apphelpers.signature,
            "user-auth": token,
        },
        body: bodyData,
    };

    Apphelpers.sendRequest(sendData, (res) => {
        if (res.status === '00') {      
            const FetchIP = res?.data?.data;
            setUser('FetchIP', FetchIP);
        } else {
            // Apphelpers.flashMessage("error", res.message);
        }
    });
   
 };

 Myfunctions.FetchWebHook = async () => {

    const setUser = useBoundStore.getState().setUser;


    let token = sessionStorage.getItem('token');
    let user_token = sessionStorage.getItem('user_token')

    if (!token || token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }

    let bodyData = JSON.stringify({
        user_token: user_token,
    });

    let sendData = {
        url: Apphelpers.url.fetch_webhook,
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "h-auth-signature": Apphelpers.signature,
            "user-auth": token,
        },
        body: bodyData,
    };

    Apphelpers.sendRequest(sendData, (res) => {
        if (res.status === '00') {      
            const FetchWebHook = res?.data?.data;
            setUser('FetchWebHook', FetchWebHook);
        } else {
            // Apphelpers.flashMessage("error", res.message);
        }
    });
   
 };

 Myfunctions.FetchBusinessProfile = async () => {

    const setUser = useBoundStore.getState().setUser;


    let token = sessionStorage.getItem('token');
    let user_token = sessionStorage.getItem('user_token')

    if (!token || token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }

    let bodyData = JSON.stringify({
        user_token: user_token,
    });

    let sendData = {
        url: Apphelpers.url.fetch_business_profile,
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "h-auth-signature": Apphelpers.signature,
            "user-auth": token,
        },
        body: bodyData,
    };

    Apphelpers.sendRequest(sendData, (res) => {
        if (res) {      
            const FetchBusiness = res;
            setUser('FetchBusiness', FetchBusiness);
        } else {
            // Apphelpers.flashMessage("error", res.message);
        }
    });
   
 };

 Myfunctions.FetchProfile = async () => {

    const setUser = useBoundStore.getState().setUser;


    let token = sessionStorage.getItem('token');
    let user_token = sessionStorage.getItem('user_token')

    if (!token || token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }

    let bodyData = JSON.stringify({
        user_token: user_token,
    });

    let sendData = {
        url: Apphelpers.url.fetch_profile,
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "h-auth-signature": Apphelpers.signature,
            "user-auth": token,
        },
        body: bodyData,
    };

    Apphelpers.sendRequest(sendData, (res) => {
        if (res.status === '00') {      
            const FetchProfile = res;
            setUser('FetchProfile', FetchProfile);
        } else {
            // Apphelpers.flashMessage("error", res.message);
        }
    });
   
 };


 Myfunctions.BankList = async () => {

    const setUser = useBoundStore.getState().setUser;


    let token = sessionStorage.getItem('token');

    if (!token || token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }

    let sendData = {
        url: Apphelpers.url.bank_list,
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "h-auth-signature": Apphelpers.signature,
            "user-auth": token,
        },
    };

    Apphelpers.sendRequest(sendData, (res) => {
        if (res.status === '00') {      
            const BankList = res?.data;
            setUser('BankList', BankList);
        } else {
            // Apphelpers.flashMessage("error", res.message);
        }
    });
   
 };


Myfunctions.VerifyAccountNumber = async (e, bankCode, setValidating) => {
    e.preventDefault();
    setValidating(true);

    const setUser = useBoundStore.getState().setUser;
    let accountNumber = document.querySelector('.account_number').value;
    let token = sessionStorage.getItem('token');

    if (!token || token === '') {
        setValidating(false);
        return Apphelpers.flashMessage("error", "Invalid request");
    }

    if (!accountNumber || accountNumber.length<10){
        return
    }

    let bodyData = JSON.stringify({
        account_number: accountNumber,
        bank_code: bankCode,
    });

    let sendData = {
        url: Apphelpers.url.beneficiary_enquiry,
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "h-auth-signature": Apphelpers.signature,
            "user-auth": token,
        },
        body: bodyData,
    };

    Apphelpers.sendRequest(sendData, (res) => {
        setValidating(false);
        if (res.status === '00') {      
            document.querySelector('.account_name').textContent = res.beneficiary_name;
            document.querySelector('.account_name').style.color = '#0D1884';
            setUser('BeneficiaryData', res);
        } else {
            document.querySelector('.account_name').textContent = 'Invalid Account Number';
            document.querySelector('.account_name').style.color = "red";
        }
    });
};

Myfunctions.Transfer = async (e, formData, setLoading) => {
    e.preventDefault();
    setLoading(true);

    const setUser = useBoundStore.getState().setUser;
    let token = sessionStorage.getItem('token');
    let user_token = sessionStorage.getItem('user_token');
    let wallet_token = sessionStorage.getItem('wallet_token');
    let account_number = document.querySelector('.account_number').value;
    let account_name = document.querySelector('.account_name').textContent;
    let amount = document.querySelector('.transfer_amount').value.replace(/\,/g, '');
    let remark = document.querySelector('.naration').value;

    if (!token || token === '') {
        setLoading(false);
        return Apphelpers.flashMessage("error", "Invalid request");
    }
    if (!account_number || account_number.length < 10 || account_name === 'Invalid Account Number') {
        setLoading(false);
        return Apphelpers.flashMessage("error", "Please enter a valid account number");
    }
    if (!amount) {
        setLoading(false);
        return Apphelpers.flashMessage("error", "Please enter an amount");
    }

    const dateObject = new Date();
    let transferDate = dateObject.toLocaleDateString();
    let BeneficiaryData = useBoundStore.getState().user.BeneficiaryData;

    let TransferPreview = {
        bank_code: formData.bank_code,
        user_token,
        account_number,
        account_name: BeneficiaryData.beneficiary_name,
        amount,
        remark,
        transferDate,
        wallet_token,
        beneficiary_id: BeneficiaryData.beneficiary_id,
        beneficiary_account_id: BeneficiaryData.beneficiary_account_id,
        bank_name: BeneficiaryData.bank,
    };

    setUser('TransferPreview', TransferPreview);
    setLoading(false);
    document.querySelector('#ConfirmTransfer').click();
};

Myfunctions.ConfirmPin = async ({ otp, navigate, setLoading }) => {
    setLoading(true);

    let token = sessionStorage.getItem('token');
    let user_token = sessionStorage.getItem('user_token');
    let transaction_pin = otp;

    if (!token || token === '') {
        setLoading(false);
        return Apphelpers.flashMessage("error", "Invalid request");
    }
    if (!transaction_pin || transaction_pin.length < 4) {
        setLoading(false);
        return Apphelpers.flashMessage("error", "Please enter a valid transfer Pin");
    }

    let bodyData = JSON.stringify({
        user_token,
        pin: transaction_pin,
    });

    let sendData = {
        url: Apphelpers.url.confirm_pin,
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "h-auth-signature": Apphelpers.signature,
            "user-auth": token,
        },
        body: bodyData
    };

    Apphelpers.sendRequest(sendData, (res) => {
        if (res.status === '00') {
            Myfunctions.ConfirmTransfer(otp, navigate, setLoading);
        } else {
            setLoading(false);
            Apphelpers.flashMessage("error", res.message);
        }
    });
};

Myfunctions.ConfirmTransfer = async (otp, navigate, setLoading) => {
    let token = sessionStorage.getItem('token');
    let TransferPreview = useBoundStore.getState().user.TransferPreview;

    let bodyData = JSON.stringify({
        bank_code: TransferPreview.bank_code,
        user_token: TransferPreview.user_token,
        account_number: TransferPreview.account_number,
        account_name: TransferPreview.account_name,
        amount: TransferPreview.amount,
        remark: TransferPreview.remark,
        wallet_token: TransferPreview.wallet_token,
        beneficiary_id: TransferPreview.beneficiary_id,
        beneficiary_account_id: TransferPreview.beneficiary_account_id,
        bank_name: TransferPreview.bank_name,
        pin: otp,
    });

    let sendData = {
        url: Apphelpers.url.transfer,
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "h-auth-signature": Apphelpers.signature,
            "user-auth": token,
        },
        body: bodyData,
    };

    Apphelpers.sendRequest(sendData, (res) => {
        setLoading(false);
        if (res.status === true) {
            document.querySelector('#closeTransferPinOut').click();
            document.querySelector('#ClosePreviewOut').click();
            document.querySelector('.modal-backdrop').classList.add('hide')
            document.querySelector('.modal-backdrop').classList.remove('show')
            document.querySelector('.modal-backdrop').classList.remove('modal-backdrop')  
            navigate(`receipt/${res?.transaction_id}`);
            Apphelpers.flashMessage("success", res.message);
        } else {
            Apphelpers.flashMessage("error", res.Message);
        }
    });
};


Myfunctions.FetchDisputes = async () => {

    const setUser = useBoundStore.getState().setUser;


    let token = sessionStorage.getItem('token');
    let user_token = sessionStorage.getItem('user_token')

    if (!token || token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }
    if (!user_token || user_token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }


    
    let bodyData = JSON.stringify({
        user_token: user_token,
    });
    let sendData = {
        url: Apphelpers.url.fetch_disputes,
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "h-auth-signature": Apphelpers.signature,
            "user-auth": token,
        },
        body: bodyData,
    };

    Apphelpers.sendRequest(sendData, (res) => {
        if (res.status == '00') {      
            const FetchDisputes = res?.data;
            setUser('FetchDisputes', FetchDisputes);
        } else {
            // Apphelpers.flashMessage("error", res.message);
        }
    });
   
};


Myfunctions.RaiseDispute = async (e, setLoading) => {
    const setUser = useBoundStore.getState().setUser;

    e.preventDefault();

    let { transaction_id, format, dispute_desc } = e.target.elements;
    transaction_id = transaction_id && transaction_id.value.trim();
    format = format && format.value;
    dispute_desc = dispute_desc && dispute_desc.value.trim();

    let token = sessionStorage.getItem('token');
    let user_token = sessionStorage.getItem('user_token');

    if (!token || token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }

    if (!transaction_id || transaction_id === '') {
        return Apphelpers.flashMessage("error", "Kindly enter a Transaction ID");
    }

    let bodyData = JSON.stringify({
        user_token: user_token,
        transaction_id: transaction_id,
        format: format,
        description: dispute_desc,
    });

    let sendData = {
        url: Apphelpers.url.create_dispute,
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "h-auth-signature": Apphelpers.signature,
            "user-auth": token,
        },
        body: bodyData,
    };

    setLoading(true);

    Apphelpers.sendRequest(sendData, (res) => {
        setLoading(false);
        if (res.status === '00') { 
            Myfunctions.RefreshToken();
            Myfunctions.FetchDisputes();
            document.querySelector('#closeDispute').click();
            return Apphelpers.flashMessage("success", res.message);
        } else {
            return Apphelpers.flashMessage("error", res.message);
        }
    });
};


Myfunctions.FetchActivities = async () => {

    const setUser = useBoundStore.getState().setUser;


    let token = sessionStorage.getItem('token');
    let user_token = sessionStorage.getItem('user_token')

    if (!token || token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }
    if (!user_token || user_token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }


    
    let bodyData = JSON.stringify({
        user_token: user_token,
    });
    let sendData = {
        url: Apphelpers.url.account_activity,
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "h-auth-signature": Apphelpers.signature,
            "user-auth": token,
        },
        body: bodyData,
    };

    Apphelpers.sendRequest(sendData, (res) => {
        if (res) {      
            const FetchActivities = res?.data;
            setUser('FetchActivities', FetchActivities);
        } else {
            // Apphelpers.flashMessage("error", res.message);
        }
    });
   
};

Myfunctions.Export = async (e, formData, setLoading) => {

    const setUser = useBoundStore.getState().setUser;

    e.preventDefault();

   let startDate = formData.from
   let endDate = formData.to
   let category = formData.category


    let token = sessionStorage.getItem('token');

    let user_token = sessionStorage.getItem('user_token');


    if (!token || token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }

    if (!startDate || startDate === '') {
        return Apphelpers.flashMessage("error", "Kindly enter Start Date");
    }
    if (!endDate || endDate === '') {
        return Apphelpers.flashMessage("error", "Kindly enter End Date");
    }

    let bodyData = JSON.stringify({
        user_token: user_token,
        from: startDate,
        to: endDate,
        category: category,
    });

    let sendData = {
        url: Apphelpers.url.exports,
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "h-auth-signature": Apphelpers.signature,
            "user-auth": token,
        },
        body: bodyData,
    };

    
    setLoading(true);

    Apphelpers.sendRequest(sendData, (res) => {
        setLoading(false);
        if (res.status == '00') {  
            const ExportReport = res?.data;
            setUser('ExportReport', ExportReport);             
            return Apphelpers.flashMessage("success", 'Report Generated');
        } else {
            return Apphelpers.flashMessage("error", res.message);
        }
    });
};

Myfunctions.FetchTransactions = async () => {

    const setUser = useBoundStore.getState().setUser;


    let token = sessionStorage.getItem('token');
    let user_token = sessionStorage.getItem('user_token')

    if (!token || token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }
    if (!user_token || user_token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }


    
    let bodyData = JSON.stringify({
        user_token: user_token,
    });
    let sendData = {
        url: Apphelpers.url.fetch_transactions,
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "h-auth-signature": Apphelpers.signature,
            "user-auth": token,
        },
        body: bodyData,
    };

    Apphelpers.sendRequest(sendData, (res) => {
        if (res) {      
            const FetchTransactions = res?.data;
            setUser('FetchTransactions', FetchTransactions);
        } else {
            // Apphelpers.flashMessage("error", res.message);
        }
    });
   
};


Myfunctions.TransferReceipt = async (transaction_id) => {

    const setUser = useBoundStore.getState().setUser;


    let token = sessionStorage.getItem('token');
    let user_token = sessionStorage.getItem('user_token')

  
    if (!transaction_id || transaction_id === '') {
        return Apphelpers.flashMessage("error", "Invalid receipt id");
    }
    if (!token || token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }
    if (!user_token || user_token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }


    
    let bodyData = JSON.stringify({
        transaction_id: 'H-POJ9DZ5G44587',
    });
    let sendData = {
        url: Apphelpers.url.transfer_receipt,
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "h-auth-signature": Apphelpers.signature,
            "user-auth": token,
        },
        body: bodyData,
    };

    Apphelpers.sendRequest(sendData, (res) => {
        if (res) {   
            console.log(res,'TransferReceipt')   
            const TransferReceipt = res;
            setUser('TransferReceipt', TransferReceipt);
        } else {
            // Apphelpers.flashMessage("error", res.message);
        }
    });
   
};

Myfunctions.FetchCharges = async () => {

    const setUser = useBoundStore.getState().setUser;


    let token = sessionStorage.getItem('token');
    let user_token = sessionStorage.getItem('user_token')

    if (!token || token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }
    if (!user_token || user_token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }


    
    let bodyData = JSON.stringify({
        category: 'Outbound',
    });
    let sendData = {
        url: Apphelpers.url.fetch_charges,
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "h-auth-signature": Apphelpers.signature,
            "user-auth": token,
        },
        body: bodyData,
    };

    Apphelpers.sendRequest(sendData, (res) => {
        if (res.status == '00') {      
            const FetchCharges = res;
            setUser('FetchCharges', FetchCharges);
        } else {
            // Apphelpers.flashMessage("error", res.message);
        }
    });
   
};

Myfunctions.FetchWallets = async () => {

    const setUser = useBoundStore.getState().setUser;


    let token = sessionStorage.getItem('token');
    let user_token = sessionStorage.getItem('user_token')

    if (!token || token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }
    if (!user_token || user_token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }


    
    let bodyData = JSON.stringify({
        user_token: user_token,
    });
    let sendData = {
        url: Apphelpers.url.fetch_wallets,
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "h-auth-signature": Apphelpers.signature,
            "user-auth": token,
        },
        body: bodyData,
    };

    Apphelpers.sendRequest(sendData, (res) => {
        if (res.status == '00') {      
            const FetchWallets = res?.details;
            setUser('FetchWallets', FetchWallets);
        } else {
            // Apphelpers.flashMessage("error", res.message);
        }
    });
   
};

Myfunctions.FetchTransactions = async () => {

    const setUser = useBoundStore.getState().setUser;


    let token = sessionStorage.getItem('token');
    let user_token = sessionStorage.getItem('user_token')

    if (!token || token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }
    if (!user_token || user_token === '') {
        return Apphelpers.flashMessage("error", "Invalid request");
    }


    
    let bodyData = JSON.stringify({
        user_token: user_token,
    });
    let sendData = {
        url: Apphelpers.url.fetch_transactions,
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "h-auth-signature": Apphelpers.signature,
            "user-auth": token,
        },
        body: bodyData,
    };

    Apphelpers.sendRequest(sendData, (res) => {
        if (res) {      
            const FetchTransactions = res?.data;
            setUser('FetchTransactions', FetchTransactions);
        } else {
            // Apphelpers.flashMessage("error", res.message);
        }
    });
   
};
 
Myfunctions.numberFormat = (value) => {
    const formattedValue = value ? new Intl.NumberFormat().format(value) : "0";
    return formattedValue.includes(".") ? formattedValue : formattedValue + ".00";
};

Myfunctions.formatDate = (data) => {
    let date = new Date(data);
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
  
    let dateString = (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
    return dateString;
}
 
 Myfunctions.formatMainDate = (data) => {
 
 
    let date = data ? data.split("-") : new Date();
    let mDate = new Date(date[2], date[1] - 1, date[0]);
    return mDate.toDateString()
 }

 Myfunctions.addCommas = (input) => {
    const formattedValue = input.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return formattedValue;
  }

 Myfunctions.addEventListenersToTelInputs = () =>{
    const inputFields = document.querySelectorAll('.formatNumber');
  
    inputFields.forEach((inputField) => {
      inputField.addEventListener('keyup', (event) => {
        const inputValue = event.target.value;
        const formattedValue = Myfunctions.addCommas(inputValue);
        event.target.value = formattedValue;
      });
    });
  }

export default Myfunctions;
