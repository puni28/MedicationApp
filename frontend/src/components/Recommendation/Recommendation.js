import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Swal from 'sweetalert2';

function Recommendation() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [recommendation, setRecommendation] = useState(null);

// Transform symptoms_dict into options for react-select
const options = [
    { value: 'itching', label: 'Itching' },
    { value: 'skin_rash', label: 'Skin Rash' },
    { value: 'nodal_skin_eruptions', label: 'Nodal Skin Eruptions' },
    { value: 'continuous_sneezing', label: 'Continuous Sneezing' },
    { value: 'shivering', label: 'Shivering' },
    { value: 'chills', label: 'Chills' },
    { value: 'joint_pain', label: 'Joint Pain' },
    { value: 'stomach_pain', label: 'Stomach Pain' },
    { value: 'acidity', label: 'Acidity' },
    { value: 'ulcers_on_tongue', label: 'Ulcers On Tongue' },
    { value: 'muscle_wasting', label: 'Muscle Wasting' },
    { value: 'vomiting', label: 'Vomiting' },
    { value: 'burning_micturition', label: 'Burning Micturition' },
    { value: 'spotting_urination', label: 'Spotting Urination' },
    { value: 'fatigue', label: 'Fatigue' },
    { value: 'weight_gain', label: 'Weight Gain' },
    { value: 'anxiety', label: 'Anxiety' },
    { value: 'cold_hands_and_feets', label: 'Cold Hands And Feets' },
    { value: 'mood_swings', label: 'Mood Swings' },
    { value: 'weight_loss', label: 'Weight Loss' },
    { value: 'restlessness', label: 'Restlessness' },
    { value: 'lethargy', label: 'Lethargy' },
    { value: 'patches_in_throat', label: 'Patches In Throat' },
    { value: 'irregular_sugar_level', label: 'Irregular Sugar Level' },
    { value: 'cough', label: 'Cough' },
    { value: 'high_fever', label: 'High Fever' },
    { value: 'sunken_eyes', label: 'Sunken Eyes' },
    { value: 'breathlessness', label: 'Breathlessness' },
    { value: 'sweating', label: 'Sweating' },
    { value: 'dehydration', label: 'Dehydration' },
    { value: 'indigestion', label: 'Indigestion' },
    { value: 'headache', label: 'Headache' },
    { value: 'yellowish_skin', label: 'Yellowish Skin' },
    { value: 'dark_urine', label: 'Dark Urine' },
    { value: 'nausea', label: 'Nausea' },
    { value: 'loss_of_appetite', label: 'Loss Of Appetite' },
    { value: 'pain_behind_the_eyes', label: 'Pain Behind The Eyes' },
    { value: 'back_pain', label: 'Back Pain' },
    { value: 'constipation', label: 'Constipation' },
    { value: 'abdominal_pain', label: 'Abdominal Pain' },
    { value: 'diarrhoea', label: 'Diarrhoea' },
    { value: 'mild_fever', label: 'Mild Fever' },
    { value: 'yellow_urine', label: 'Yellow Urine' },
    { value: 'yellowing_of_eyes', label: 'Yellowing Of Eyes' },
    { value: 'acute_liver_failure', label: 'Acute Liver Failure' },
    { value: 'fluid_overload', label: 'Fluid Overload' },
    { value: 'swelling_of_stomach', label: 'Swelling Of Stomach' },
    { value: 'swelled_lymph_nodes', label: 'Swelled Lymph Nodes' },
    { value: 'malaise', label: 'Malaise' },
    { value: 'blurred_and_distorted_vision', label: 'Blurred And Distorted Vision' },
    { value: 'phlegm', label: 'Phlegm' },
    { value: 'throat_irritation', label: 'Throat Irritation' },
    { value: 'redness_of_eyes', label: 'Redness Of Eyes' },
    { value: 'sinus_pressure', label: 'Sinus Pressure' },
    { value: 'runny_nose', label: 'Runny Nose' },
    { value: 'congestion', label: 'Congestion' },
    { value: 'chest_pain', label: 'Chest Pain' },
    { value: 'weakness_in_limbs', label: 'Weakness In Limbs' },
    { value: 'fast_heart_rate', label: 'Fast Heart Rate' },
    { value: 'pain_during_bowel_movements', label: 'Pain During Bowel Movements' },
    { value: 'pain_in_anal_region', label: 'Pain In Anal Region' },
    { value: 'bloody_stool', label: 'Bloody Stool' },
    { value: 'irritation_in_anus', label: 'Irritation In Anus' },
    { value: 'neck_pain', label: 'Neck Pain' },
    { value: 'dizziness', label: 'Dizziness' },
    { value: 'cramps', label: 'Cramps' },
    { value: 'bruising', label: 'Bruising' },
    { value: 'obesity', label: 'Obesity' },
    { value: 'swollen_legs', label: 'Swollen Legs' },
    { value: 'swollen_blood_vessels', label: 'Swollen Blood Vessels' },
    { value: 'puffy_face_and_eyes', label: 'Puffy Face And Eyes' },
    { value: 'enlarged_thyroid', label: 'Enlarged Thyroid' },
    { value: 'brittle_nails', label: 'Brittle Nails' },
    { value: 'swollen_extremeties', label: 'Swollen Extremeties' },
    { value: 'excessive_hunger', label: 'Excessive Hunger' },
    { value: 'extra_marital_contacts', label: 'Extra Marital Contacts' },
    { value: 'drying_and_tingling_lips', label: 'Drying And Tingling Lips' },
    { value: 'slurred_speech', label: 'Slurred Speech' },
    { value: 'knee_pain', label: 'Knee Pain' },
    { value: 'hip_joint_pain', label: 'Hip Joint Pain' },
    { value: 'muscle_weakness', label: 'Muscle Weakness' },
    { value: 'stiff_neck', label: 'Stiff Neck' },
    { value: 'swelling_joints', label: 'Swelling Joints' },
    { value: 'movement_stiffness', label: 'Movement Stiffness' },
    { value: 'spinning_movements', label: 'Spinning Movements' },
    { value: 'loss_of_balance', label: 'Loss Of Balance' },
    { value: 'unsteadiness', label: 'Unsteadiness' },
    { value: 'weakness_of_one_body_side', label: 'Weakness Of One Body Side' },
    { value: 'loss_of_smell', label: 'Loss Of Smell' },
    { value: 'bladder_discomfort', label: 'Bladder Discomfort' },
    { value: 'foul_smell_of_urine', label: 'Foul Smell Of Urine' },
    { value: 'continuous_feel_of_urine', label: 'Continuous Feel Of Urine' },
    { value: 'passage_of_gases', label: 'Passage Of Gases' },
    { value: 'internal_itching', label: 'Internal Itching' },
    { value: 'toxic_look_(typhos)', label: 'Toxic Look (Typhos)' },
    { value: 'depression', label: 'Depression' },
    { value: 'irritability', label: 'Irritability' },
    { value: 'muscle_pain', label: 'Muscle Pain' },
    { value: 'altered_sensorium', label: 'Altered Sensorium' },
    { value: 'red_spots_over_body', label: 'Red Spots Over Body' },
    { value: 'belly_pain', label: 'Belly Pain' },
    { value: 'abnormal_menstruation', label: 'Abnormal Menstruation' },
    { value: 'dischromic_patches', label: 'Dischromic Patches' },
    { value: 'watering_from_eyes', label: 'Watering From Eyes' },
    { value: 'increased_appetite', label: 'Increased Appetite' },
    { value: 'polyuria', label: 'Polyuria' },
    { value: 'family_history', label: 'Family History' },
    { value: 'mucoid_sputum', label: 'Mucoid Sputum' },
    { value: 'rusty_sputum', label: 'Rusty Sputum' },
    { value: 'lack_of_concentration', label: 'Lack Of Concentration' },
    { value: 'visual_disturbances', label: 'Visual Disturbances' },
    { value: 'receiving_blood_transfusion', label: 'Receiving Blood Transfusion' },
    { value: 'receiving_unsterile_injections', label: 'Receiving Unsterile Injections' },
    { value: 'coma', label: 'Coma' },
    { value: 'stomach_bleeding', label: 'Stomach Bleeding' },
    { value: 'distention_of_abdomen', label: 'Distention Of Abdomen' },
    { value: 'history_of_alcohol_consumption', label: 'History Of Alcohol Consumption' },
    { value: 'fluid_overload.1', label: 'Fluid Overload' },
    { value: 'blood_in_sputum', label: 'Blood In Sputum' },
    { value: 'prominent_veins_on_calf', label: 'Prominent Veins On Calf' },
    { value: 'palpitations', label: 'Palpitations' },
    { value: 'painful_walking', label: 'Painful Walking' },
    { value: 'pus_filled_pimples', label: 'Pus Filled Pimples' },
    { value: 'blackheads', label: 'Blackheads' },
    { value: 'scurring', label: 'Scurring' },
    { value: 'skin_peeling', label: 'Skin Peeling' },
    { value: 'silver_like_dusting', label: 'Silver Like Dusting' },
    { value: 'small_dents_in_nails', label: 'Small Dents In Nails' },
    { value: 'inflammatory_nails', label: 'Inflammatory Nails' },
    { value: 'blister', label: 'Blister' },
    { value: 'red_sore_around_nose', label: 'Red Sore Around Nose' },
    { value: 'yellow_crust_ooze', label: 'Yellow Crust Ooze' }
  ];
  
  const handleSymptomChange = (selectedOptions) => {
    const value = selectedOptions.map(option => option.value);
    setSelectedSymptoms(value);
  };

  const handleSubmit = async () => {
    // Check if any symptoms are selected
    if (selectedSymptoms.length === 0) {
        // Show SweetAlert message
        Swal.fire({
            icon: 'warning',
            title: 'No Symptoms Selected',
            text: 'Please select at least one symptom before submitting.',
        });
        return; // Exit the function if no symptoms are selected
    }
    
    try {
        const response = await axios.post('http://127.0.0.1:5000/predict-react', { symptoms: selectedSymptoms });
        try{
            response.status === 200 || response.status === 500 ? setRecommendation(response.data) : Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was an error fetching the recommendation. Please try again later.',
            });
        } catch (error) {
            console.error("Error fetching recommendation:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was an error fetching the recommendation. Please try again later.',
            });
        }

    } catch (error) {
        console.error("Error fetching recommendation:", error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'There was an error fetching the recommendation. Please try again later.',
        });
    }
};

  return (
    <div className="container mt-4">
      <h2 className="text-center">Medication Recommendation</h2>
      <div className="form-group">
        <Select
          placeholder="Select symptoms..."
          isMulti
          options={options}
          className="form-control"
          onChange={handleSymptomChange}
        />
      </div>
      <button className="btn btn-primary btn-block" onClick={handleSubmit}>Get Recommendation</button>

      {recommendation && (
        <div className="mt-4">
          <div className="card mb-3" style={{ backgroundColor: '#f8d7da' }}>
            <div className="card-body">
              <h3 className="card-title">Predicted Disease: {recommendation.predicted_disease}</h3>
              <p className="card-text"><strong>Description:</strong> {recommendation.description}</p>
            </div>
          </div>
          <div className="card mb-3" style={{ backgroundColor: '#d4edda' }}>
            <div className="card-body">
              <h4 className="card-title">Diet</h4>
              <ul>
                {recommendation.diet.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="card mb-3" style={{ backgroundColor: '#cce5ff' }}>
            <div className="card-body">
              <h4 className="card-title">Medications</h4>
              <ul>
                {recommendation.medications.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="card mb-3" style={{ backgroundColor: '#fff3cd' }}>
            <div className="card-body">
              <h4 className="card-title">Precautions</h4>
              <ul>
                {recommendation.precautions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="card mb-3" style={{ backgroundColor: '#e2e3e5' }}>
            <div className="card-body">
              <h4 className="card-title">Workout</h4>
              <ul>
                {recommendation.workout.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recommendation;