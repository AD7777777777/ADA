// src/App.js
import { useState } from 'react';

function App() {
  const [animalType, setAnimalType] = useState('Dog');
  const [age, setAge] = useState('');
  const [size, setSize] = useState('');
  const [weight, setWeight] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState(null);

  const handleSubmit = () => {
    setDiagnosis({
      possibleCondition: 'Ear Infection',
      recommendedTreatments: ['Visit vet for antibiotics', 'Clean ears gently', 'Monitor regularly'],
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Animal Medical Diagnosis Tool</h1>

      <div style={{ marginBottom: '10px' }}>
        <label>Animal Type:</label><br />
        <select value={animalType} onChange={(e) => setAnimalType(e.target.value)} style={{ width: '100%', padding: '8px' }}>
          <option>Dog</option>
          <option>Cat</option>
          <option>Rabbit</option>
          <option>Other</option>
        </select>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Age (years):</label><br />
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={{ width: '100%', padding: '8px' }} />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Size (small, medium, large):</label><br />
        <input type="text" value={size} onChange={(e) => setSize(e.target.value)} style={{ width: '100%', padding: '8px' }} />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Weight (kg):</label><br />
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} style={{ width: '100%', padding: '8px' }} />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Describe Symptoms:</label><br />
        <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} style={{ width: '100%', padding: '8px', height: '80px' }} />
      </div>

      <button onClick={handleSubmit} style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
        Diagnose
      </button>

      {diagnosis && (
        <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0' }}>
          <h3>Possible Diagnosis: {diagnosis.possibleCondition}</h3>
          <p><strong>Recommended Treatments:</strong></p>
          <ul>
            {diagnosis.recommendedTreatments.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <p style={{ fontSize: '12px', color: '#888', marginTop: '20px' }}>
        * This tool provides preliminary information and does not replace professional veterinary care.
      </p>
    </div>
  );
}

export default App;
