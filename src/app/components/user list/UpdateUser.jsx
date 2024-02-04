/* eslint-disable react/prop-types */
"use client";

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { StateContext } from "@/context/StateProvider";

const image_hosting_api = `https://api.imgbb.com/1/upload?key=7b220630460d3376a065265f6edfd433`;

const UpdateUser = ({ u }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [birthdate, setBirthdate] = useState(null);
  const [joining_date, setJoining_date] = useState(null);
  //   const { formData, setFormData } = useContext(StateContext);

  const { name, profile_picture, phone_number, description, active_status } =
    u || {};

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch("https://tasks.vitasoftsolutions.com/userdata/");
  //         if (response.ok) {
  //           const userData = await response.json();
  //           setFormData(userData);
  //           setBirthdate(new Date(userData.birthdate));
  //           setJoining_date(new Date(userData.joining_date));
  //           setProfileImageUrl(userData.profilePicture);
  //         } else {
  //           console.error("Error fetching user data:", response.statusText);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

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
      name: data.name,
      profile_picture: profileImageUrl,
      phone_number: data.phone_number,
      description: data.description,
      birthdate: data.birthdate,
      joining_date: data.joining_date,
      active_status: data.active_status,
    };

    // Assuming you have an API endpoint for updating user data, send the updated data to the API
    try {
      const response = await fetch(
        `https://tasks.vitasoftsolutions.com/userdata/${u?.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      console.log(response);

      if (response.ok) {
        const responseData = await response.json();
        Swal.fire({
          icon: "success",
          title: "User data updated successfully",
          text: JSON.stringify(responseData), // You can customize the text here
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.statusText,
        });
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating user data",
      });
    }
  };

  return (
    <>
      <div
        className=" my-auto max-w-4xl mx-auto "
        style={{
          scrollbarWidth: "none",
          scrollbarColor: "#a8a8a8 #f1f1f1",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center text-black"
        >
          <div className="max-w-3xl w-full md:w-auto bg-gray-200 p-8 rounded shadow-lg">
            <div className="md:grid grid-cols-2 gap-2">
              <h2 className="text-lg md:text-2xl font-semibold mb-3 text-center text-[#00938a] col-span-2">
                UPDATE A USER
              </h2>

              {/* User Name */}
              <div className="mb-2 col-span-1">
                <label className="block text-gray-700">User Name:</label>
                <input
                  type="text"
                  className="w-full bg-white p-2 rounded-md mt-1"
                  {...register("name", {
                    required: "User Name is required",
                  })}
                  defaultValue={name || ""}
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Description */}
              <div className="mb-2 col-span-1">
                <label className="block text-gray-700">Phone Number:</label>
                <input
                  type="number"
                  className="w-full bg-white p-2 rounded-md mt-1"
                  {...register("phone_number", {
                    required: "Phone Number is required",
                  })}
                  defaultValue={phone_number || ""}
                />
                {errors.phone_number && (
                  <p className="text-red-500">{errors.phone_number.message}</p>
                )}
              </div>

              {/* Birth date */}
              <div className="mb-2 w-full">
                <label className="block text-gray-700">Birth Date:</label>
                <DatePicker
                  selected={birthdate}
                  onChange={(date) => setBirthdate(date)}
                  dateFormat="MM/dd/yyyy"
                  className="w-full bg-white p-2 rounded-md mt-1"
                />
                {errors.birthdate && (
                  <p className="text-red-500">{errors.birthdate.message}</p>
                )}
              </div>

              {/* Joining date */}
              <div className="mb-2 w-full">
                <label className="block text-gray-700">Joining Date:</label>
                <DatePicker
                  selected={joining_date}
                  onChange={(date) => setJoining_date(date)}
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
                  defaultValue={description || ""}
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
                  <p className="text-red-500">
                    {errors.profile_picture.message}
                  </p>
                )}
              </div>

              {/* Active status */}
              <div className="mb-2 w-full bg-white p-2 rounded-md mt-1 border">
                <label className="block text-gray-700">Active status:</label>
                <input
                  type="checkbox"
                  {...register("activeStatus")}
                  className=""
                  defaultChecked={active_status}
                />
                {errors.active_status && (
                  <p className="text-red-500">{errors.active_status.message}</p>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#00938a] hover:bg-[#063c38] text-white font-bold py-2 px-4 rounded md:w-2/6"
              >
                Update user
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateUser;
