import logo from './logo.svg';
import './App.css';
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Link to='home'>Home3</Link> */}
      <a href='/home'>Home5</a>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
