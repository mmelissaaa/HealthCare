import { useEffect, useState } from "react";
import { getNotificationsByUser } from "../utils/api";
import { getToken, getUserId } from "../utils/auth"; // Import getUserId

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const token = getToken();
  const userId = getUserId(); // Get the user ID from the token

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNotificationsByUser(userId, token); // Pass the correct user ID
        setNotifications(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [token, userId]); // Add userId to dependency array

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification._id} className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold">{notification.message}</h2>
            <p>{notification.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;