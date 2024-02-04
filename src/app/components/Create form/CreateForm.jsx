"use client"

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { StateContext } from "@/context/StateProvider";
import Swal from "sweetalert2";

const image_hosting_api = `https://api.imgbb.com/1/upload?key=7b220630460d3376a065265f6edfd433`;

const CreateForm = () => {
  const { formData, setFormData } = useContext(StateContext);
  const { handleSubmit, register, formState: { errors } } = useForm();

  const [birthdate, setBirthdate] = useState(new Date());
  const [joining_date, setJoining_date] = useState(new Date());

  const onSubmit = async (data) => {
    const userData = {
      name: data.name,
      profile_picture: data.profile_picture[0],
      phone_number: data.phone_number,
      description: data.description,
      birthdate: birthdate.toISOString().split("T")[0], 
      joining_date: joining_date.toISOString().split("T")[0], // Format as yyyy-mm-dd
      active_status: data.activeStatus || false, // Set default value if not provided
    };

    const formData = new FormData();
    formData.append("image", data.profile_picture[0]); // Append the file to FormData

    try {
      const imageRes = await fetch(image_hosting_api, {
        method: "POST",
        body: formData,
      });
      const imageResData = await imageRes.json();

      // if (imageResData.success) {
        // Update userData with the image URL from the response
        userData.profile_picture = formData;

        // Set formData and send user data to backend
        setFormData(userData);

        const userRes = await fetch("https://tasks.vitasoftsolutions.com/userdata/", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        const userDataRes = await userRes.json();

        if (userDataRes.insertedId) {
          // show success popup
          Swal.fire({
            position: "top",
            icon: "success",
            title: `${data.name} is added to the user list`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      // } else {
      //   console.error("Image upload failed:", imageResData.error);
      // }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="flex justify-center text-black">
        <div className="max-w-3xl w-full md:w-auto bg-gray-200 p-8 rounded shadow-lg">
          <div className="md:grid grid-cols-2 gap-2">
            <h2 className="text-lg md:text-2xl font-semibold mb-3 text-center text-[#00938a] col-span-2">
              ADD A USER
            </h2>
            <div className="mb-2 col-span-1">
              <label className="block text-gray-700">User Name:</label>
              <input
                className="w-full bg-white p-2 rounded-md mt-1"
                {...register("name", {
                  required: "User Name is required",
                })}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="mb-2 col-span-1">
              <label className="block text-gray-700">Phone Number:</label>
              <input
                type="number"
                className="w-full bg-white p-2 rounded-md mt-1"
                {...register("phone_number", {
                  required: "Phone Number is required",
                })}
              />
              {errors.phone_number && (
                <p className="text-red-500">{errors.phone_number.message}</p>
              )}
            </div>
            <div className="mb-2 w-full">
              <label className="block text-gray-700">Birth Date:</label>
              <DatePicker
                selected={birthdate}
                onChange={(date) => setBirthdate(date)}
                dateFormat="yyyy/MM/dd"
                className="w-full bg-white p-2 rounded-md mt-1"
              />
              {errors.birthdate && (
                <p className="text-red-500">{errors.birthdate.message}</p>
              )}
            </div>
            <div className="mb-2 w-full">
              <label className="block text-gray-700">Joining Date:</label>
              <DatePicker
                selected={joining_date}
                onChange={(date) => setJoining_date(date)}
                dateFormat="yyyy/MM/dd"
                className="w-full bg-white p-2 rounded-md mt-1"
              />
              {errors.joining_date && (
                <p className="text-red-500">{errors.joining_date.message}</p>
              )}
            </div>
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
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md:w-2/6">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
