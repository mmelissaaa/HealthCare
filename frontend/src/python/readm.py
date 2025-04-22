from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)  # 👈 This allows all origins (fixes CORS issue)

# Load the saved model
model = joblib.load(r"C:\coding\react\hackjklu\ocr\src\readmission_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        patient_df = pd.DataFrame([data])  # Convert input to DataFrame
        probability = model.predict_proba(patient_df)[:, 1][0]  # Get probability
        return jsonify({"probability": probability})  # Return JSON response
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True, port=5000)
