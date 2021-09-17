import { Web3Util } from '.';

const Web3Utils = require('web3-utils');

const toFixed =(num, fixed) => {
    var re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
}

const fromWei = (amount, notation='ether') => {
    return Web3Utils.fromWei(amount, notation)
}

const toWei = (amount, notation='ether') => {
    return Web3Utils.toWei(amount, notation)
}

const getRoundedBalance = (amount, precision=3) => {
    let weiAmount = Web3Utils.fromWei(amount);
    return toFixed(weiAmount, precision);
}

const formatDecimals = (amount, precision=2) => {
    return (Math.round(amount * 100) / 100).toFixed(precision);
}

const getChecksumAddress = (address) => {
    return Web3Utils.toChecksumAddress(address);
}

// Export each function
export {
    getRoundedBalance,
    formatDecimals,
    fromWei,
    toWei,
    toFixed,
    getChecksumAddress
 };
