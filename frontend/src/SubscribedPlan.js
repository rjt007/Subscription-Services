import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import './PlanList.css';

function SubscribedPlan() {
    const navigate = useNavigate();
    const location = useLocation();
    const {planId} = location.state;

    const accessToken = localStorage.getItem('accessToken');

    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      // Fetch a plan from the API
      const fetchPlan = async () => {
        try {
          const response = await axios.get(`https://subscription-services-api.onrender.com/api/plans/${planId}`,{ headers: {"Authorization" : `Bearer ${accessToken}`} });
          if (response.data) {
            setPlan(response.data);
          } else {
            setError('Failed to fetch plan');
          }
        } catch (error) {
          setError(`Error fetching plan - ${error.message}`);
        } finally {
          setLoading(false);
        }
      };
      fetchPlan();
    }, []);

    const handleClick = async(event)=>{
      event.preventDefault();

      const headers = {
        'Authorization': `Bearer ${accessToken}`
      }
      try {
        // Send request to unsubscribe user
        const response = await axios.post('https://subscription-services-api.onrender.com/api/user/unsubscribe',{},{ headers: headers});
        if(response.data){
          alert(response.data.message);
          //Navigate to success page
          navigate('/');
        }
        else{
          alert('Unsubscription failed. Please try again.');
        } 
      } catch (error) {
        console.log(error);
        alert('Unsubscription failed - '+error.message);
      }
    }
    return(
      <div className="plan-list-container">
        {loading && <p className="loading">Loading subscribed plan...</p>}
        {error && <p className="error">{error}</p>}
        {plan ? (
        <div>
          <h2>Selected Plan</h2><br />
            <div className="plans">
                  <div className="plan">
                    <h3>{plan.name.toUpperCase()}</h3>
                    <p>Price: Rs.{plan.price} / {plan.interval==='monthly'?'month':'year'}</p>
                    <p>Video Quality: {plan.quality.toUpperCase()}</p>
                    <p>Resolution: {plan.resolution}</p>
                    <p>Devices Supported: {plan.devices.join(', ').toUpperCase()}</p>
                    <button onClick={handleClick}>Unsubscribe Plan</button>
                  </div>
            </div>
          </div>
        ) : (<div>You are not subscribed to any plan</div>)}
      </div>
    )
}

export default SubscribedPlan;
