import React, { useState, useEffect } from 'react';

import audio from './audio-icon.png';

let timer, alert, textTalk = window.speechSynthesis;

function Timer() {
  const [time, setTime] = useState('20:00');
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [isAlertOn, setIsAlertOn] = useState(false);
  const [volume, setVolume] = useState(20);

  function startTimer() {
    timer = setInterval(() => {
      setTime((time) => {
        let min = time.split(':')[0];
        let sec = time.split(':')[1];
        if (+(min + sec) > 0) {
          if (sec === '00') {
            if (+min <= 10) min = `0${+min - 1}`;
            else min = `${+min - 1}`;
            sec = '59';
          }
          else {
            if (+sec <= 10) sec = `0${+sec - 1}`;
            else sec = `${+sec - 1}`;
          }
        }
        return `${min}:${sec}`;
      });
    }, 1000);
  }

  function startAlert() {
    alert = setInterval(() => {
      setTime((time) => {
        let sec = time.split(':')[1];
        if (+sec > 0) {
          if (+sec <= 10) sec = `0${+sec - 1}`;
          else sec = `${+sec - 1}`;
        }
        return `00:${sec}`;
      });
    }, 1000);
  }

  function handleStartClick() {
    setTime('20:00');
    setIsTimerOn(true);
    setIsAlertOn(false);
    startTimer();
  }

  function handleStopClick() {
    setTime('20:00');
    setIsTimerOn(false);
    setIsAlertOn(false);
  }

  function flashBG() {
    document.body.style.backgroundColor = '#bcbcbc';
    setTimeout(() => {
      document.body.style.backgroundColor = '#000';
    }, 250);
  }

  function speech(text) {
    let utter = new SpeechSynthesisUtterance(text);
    utter.volume = volume * .01;
    textTalk.speak(utter);
  }

  useEffect(() => {
    let rangeVolume = document.querySelector('#range-volume');
    rangeVolume.innerHTML = volume;

    let startButton = document.querySelector('#start-button');
    startButton.addEventListener('click', (e) => {
      clearInterval(timer);
      clearInterval(alert);
    });
  }, [volume]);

  useEffect(() => {
    if (isTimerOn && time === '00:00') {
      speech('go away');
      flashBG();
      clearInterval(timer);
      setTimeout(() => {
        setTime('00:20');
        startAlert();
        setIsAlertOn(true);
        setIsTimerOn(false);
      }, 2000);
    }
    if (isAlertOn && time === '00:00') {
      clearInterval(alert);
      speech('come back');
      flashBG();
      setTimeout(() => {
        setTime('20:00');
        startTimer();
        setIsTimerOn(true);
        setIsAlertOn(false);
      }, 2000);
    }
    if (!isTimerOn && !isAlertOn) {
      clearInterval(timer);
      clearInterval(alert);
    }
  }, [time, isTimerOn, isAlertOn]);

  return (
    <div>
      <div className="timer">{time}</div>
      <div className="volume-control">
        <img src={audio} className="audio"/>
        <input
          className="slider"
          type="range"
          min="0"
          max="100"
          value="50"
          value={volume}
          onChange={(e) => setVolume(() => e.target.value)}/>
        <span id="range-volume"></span>
      </div>
      <div className="buttons">
        <button id="start-button" onClick={handleStartClick}>Start / Reset</button>
        <button id="stop-button" onClick={handleStopClick}>Stop</button>
      </div>
    </div>
  )
}

export default Timer;