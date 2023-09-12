import './App.css';
import PlanSelect from './PlanSelect';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import SubscriptionForm from './SubscriptionForm';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
const stripePromise = loadStripe('pk_test_51NpAyaSGkYwGTXoxBVV0EkZhGplQYU0ni2LSJtVP9zO9tCH4KBANA8r5FgBLglUrIfu9WHU9dhCQhrp3f6aRo0Eo00LDv2g5PB');

function App() {
  return (
    <Router>
    <div className="App">
        <Routes>
          <Route path='/' element={<RegistrationForm/>}/>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/plans' element={<PlanSelect/>}/>
          <Route path='/subscribe' element={<Elements stripe={stripePromise}><SubscriptionForm/></Elements>}/>
        </Routes>
    </div>
    </Router>
  );
}

export default App;
