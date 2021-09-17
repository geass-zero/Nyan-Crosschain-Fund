import React, {useState} from 'react';
import './styles.scss';
import AvailableGraph from './../../component/AvailableGraph';
import {Contracts, Formatter, Accounts} from '../../utils/index';
import { setGlobal, getGlobal, useEffect } from 'reactn';
import BNBLogo from './../../assets/images/BNB Logo.png';

const tempData = [{
    token: 'Bonfire',
    liquidityUser: '0.01',
    amount: '0.026',
    currentValue: '0.012',
}];

const getCoin = () => {
    let chain = window.localStorage.getItem('chain');
    if (chain == 'ETH') {
        return 'ETH';
    } else if (chain == 'BSC') {
        return 'BNB';
    }
}


let myInvestments = null;
const Swap = () => {

    const liquidateHandler = (value) => {
        console.log(value);
    };

    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        async function loadData() {
            let account = await Accounts.getCurrentAccount();
            myInvestments = await Contracts.getManagerInvestments(account);
            setIsLoading(true);
            console.log(isLoading);
        }     
    
        
    
        loadData();
    }, []);

    function arrangeInvestments() {
        let arr = [];
        for (let i = 0; i < myInvestments[0].length; i++) {
            if (myInvestments[1][i] != 0) {
                arr.push(
                    <RowComponent
                        index={i}
                        liquidateHandler={liquidateHandler}
                    />
                )
            }
        }
        return arr;
    }
    

    return (
        <section className='nav_adjust content_wrap swap'>
            <div data-aos='fade-up' data-aos-offset='0' data-aos-duration='500'>
                <SwapForm />
                <p className='pool_investments'>
                    Pool Investments:{' '}
                    {/* <input
                        type='text'
                        placeholder='Enter Pool Address'
                        className='special_input_style'
                    /> */}
                </p>
                <div className='paper_box no_padding investments_paper_box'>
                    <div className='investments_wrap_table'>
                        <div className='headers_wrap'>
                            <div className='head_item'>Token</div>
                            <div className='head_item'>Liquidity Used</div>
                            <div className='head_item'>Amount</div>
                            <div className='head_item'>Current Value</div>
                            <div className='head_item input_cell'></div>
                        </div>
                        {isLoading ? <div className='body_wrap'>
                            {arrangeInvestments()}
                            
                        </div> : null}
                    </div>
                </div>
            </div>
        </section>
    );
};

const SwapForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [holdings, setHoldings] = React.useState('0');

    async function performSwap() {
        let amount = document.getElementById('swap-amount').value;
        let path = [
            '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 
            document.getElementById('swap-token').value
        ];
        let slippage = document.getElementById('slippage').value*100;
        let deadline = Date.now() + 60 * 20;
        let res = await Contracts.swapToken(true, amount, path, slippage, deadline);
        setIsLoading(!isLoading)
    }

    useEffect(() => {
        async function loadData() {
          let holdingsData = await Contracts.getManagerHoldings();
          setHoldings(holdingsData['holdings']);
        }     
    
        
    
        loadData();
    }, []);

    return (
        <div
            className={
                'paper_box my_bnb_wrap loader_wrap' +
                (isLoading ? ' is_loading' : '')
            }>
            {isLoading && <div className='loader'></div>}
            <p className='no_margin'>My {getCoin()} {holdings}</p>
            <div className='form_wrap'>
                <div className='form_item_wrap'>
                    <label>
                        From
                        <div className='logo_wrap'>
                            {getCoin()}
                            <img src={BNBLogo} alt='BNB Logo' />
                        </div>
                    </label>
                    <input
                        type='number'
                        className='input_box'
                        placeholder='Enter Amount'
                        id='swap-amount'
                    />
                </div>
                <div className='form_item_wrap'>
                    <label>To</label>
                    <input
                        type='text'
                        className='input_box'
                        placeholder='Enter Address'
                        id='swap-token'
                    />
                </div>
                <div className='form_item_wrap'>
                    <label>Set Slippage %</label>
                    <input
                        type='number'
                        className='input_box'
                        placeholder='Enter Slippage'
                        id='slippage'
                    />
                </div>
            </div>
            <button
                className='align_center_ml_sm min_45_sm'
                onClick={() => performSwap()}>
                Swap
            </button>
        </div>
    );
};

const RowComponent = ({ index, liquidateHandler }) => {
    const [slippageValue, setSlippageValue] = useState('');
    

    return (
        <div className='investment_item'>
            <div className='data_item'>
                <div className='label xs_visible'>Token</div>
                {myInvestments[5][index]}
            </div>
            <div className='data_item'>
                <div className='label xs_visible'>Liquidity Used</div>
                {Formatter.getRoundedBalance(myInvestments[1][index])}
            </div>
            <div className='data_item'>
                <div className='label xs_visible'>Amount</div>
                {Formatter.getRoundedBalance(myInvestments[2][index])}
            </div>
            <div className='data_item'>
                <div className='label xs_visible'>Current Value</div>
                {Formatter.getRoundedBalance(myInvestments[3][index])}
            </div>
            <div className='data_item input_cell'>
                <input
                    value={slippageValue}
                    onChange={(e) => setSlippageValue(e.currentTarget.value)}
                    type='text'
                    className='input_box'
                    placeholder='Slippage'
                />
                <button
                    onClick={() =>
                        liquidateHandler && liquidateHandler(slippageValue)
                    }>
                    Liquidate
                </button>
            </div>
        </div>
    );
};
export default Swap;
