import React, { useState } from 'react';
import './PlanList.css';

function PlanList({ plans, onSelectPlan }) {
  const [billingInterval, setBillingInterval] = useState('monthly');

  const toggleBillingInterval = () => {
    setBillingInterval(billingInterval === 'monthly' ? 'yearly' : 'monthly');
  };

  return (
    <div className="plan-list-container">
      <h2>Available Plans</h2><br />
      <button onClick={toggleBillingInterval} className='toggle-button'>
        Show {billingInterval === 'monthly' ? 'Yearly' : 'Monthly'} Plans
      </button>
      <div className="plans">
        {plans
          .filter((plan) => plan.interval === billingInterval)
          .map((plan) => (
            <div className="plan" key={plan.id}>
              <h3>{plan.name.toUpperCase()}</h3>
              <p>Price: Rs.{plan.price} / {plan.interval==='monthly'?'month':'year'}</p>
              <p>Video Quality: {plan.quality.toUpperCase()}</p>
              <p>Resolution: {plan.resolution}</p>
              <p>Devices Supported: {plan.devices.join(', ').toUpperCase()}</p>
              <button onClick={() => onSelectPlan(plan)}>Select Plan</button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PlanList;
