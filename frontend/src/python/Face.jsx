// App.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Face.css';

const Face = () => {
  const [scanning, setScanning] = useState(false);
  const [personDetected, setPersonDetected] = useState(false);
  const [personData, setPersonData] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Sample user data that matches your backend
  const sampleUsers = [
    {
      id: 1,
      name: "Meet Kadam",
      age: 20,
      address: "Santacruz West (Mumbai)",
      phone: "8779790318",
      initials: "MK",
      status: "Active"
    },
    {
      id: 2,
      name: "Aryav Jain",
      age: 20,
      address: "Kandivali West (Mumbai)",
      phone: "9321640061",
      initials: "AJ",
      status: "Active"
    },
    {
      id: 3,
      name: "Melissa Dsilva",
      age: 20,
      address: "Mira Road (Mumbai)",
      phone: "8108200972",
      initials: "MD",
      status: "Active"
    }
  ];

  // Start the webcam when scanning begins
  useEffect(() => {
    if (scanning) {
      startWebcam();
      
      // Simulate a face detection after 3 seconds (for demo purposes)
      const timer = setTimeout(() => {
        const randomUser = sampleUsers[Math.floor(Math.random() * sampleUsers.length)];
        setPersonData(randomUser);
        setPersonDetected(true);
        setScanning(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    } else {
      stopWebcam();
    }
  }, [scanning]);

  const startWebcam = async () => {
    try {
      const constraints = { video: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const startScan = () => {
    setScanning(true);
    setPersonDetected(false);
  };

  const resetScan = () => {
    setScanning(false);
    setPersonDetected(false);
    setPersonData(null);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="container header-content">
          <div className="logo">Secure<span className="logo-accent">Scan</span></div>
          <nav>
            <ul className="nav-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="container">
        <div className="main-content">
          <div className="left-panel">
            <h1>Face Recognition System</h1>
            <p>
              Welcome to SecureScan, an advanced facial recognition system designed for
              seamless identity verification. Our system uses DeepFace technology to
              accurately identify authorized individuals in real-time.
            </p>
            <p>
              Simply position your face in the camera frame and the system will
              automatically detect and verify your identity against our secure database.
            </p>
            <div className="controls">
              <button
                className="button primary-button"
                onClick={startScan}
                disabled={scanning}
              >
                {scanning ? "Scanning..." : "Start Scan"}
              </button>
              <button className="button secondary-button" onClick={resetScan}>
                Reset
              </button>
            </div>
          </div>
          
          <div className="right-panel">
            <h2>Camera Feed</h2>
            <div className="webcam-container">
              {scanning ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="webcam-video"
                ></video>
              ) : (
                <div className="webcam-placeholder">
                  {personDetected ? "Face recognized!" : "Camera feed will appear here..."}
                </div>
              )}
            </div>
            <p>Position your face clearly in the frame for the best recognition results.</p>
            
            {personDetected && personData && (
              <div className="result-card">
                <h2>Identity Verified</h2>
                <div className="person-info">
                  <div className="person-avatar">{personData.initials}</div>
                  <div className="person-details">
                    <h3>{personData.name}</h3>
                    <div>
                      <span className="badge primary-badge">Authorized</span>
                      <span className="badge secondary-badge">Resident</span>
                    </div>
                  </div>
                </div>
                
                <div className="info-grid">
                  <div className="info-row">
                    <span className="info-label">Age:</span>
                    <span>{personData.age} years</span>
                  </div>
                  
                  <div className="info-row">
                    <span className="info-label">Address:</span>
                    <span>{personData.address}</span>
                  </div>
                  
                  <div className="info-row">
                    <span className="info-label">Phone:</span>
                    <span>{personData.phone}</span>
                  </div>
                  
                  <div className="info-row">
                    <span className="info-label">Status:</span>
                    <span>
                      <span className="status-indicator"></span> {personData.status}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-column">
            <h3>About SecureScan</h3>
            <p>
              SecureScan provides cutting-edge facial recognition technology for
              security and identity verification applications.
            </p>
          </div>
          
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Contact Us</h3>
            <ul className="footer-links">
              <li><a href="#">Email: info@securescan.com</a></li>
              <li><a href="#">Phone: +1 (555) 123-4567</a></li>
              <li><a href="#">Address: 123 Tech Street, Mumbai, India</a></li>
            </ul>
          </div>
        </div>
        
        <div className="container copyright">
          <p>&copy; {new Date().getFullYear()} SecureScan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Face;