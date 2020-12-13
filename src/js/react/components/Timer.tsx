import React from 'react';

type Props = {
    children?: React.ReactNode;
    totalTime: number;
    settingTime: number;
}

export default function Timer(props: Props) {
    const { totalTime, settingTime } = props;
    const hour = Math.floor(settingTime / 60 / 60);
    const minute = Math.floor((settingTime - (60 * 60 * hour)) / 60);
    const second = Math.floor(settingTime % 60);
    const displayTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;

    let percentageBar: number = 0;
    if (totalTime !== 0) {
        percentageBar = Math.floor(
            (
                ((hour * 60 * 60 + minute * 60 + second) / totalTime)
            ) * 100
        );
    }
    return (
        <>
            <div className="timer__main">
                <div className="timer__main_display-time">{displayTime}</div>
                <progress
                    className="timer__main_display-bar"
                    value={(percentageBar / 100 ).toString()}
                >
                </progress>
            </div>
        </>
    );
}