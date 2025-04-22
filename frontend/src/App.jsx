import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientProfile from "./pages/PatientProfile";
import DoctorProfile from "./pages/DoctorProfile";
import CaregiverProfile from "./pages/CaregiverProfile";
import MedicalRecordsList from "./pages/MedicalRecordsList";
import AddMedicalRecord from "./pages/AddMedicalRecord";
import TreatmentPlans from "./pages/TreatmentPlans";
import Appointments from "./pages/Appointments";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import AdminPanel from "./pages/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import CreateTreatmentPlan from "./pages/CreateTreatmentPlan";
import ViewTreatmentPlans from "./pages/ViewTreatmentPlans";
import AdminCreateAppointment from "./pages/AdminCreateAppointment";
import SendMessage from "./pages/SendMessage";
import CreateChange from "./pages/CreateChange";
import ViewChanges from "./pages/ViewChanges";
import Diagnosis from "./python/Diagnosis";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>
          <Route path="/patient-profile" element={<PatientProfile />} />
          <Route path="/medical-records/:patientId" element={<MedicalRecordsList />} />
          <Route path="/diagnosis" element={<Diagnosis />} />

          <Route
          path="/view-treatment-plans/:patientId"
          element={<ViewTreatmentPlans />}
        />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
          <Route path="/doctor-profile" element={<DoctorProfile />} />
          <Route path="/add-medical-record" element={<AddMedicalRecord />} />
          <Route path="/treatment-plans" element={<TreatmentPlans />} />
          <Route path="/create-app" element={<AdminCreateAppointment />} />

        </Route>

        <Route element={<ProtectedRoute allowedRoles={["caregiver"]} />}>
          <Route path="/caregiver-profile" element={<CaregiverProfile />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["patient", "doctor", "caregiver"]} />}>
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/view-changes" element={<ViewChanges />} />
          <Route path="/notifications" element={<Notifications />} />
          {/* <Route path="/send-message" element={<SendMessage />} /> */}
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/create-treatment-plan" element={<CreateTreatmentPlan />} />
          <Route path="/create-change" element={<CreateChange />} />

        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
