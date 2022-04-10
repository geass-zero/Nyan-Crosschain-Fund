import React from 'react';
import PopUp from '../../../component/PopUp';
import {Contracts, Formatter, Accounts} from '../../../utils/index';

const AddBNB = ({ showPop, changeShowPop, isRemove, manager, pool }) => {
    const [syncNum, setSyncNum] = React.useState(0);
    const updateAdd = () => {
        setSyncNum(document.getElementById('eth-amount').value);
    }

    let addETH = async (manager, pool, ETH) => {
        await Contracts.addPoolETH(manager, pool, ETH.value);
    }

    return (
        <PopUp
            visible={showPop}
            className={'pool_pop_up'}
            onClose={() => changeShowPop(false)}
            responsive={false}>
            <div className='content_wrap no_padding'>
                <div className='head'>
                    <strong>Add Liquidity</strong>
                </div>
                <p>
                    You're about to add liquidity to a pool managed by an
                    individual/entity. <br />
                    Please make sure you know this manager and have a means of
                    communicating with them.
                </p>
                <hr />
                <div className='form_wrap'>
                    <div className='form_item_wrap'>
                        <label>BNB amount</label>
                        <input type='number' id="eth-amount" onChange={updateAdd} className='input_box' />
                    </div>
                </div>
                <p className='no_margin'>Expected Pool Tokens:</p>
                <p className='no_margin green_text'>{syncNum} mTokens</p>
                <button className='align_center_ml_sm min_45_sm' onClick={() => addETH(manager, pool, document.getElementById('eth-amount'))}>
                    Add
                </button>
            </div>
        </PopUp>
    );
};

export default AddBNB;
