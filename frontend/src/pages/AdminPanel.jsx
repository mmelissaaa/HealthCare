import { useEffect, useState } from "react";
import { getAllUsers } from "../utils/api";
import { getToken } from "../utils/auth";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const token = getToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUsers(token);
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user._id} className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;