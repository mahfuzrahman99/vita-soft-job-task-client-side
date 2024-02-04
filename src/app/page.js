import StateProvider from "@/context/StateProvider";
// import CreateForm from "./components/Create form/CreateForm";
// import EditForm from "./components/Edit form/EditForm";
import UserList from "./components/user list/UserList";

export default function Home() {
  return (
    
      <main className="bg-[#8fa6ac] h-[100vh]">
        {/* <CreateForm/> */}
        <UserList/>
      </main>
    
  );
}
