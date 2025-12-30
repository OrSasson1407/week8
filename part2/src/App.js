import logo from './logo.svg';
import './App.css';
import Foo from './Foo'; // <-- הוספה 1

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>My Week 8 React Project</p>

        <Foo /> {/* <-- הוספה 2 */}

      </header>
    </div>
  );
}

export default App;