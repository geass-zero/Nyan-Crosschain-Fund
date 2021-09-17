import Web3 from 'web3';
import { Web3Util, Accounts, Formatter } from './index';
import { setGlobal, getGlobal } from 'reactn';
import Connector from "../ABIs/connector.json";
import nyanManager from "../ABIs/nyanManager.json";
import SelfManager from "../ABIs/selfManager.json";
import SelfManagerBEP from "../ABIs/selfManagerBEP.json";
import IndexFundBEP from "../ABIs/indexFundBEP.json"
import NyanRewards from "../ABIs/rewards.json";
import Swap from "../ABIs/pancakeSwapConnector.json";
import ERC20 from "../ABIs/ERC20.json";

function getFundAddress() {
    if (window.localStorage.getItem('chain') == 'ETH') {
        return '0x2c9728ad35C1CfB16E3C1B5045bC9BA30F37FAc5'
    } else {
        return '0x5D183417Ad08373e61fFfAC203bAbC44bA8fDf59'
    }
}

function getConnectorAddress() {
    if (window.localStorage.getItem('chain') == 'ETH') {
        return '0x60d70dF1c783b1E5489721c443465684e2756555'
    } else {
        return '0x3129787d931c686F926EaC9B69223E12119F7F52'
    }
}

function getSelfManagerAddress() {
    if (window.localStorage.getItem('chain') == 'ETH') {
        return '0x97d7c6dE394631C47760C234F4Bcf564889B8721'
    } else {
        return '0x4b09526edBe6E14248Bfba18eBE37274Ef62754C'
    }
}

function getIndexCreatorAddress() {
    if (window.localStorage.getItem('chain') == 'ETH') {
        return ''
    } else {
        return '0xc94477bC3EC528a7fEcAD912AfD721F80656fA87'
    }
}

function getSelfManagerABI() {
    if (window.localStorage.getItem('chain') == 'ETH') {
        return SelfManager.abi;
    } else {
        return SelfManagerBEP.abi;
    }
}

function getRewardsAddress() {
    if (window.localStorage.getItem('chain') == 'ETH') {
        return '0x868f7622F57b62330Db8b282044d7EAf067fAcfe'
    } else {
        return '0x0654D2efb607dc5C451e6513c8Dd3997977cA603'
    }
}

function getSwapAddress() {
    if (window.localStorage.getItem('chain') == 'ETH') {
        return ''
    } else {
        return '0xa4F51ca1C9f14Ac741ec5d1EbEeF128A0227EfcA'
    }
}

async function getFundETH() {
    try {
        let web3 = await Web3Util.getInstance();
        let balance = await web3.eth.getBalance(getFundAddress());
        return balance;
    } catch(e) {
        console.log(e);
    }
}

async function getSwapContractInstance() {
    const instance = await Web3Util.getInstance();
    window.swapCI = new instance.eth.Contract(
        Swap.abi,
        getSwapAddress()
    );
    return window.swapCI
}

async function getConnectorContractInstance(){
    if(!window.connectorCI) {
        
    }
    const instance = await Web3Util.getInstance();
    window.connectorCI = new instance.eth.Contract(
        Connector.abi,
        getConnectorAddress()
    );
    return window.connectorCI
}

async function getFundManagerContractInstance(){
    if(!window.fundManagerCI) {
        
    }
    const instance = await Web3Util.getInstance();
    window.fundManagerCI = new instance.eth.Contract(
        nyanManager.abi,
        "0x74A9ec513bC45Bd04769fDF7A502E9c2a39E2D0E"
    );
    return window.fundManagerCI
}

async function getSelfManagerContractInstance() {
    if(!window.selfManagerCI) {
        
    }
    const instance = await Web3Util.getInstance();
    
    
    window.selfManagerCI = new instance.eth.Contract(
        getSelfManagerABI(),
        getSelfManagerAddress()
    );
    return window.selfManagerCI
}

async function getIndexCreatorContractInstance() {
    if(!window.indexCreatorCI) {
        
    }

    const instance = await Web3Util.getInstance();
    
    
    window.indexCreatorCI = new instance.eth.Contract(
        IndexFundBEP.abi,
        getIndexCreatorAddress()
    );
    return window.indexCreatorCI
}

