import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function AnimalDiagnosisDemo() {
  const [animalType, setAnimalType] = useState('Dog');
  const [age, setAge] = useState('');
  const [size, setSize] = useState('');
  const [weight, setWeight] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState(null);

  const handleSubmit = () => {
    // Simulate AI diagnosis retrieval (placeholder for real AI integration)
    setDiagnosis({
      possibleCondition: 'Ear Infection',
      recommendedTreatments: ['Visit vet for antibiotics', 'Clean ears gently', 'Monitor regularly'],
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-50 rounded-2xl shadow-xl">
      <h1 className="text-2xl font-bold mb-4">Animal Medical Diagnosis Tool</h1>

      <div className="space-y-3">
        <select
          className="w-full p-2 border rounded"
          value={animalType}
          onChange={(e) => setAnimalType(e.target.value)}>
          <option>Dog</option>
          <option>Cat</option>
          <option>Rabbit</option>
          <option>Other</option>
        </select>

        <input
          className="w-full p-2 border rounded"
          type="number"
          placeholder="Age (years)"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Size (small, medium, large)"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded"
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <textarea
          className="w-full p-2 border rounded"
          placeholder="Describe the medical issue"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />

        <Button className="w-full" onClick={handleSubmit}>
          Diagnose
        </Button>
      </div>

      {diagnosis && (
        <div className="mt-6 bg-white p-4 rounded-xl shadow">
          <h2 className="font-bold text-xl">Possible Diagnosis: {diagnosis.possibleCondition}</h2>
          <h3 className="mt-2 font-semibold">Recommended Treatments:</h3>
          <ul className="list-disc pl-5">
            {diagnosis.recommendedTreatments.map((treatment, index) => (
              <li key={index}>{treatment}</li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-500">
        *This tool provides preliminary information and does not replace professional veterinary care.
      </p>
    </div>
  );
}

