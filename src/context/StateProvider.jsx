// StateProvider.js
"use client";
import { createContext, useState } from 'react';

export const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: '',
    profile_picture: null,
    phone_number: "",
    description: '',
    birthdate: null,
    joining_date: null,
    active_status: false,
  });


  return (
    <StateContext.Provider value={{ formData, setFormData }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
