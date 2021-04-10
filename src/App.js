import Timer from './Timer.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <Timer/>
      <div className="desc">
        <div>Look 20 feet away for 20 seconds every 20 minutes</div>
        <div>(Works best with sound)</div>
      </div>
    </div>
  );
}

export default App;
