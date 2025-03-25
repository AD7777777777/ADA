import { useState } from 'react';
import axios from 'axios';

function App() {
  const [animalType, setAnimalType] = useState('Dog');
  const [age, setAge] = useState('');
  const [size, setSize] = useState('');
  const [weight, setWeight] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/diagnose', {
        animalType,
        age,
        size,
        weight,
        symptoms,
      });

      setDiagnosis(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Animal Diagnosis Tool</h1>

      <select value={animalType} onChange={(e) => setAnimalType(e.target.value)}>
        <option>Dog</option>
        <option>Cat</option>
        <option>Rabbit</option>
        <option>Other</option>
      </select>

      <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
      <input type="text" placeholder="Size" value={size} onChange={(e) => setSize(e.target.value)} />
      <input type="number" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
      <textarea placeholder="Symptoms" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} />

      <button onClick={handleSubmit}>Diagnose</button>

      {diagnosis && (
        <div>
          <h3>{diagnosis.diagnosis}</h3>
          <ul>
            {diagnosis.treatments.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
