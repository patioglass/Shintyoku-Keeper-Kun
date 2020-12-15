import React, {useState, useEffect, useRef} from 'react';
import Timer from './Timer';
import Setting from './Setting';
import {Config} from '../config';
import Icon from '../../../img/icon.png';

export default function MainContainer() {
    const [ settingTime, setSettingTime ] = useState<number>(0);
    const [ timerPattern, setTimerPattern] = useState<string>('');
    const [ totalTime, setTotalTime ] = useState<number>(0);

    const refSettingTime = useRef(settingTime);
    useEffect(() => {
        refSettingTime.current = settingTime;
    }, [settingTime]);

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
    }, [timerPattern])

    const clearSettingTime = () => {
        setTotalTime(0);
        setSettingTime(0);
        setTimerPattern('');
    }

    const addSettingTime = (second: number, setting: boolean = false) => {
        setSettingTime(refSettingTime.current + second);
        if (setting) {
            setTotalTime(refSettingTime.current + second);
        }
    }

    const changeTimerPattern = (type: string) => {
        setTimerPattern(type);
    }

    return (
        <div className='wrapper'>
            <h1>Shintyoku-Keeper-Kun</h1>

            <p>指定した時間のカウントダウンを進捗バーと共に実施するアプリ</p>
            <img src={Icon} />

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