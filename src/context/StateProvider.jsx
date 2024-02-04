// StateProvider.js
"use client";
import { createContext, useState } from "react";

export const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: "",
    profile_picture: null,
    phone_number: "",
    description: "",
    birthdate: null,
    joining_date: null,
    active_status: false,
  });

  const [allUsers, setAllUsers] = useState([]);

  fetch("https://tasks.vitasoftsolutions.com/userdata")
    .then((res) => res.json())
    .then((data) => setAllUsers(data));

  return (
    <StateContext.Provider
      value={{ formData, setFormData, allUsers, setAllUsers }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
