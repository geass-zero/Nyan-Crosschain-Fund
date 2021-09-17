import React, { useState, useEffect } from 'react';
import './PopUp.scss';

export default function PopUp({
    visible,
    children,
    onClose,
    responsive,
    className,
}) {
    const [showData, setShowData] = useState(false);
    useEffect(() => {
        if (visible) {
            setShowData(true);
        } else {
            if (showData) {
                setTimeout(() => {
                    setShowData(false);
                }, 600);
            }
        }
    }, [showData, visible]);

    const onCloseHandler = (e) => {
        if (e.target.classList.contains('pop-up-wrap')) onClose();
    };

    return (
        <div
            className={'pop-up-wrap' + (visible ? ' active' : '')}
            onClick={(e) => onCloseHandler(e)}>
            <div
                className={
                    'pop-up-box ' +
                    (visible ? ' active ' : '') +
                    responsive +
                    ' ' +
                    className
                }>
                {/* <div className='header-wrap'>
                    <div className='close-button' onClick={() => onClose()}>
                        ✕
                    </div>
                </div> */}
                <div className='header-data-wrap'>
                    {showData ? children : ''}
                </div>
            </div>
        </div>
    );
}
