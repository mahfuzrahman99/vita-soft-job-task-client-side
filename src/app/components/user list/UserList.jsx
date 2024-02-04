import Link from "next/link";
import AllUserRow from "./AllUserRow";

const UserList = async () => {
  const res = await fetch(`https://tasks.vitasoftsolutions.com/userdata/`);
  const users = await res.json();

  console.log(users);

  return (
    <div className="flex items-center">
      <div
        className="max-w-5xl mx-auto w-[300px] md:w-full h-[90vh] overflow-y-auto"
        style={{ scrollbarWidth: "none", scrollbarColor: "#a8a8a8 #f1f1f1" }}
      >
        <div className="bg-gray-100 p-4 overflow-x-auto">
          <div>
            <div className="flex justify-between items-center mb-2">
              <Link
                href="/createUser"
                className="btn btn-ghost bg-[#00938a] text-white p-2 rounded-md"
              >
                ADD A USER
              </Link>
              <h1 className="font-bold text-3xl md:mr-2 mt-3 ">
                Total user {users?.length}
              </h1>
            </div>
            <table className="min-w-full bg-gray-300">
              <thead className="rounded-t-xl bg-[#00938a]">
                <tr className="rounded-t-xl bg-[#00938a]">
                  <th className="py-2 px-4 border-b">NO</th>
                  {/* <th className="py-2 px-4 border-b">User Image</th> */}
                  <th className="py-2 px-4 border-b">User Name</th>
                  <th className="py-2 px-4 border-b">Birth Date</th>
                  <th className="py-2 px-4 border-b">Joining Date</th>
                  <th className="py-2 px-4 border-b">Active status</th>
                  <th className="py-2 px-4 border-b">Phone Number</th>
                  <th className="py-2 px-4 border-b">Description</th>
                  <th className="py-2 px-4 border-b">Update</th>
                  <th className="py-2 px-4 border-b">Delete</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, i) => (
                  <AllUserRow
                    key={user.id}
                    user={user}
                    // refetch={refetch}
                    i={i}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
