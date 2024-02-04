"use client";
import { useContext, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineSecurityUpdateGood } from "react-icons/md";
import Swal from "sweetalert2";
import { StateContext } from "@/context/StateProvider";
import UpdateUser from "./UpdateUser";
import Link from "next/link";

const AllUserRow = ({ user: U, i }) => {
  const { formData, setFormData } = useContext(StateContext);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to delete this!",
      icon: "warning",
      iconColor: "#00938a",
      showCancelButton: true,
      confirmButtonColor: "#00938a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete this!",
    });

    if (confirmed.isConfirmed) {
      try {
        const response = await fetch(
          `https://tasks.vitasoftsolutions.com/userdata/${id}/`,
          {
            method: "DELETE",
          }
        );

        const data = await response.json();
        if (response.ok && data.deletedCount) {
          const userData = [formData];
          const updatedFormData = userData.filter((user) => user.id !== id);
          setFormData(updatedFormData);
          console.log(formData);
          Swal.fire({
            title: "Deleted!",
            text: `${U?.name} has been deleted.`,
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "An error occurred while deleting the user.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        console.log("console from here");
        Swal.fire({
          title: "Error",
          text: "An error occurred while deleting the user.",
          icon: "error",
        });
      }
    }
  };

  return (
    <>
      <tr className="bg-gray-100 text-xs">
        {/* Render user details here */}
        <td className="py-2 px-4 border-b-4">{i + 1}</td>
        <td className="py-2 px-4 border-b-4">{U?.name}</td>
        <td className="py-2 px-4 border-b-4">{U?.birthdate}</td>
        <td className="py-2 px-4 border-b-4">{U?.joining_date}</td>
        <td className="py-2 px-4 border-b-4">
          {U?.active_status ? "Active" : "Non active"}
        </td>
        <td className="py-2 px-4 border-b-4">{U?.phone_number}</td>
        <td className="py-2 px-4 border-b-4">{U?.description?.slice(0, 20)}</td>
        <td className="py-2 px-4 border-b-4 p-1 text-xl w-4">
          {/* Update button */}
          <Link href={`/editUser/${U?.id}`}>
            <button className="flex justify-center m-1 p-1 rounded bg-[#00938a]">
              <span className="text-4xl">
                <MdOutlineSecurityUpdateGood />
              </span>
            </button>
          </Link>
        </td>
        <td className="py-2 px-4 border-b-4">
          {/* Delete button */}

          <button
            onClick={() => handleDelete(U.id)}
            className="bg-red-500 text-white px-2 py-1 rounded ml-2"
          >
            <span className="text-3xl">
              <RiDeleteBin6Line />
            </span>
          </button>

          {/* <UpdateUser
              U={U}
              showModal={showModal}
              setShowModal={setShowModal}
            /> */}
        </td>
      </tr>
    </>
  );
};

export default AllUserRow;
