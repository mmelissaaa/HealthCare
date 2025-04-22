import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import numpy as np

def load_and_preprocess_data():
    # Load dataset
    df = pd.read_csv(r'C:\Users\Aryav Jain\Desktop\Hackathon\jklu comeback\healthcare\src\python\symptoms.csv')
    
    # Encode categorical variables
    label_encoders = {}
    for col in ['Fever', 'Cough', 'Fatigue', 'Difficulty Breathing', 'Gender', 'Blood Pressure', 'Cholesterol Level', 'Outcome Variable']:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        label_encoders[col] = le
    
    # Define features and target
    X = df[['Fever', 'Cough', 'Fatigue', 'Difficulty Breathing', 'Age', 'Gender', 'Blood Pressure', 'Cholesterol Level']]
    y = df['Disease']
    
    # Encode target labels
    le_disease = LabelEncoder()
    y = le_disease.fit_transform(y)
    label_encoders['Disease'] = le_disease
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    return X_train, X_test, y_train, y_test, label_encoders, le_disease

def train_model(X_train, y_train):
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    return model

def predict_disease(model, label_encoders, le_disease):
    # Take user input
    symptoms = {}
    symptoms['Fever'] = input("Do you have fever? (Yes/No): ")
    symptoms['Cough'] = input("Do you have cough? (Yes/No): ")
    symptoms['Fatigue'] = input("Do you feel fatigued? (Yes/No): ")
    symptoms['Difficulty Breathing'] = input("Do you have difficulty breathing? (Yes/No): ")
    symptoms['Age'] = int(input("Enter your age: "))
    symptoms['Gender'] = input("Enter your gender (Male/Female): ")
    symptoms['Blood Pressure'] = input("Enter your blood pressure (Low/Normal/High): ")
    symptoms['Cholesterol Level'] = input("Enter your cholesterol level (Low/Normal/High): ")
    
    # Encode input
    input_data = []
    for col, val in symptoms.items():
        if col in label_encoders:
            input_data.append(label_encoders[col].transform([val])[0])
        else:
            input_data.append(val)
    
    # Convert to numpy array
    input_data = pd.DataFrame([input_data], columns=X_train.columns)

    
    # Predict
    prediction = model.predict(input_data)
    predicted_disease = le_disease.inverse_transform(prediction)[0]
    
    print(f"Predicted Disease: {predicted_disease}")

if __name__ == "__main__":
    X_train, X_test, y_train, y_test, label_encoders, le_disease = load_and_preprocess_data()
    model = train_model(X_train, y_train)
    predict_disease(model, label_encoders, le_disease)
