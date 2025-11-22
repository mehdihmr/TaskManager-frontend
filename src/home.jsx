import Sidebar from "./sidebar/sidebar";
import Header from "./header/header";
import Dashboard from "./dashboard/dashboard";
import { useEffect, useState } from "react";
import api from "./api/axios";

export default function Home() {
  const [user, setUser] = useState({ username: "", email: "" });
  const fetchUser = async () => {
    try {
      const response = await api.get("/user/profile");
      setUser(response.data.user);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="flex flex-row divide-x-2 divide-secondary font-primary-font">
      <div className="flex-1/5 min-h-screen">
        <Sidebar />
      </div>
      <div className="flex-4/5">
        <div className="flex flex-col divide-y-2 divide-secondary">
          <Header user={user} />
          <Dashboard />
        </div>
      </div>
    </div>
  );
}
