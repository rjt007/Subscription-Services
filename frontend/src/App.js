import './App.css';
import RegistrationForm from './RegistrationForm';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
        <Routes>
          <Route path='/' element={<RegistrationForm/>}/>
        </Routes>
    </div>
    </Router>
  );
}

export default App;