async function getRewardsContractInstance(){
    if(!window.rewardsCI) {
        
    }
    const instance = await Web3Util.getInstance();
    window.rewardsCI = new instance.eth.Contract(
        NyanRewards.abi,
        getRewardsAddress()
    );
    return window.rewardsCI
}

async function getERC20ContractInstance(address){
    if(!window.erc20CI) {
        
    }
    const instance = await Web3Util.getInstance();
    window.erc20CI = new instance.eth.Contract(
        ERC20.abi,
        address
    );
    return window.erc20CI
}

async function getFundHistory(){
    let account = await Accounts.getCurrentAccount();
    let instance = await getConnectorContractInstance();
 
    return await instance.methods.getFundHistory().call();
    
}

async function isFundVotingLive(){
    let account = await Accounts.getCurrentAccount();
    let instance = await getFundManagerContractInstance();

    return await instance.methods.canBeginVoting().call();
}

async function getNextVotingBlock() {
    let account = await Accounts.getCurrentAccount();
    let instance = await getFundManagerContractInstance();

    return await instance.methods.nextVotingPeriod().call();
}

async function registerAsFundManager(name){
    let account = await Accounts.getCurrentAccount();
    let instance = await getFundManagerContractInstance();

    let res = await instance.methods.registerCandidate(name).send({
        from: account,
        value: 50000000000000000
    });

    return res;
}

async function getCandidates(){
    let account = await Accounts.getCurrentAccount();
    let instance = await getFundManagerContractInstance();

    return await instance.methods.getAllCandidates().call();
}

async function voteForFundManager(name){
    let account = await Accounts.getCurrentAccount();
    let instance = await getFundManagerContractInstance();
    
    let res = await instance.methods.registerCandidate(name).send({
        from: account,
        value: 50000000000000000
    });
    
}

async function getAllSelfPools() {
    let instance = await getSelfManagerContractInstance();
    try {
        let pools = await instance.methods.getPoolsArray().call();
        return await instance.methods.getPools(0, pools.length).call();
    } catch(e) {
        console.log(e)
    }
}

async function getSelfPoolData(manager) {
    let account = await Accounts.getCurrentAccount();
    let instance = await getSelfManagerContractInstance();
    try {
        return await instance.methods.getPool(manager).call();
    } catch(e) {
        console.log(e)
    }
    
}

async function getMySelfPoolTokens(pool){
    let account = await Accounts.getCurrentAccount();
    let instance = await getERC20ContractInstance(pool);
    return await instance.methods.balanceOf(account).call();
    
}

async function registerSelfPool(name, socialUrl, focus) {
    let account = await Accounts.getCurrentAccount();
    let instance = await getSelfManagerContractInstance();
    let ETH = 0.1;
    let res = await instance.methods.openPool(name, socialUrl, focus).send({
        from: account,
        value: Formatter.toWei(ETH.toString())
    });
    return res;
}

async function addPoolETH(manager, pool, ETH) {
    let account = await Accounts.getCurrentAccount();
    let instance = await getSelfManagerContractInstance();
    let res = await instance.methods.BNBForTokens(manager, pool).send({
        from: account,
        value: Formatter.toWei(ETH.toString())
    });
    return res;
}

async function estimateETHWithdrawal(manager, pool, tokens) {
    let account = await Accounts.getCurrentAccount();
    let instance = await getSelfManagerContractInstance();
    if (window.localStorage.getItem('chain') == 'ETH') {
        return await instance.methods.estimateTokensForETH(manager, pool, tokens).call();
    } else {
        return await instance.methods.estimateTokensForBNB(manager, pool, tokens).call();
    }
    
}

async function getApprovedAmount(pool) {
    let account = await Accounts.getCurrentAccount();
    let instance = await getERC20ContractInstance(pool);

    return await instance.methods.allowance(account, getSelfManagerAddress()).call();
}

async function getPoolSupply(pool) {
    let instance = await getERC20ContractInstance(pool);
    return await instance.methods.totalSupply().call();
}

async function approvePoolToken(pool) {
    let account = await Accounts.getCurrentAccount();
    let instance = await getERC20ContractInstance(pool);

    return await instance.methods.approve(getSelfManagerAddress(), await getPoolSupply(pool)).send({
        from: account
    });

    
}

