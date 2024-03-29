import React, { useState } from 'react';
import disasterImage from '../images/Helping a partner-rafiki.png'; // Replace with the actual path to your image
import { supabase } from "../supabase/client";
import { useAuth } from "../context/AuthProvider";
const CalamityReportForm = () => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [disasterType, setDisasterType] = useState('');
  const [description,  setDescription] = useState('');
  const [DII,setDII]=useState('');


  const {user}=useAuth();
  const submitForm = async (e) => {
    e.preventDefault();
   
    try {
      const { data, error } = await supabase.from('Disaster').insert([
        {
          state:state,
          district:district,
          town:city,
          desc:description,
          id:user.id,
          DII:DII,
          type:disasterType,
          
        },
      ]);

      if (error) {
        console.error('Error adding disaster:', error);
        return;
      }
       setCity('');
       setDescription('');
       setDisasterType('');
       setDistrict('');
       setState('');
       setDII('');
       

      console.log('Disaster added:', data);
    } catch (error) {
      console.error('Error adding disaster:', error.message);
    }
  };

  return (
    <div style={{ backgroundColor: '#2b3035', minHeight: '100vh', padding: '50px', color: '#fff', display: 'flex' }}>
        
      <div style={{ flex: 1, marginRight: '20px', marginBottom: '-50px' }}>
  <img src={disasterImage} alt="Disaster" style={{ maxWidth: '100%', height: '90%' }} />
</div>


      <div style={{ flex: 2, maxWidth: '700px', padding: '30px', boxSizing: 'border-box' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px',fontFamily:'poppins,sans-serif' }}>CALAMITY REPORT FORM</h2>
        

        <div style={{ marginBottom: '20px' }}>
  <label style={{ display: 'block', marginBottom: '5px' }}>State:</label>
  <select
    value={state}
    onChange={(e) => setState(e.target.value)}
    style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
  >
    <option value="" disabled selected>
      Select a state
    </option>
    <option value="Andhra Pradesh">Andhra Pradesh</option>
    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
    <option value="Assam">Assam</option>
    <option value="Bihar">Bihar</option>
    <option value="Chhattisgarh">Chhattisgarh</option>
    <option value="Goa">Goa</option>
    <option value="Gujarat">Gujarat</option>
    <option value="Haryana">Haryana</option>
    <option value="Himachal Pradesh">Himachal Pradesh</option>
    <option value="Jharkhand">Jharkhand</option>
    <option value="Karnataka">Karnataka</option>
    <option value="Kerala">Kerala</option>
    <option value="Madhya Pradesh">Madhya Pradesh</option>
    <option value="Maharashtra">Maharashtra</option>
    <option value="Manipur">Manipur</option>
    <option value="Meghalaya">Meghalaya</option>
    <option value="Mizoram">Mizoram</option>
    <option value="Nagaland">Nagaland</option>
    <option value="Odisha">Odisha</option>
    <option value="Punjab">Punjab</option>
    <option value="Rajasthan">Rajasthan</option>
    <option value="Sikkim">Sikkim</option>
    <option value="Tamil Nadu">Tamil Nadu</option>
    <option value="Telangana">Telangana</option>
    <option value="Tripura">Tripura</option>
    <option value="Uttar Pradesh">Uttar Pradesh</option>
    <option value="Uttarakhand">Uttarakhand</option>
    <option value="West Bengal">West Bengal</option>
  </select>
</div>


        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>District:</label>
          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="Enter district"
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Type of Disaster:</label>
          <select
            value={disasterType}
            onChange={(e) => setDisasterType(e.target.value)}
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
          >
            <option value="" disabled selected>
              Select an option
            </option>
            <option value="earthquake">Earthquake</option>
            <option value="flood">Flood</option>
            <option value="cyclone">Cyclone</option>
            <option value="landslide">Landslide</option>
            <option value="Forest Fire">Forest Fire</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            style={{ width: '100%', padding: '20px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Disaster impact index</label>
          <select
            value={DII}
            onChange={(e) => setDII(e.target.value)}
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
          >
            <option value="" disabled selected>
              Select an option
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <button
          type="button"
          onClick={submitForm}
          style={{ background:'linear-gradient(to right, #8e2de2, #4a00e0)', color: '#fff', padding: '15px', border: 'none', cursor: 'pointer', width: '100%' }}
        >
          Submit
        </button>
      </div>
     
       
    </div>
    
  );
};

export default CalamityReportForm;