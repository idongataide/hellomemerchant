   import ReducerAction from "./Context/ReducerAction"
   import { appState, dispatcher } from "./Context/State"
   import { Store } from 'react-notifications-component'

const Apphelpers = {};
Apphelpers.url = {};

Apphelpers.ImgUrl = "https://api-portal.hellomepay.online/api/accounts";

const baseUrl = "https://api-portal.hellomepay.online/api/accounts";
const baseUrlWallet = "https://api-portal.hellomepay.online/api/wallet";
const baseUrlTransfer = "https://api-portal.hellomepay.online/api/transfer";
const baseUrlReport = "https://api-portal.hellomepay.online/api/reports";

Apphelpers.signature = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9";

Apphelpers.url.create = `${baseUrl}/create`;
Apphelpers.url.verify_otp = `${baseUrl}/verify_otp`;
Apphelpers.url.account_reset_otp = `${baseUrl}/account_reset_otp`;
Apphelpers.url.update_password = `${baseUrl}/update_password`;
Apphelpers.url.reset_password = `${baseUrl}/reset_password`;
Apphelpers.url.signin = `${baseUrl}/signin`;
Apphelpers.url.set_pin = `${baseUrl}/set_pin`;
Apphelpers.url.verify_bvn = `${baseUrl}/verify_bvn`;
Apphelpers.url.profile_progress = `${baseUrl}/profile_progress`;
Apphelpers.url.create_profile = `${baseUrl}/create_profile`;
Apphelpers.url.director_profile = `${baseUrl}/director_profile`;
Apphelpers.url.upload_cac = `${baseUrl}/upload_cac`;
Apphelpers.url.upload_mermat = `${baseUrl}/upload_mermat`;
Apphelpers.url.upload_pof = `${baseUrl}/upload_pof`;
Apphelpers.url.upload_pof = `${baseUrl}/upload_pof`;
Apphelpers.url.upload_id = `${baseUrl}/upload_id`;
Apphelpers.url.fetch_questions = `${baseUrl}/fetch_questions`;
Apphelpers.url.set_security_question = `${baseUrl}/set_security_question`;
Apphelpers.url.generate_key = `${baseUrl}/generate_key`;
Apphelpers.url.account_details = `${baseUrl}/account_details`;
Apphelpers.url.fetch_key = `${baseUrl}/fetch_key`;
Apphelpers.url.refreshToken = `${baseUrl}/refreshToken`;
Apphelpers.url.set_webhook = `${baseUrlWallet}/set_webhook`;
Apphelpers.url.whitelist_ip = `${baseUrlWallet}/whitelist_ip`;
Apphelpers.url.fetch_webhook = `${baseUrlWallet}/fetch_webhook`;
Apphelpers.url.fetchIpaddress = `${baseUrlWallet}/fetchIpaddress`;
Apphelpers.url.wallet_balance = `${baseUrlWallet}/wallet_balance`;
Apphelpers.url.delete_ip = `${baseUrlWallet}/delete_ip`;
Apphelpers.url.fetch_business_profile = `${baseUrl}/fetch_business_profile`;
Apphelpers.url.fetch_profile = `${baseUrl}/fetch_profile`;
Apphelpers.url.bank_list = `${baseUrlTransfer}/bank_list`;
Apphelpers.url.beneficiary_enquiry = `${baseUrlTransfer}/beneficiary_enquiry`;
Apphelpers.url.transfer = `${baseUrlTransfer}/transfer`;
Apphelpers.url.confirm_pin = `${baseUrlTransfer}/confirm_pin`;
Apphelpers.url.fetch_transactions = `${baseUrlTransfer}/fetch_transactions`;
Apphelpers.url.fetch_wallets = `${baseUrlReport}/fetch_wallets`;
Apphelpers.url.account_activity = `${baseUrlReport}/account_activity`;
Apphelpers.url.fetch_disputes = `${baseUrlReport}/fetch_disputes`;
Apphelpers.url.exports = `${baseUrlReport}/exports`;
Apphelpers.url.create_dispute = `${baseUrlReport}/create_dispute`;
Apphelpers.url.fetch_charges = `${baseUrlTransfer}/fetch_charges`;
Apphelpers.url.transfer_receipt = `${baseUrlTransfer}/transfer_receipt`;



Apphelpers.sendRequest = (Obj, callback) => {
   if (!Obj instanceof Object) return
   if (Obj.url === undefined) return
   fetch(Obj.url, Obj).then(res => res.json().then(data   => callback(data)))
      .catch((err) => callback({ "error": "Could not connect to the server" }))

}


// Apphelpers.sendRequest = (Obj, callback) => {
//    if (typeof callback !== 'function') {
//        console.error('Callback is not a function');
//        return;
//    }

//    if (typeof Obj !== 'object' || Obj === null) {
//        callback({ "error": "Invalid request object" });
//        return;
//    }

//    if (Obj.url === undefined) {
//        callback({ "error": "URL is missing" });
//        return;
//    }

//    fetch(Obj.url, Obj)
//        .then(res => {
//            if (!res.ok) {
//                throw new Error('Network response was not ok');
//            }
//            return res.json();
//        })
//        .then(data => {
//            callback(data);
//        })
//        .catch(error => {
//            console.error('Fetch error:', error);
//            callback({ "error": "Could not connect to the server" });
//        });
// };





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