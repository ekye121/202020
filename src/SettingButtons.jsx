function SettingButtons(props) {
  const {setTabTimer, setBgFlash} = props;
  return (
    <div>
      <div>
        <span className="desc">Window tab timer:</span>
        <button
          className="buttons"
          id="tab-timer"
          onClick={() => setTabTimer((tabTimer) => !tabTimer)}>
          On | Off
        </button>
      </div>
      <div>
        <span className="desc">Background flash:</span>
        <button
          className="buttons"
          id="bg-flash"
          onClick={() => setBgFlash((bgFlash) => !bgFlash)}>
          On | Off
        </button>
      </div>
    </div>
  );
}

export default SettingButtons;