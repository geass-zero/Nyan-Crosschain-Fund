//import Web3 from "web3";
//https://github.com/CharlesStover/reactn
import Web3 from "web3";
import Web3Modal, { WEB3_CONNECT_MODAL_ID } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { setGlobal, getGlobal } from 'reactn';
// import { Provider } from "react-redux";
import './modal.css';
// import { Contracts } from './index';

 /**
  * Check to see if there's a web3 instance to use
  */
let web3;

const getWeb3 = async() =>
 new Promise((resolve, reject) => {
   // Wait for loading completion to avoid race conditions with web3 injection timing.
   
   async function web3Router() {
     // Modern dapp browsers...
      if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          const accounts = await web3.eth.getAccounts().catch((e) => { console.log(e); });
          setGlobals(web3, accounts);
          return resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        web3 = window.web3;
        console.log("Injected web3 detected.");
        const accounts = await web3.eth.getAccounts().catch((e) => { console.log(e); });
        setGlobals(web3, accounts);
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:8545"
        );
        web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        const accounts = await web3.eth.getAccounts().catch((e) => { console.log(e); });
        setGlobals(web3, accounts);
        resolve(web3);
      }
   }
   return web3Router();
  //  window.addEventListener("load", async () => {
     
     
  //  });
 });

const createInstance = async() => {
  const providerOptions = createProviderOptions()
  const web3Modal = createModal(providerOptions);
  // check if current instance is present
  let provider = false;
  try {
    provider = await web3Modal.connect();
  } catch (exception){
    console.log('exception thrown while instantiating web3modal');
    console.log(exception)
    return false
  }

    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts().catch((e) => { console.log(e); });
    setGlobals(web3, accounts, web3Modal);
    // setApprovals();
    return web3;

    
  // if (window.localStorage.getItem('chain') == 'ETH') {
  //   const providerOptions = createProviderOptions()
  //   const web3Modal = createModal(providerOptions);
  //   // check if current instance is present
  //   let provider = false;
  //     try {
  //       provider = await web3Modal.connect();
  //     } catch (exception){
  //       console.log('exception thrown while instantiating web3modal');
  //       console.log(exception)
  //       return false
  //     }

  //     const web3 = new Web3(provider);
  //     const accounts = await web3.eth.getAccounts().catch((e) => { console.log(e); });
  //     setGlobals(web3, accounts, web3Modal);
  //     // setApprovals();
  //     return web3;
  // } else {
  //   return await getWeb3();
  //   // await getWeb3().then((res) => {
  //   //   console.log(res);
  //   //   return res;
  //   // }).catch((err) => {
  //   //   console.log(err);
  //   // })
  // }
}

const createProviderOptions = () => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "983b7accab984f72bc9dc697bd275660" // required
      }
    }
  };
  return providerOptions
}

const createModal = (providerOptions) => {
  const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions, // required,
    theme: {
      background: "rgb(253, 250, 250)",
      main: "rgb(33, 37, 41)",
      secondary: "rgb(136, 136, 136)",
      border: "rgba(195, 195, 195, 0.14)",
      hover: "rgb(252,163,220)"
    }
  });
  console.log(web3Modal);
  return web3Modal;
}

const getInstance = async() => {
    const web3Instance = getGlobal().web3Instance;
    if(!web3Instance){
      
      let instance = await createInstance();

      return instance;
    }
    return web3Instance
}

const setGlobals = (web3, accounts, web3Modal) => {
  setGlobal({
    web3Instance: web3,
    accounts: accounts,
    web3Modal: web3Modal
  });
}

// const setApprovals = async() => {
//   // we use the direct call to avoid any duplication because we are still in the construction of the web3instance.
//   let nyanApproved = await Contracts.getMyNyanApproved();
//   let nipUniApproved = await Contracts.getMyNipUniApproved();
  
//   setGlobal({
//       nyanApproved: nyanApproved,
//       nipUniApproved: nipUniApproved
//   })
// }


// Export each function
export {
  createInstance,
  getInstance,
  getWeb3
  //checkWeb3IsPresent,
  //getAccounts,
  //getNetworkId
};

