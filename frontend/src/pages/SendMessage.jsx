import React, { useState, useEffect } from "react";
import axios from "axios";

const SendMessage = () => {
  const [formData, setFormData] = useState({
    receiverId: "", // Stores selected user ID
    content: "",
  });
  const [users, setUsers] = useState([]); // Stores list of users
  const [loading, setLoading] = useState(true); // Loading state
  const [userId, setUserId] = useState(null); // Stores logged-in user ID

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (!token || !userData) {
          alert("User not authenticated. Please log in.");
          return;
        }

        const loggedInUser = JSON.parse(userData);
        if (!loggedInUser._id) {
          alert("Invalid user data. Please log in again.");
          return;
        }

        setUserId(loggedInUser._id); // Set sender ID

        const response = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(response.data); // Store users in state
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (e) => {
    const selectedUserId = e.target.value;
    setFormData({ ...formData, receiverId: selectedUserId }); // Set selected receiverId
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.receiverId) {
      alert("Please select a user to send a message.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token || !userId) {
        alert("User not authenticated. Please log in.");
        return;
      }

      const messageData = {
        senderId: userId, // Automatically set senderId
        receiverId: formData.receiverId,
        content: formData.content,
      };

      console.log("Sending message:", messageData);

      const response = await axios.post(
        "http://localhost:5000/api/messages",
        messageData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Message sent successfully!");
      console.log(response.data);

      // Reset form after successful submission
      setFormData({
        receiverId: "",
        content: "",
      });
    } catch (error) {
      console.error("Failed to send message", error);
      alert("Failed to send message");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Send Message</h1>
      <form onSubmit={handleSubmit}>
        {/* Receiver Dropdown */}
        <div>
          <label>Receiver:</label>
          <select name="receiverId" value={formData.receiverId} onChange={handleUserSelect} required>
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.role})
              </option>
            ))}
          </select>
        </div>

        {/* Message Content Field */}
        <div>
          <label>Message:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Enter your message"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default SendMessage;
