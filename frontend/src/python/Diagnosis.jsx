import React, { useState } from 'react';
import { AlertCircle, Check, Activity, Award } from 'lucide-react';

// Main Healthcare Diagnosis App
const Diagnosis = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    fever: '',
    cough: '',
    fatigue: '',
    difficultyBreathing: '',
    age: '',
    gender: '',
    bloodPressure: '',
    cholesterolLevel: ''
  });

  // State for diagnosis results
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to the backend model
    setTimeout(() => {
      // Mock prediction based on symptoms
      const predictions = {
        'Common Cold': calculateCommonColdProbability(),
        'Influenza': calculateInfluenzaProbability(),
        'COVID-19': calculateCovidProbability(),
        'Asthma': calculateAsthmaProbability(),
        'Hypertension': calculateHypertensionProbability(),
        'Hypercholesterolemia': calculateCholesterolProbability()
      };
      
      // Find the disease with highest probability
      const predictedDisease = Object.entries(predictions).reduce(
        (max, [disease, prob]) => prob > max[1] ? [disease, prob] : max, 
        ['Unknown', 0]
      );
      
      setDiagnosisResult(predictedDisease[0]);
      setConfidence(Math.round(predictedDisease[1] * 100));
      setLoading(false);
    }, 1500);
  };

  // Reset the form and results
  const handleReset = () => {
    setFormData({
      fever: '',
      cough: '',
      fatigue: '',
      difficultyBreathing: '',
      age: '',
      gender: '',
      bloodPressure: '',
      cholesterolLevel: ''
    });
    setDiagnosisResult(null);
    setConfidence(0);
    setShowDetails(false);
  };

  // Calculate probabilities based on symptoms (simplified mock logic)
  const calculateCommonColdProbability = () => {
    let probability = 0.1;
    if (formData.fever === 'Yes') probability += 0.2;
    if (formData.cough === 'Yes') probability += 0.3;
    if (formData.fatigue === 'Yes') probability += 0.1;
    if (formData.difficultyBreathing === 'No') probability += 0.1;
    return Math.min(probability, 0.9);
  };

  const calculateInfluenzaProbability = () => {
    let probability = 0.1;
    if (formData.fever === 'Yes') probability += 0.3;
    if (formData.cough === 'Yes') probability += 0.2;
    if (formData.fatigue === 'Yes') probability += 0.3;
    return Math.min(probability, 0.9);
  };

  const calculateCovidProbability = () => {
    let probability = 0.05;
    if (formData.fever === 'Yes') probability += 0.2;
    if (formData.cough === 'Yes') probability += 0.2;
    if (formData.difficultyBreathing === 'Yes') probability += 0.3;
    if (formData.fatigue === 'Yes') probability += 0.1;
    return Math.min(probability, 0.9);
  };

  const calculateAsthmaProbability = () => {
    let probability = 0.05;
    if (formData.difficultyBreathing === 'Yes') probability += 0.5;
    if (formData.cough === 'Yes') probability += 0.1;
    return Math.min(probability, 0.9);
  };

  const calculateHypertensionProbability = () => {
    let probability = 0.05;
    if (formData.bloodPressure === 'High') probability += 0.5;
    if (parseInt(formData.age) > 50) probability += 0.2;
    return Math.min(probability, 0.9);
  };

  const calculateCholesterolProbability = () => {
    let probability = 0.05;
    if (formData.cholesterolLevel === 'High') probability += 0.5;
    if (parseInt(formData.age) > 45) probability += 0.1;
    return Math.min(probability, 0.9);
  };

  // Get recommendation based on diagnosis
  const getRecommendation = () => {
    switch (diagnosisResult) {
      case 'Common Cold':
        return "Rest, stay hydrated, and take over-the-counter cold medications as needed. If symptoms persist for more than a week, consult a doctor.";
      case 'Influenza':
        return "Rest, stay hydrated, and take fever-reducing medications. Consider antiviral medications if diagnosed within 48 hours. Consult a doctor if symptoms are severe.";
      case 'COVID-19':
        return "Isolate yourself, monitor symptoms, and seek medical attention if you have trouble breathing. Follow local health guidelines for testing and treatment.";
      case 'Asthma':
        return "Use prescribed inhalers as directed. Avoid triggers and maintain regular check-ups with your doctor to monitor your condition.";
      case 'Hypertension':
        return "Monitor your blood pressure regularly, maintain a healthy diet low in sodium, exercise regularly, and take prescribed medications as directed.";
      case 'Hypercholesterolemia':
        return "Follow a heart-healthy diet low in saturated fats, exercise regularly, maintain a healthy weight, and take prescribed medications as directed.";
      default:
        return "Please consult with a healthcare professional for a proper diagnosis and treatment plan.";
    }
  };

  // Get severity level based on diagnosis and symptoms
  const getSeverityLevel = () => {
    if (
      (diagnosisResult === 'COVID-19' && formData.difficultyBreathing === 'Yes') ||
      (diagnosisResult === 'Asthma' && formData.difficultyBreathing === 'Yes')
    ) {
      return 'High';
    } else if (
      (diagnosisResult === 'Influenza' && formData.fever === 'Yes') ||
      (diagnosisResult === 'Hypertension' && formData.bloodPressure === 'High')
    ) {
      return 'Medium';
    } else {
      return 'Low';
    }
  };

  // Get color based on severity
  const getSeverityColor = () => {
    const severity = getSeverityLevel();
    return {
      'High': 'text-red-600',
      'Medium': 'text-yellow-600',
      'Low': 'text-green-600'
    }[severity];
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7f8]">
      <header className="bg-[#0e3b43] text-white p-6 shadow-md">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Activity className="w-8 h-8 mr-3" />
              <h1 className="text-2xl font-bold">Healthcare Diagnosis System</h1>
            </div>
            <p className="text-sm hidden md:block">AI-powered symptom analysis and disease prediction</p>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto flex flex-col md:flex-row p-4 gap-6 flex-grow">
        <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-[#1e3a4a]">Enter Your Symptoms</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Yes/No Questions */}
              <div>
                <label className="block text-sm font-medium text-[#1e3a4a] mb-1">Do you have fever?</label>
                <select 
                  name="fever" 
                  value={formData.fever} 
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157f86]"
                  required
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#1e3a4a] mb-1">Do you have cough?</label>
                <select 
                  name="cough" 
                  value={formData.cough} 
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157f86]"
                  required
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#1e3a4a] mb-1">Do you feel fatigued?</label>
                <select 
                  name="fatigue" 
                  value={formData.fatigue} 
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157f86]"
                  required
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#1e3a4a] mb-1">Difficulty breathing?</label>
                <select 
                  name="difficultyBreathing" 
                  value={formData.difficultyBreathing} 
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157f86]"
                  required
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              
              {/* Age and Gender */}
              <div>
                <label className="block text-sm font-medium text-[#1e3a4a] mb-1">Age</label>
                <input 
                  type="number" 
                  name="age" 
                  value={formData.age} 
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157f86]"
                  required
                  min="1"
                  max="120"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#1e3a4a] mb-1">Gender</label>
                <select 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157f86]"
                  required
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              {/* Blood Pressure and Cholesterol */}
              <div>
                <label className="block text-sm font-medium text-[#1e3a4a] mb-1">Blood Pressure</label>
                <select 
                  name="bloodPressure" 
                  value={formData.bloodPressure} 
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157f86]"
                  required
                >
                  <option value="">Select</option>
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#1e3a4a] mb-1">Cholesterol Level</label>
                <select 
                  name="cholesterolLevel" 
                  value={formData.cholesterolLevel} 
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#157f86]"
                  required
                >
                  <option value="">Select</option>
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button 
                type="button" 
                onClick={handleReset}
                className="px-4 py-2 bg-gray-100 text-[#1e3a4a] rounded-md hover:bg-gray-200 transition-colors"
              >
                Reset
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-[#115e63] text-white rounded-md hover:bg-[#0e3b43] transition-colors"
                disabled={loading}
              >
                {loading ? 'Analyzing...' : 'Get Diagnosis'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-sm text-[#1e3a4a]">
            <p className="mb-2"><strong>Note:</strong> This diagnostic tool is for informational purposes only and is not a substitute for professional medical advice.</p>
            <p>Always consult with a qualified healthcare provider for proper diagnosis and treatment.</p>
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          {loading ? (
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center h-full">
              <div className="w-16 h-16 border-4 border-[#115e63] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-lg text-[#1e3a4a]">Analyzing your symptoms...</p>
              <p className="text-sm text-[#1e3a4a] mt-2">This may take a moment</p>
            </div>
          ) : diagnosisResult ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-[#0e3b43] p-4">
                <h2 className="text-xl font-bold text-white">Diagnosis Results</h2>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-[#1e3a4a] mb-1">Predicted Condition</p>
                    <h3 className="text-2xl font-bold text-[#1e3a4a]">{diagnosisResult}</h3>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-[#157f86] rounded-full p-3">
                      <AlertCircle className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between mb-6">
                  <div className="w-1/2 pr-2">
                    <p className="text-sm text-[#1e3a4a] mb-1">Confidence</p>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div 
                          className="bg-[#115e63] h-2.5 rounded-full" 
                          style={{ width: `${confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-[#1e3a4a]">{confidence}%</span>
                    </div>
                  </div>
                  
                  <div className="w-1/2 pl-2">
                    <p className="text-sm text-[#1e3a4a] mb-1">Severity</p>
                    <p className={`font-bold ${getSeverityColor()}`}>{getSeverityLevel()}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-md font-semibold mb-2 flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-1" />
                    Recommendations
                  </h4>
                  <p className="text-[#1e3a4a]">{getRecommendation()}</p>
                </div>
                
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-[#115e63] hover:text-[#0e3b43] text-sm font-medium flex items-center"
                >
                  {showDetails ? 'Hide details' : 'Show details'}
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 transition-transform ${showDetails ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showDetails && (
                  <div className="mt-4 p-4 bg-[#f5f7f8] rounded-md">
                    <h4 className="text-md font-semibold mb-2">Symptoms Analysis</h4>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-[#1e3a4a]">Fever:</span>
                        <span className="font-medium">{formData.fever}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-[#1e3a4a]">Cough:</span>
                        <span className="font-medium">{formData.cough}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-[#1e3a4a]">Fatigue:</span>
                        <span className="font-medium">{formData.fatigue}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-[#1e3a4a]">Difficulty Breathing:</span>
                        <span className="font-medium">{formData.difficultyBreathing}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-[#1e3a4a]">Age:</span>
                        <span className="font-medium">{formData.age}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-[#1e3a4a]">Blood Pressure:</span>
                        <span className="font-medium">{formData.bloodPressure}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-[#1e3a4a]">Cholesterol:</span>
                        <span className="font-medium">{formData.cholesterolLevel}</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="bg-[#f5f7f8] p-4 border-t border-[#157f86]">
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-[#115e63] mr-2" />
                  <p className="text-sm text-[#1e3a4a]">
                    <strong>Important:</strong> This is an AI prediction. Please consult with a healthcare professional for accurate diagnosis.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col items-center justify-center text-center">
              <Activity className="w-16 h-16 text-[#115e63] mb-4" />
              <h3 className="text-xl font-semibold text-[#1e3a4a] mb-2">Healthcare Diagnosis System</h3>
              <p className="text-[#1e3a4a] mb-4">Fill out the symptom form to receive an AI-powered diagnosis prediction.</p>
              <div className="bg-[#f5f7f8] p-4 rounded-md w-full">
                <h4 className="text-md font-semibold text-[#115e63] mb-2">How it works:</h4>
                <ol className="text-left text-sm text-[#1e3a4a] space-y-2 pl-5 list-decimal">
                  <li>Enter your symptoms and health information</li>
                  <li>Our AI analyzes the data to predict potential conditions</li>
                  <li>Review your results and recommendations</li>
                  <li>Consult with a healthcare professional for confirmation</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-[#0e3b43] text-white text-center p-4 mt-8">
        <p className="text-sm">&copy; 2025 Healthcare Diagnosis System | AI-Powered Medical Analysis</p>
        <p className="text-xs text-[#157f86] mt-1">For informational purposes only. Not a substitute for professional medical advice.</p>
      </footer>
    </div>
  );
};

export default Diagnosis;