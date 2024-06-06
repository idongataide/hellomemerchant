   import ReducerAction from "./Context/ReducerAction"
   import { appState, dispatcher } from "./Context/State"
   import { Store } from 'react-notifications-component'

const Apphelpers = {};
Apphelpers.url = {};

Apphelpers.ImgUrl = "https://api-portal.hellomepay.online/api/accounts/";

const baseUrl = "https://api-portal.hellomepay.online/api/accounts/";

Apphelpers.signature = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9";

Apphelpers.url.create = `${baseUrl}/create`;
Apphelpers.url.verify_otp = `${baseUrl}/verify_otp`;
Apphelpers.url.signin = `${baseUrl}/signin`;
Apphelpers.url.set_pin = `${baseUrl}/set_pin`;
Apphelpers.url.profile_progress = `${baseUrl}/profile_progress`;
Apphelpers.url.create_profile = `${baseUrl}/create_profile`;
Apphelpers.url.director_profile = `${baseUrl}/director_profile`;
Apphelpers.url.upload_cac = `${baseUrl}/upload_cac`;
Apphelpers.url.upload_mermat = `${baseUrl}/upload_mermat`;
Apphelpers.url.upload_pof = `${baseUrl}/upload_pof`;
Apphelpers.url.upload_pof = `${baseUrl}/upload_pof`;
Apphelpers.url.upload_id = `${baseUrl}/upload_id`;



Apphelpers.sendRequest = (Obj, callback) => {
   if (!Obj instanceof Object) return
   if (Obj.url === undefined) return
   fetch(Obj.url, Obj).then(res => res.json().then(data   => callback(data)))
      .catch((err) => callback({ "error": "Could not connect to the server" }))

}



Apphelpers.flashMessage = (type, msg) => {
   Store.addNotification({
      message: msg,
      type: type === 'success' ? 'success' : 'danger',
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
         duration: 4000,
         onScreen: true
      }
   })
}



Apphelpers.setLoader = (e) => {
   appState.loader = e
   Apphelpers.updateAppState()

}
Apphelpers.setLoaderNotice = (e) => {
   appState.nloader = e
   Apphelpers.updateAppState()

}

Apphelpers.updateAppState = () => {
   dispatcher({
      type: ReducerAction.updateAppstate
   })

}



export default Apphelpers;