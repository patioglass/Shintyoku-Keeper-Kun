import React, {useState, useEffect} from 'react';
import Timer from './Timer';
import Setting from './Setting';
import {Config} from '../config';


export default function MainContainer() {
    const [ settingTime, setSettingTime ] = useState<number>(0);
    const [ timerPattern, setTimerPattern] = useState<string>('');
    const [ totalTime, setTotalTime ] = useState<number>(0);

    useEffect(() => {
        let intervalId!: NodeJS.Timeout;
        switch(timerPattern) {
            case Config.START_TYPE:
                intervalId = setInterval(() => {
                    addSettingTime(-1);
                    if (settingTime - 1 < 0) {
                        clearInterval(intervalId);
                        clearSettingTime();
                    }
                }, 1000);
                break;
            case Config.PAUSE_TYPE:
                clearInterval(intervalId);
                break;
            case Config.STOP_TYPE:
                clearSettingTime();
                clearInterval(intervalId);
                break;
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        }
    })
   
    const clearSettingTime = () => {
        setTotalTime(0);
        setSettingTime(0);
        setTimerPattern('');
    }

    const addSettingTime = (second: number, setting: boolean = false) => {
        setSettingTime(settingTime + second);
        if (setting) {
            setTotalTime(settingTime + second);
        }
    }

    const changeTimerPattern = (type: string) => {
        setTimerPattern(type);
    }

    return (
        <div className='wrapper'>
            <h1>SimpleProgressBar</h1>
            <p>時間を指定して、指定した時間のカウントダウンをprogressBarと共に実施するアプリ</p>
            <hr />
            <Setting
                timerPattern={timerPattern}
                addSettingTime={(num: number, setting: boolean) => addSettingTime(num, setting)}
            >
            </Setting>
            
            <div className="button button__start" onClick={() => changeTimerPattern(Config.START_TYPE)}>スタート</div>
            <div className="button button__pause" onClick={() => changeTimerPattern(Config.PAUSE_TYPE)}>一時停止</div>
            <div className="button button__stop" onClick={() => changeTimerPattern(Config.STOP_TYPE)}>最初から</div>
            <Timer
                totalTime={totalTime}
                settingTime={settingTime}
            ></Timer>
        </div>
    );
}