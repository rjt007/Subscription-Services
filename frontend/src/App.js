import './App.css';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
        <Routes>
          <Route path='/' element={<RegistrationForm/>}/>
          <Route path='/login' element={<LoginForm/>}/>
        </Routes>
    </div>
    </Router>
  );
}

export default App;
