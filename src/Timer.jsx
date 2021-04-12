import React, { useState, useEffect } from 'react';

import Sound from './Sound.jsx';
import SettingButtons from './SettingButtons.jsx';

let timer, alert, delayTimer, delayAlert;

function Timer() {
  const [time, setTime] = useState('20:00');
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [isAlertOn, setIsAlertOn] = useState(false);
  const [sound, setSound] = useState(50);
  const [toggleTabTimer, setToggleTabTimer] = useState(true);
  const [bgFlash, setBgFlash] = useState(true);

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
    clearTimer();
    setTime('20:00');
    setIsTimerOn(true);
    setIsAlertOn(false);
    startTimer();
  }

  function handleStopClick() {
    clearTimer();
    setTime('20:00');
    setIsTimerOn(false);
    setIsAlertOn(false);
  }

  function clearTimer() {
    clearInterval(timer);
    clearInterval(alert);
    clearTimeout(delayTimer);
    clearTimeout(delayAlert);
  }

  function flashBG() {
    document.body.style.backgroundColor = '#a3a3a3';
    setTimeout(() => {
      document.body.style.backgroundColor = '#000';
    }, 200);
  }

  function buttonSlider(buttonState, el) {
    if (buttonState) el.style.backgroundPosition = '50%';
    else el.style.backgroundPosition = '100%';
  }

  function utterText(text, sound) {
    let utter = new SpeechSynthesisUtterance();
    utter.volume = sound * .01;
    utter.text = text;
    window.speechSynthesis.speak(utter);
  }

  useEffect(() => {
    let rangeVolume = document.querySelector('#range-volume');
    rangeVolume.innerHTML = sound;

    if (time === '00:00') {
      if (isTimerOn) utterText('go away', sound);
      if (isAlertOn) utterText('come back', sound);
    }
  }, [time, isTimerOn, isAlertOn]);

  useEffect(() => {
    let bgFlashButton = document.querySelector('#bg-flash');
    buttonSlider(bgFlash, bgFlashButton);

    let pageTitle = document.querySelector('title');
    let tabTimerButton = document.querySelector('#tab-timer');
    buttonSlider(toggleTabTimer, tabTimerButton);
    if (toggleTabTimer) pageTitle.textContent = time;
    else pageTitle.textContent = '20 20 20';

    if (time === '00:00') {
      if (bgFlash) flashBG();
    }
  }, [time, toggleTabTimer, bgFlash]);

  useEffect(() => {
    if (time === '00:00') {
      if (isTimerOn) {
        clearInterval(timer);
        delayTimer = setTimeout(() => {
          setTime('00:20');
          setIsTimerOn(false);
          setIsAlertOn(true);
          startAlert();
        }, 2000);
      }
      if (isAlertOn) {
        clearInterval(alert);
        delayAlert = setTimeout(() => {
          setTime('20:00');
          setIsTimerOn(true);
          setIsAlertOn(false);
          startTimer();
        }, 2000);
      }
    }
    if (!isTimerOn && !isAlertOn) {
      clearTimer();
    }
  }, [time, isTimerOn, isAlertOn]);

  return (
    <div>
      <div className="timer">{time}</div>
      <div>
        <button
          className="buttons cta-buttons"
          id="start-button"
          onClick={handleStartClick}>
          Start / Reset
        </button>
        <button
          className="buttons cta-buttons"
          id="stop-button"
          onClick={handleStopClick}>
          Stop
        </button>
      </div>
      <div className="desc">Look 20 feet away for 20 seconds every 20 minutes</div>
      <Sound sound={sound} setSound={setSound}/>
      <SettingButtons setToggleTabTimer={setToggleTabTimer} setBgFlash={setBgFlash}/>
    </div>
  )
}

export default Timer;