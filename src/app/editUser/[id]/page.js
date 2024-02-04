import React from "react";
import UpdateUser from "../../components/user list/UpdateUser";

const EditUser = async ({ params }) => {
  const res = await fetch(
    `https://tasks.vitasoftsolutions.com/userdata/${params.id}`
  );
  const user = await res.json();
//   console.log(params);
  return (
    <div>
      <UpdateUser u={user} />
    </div>
  );
};

export default EditUser;
