"use client";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
// import CKEditor from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { StateContext } from "@/context/StateProvider";

const image_hosting_api = `https://api.imgbb.com/1/upload?key=7b220630460d3376a065265f6edfd433`;

const EditForm = () => {
  const { formData, setFormData } = useContext(StateContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [birthDate, setBirthDate] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  useEffect(() => {
    // Fetch user data from API and populate the form fields
    // Example:
    // axios.get('/api/user') // Replace with your API endpoint
    //   .then(response => {
    //     const userData = response.data;
    //     setFormData(userData);
    //     setBirthDate(new Date(userData.birthDate));
    //     setProfileImageUrl(userData.profilePicture);
    //   })
    //   .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const handleFileUpload = async (e) => {
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(image_hosting_api, formData);
      if (response.data.data && response.data.data.display_url) {
        setProfileImageUrl(response.data.data.display_url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const onSubmit = async (data) => {
    const updatedData = {
      ...formData,
      userName: data.userName,
      profilePicture: profileImageUrl, // Update with uploaded image URL
      birthDate: birthDate,
      activeStatus: data.activeStatus,
      description: data.description,
    };

    // Assuming you have an API endpoint for updating user data, send the updated data to the API
    try {
      const response = await axios.put("/api/user", updatedData); // Replace '/api/user' with your API endpoint
      console.log("User data updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center text-black"
      >
        <div className="max-w-3xl w-full md:w-auto bg-gray-200 p-8 rounded shadow-lg">
          <div className="md:grid grid-cols-2 gap-2">
            <h2 className="text-lg md:text-2xl font-semibold mb-3 text-center text-[#00938a] col-span-2">
              EDIT USER DATA
            </h2>

            {/* User Name */}
            <div className="mb-2 col-span-1">
              <label className="block text-gray-700">User Name:</label>
              <input
                className="w-full bg-white p-2 rounded-md mt-1"
                {...register("userName", {
                  required: "User Name is required",
                })}
              />
              {errors.userName && (
                <p className="text-red-500">{errors.userName.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="mb-2 col-span-1">
              <label className="block text-gray-700">Phone:</label>
              <input
              type="number"
                className="w-full bg-white p-2 rounded-md mt-1"
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                })}
              />
              {errors.phoneNumber && (
                <p className="text-red-500">{errors.phoneNumber.message}</p>
              )}
            </div>

            {/* Birth date */}
            <div className="mb-2 w-full">
              <label className="block text-gray-700">Birth Date:</label>
              <DatePicker
                selected={birthDate}
                onChange={(date) => setBirthDate(date)}
                dateFormat="MM/dd/yyyy"
                className="w-full bg-white p-2 rounded-md mt-1"
              />
              {errors.birth_date && (
                <p className="text-red-500">{errors.birth_date.message}</p>
              )}
            </div>

            {/* Joining date */}
            <div className="mb-2 w-full">
              <label className="block text-gray-700">Joining Date:</label>
              <DatePicker
                selected={birthDate}
                onChange={(date) => setBirthDate(date)}
                dateFormat="MM/dd/yyyy"
                className="w-full bg-white p-2 rounded-md mt-1"
              />
              {errors.joining_date && (
                <p className="text-red-500">{errors.joining_date.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="mb-2 col-span-2">
              <label className="block text-gray-700">Description:</label>
              <textarea
                className="w-full bg-white p-2 rounded-md mt-1"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>

            {/* Profile picture URL */}
            <div className="mb-2 w-full bg-white p-2 rounded-md mt-1 border">
              <label className="block text-gray-700">
                Profile picture URL:
              </label>
              <input
                type="file"
                accept="image/*"
                className="border"
                {...register("profile_picture", {
                  required: "Profile picture is required",
                })}
              />
              {errors.profile_picture && (
                <p className="text-red-500">{errors.profile_picture.message}</p>
              )}
            </div>

            {/* Active status */}
            <div className="mb-2 w-full bg-white p-2 rounded-md mt-1 border">
              <label className="block text-gray-700">Active status:</label>
              <input
                type="checkbox"
                {...register("activeStatus")}
                className=""
              />
              {errors.active_status && (
                <p className="text-red-500">{errors.active_status.message}</p>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md:w-2/6"
            >
              Edit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
