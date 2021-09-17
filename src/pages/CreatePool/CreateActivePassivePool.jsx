import { useState } from 'react';
import { ReactComponent as Interrogation } from './../../assets/svg/icon_interrogation.svg';
import {Contracts, Formatter} from '../../utils/index';

const CreateActivePassivePool = () => {
    const [selectedPool, setPool] = useState('active');
    const [showProcessing, setProcessing] = useState(false);
    
    return (
        <>
            <h1 className='center_sm'>Create Pool</h1>
            <div className='button_tab_wrap'>
                <button
                    className={selectedPool !== 'active' ? ' invert' : ''}
                    onClick={() => setPool('active')}>
                    Active
                </button>
                <button
                    className={selectedPool !== 'passive' ? ' invert' : ''}
                    onClick={() => setPool('passive')}>
                    Passive
                </button>
            </div>
            {showProcessing ? (
                <Processing poolSelected={selectedPool} />
            ) : selectedPool === 'active' ? (
                <ActivePool onRegClick={() => setProcessing(true)} />
            ) : (
                <PassivePool onRegClick={() => setProcessing(true)} />
            )}
        </>
    );
};


const getCoin = () => {
    let chain = window.localStorage.getItem('chain');
    if (chain == 'ETH') {
        return 'ETH';
    } else if (chain == 'BSC') {
        return 'BNB';
    }
}

const createPassivePool = async(indexTokenLength) => {
    let indexName = document.getElementById('Index name-0').value;
    let indexTicker = document.getElementById('Index token ticker-1').value;
    let tokenAddress = [];
    let tokenSlippages = [];
    let tokenPercentages = [];
    //fill token arrays
    for (let i = 2; i < indexTokenLength; i++) {
        tokenAddress.push(document.getElementById('Token address-'+i).value);
        i = i+1;
        tokenSlippages.push(document.getElementById('Slippage-'+i).value);
        i = i+1;
        tokenPercentages.push(document.getElementById('Index percentage-'+i).value);
    }
}


// let indexTokenLength = 0;
// function setTokens (tokensLength) {
//     indexTokenLength = tokensLength;
//     console.log(tokensLength);
// }

const ActivePool = ({ onRegClick }) => {
    const createActivePool = async() => {
        let name = document.getElementById('poolname').value;
        let socialUrl = document.getElementById('socialurl').value;
        let poolFocus = document.getElementById('poolfocus').value;
        await Contracts.registerSelfPool(name, socialUrl, poolFocus);
        onRegClick();
    }
    

    return (
        <div className='form_wrap'>
            <div className='form_item_wrap'>
                <label>Pool name</label>
                <input type='text' id="poolname" className='input_box' />
            </div>
            <div className='form_item_wrap'>
                <label>Pool community link</label>
                <input type='text' id="socialurl" className='input_box' />
            </div>
            <div className='form_item_wrap'>
                <label>Pool focus</label>
                <textarea id="poolfocus" className='input_box' />
                <p className='small float_right no_margin'>0 / 150</p>
            </div>
            <p>
                Registration cost:
                <span className='green_text'> 0.1 {getCoin()}</span>{' '}
            </p>
            <button className='align_center_ml_sm' onClick={createActivePool}>
                Register
            </button>
        </div>
    );
};

const PassivePool = ({ onRegClick }) => {
    

    const createPassivePool = async(indexTokenLength) => {
        let indexName = document.getElementById('Index name-0').value;
        let indexTicker = document.getElementById('Index token ticker-1').value;
        let tokenAddress = [];
        let tokenSlippages = [];
        let tokenPercentages = [];
        let tokenDEX = ["cakeV1"];
        //fill token arrays
        for (let i = 2; i < indexTokenLength; i++) {
            tokenAddress.push(Formatter.getChecksumAddress(document.getElementById('Token address-'+i).value));
            i = i+1;
            tokenSlippages.push(document.getElementById('Slippage-'+i).value);
            i = i+1;
            tokenPercentages.push(document.getElementById('Index percentage-'+i).value);
        }

        await Contracts.registerIndexPool(
            tokenAddress, 
            tokenPercentages, 
            tokenSlippages,
            tokenDEX,
            indexName,
            indexTicker
            );
        onRegClick();
    }

    const [formQuestionsArray, setFormQuestions] = useState([
        'Index name',
        'Index token ticker',
        'Token address',
        'Slippage',
        'Index percentage',
    ]);
    const newSet = ['Token address', 'Slippage', 'Index percentage'];

    return (
        <div className='form_wrap'>
            {formQuestionsArray.map((el, index) => (
                <div>
                    <div className='form_item_wrap'>
                        <label>
                            {el} {el === 'Index percentage' && <Interrogation />}
                        </label>
                        <input id={el+'-'+index} type='text' className='input_box' />
                    </div>
                    {el == 'Index percentage' ?
                        <div className="divider"></div>
                        :
                        null
                    }
                    {el == 'Index token ticker' ?
                        <div className="divider"></div>
                        :
                        null
                    }
                </div>
            ))}

            <button
                className='invert'
                onClick={() =>
                    setFormQuestions(formQuestionsArray.concat(newSet))
                }>
                + Add another token
            </button>
            <p>
                Registration cost:
                <span className='green_text'> 1 {getCoin()}</span>
            </p>
            <button className='align_center_ml_sm' onClick={() => createPassivePool(formQuestionsArray.length)}>
                Register
            </button>
        </div>
    );
};

const Processing = ({ poolSelected }) => {
    return (
        <div className='paper_box processing_box'>
            <p className='head'>Your index transaction is processing...</p>
            {/* <img src={NyanCat} alt='' /> */}
            {poolSelected === 'active' && (
                <p className='no_margin'>
                    You can visit your pool here:{' '}
                    <a
                        href='http://www.google.com'
                        target='_blank'
                        rel='noreferrer'>
                        pool link
                    </a>
                </p>
            )}
            {poolSelected !== 'active' && (
                <p className='no_margin'>
                    You can visit your index here:{' '}
                    <a
                        href='http://www.google.com'
                        target='_blank'
                        rel='noreferrer'>
                        index link
                    </a>
                </p>
            )}
            <p className='small no_margin'>
                Tip: your index link is your wallet address
            </p>
        </div>
    );
};
export default CreateActivePassivePool;
