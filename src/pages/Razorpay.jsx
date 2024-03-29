import React, { useState, useEffect } from 'react';
import { supabase } from "../supabase/client";
import { useAuth } from "../context/AuthProvider";
import { useLocation } from 'react-router-dom';
import pay from "../images/payment.png";

function Payment() {
  const [amount, setAmount] = useState('');
  const [userData, setUserData] = useState({});
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const { data, error } = await supabase
          .from('Users')
          .select('*')
          .eq('id', userId)
          .single();

        if (error) {
          console.error('Error fetching user data:', error);
          return null;
        }

        setUserData(data || {});
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    if (user && user.id) {
      fetchUserData(user.id);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (amount === '') {
      alert('Please enter the amount');
    } else {
      const donationData = {
        userid: user.id,
        username: userData.name || '',
        disasterid: location.state.disasterId,
        usercontact: userData.contact || '',
        amount: amount
      };

      try {
        const { data, error } = await supabase.from('Donation').insert(donationData);
        if (error) {
          console.error('Error inserting donation:', error.message);
          return;
        }
        // Handle successful insertion
        console.log('Donation details stored:', data);
      } catch (error) {
        console.error('Error inserting donation:', error.message);
      }

      // Perform the payment processing logic here
      // ...
    }
    if (amount === '') {
        alert('Please enter the amount');
      } else {
          var options = {
              key: process.env.RAZORPAY_URL,
              key_secret: process.env.RAZORPAY_KEY,
              amount: amount * 100,
              currency: "INR",
              name: "AID CONNECT",
              description: "for testing purpose",
              handler: function (response) {
                alert(response.razorpay_payment_id);
              },
              prefill: {
                name: userData.name || '', // Use userData obtained from the state
                contact: userData.contact || '', // Use userData obtained from the state
              },
              notes: {
                address: "Razorpay Corporate office",
              },
              theme: {
                color: "#3399cc",
              },
            };
            var pay = new window.Razorpay(options);
            pay.open();
      }
  };

  return (
    <div className="App" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#2b3035' }}>
      <div style={{ display: 'flex', width: '100%', maxWidth: '800px' }}>
        <div style={{ flex: 1 }}>
          <img src={pay} alt="Payment Image" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
        <div style={{ flex: 1, padding: '0 20px' }}>
          <h1 style={{ fontFamily: 'Poppins', color: '#5332e6', fontWeight: 'bolder' }}>Donations</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
            />
            <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
