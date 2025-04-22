// auth.js

// Get the token from localStorage
export const getToken = () => {
    return localStorage.getItem("token");
  };
  
  // Check if the user is authenticated
  export const isAuthenticated = () => {
    return !!getToken();
  };
  
  // Get the user's role from the token
  export const getUserRole = () => {
    const token = getToken();
    if (!token) return null;
  
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    return decodedToken.user.role;
  };
  
  // Login function
  export const login = (token) => {
    localStorage.setItem("token", token);
  };
  
  // Logout function
  export const logout = () => {
    localStorage.removeItem("token");
  };
  export const getUserId = () => {
    const token = getToken();
    if (!token) return null;
  
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    return decodedToken.user.id; // Assuming the token contains the user ID
  };