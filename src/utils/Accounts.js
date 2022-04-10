/** All interations with the contracts */
import Web3 from "web3";
import { getGlobal, setGlobal } from 'reactn';
import { Web3Util } from './index';

const getCurrentAccount = async() => {
    let accounts = getGlobal().accounts;
    console.log(accounts);
    if(!accounts || !accounts[0] || accounts == undefined) {
      
        let web3 = await Web3Util.createInstance();
        console.log(web3);
        
        if (!web3) {
            return;
        }
        accounts = await web3.eth.getAccounts();
        setGlobal({accounts: accounts[0]});
        console.log(accounts[0]);
        return accounts[0];
    }

    if (accounts.constructor === Array) {
        return accounts[0];
    } else {
        return accounts;
    }
}

// Export each function
export {
    getCurrentAccount
 };