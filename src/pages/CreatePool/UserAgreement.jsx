import { useState } from 'react';

const UserAgreement = ({ onComplete }) => {
    const [acitveAckIndex, setActiveAckIndex] = useState(0);
    return (
        <>
            <h1 className='center_sm'>Active pool user agreement</h1>
            <div className='acknwo_wrap'>
                <div
                    className={
                        'ackn_item' +
                        (acitveAckIndex === 0
                            ? ' active'
                            : acitveAckIndex > 0
                            ? ' passed'
                            : '')
                    }>
                    <div className='title'>
                        I acknowledge that I understand what Self Management
                        means
                    </div>
                    <div className='details'>
                        <p>
                            Creating a Self Managed pool means you're allowing
                            the Defi space to give you access to liquidity with
                            the expectation of management and growth of that
                            liquidity. As a pool creator, you set the fees and direct
                            liquidity movement. Current Self Managed pools are not multi-sig.
                        </p>
                        <div className='buttons_wrap'>
                            <button className='disabled invert'>Back</button>
                            <button onClick={() => setActiveAckIndex(1)}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className={
                        'ackn_item' +
                        (acitveAckIndex === 1
                            ? ' active'
                            : acitveAckIndex > 1
                            ? ' passed'
                            : '')
                    }>
                    <div className='title'>
                        I acknowledge that I should adhere to all financial
                        regulations in my area
                    </div>
                    <div className='details'>
                        <p>
                            Nyan.finance is a decentralized product, meaning
                            that anyone may access it. However, individual users
                            and Self Managers should refer to any laws and
                            regulations surrounding Digital Ledger Technologies
                            and Finance.
                        </p>
                        <div className='buttons_wrap'>
                            <button
                                className='invert'
                                onClick={() => setActiveAckIndex(0)}>
                                Back
                            </button>
                            <button onClick={() => setActiveAckIndex(2)}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className={
                        'ackn_item' +
                        (acitveAckIndex === 2
                            ? ' active'
                            : acitveAckIndex > 2
                            ? ' passed'
                            : '')
                    }>
                    <div className='title'>
                        I acknowledge that all pool data will be publicly
                        available
                    </div>
                    <div className='details'>
                        <p>
                            Due to the nature of public Digital Ledger
                            Technologies, all data from Self Managed Pools and
                            the Nyan fund will be freely accessible. Various
                            models and algorithms for examining pools in order
                            to make this data easily accessible.
                        </p>
                        <div className='buttons_wrap'>
                            <button
                                className='invert'
                                onClick={() => setActiveAckIndex(1)}>
                                Back
                            </button>
                            <button onClick={() => onComplete()}>
                                I understand
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserAgreement;
