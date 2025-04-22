import { useEffect, useState } from "react";
import { getPlansByPatient } from "../utils/api";
import { getToken } from "../utils/auth";

const TreatmentPlans = () => {
  const [treatmentPlans, setTreatmentPlans] = useState([]);
  const token = getToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPlansByPatient("<patient_id>", token);
        setTreatmentPlans(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Treatment Plans</h1>
      <div className="space-y-4">
        {treatmentPlans.map((plan) => (
          <div key={plan._id} className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold">{plan.diagnosis}</h2>
            <p>{plan.prescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreatmentPlans;