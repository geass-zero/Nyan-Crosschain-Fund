import React from 'react';
import PopUp from '../../../component/PopUp';
import {Contracts, Formatter, Accounts} from '../../../utils/index';

const AddBNB = ({ showPop, changeShowPop, isRemove, manager, pool }) => {

    const [expectedETH, setExpectedETH] = React.useState(0);
    const [approvedBal, setApprovedBal] = React.useState(0);
    const [isApproved, setIsApproved] = React.useState(true);

    function detectNativeToken() {
        return window.localStorage.getItem('chain');
      }

    let approveToken = async (pool) => {
        let res = await Contracts.approvePoolToken(pool);
        if (res['status']) {
          setIsApproved(true);
        }
    }
    
    let withdrawETH = async (manager, pool) => {
        let tokens = document.getElementById('token-amount').value;
        await Contracts.withdrawPoolETH(manager, pool, Formatter.toWei(tokens.toString()));
        changeShowPop(false)
    }

    const updateAdd = async() => {
        try {
          let tokens = document.getElementById('token-amount').value;
          setExpectedETH(await Contracts.estimateETHWithdrawal(manager, pool, Formatter.toWei(tokens.toString())));
          setApprovedBal(await Contracts.getApprovedAmount(pool));
          if (Formatter.toWei(tokens.toString()) > approvedBal) {
            setIsApproved(false);
          } else {
            setIsApproved(true);
          }
        } catch(e) {
          console.log(e);
        }
    }

    return (
        <PopUp
            visible={showPop}
            className={'pool_pop_up'}
            onClose={() => changeShowPop(false)}
            responsive={false}>
            <div className='content_wrap no_padding'>
                <div className='head'>
                    <strong>Remove Liquidity</strong>
                </div>
                <p>
                    You're about to remove {detectNativeToken()} from this Self managed pool.
                    <br />
                    Your returned {detectNativeToken()} will be prorated depending on how much the
                    pool's manager has withdrawn.
                </p>
                <hr />
                <div className='form_wrap'>
                    <div className='form_item_wrap'>
                        <label>Pool Token amount</label>
                        <input type='number' id='token-amount' onChange={updateAdd} className='input_box' />
                    </div>
                </div>
                <p className='no_margin'>Expected BNB</p>
                <p className='no_margin green_text'>{Formatter.getRoundedBalance(expectedETH.toString())} {detectNativeToken()}</p>
                <button
                    className='align_center_ml_sm min_45_sm'
                    onClick={() => withdrawETH(manager, pool)}>
                    Withdraw my Liquidity
                </button>
            </div>
        </PopUp>
    );
};

export default AddBNB;
