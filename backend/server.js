const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/users.routes"));
app.use("/api/patients", require("./routes/patients.routes"));
app.use("/api/doctors", require("./routes/doctors.routes"));
app.use("/api/caregivers", require("./routes/caregivers.routes"));
app.use("/api/medical-records", require("./routes/medical-records.routes"));
app.use("/api/treatment-plans", require("./routes/treatment-plans.routes"));
app.use("/api/appointments", require("./routes/appointments.routes"));
app.use("/api/messages", require("./routes/messages.routes"));
app.use("/api/notifications", require("./routes/notifications.routes"));
app.use("/api/hospital-changes", require("./routes/hospital-changes.routes"));

// Error handling middleware
app.use(require("./middleware/error.middleware"));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));