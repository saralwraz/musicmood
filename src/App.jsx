import React, { useEffect, useState } from 'react';

const handleEditProfile = ({ name, avatar }) => {
  // Update user data directly in state
  setCurrentUser(prevUser => ({
    ...prevUser,
    name,
    avatar
  }));
  
  // Optionally save to localStorage to persist across refreshes
  localStorage.setItem('userData', JSON.stringify({ name, avatar }));
  
  // Close the modal
  setIsEditProfileModalOpen(false);
};

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  useEffect(() => {
    // Load saved user data on initial render
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      setCurrentUser(JSON.parse(savedUserData));
    }
  }, []);

  return (
    // Rest of the component code...
  );
};

export default App; 