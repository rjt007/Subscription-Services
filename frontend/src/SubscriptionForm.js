import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./SubscriptionForm.css";

const SubscriptionForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan } = location.state;

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });
      if (error) {
        setError(error.message);
        return;
      }

      const accessToken = localStorage.getItem('accessToken');

      const data = {
        planId: plan._id,
        stripeToken: paymentMethod.id,
      };

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }

      const response = await axios.post("http://localhost:8000/api/user/subscribe",data,{headers: headers});
      
      if (response.data) {
        const confirm = await stripe.confirmCardPayment(response.data.clientSecret);
        if (confirm.error) return alert("Payment unsuccessful!");
        setSuccess(true);
        //Navigate to show subscribed-plan
        navigate('/subscribed-plan',{
          state:{
            planId: plan._id
          }
        });
        return;
      }
      else{
        setError('Payment Failed');
        return;
      }
    }
    catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="subscription-form">
      <h3>Add Card Details</h3><br />
      <div className="card-element">
        <CardElement />
      </div>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Subscription created!</p>}
      <button type="submit" disabled={!stripe} className="subscribe-button">
        Subscribe
      </button>
    </form>
  );
};

export default SubscriptionForm;
