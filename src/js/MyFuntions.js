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

   if (!businessType || businessType === '') {
       return Apphelpers.flashMessage("error", "Kindly select Business Type");
   }

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
            console.log(res,'ss')
            setProfileProgress(res);
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
            // Apphelpers.flashMessage("error", res.message);
        }
    });
};



Myfunctions.uploadCAC = async (file, navigate, setProfileProgress) => {
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
            Myfunctions.ProfileProgress(navigate, setProfileProgress);
            return Apphelpers.flashMessage("success", res.message);
        } else {
            return Apphelpers.flashMessage("error", res.message);
        }
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
         Myfunctions.ProfileProgress(navigate, setProfileProgress)
         return Apphelpers.flashMessage("success", res.message);
       } else {
         return Apphelpers.flashMessage("error", res.message);
       }
     });
   });
};


Myfunctions.IDcard  = async (file, navigate, setProfileProgress) => {


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
         Myfunctions.ProfileProgress(navigate, setProfileProgress)
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
 

 Myfunctions.SetPin = async (e, navigate, setLoading, setProfileProgress) => {

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
           Myfunctions.ProfileProgress(navigate, setProfileProgress)
           return Apphelpers.flashMessage("success", res.message)
       } else {
          return Apphelpers.flashMessage("error", res.message)
       }
   });
 
 });
 };

 Myfunctions.BVN = async (e, setLoading, setProfileProgress) => {

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
            Myfunctions.ProfileProgress(setProfileProgress)
            document.querySelector('#closeBVN').click()
            return Apphelpers.flashMessage("success", res.message)
        } else {
           return Apphelpers.flashMessage("error", res.message)
        }
    });
  
  });
};

Myfunctions.SecurityQuestions = async (setSecurityQuestions) => {

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
            setSecurityQuestions(GetQuestions);
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


export default Myfunctions;
