import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import PlanList from "./PlanList";
import './PlanSelect.css';

function PlanSelect() {

    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
      // Fetch plans from the API
      const fetchPlans = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/plans',{ headers: {"Authorization" : `Bearer ${accessToken}`} });
          if (response.data) {
            setPlans(response.data);
          } else {
            setError('Failed to fetch plans');
          }
        } catch (error) {
          setError(`Error fetching plans - ${error.message}`);
        } finally {
          setLoading(false);
        }
      };
      fetchPlans();
    }, []);
  
    const handleSelectPlan = (plan) => {
      // Update the selected plan state
      setSelectedPlan(plan);
    };
  
    return (
      <div className="plan-container">
        {loading && <p className="loading">Loading plans...</p>}
        {error && <p className="error">{error}</p>}
        {selectedPlan ? (
          <div className="selected-plan">
            <h2>Selected Plan</h2>
            <p className="plan-details"> <b>NAME</b> -  <i>{selectedPlan.name.toUpperCase()}</i></p>
            <p className="plan-details"><b>PRICE</b>  -  <i>Rs.{selectedPlan.price} / {selectedPlan.interval==='monthly'?'month':'year'}</i></p>
            <Link to='/subscribe' state={{ plan: selectedPlan }}>
              <button className="btn">Proceed For Payment</button>
            </Link>
          </div>
        ) : null}
        {!loading && !error && <PlanList plans={plans} onSelectPlan={handleSelectPlan} />}
      </div>
    );
  }

  export default PlanSelect;