import { useState } from 'react';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';

const TimerTicker = ({ timerValue }) => {
    const [timer, setTimer] = useState({ time: 0, duration: 0 });
    //timerValue in milliseconds
    const onTimerUpdate = ({ time, duration }) => {
        setTimer({ time, duration });
    };
    return (
        <span>
            <Timer active duration={timerValue} onTimeUpdate={onTimerUpdate} />
            <Timecode time={timer.duration - timer.time} />
        </span>
    );
};

export default TimerTicker;
