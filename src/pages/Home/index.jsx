import './styles.scss';
import {Link} from 'react-router-dom'
import { ReactComponent as Cards } from './../../assets/svg/Cards.svg';
import gradient1 from './../../assets/images/gradient1.png';
import gradient2 from './../../assets/images/gradient2.png';
import gradient3 from './../../assets/images/gradient3.png';
import catIllustration from './../../assets/svg/catIllustration.svg';
import graphIllustration from './../../assets/svg/graphIllustration.svg';


const Test = () => {
    const getChain = () => {
        return window.localStorage.getItem('chain');
    }

    const getCoin = () => {
        let chain = window.localStorage.getItem('chain');
        if (chain == 'ETH') {
            return 'ETH';
        } else if (chain == 'BSC') {
            return 'BNB';
        }
    }
    
    const switchChains = (e) => {
        window.localStorage.setItem('chain', e.target.value);
        document.getElementById('chain').value = e.target.value;
    }
    return (
        <main className='home'>
            <section className='mainSection nav_adjust'>
                <img src={gradient1} className='gradient' alt='bg' />
                <div className='content_wrap'>
                    <div
                        className='top_contents'
                        data-aos='fade-down'
                        data-aos-offset='0 '
                        data-aos-duration='500'>
                        <div className='left_items'>
                            <div className='item input_box'>
                                TOTAL ACTIVITY LIQUIDITY: <span>$ --</span>
                            </div>
                            <div className='item input_box'>
                                TOTAL PASSIVE LIQUIDITY: <span>$ --</span>
                            </div>
                        </div>
                        <div className='right_items select_wrap'>
                            <div className='item'>Select chain</div>
                            
                            <select
                                name='chain'
                                id='chain'
                                className='input_box'
                                value={getChain()}
                                onChange={switchChains}>
                                
                                <option value='ETH'>ETH</option>
                                <option value='BSC'>BSC</option>
                            </select>
                        </div>
                    </div>
                    <div className='info_wrap'>
                        <div className='texts_wrap'>
                            <h1
                                data-aos='fade-up'
                                data-aos-offset='0 '
                                data-aos-duration='500'>
                                Decentralized Onchain Fund management
                            </h1>
                            <p
                                data-aos='fade-up'
                                data-aos-offset='0 '
                                data-aos-duration='600'>
                                Join actively managed funds or create your own
                                fund
                            </p>
                            <div className='buttons_wrap'>
                                <button
                                    data-aos='fade-up'
                                    data-aos-offset='0 '
                                    data-aos-duration='700'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.open(
                                            'https://nyan.finance/create-a-pool'
                                          );
                                        }}>
                                    Create your own fund
                                </button>
                                
                                <button
                                    className='invert xs_hidden'
                                    data-aos='fade-up'
                                    data-aos-offset='0 '
                                    data-aos-duration='800'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.open(
                                            'https://stake.nyan.finance',
                                            '_blank'
                                          );
                                        }}>
                                        Stake
                                </button>
                                <button
                                    className='invert xs_hidden'
                                    data-aos='fade-up'
                                    data-aos-offset='0 '
                                    data-aos-duration='900'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.open(
                                            'https://stake.nyan.finance',
                                            '_blank'
                                          );
                                        }}>
                                        Documentation
                                </button>
                            </div>
                        </div>
                        <Cards
                            data-aos='fade-up'
                            data-aos-offset='0 '
                            data-aos-duration='1400'
                        />
                        <div
                            className='buttons_wrap xs_visible xs_buttons'
                            data-aos='fade-up'
                            data-aos-offset='0 '
                            data-aos-duration='900'>
                            <div className='flex_wrap'>
                                <button
                                    className='invert'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.open(
                                            'https://stake.nyan.finance',
                                            '_blank'
                                          );
                                        }}>
                                    Stake
                                </button>
                                <button 
                                    className='invert'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.open(
                                            'https://www.learnnyan.finance',
                                            '_blank'
                                          );
                                        }}>
                                    Documentation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='nav_adjust base_1'>
                <img src={gradient2} className='gradient' alt='bg' />
                <div className='content_wrap'>
                    <img
                        src={graphIllustration}
                        alt='graph'
                        srcSet=''
                        data-aos='fade-up'
                        data-aos-offset='0 '
                        data-aos-duration='800'
                    />
                    <h1
                        data-aos='fade-up'
                        data-aos-offset='0 '
                        data-aos-duration='1000'>
                        Nyan is a decentralized ecosystem for creating both
                        actively managed pools and passive index funds.
                    </h1>
                </div>
            </section>
            <section className='nav_adjust base_2'>
                <div className='content_wrap'>
                    <h1
                        data-aos='fade-up'
                        data-aos-offset='0 '
                        data-aos-duration='800'>
                        Nyan allows managers to customize their pools to fit
                        their need, with editable pool fees.
                    </h1>
                    <img
                        src={catIllustration}
                        alt={'cat'}
                        data-aos='fade-up'
                        data-aos-offset='0 '
                        data-aos-duration='1000'
                    />
                </div>
            </section>
            <section className='nav_adjust base_3'>
                <div className='content_wrap'>
                    <h1
                        data-aos='fade-up'
                        data-aos-offset='0 '
                        data-aos-duration='800'>
                        Most new entrants to crypto are unsure of what assets to
                        acquire and hold. As a pool manager, you make money for
                        simply telling a smart contract where to move liquidity
                        to.
                    </h1>
                </div>
            </section>
            <footer className='nav_adjust'>
                <img src={gradient3} className='gradient' alt='bg' />
                <div className='content_wrap'>
                    <div className='split_box_wrap'>
                        <div
                            className='split_box'
                            data-aos='fade-up'
                            data-aos-offset='0 '
                            data-aos-duration='800'>
                            <div className='head'>Sustainable tokenomics</div>
                            <p>
                                Profits and fees in the Nyan ecosystem are used
                                to buyback and burn Nyan v2, Catnip v2 and DNyan
                                v2
                            </p>
                            <p>
                                Nyan is also supercharged and burned through the
                                growth of external products like Versus.cx
                            </p>
                            {/* <img
                                src={nyanCat}
                                className='nyan_cat xs_visible'
                                alt='nyan cat'
                            /> */}
                        </div>
                        <div
                            className='split_box'
                            data-aos='fade-up'
                            data-aos-offset='0 '
                            data-aos-duration='1200'>
                            <div className='head'>
                                Multichain Interoperability
                            </div>
                            <p>
                                Create a passive or active fund on multiple
                                supported chains
                            </p>
                            <p>
                                Through the use of the upcoming DarkNyan Bridge,
                                swap any Nyan ecosystem token to and from chains
                                like BSC and Lamden
                            </p>
                            <button className='xs_visible mt_center'>
                                Create your own fund
                            </button>
                        </div>
                    </div>
                    {/* <div
                        data-aos='fade-up'
                        data-aos-offset='0 '
                        data-aos-duration='1500'>
                        <img
                            src={nyanCat}
                            className='nyan_cat xs_hidden'
                            alt='nyan cat'
                        />
                    </div> */}
                </div>
            </footer>
        </main>
    );
};

export default Test;
