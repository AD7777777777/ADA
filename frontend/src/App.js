import { useState } from 'react';
import axios from 'axios';
import './App.css';
import peteatProducts from './utils/peteatProducts';
import loaderGif from './assets/Peteat_Loader_01.gif';

function App() {
  const [language] = useState('he');
  const [animalType, setAnimalType] = useState('Dog');
  const [age, setAge] = useState('');
  const [size, setSize] = useState('');
  const [weight, setWeight] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState({});
  const [loading, setLoading] = useState(false);

  const translations = {
    en: {
      title: 'Animal Diagnosis Tool',
      age: 'Select Age Range',
      ageOptions: ['0-1 years', '1–7 years', '7+ years'],
      size: 'Select Size',
      weight: 'Select Weight Range',
      symptoms: 'Describe the symptoms',
      diagnose: 'Diagnose',
      loading: 'Loading diagnosis...',
      aiDiagnosis: 'AI Diagnosis:',
      suggestedFood: 'Recommended Products:',
      sizes: ['Small', 'Medium', 'Large'],
      weights: ['Less than 5kg', '5–10kg', '10–15kg', 'More than 15kg'],
      animals: ['Dog', 'Cat'],
    },
    he: {
      title: 'כלי אבחון לחיות מחמד',
      age: 'בחר טווח גיל',
      ageOptions: ['עד שנה', '1-7 שנים', 'מעל 7 שנים'],
      size: 'בחר גודל',
      weight: 'בחר טווח משקל',
      symptoms: 'פרט את הסימפטומים',
      diagnose: 'אבחן',
      loading: 'ד"ר פידו מאבחן...',
      aiDiagnosis: 'ד"ר פידו מצא:',
      suggestedFood: 'מוצרים שיכולים לעניין אותך:',
      sizes: ['קטן', 'בינוני', 'גדול'],
      weights: ['עד 5 ק"ג', '5–10 ק"ג', '10–15 ק"ג', 'מעל 15 ק"ג'],
      animals: ['כלב', 'חתול'],
    },
  };

  const t = translations[language];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://animal-diagnosis-api.onrender.com/diagnose', {
        animalType,
        age,
        size,
        weight,
        symptoms,
        language,
      });

      const diagnosisText = response.data.diagnosis;
      setDiagnosis(diagnosisText);
      const matches = getSuggestedProducts(diagnosisText);
      setSuggestedProducts(matches);
    } catch (error) {
      console.error('❌ Error contacting the backend:', error);
      alert('There was an error contacting the diagnosis API. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getSuggestedProducts = (diagnosisText) => {
    const keywords = [
      'sensitive', 'allergy', 'joint', 'digestive', 'diarrhea', 'skin', 'senior', 'puppy',
      'רגישות', 'אלרגיה', 'פרקים', 'שלשול', 'עור', 'קשיש', 'גור',
      'דלקת עיניים', 'ריח רע מהפה', 'פצעים בעור', 'קושי בשתן', 'תיאבון ירוד',
      'חוסר אנרגיה', 'עור יבש', 'עצירות', 'גזים בקיבה', 'קושי בנשימה',
      'פטרת', 'גירוי בעור', 'שינויים בפרווה', 'נפיחות באוזניים', 'קושי בבליעה',
      'בלוטות נפוחות', 'עקיצות', 'טפילים', 'פטריות', 'עור מודלק',
      'הקאות', 'גזים', 'נפיחות בבטן', 'רגישות במערכת העיכול', 'עיכול לקוי', 'יציאות רכות',
      'גרד', 'גירוד', 'נשירה', 'אדמומיות', 'יובש בעור', 'פריחה', 'דרמטיטיס',
      'צליעה', 'כאבי פרקים', 'קושי בהליכה', 'דלקת פרקים', 'מפרקים נוקשים', 'בעיות אגן',
      'שתן תכוף', 'דם בשתן', 'בעיות בשלפוחית', 'דלקת בדרכי השתן', 'מחלת כליות', 'שתן לא רגיל',
      'שיעול', 'קוצר נשימה', 'נשימה מהירה', 'חרחור', 'נזלת כרונית',
      'תגובה למזון', 'נפיחות', 'אלרגיה סביבתית',
      'שמן', 'שמנה', 'משמין', 'עודף משקל', 'סוכרת', 'תיאבון מוגבר', 'חילוף חומרים איטי', 'מופחת שומן',
      'חוסר תיאבון', 'ירידה במשקל', 'שינויים בהתנהגות', 'כאב', 'זקן', 'גמור', 'בוגר',
      'לא אוכל', 'בטן נפוחה', 'אין תאבון'
    ];

    const text = diagnosisText.toLowerCase();

    const matches = peteatProducts.filter(product => {
      const isFood = product.type === 'food';
      const isAnimal = animalType === 'Dog'
        ? product.name.includes('כלב') || product.name.includes('לכלבים')
        : product.name.includes('חתול') || product.name.includes('לחתולים');

      const keywordMatch = keywords.some(keyword =>
        text.includes(keyword.toLowerCase()) && (
          (product.tags && product.tags.includes(keyword)) ||
          (product.description && product.description.toLowerCase().includes(keyword)) ||
          (product.name && product.name.toLowerCase().includes(keyword))
        )
      );

      return isFood && isAnimal && keywordMatch;
    });

    const firstByType = (type) => matches.find(p => p.type === type) || null;

    const shampooLink = 'https://peteat.co.il/collections/%D7%98%D7%99%D7%A4%D7%95%D7%97-%D7%95%D7%99%D7%95%D7%A4%D7%99';

    const treatmentLink = animalType === 'Dog'
      ? 'https://peteat.co.il/collections/%D7%97%D7%98%D7%99%D7%A4%D7%99%D7%9D-%D7%9C%D7%9B%D7%9C%D7%91%D7%99%D7%9D'
      : 'https://peteat.co.il/collections/%D7%97%D7%98%D7%99%D7%A4%D7%99%D7%9D-%D7%9C%D7%97%D7%AA%D7%95%D7%9C%D7%99%D7%9D';

    return {
      food: firstByType('food'),
      shampoo: { name: 'מוצרי טיפוח ויופי', link: shampooLink },
      treatment: { name: 'פינוקים לחברים', link: treatmentLink }
    };
  };

  const handleProductClick = (productName) => {
    console.log(`🟢 Product clicked: ${productName}`);
  };

  const renderFormattedDiagnosis = () => {
    if (!diagnosis) return null;

    const textAlign = language === 'he' ? 'right' : 'left';
    const direction = language === 'he' ? 'rtl' : 'ltr';

    return (
      <div dir={direction} style={{ textAlign }}>
        {diagnosis
          .replace(/\*\*/g, '')
          .split('\n')
          .map((line, index) => {
            const trimmed = line.trim();

            if (trimmed.startsWith('Possible Diagnosis:') || trimmed.startsWith('Common Treatments:') || trimmed.startsWith('Disclaimer:')) {
              return (
                <h4 key={index} dir={direction} style={{ marginTop: '1.2rem', color: '#2d4836', fontWeight: 'bold', textAlign }}>
                  {trimmed}
                </h4>
              );
            }

            if (trimmed.startsWith('-')) {
              return (
                <li key={index} dir={direction} style={{ marginLeft: '1.5rem', lineHeight: '1.6', textAlign }}>
                  {trimmed.replace('-', '').trim()}
                </li>
              );
            }

            return (
              <p key={index} dir={direction} style={{ marginBottom: '0.6rem', textAlign }}>
                {line}
              </p>
            );
          })}
      </div>
    );
  };

  return (
    <div className="container" dir={language === 'he' ? 'rtl' : 'ltr'}>
      <h1>{t.title}</h1>

      <select value={animalType} onChange={(e) => setAnimalType(e.target.value)}>
        {t.animals.map((label, index) => (
          <option key={index} value={translations.en.animals[index]}>
            {label}
          </option>
        ))}
      </select>

      <select value={age} onChange={(e) => setAge(e.target.value)}>
        <option value="">{t.age}</option>
        {t.ageOptions.map((label, index) => (
          <option key={index} value={translations.en.ageOptions[index]}>
            {label}
          </option>
        ))}
      </select>

      <select value={size} onChange={(e) => setSize(e.target.value)}>
        <option value="">{t.size}</option>
        {t.sizes.map((label, index) => (
          <option key={index} value={translations.en.sizes[index]}>
            {label}
          </option>
        ))}
      </select>

      <select value={weight} onChange={(e) => setWeight(e.target.value)}>
        <option value="">{t.weight}</option>
        {t.weights.map((label, index) => (
          <option key={index} value={translations.en.weights[index]}>
            {label}
          </option>
        ))}
      </select>

      <textarea
        placeholder={t.symptoms}
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />

      <button onClick={handleSubmit}>{t.diagnose}</button>

      {loading && (
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <img src={loaderGif} alt="loading" style={{ width: '150px' }} />
          <p>{t.loading}</p>
        </div>
      )}

      {diagnosis && (
        <div className="diagnosis-box" dir={language === 'he' ? 'rtl' : 'ltr'}>
          <h3 style={{ textAlign: language === 'he' ? 'right' : 'left' }}>{t.aiDiagnosis}</h3>
          {renderFormattedDiagnosis()}

          {(suggestedProducts.food || suggestedProducts.shampoo || suggestedProducts.treatment) && (
            <div style={{ marginTop: '1.5rem' }} dir={language === 'he' ? 'rtl' : 'ltr'}>
              <h4 style={{ textAlign: language === 'he' ? 'right' : 'left' }}>{t.suggestedFood}</h4>
              <ul>
                {suggestedProducts.food && (
                  <li><strong>🍖 מזון:</strong> <a href={suggestedProducts.food.link} target="_blank" rel="noopener noreferrer" onClick={() => handleProductClick(suggestedProducts.food.name)}>{suggestedProducts.food.name}</a></li>
                )}
                {suggestedProducts.shampoo && (
                  <li><strong>🧴 טיפוח:</strong> <a href={suggestedProducts.shampoo.link} target="_blank" rel="noopener noreferrer" onClick={() => handleProductClick(suggestedProducts.shampoo.name)}>{suggestedProducts.shampoo.name}</a></li>
                )}
                {suggestedProducts.treatment && (
                  <li><strong>🍪 חטיף:</strong> <a href={suggestedProducts.treatment.link} target="_blank" rel="noopener noreferrer" onClick={() => handleProductClick(suggestedProducts.treatment.name)}>{suggestedProducts.treatment.name}</a></li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
