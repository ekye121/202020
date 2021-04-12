import React, { useMemo } from 'react';

import AudioIcon from './audio-icon.png';

function Sound({sound, setSound}) {
  const sliderProps = useMemo(() => ({
    className: "slider",
    type: "range",
    min: "0",
    max: "100",
    value: sound,
    onChange: (e) => setSound(() => e.target.value)
  }), [sound, setSound]);

  return (
    <div className="volume-control">
      <img src={AudioIcon} className="audio" alt="audio"/>
      <input {...sliderProps}/>
      <span id="range-volume"></span>
    </div>
  );
}

export default Sound;