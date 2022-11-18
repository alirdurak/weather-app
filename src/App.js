import Weather from './components';
import { WeatherProvider } from './context/weatherContext';
import './App.css';

function App() {
  return (
    <div className="App">
    <WeatherProvider>
        <Weather>
          
        </Weather>
    </WeatherProvider>
    </div>
  );
}

export default App;
