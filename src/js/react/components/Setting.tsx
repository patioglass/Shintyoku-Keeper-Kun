import React from 'react';
import {Config} from '../config';

type Props = {
    children?: React.ReactNode;
    timerPattern: string;
    addSettingTime: (num: number, setting: boolean) => void
}

export default function Setting(props: Props) {
    const { timerPattern, addSettingTime} = props;
   
    return (
        (!timerPattern || timerPattern === Config.STOP_TYPE ? (
            <div className='timer__setting'>
                <h2>時間を指定する</h2>
                <div className='setting-time' onClick={(e) => addSettingTime(1 * 60 * 60, true)}>+1時間</div>
                <div className='setting-time' onClick={(e) => addSettingTime(1 * 60 * 10, true)}>+10分</div>
                <div className='setting-time' onClick={(e) => addSettingTime(1 * 60, true)}>+1分</div>
                <div className='setting-time' onClick={(e) => addSettingTime(10, true)}>+10秒</div>
                <div className='setting-time' onClick={(e) => addSettingTime(1, true)}>+1秒</div>
            </div>
        ): (
            <div className='timer__setting'>
                <h2>時間を指定する</h2>
                <div className='setting-time__none'>+1時間</div>
                <div className='setting-time__none'>+10分</div>
                <div className='setting-time__none'>+1分</div>
                <div className='setting-time__none'>+10秒</div>
                <div className='setting-time__none'>+1秒</div>
            </div>
        ))

    );
}