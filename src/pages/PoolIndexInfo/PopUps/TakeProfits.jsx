import React from 'react';
import PopUp from '../../../component/PopUp';
import {Contracts, Formatter, Accounts} from '../../../utils/index';
import { useEffect } from 'reactn';

const AddBNB = ({ showPop, changeShowPop, isRemove, manager, pool, profit }) => {
    const [expectedProfit, setExpectedProfit] = React.useState(0);
    
    function detectNativeToken() {
        return window.localStorage.getItem('chain');
    }

    let claimProfit = async (manager, pool) => {
        await Contracts.claimPoolProfit(manager, pool);
        changeShowPop(false);
    }

    useEffect(() => {
        async function loadData() {
          if (profit > 0) {
            setExpectedProfit(await Contracts.estimatedPoolProfit(manager, pool));
    
          }
        }       
    
        loadData();
    }, []);

    return (
        <PopUp
            visible={showPop}
            className={'pool_pop_up'}
            onClose={() => changeShowPop(false)}
            responsive={false}>
            <div className='content_wrap no_padding'>
                <div className='head'>
                    <strong>Take BNB Profits</strong>
                </div>
                <p>
                    Available pool profits can be claimed here. Claiming
                    operates on a FIFO basis and the amount of pool Tokens you
                    have.
                </p>
                <hr />
                <p className='no_margin'>Available Profit:</p>
                <p className='no_margin green_text'>0 {detectNativeToken()}</p>
                <p className='section_brake'>Expected BNB:</p>
                <p className='no_margin green_text'>{Formatter.getRoundedBalance(expectedProfit.toString())} {detectNativeToken()}</p>
                <button
                    className='align_center_ml_sm min_45_sm'
                    onClick={() => claimProfit(manager, pool)}>
                    Claim
                </button>
            </div>
        </PopUp>
    );
};

export default AddBNB;
