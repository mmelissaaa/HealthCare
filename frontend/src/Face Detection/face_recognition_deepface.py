from deepface import DeepFace
import cv2

# Dictionary to map image file paths to person names
face_names = {
    "images/meet.jpg": "Meet Kadam - Age 20 , Address - Santacruz West (Mumbai) , Phone no.8779790318",
    "images/aryav.jpg": "Aryav Jain - Age 20 , Address - Kandivali West (Mumbai) , Phone no.9321640061",
    "images/melissa.jpg": "Melissa Dsilva - Age 20 , Address - Mira Road  (Mumbai) , Phone no.8108200972",

}

# Load webcam
cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)  # Use DirectShow for Windows


while True:
    ret, frame = cap.read()
    
    try:
        result = DeepFace.find(frame, db_path="images/", model_name="Facenet")

        if len(result) > 0:
            matched_image_path = result[0]['identity'][0]  # Get image path from the database
            name = face_names.get(matched_image_path, "Unknown")  # Fetch name from dictionary
        else:
            name = "Unknown"
    except:
        name = "Unknown"

    # If a known face is detected, capture the frame, print name, and exit
    if name != "Unknown":
        cv2.imwrite("captured_face.jpg", frame)  # Save the captured image
        print(f"Recognized: {name}")  # Print name in console
        break  # Exit loop once a face is recognized

cap.release()
cv2.destroyAllWindows()
