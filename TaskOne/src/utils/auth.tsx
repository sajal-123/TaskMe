export const isAuthenticated = () => {
    // Replace this logic with your actual authentication check
    return localStorage.getItem("authToken") !== null;
  };
  