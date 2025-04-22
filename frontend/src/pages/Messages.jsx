import { useEffect, useState } from "react";
import { getMessagesByUser } from "../utils/api";
import { getToken, getUserId } from "../utils/auth"; // Import getUserId

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const token = getToken();
  const userId = getUserId(); // Get the user ID from the token

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMessagesByUser(userId, token); // Pass the correct user ID
        setMessages(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [token, userId]); // Add userId to dependency array

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message._id} className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold">{message.content}</h2>
            <p>{new Date(message.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;