async function withdrawPoolETH(manager, pool, tokens) {
    let account = await Accounts.getCurrentAccount();
    let instance = await getSelfManagerContractInstance();

    if (window.localStorage.getItem('chain') == 'ETH') {
        return await instance.methods.tokensForETH(manager, pool, tokens).send({
            from: account
        });
    } else {
        return await instance.methods.tokensForBNB(manager, pool, tokens).send({
            from: account
        });
    }
    
}

async function estimatedPoolProfit(manager, pool) {
    let account = await Accounts.getCurrentAccount();
    let instance = await getSelfManagerContractInstance();

    return await instance.methods.estimatedProfit(account, manager, pool).call();
}

async function claimPoolProfit(manager, pool) {
    let account = await Accounts.getCurrentAccount();
    let instance = await getSelfManagerContractInstance();

    let res = await instance.methods.claimProfit(manager, pool).send({
        from: account
    });

    return res;
}

async function getTokenName(token) {
    let instance = await getERC20ContractInstance(token);
    let name = await instance.methods.symbol().call();
    return name;
}

async function getCurrentBlock(){
    let web3 = new Web3('https://mainnet.infura.io/v3/983b7accab984f72bc9dc697bd275660');
    return await web3.eth.getBlockNumber();
}

async function getNyanRewards(){
    let web3 = await Web3Util.getInstance();
    let balance = await web3.eth.getBalance(getRewardsAddress());
    balance = Formatter.getRoundedBalance((balance).toString());
    return balance;
}

async function registerIndexPool(tokens, percentages, slippages, dexs, name, symbol) {
    let account = await Accounts.getCurrentAccount();
    let instance = await getIndexCreatorContractInstance();
    let ETH = 0.1;
    let res = await instance.methods.createIndex(tokens, percentages, slippages, dexs, name, symbol).send({
        from: account,
        value: Formatter.toWei(ETH.toString())
    });
    return res;
}

async function getIndexFundAddresses() {
    let instance = await getIndexCreatorContractInstance();
    let res = await instance.methods.getIndexArrays().call();
    return res;
}


async function getManagerHoldings() {
    let isSelfManager = true;
    let holdings;
    let account = await Accounts.getCurrentAccount();
    let instance = await getSelfManagerContractInstance();
    let manager = await instance.methods.managerStruct(account).call();
        
    holdings = Formatter.getRoundedBalance(manager[0].toString());

    return {holdings};
}

async function getManagerInvestments(manager) {
    let instance = await getSwapContractInstance();
    return await instance.methods.getInvestments(manager).call();
}

async function swapToken(isSelfManager, amount, path, slippage, deadline) {
    let account = await Accounts.getCurrentAccount();
    let instance = await getSwapContractInstance();
    try {
        path[0] = Formatter.getChecksumAddress(path[0]);
        return instance.methods.getToken(isSelfManager, Formatter.toWei(amount.toString()), path, slippage, deadline).send({
            from: account
        })
    } catch(e) {
        console.log(e)
    }
}

async function liquidateToken(isSelfManager, index, path, deadline, slippage) {
    let account = await Accounts.getCurrentAccount();
    let instance = await getSwapContractInstance();
    return instance.methods.liquidatePosition(isSelfManager, index, path, deadline, slippage).send({
        from: account
    })
}


// Export each function
export {
    getFundETH,
    getFundHistory,
    isFundVotingLive,
    registerAsFundManager,
    getCandidates,
    getNextVotingBlock,
    getCurrentBlock,
    getNyanRewards,
    getAllSelfPools,
    getSelfPoolData,
    getMySelfPoolTokens,
    estimateETHWithdrawal,
    estimatedPoolProfit,
    getApprovedAmount,
    withdrawPoolETH,
    claimPoolProfit,
    addPoolETH,
    registerSelfPool,
    approvePoolToken,
    getTokenName,
    getManagerHoldings,
    getManagerInvestments,
    swapToken,
    liquidateToken,
    registerIndexPool,
    getIndexFundAddresses
    //checkWeb3IsPresent,
    //getAccounts,
    //getNetworkId
  };