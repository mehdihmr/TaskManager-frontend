import Sidebar from "./sidebar/sidebar";
import Header from "./header/header";
import Dashboard from "./dashboard/dashboard";
import { useEffect, useState } from "react";
import api from "./api/axios";
import Profile from "./dashboard/user/profile";

export default function Home() {
  const [view, setView] = useState("profile");
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

  const handleSetView = (v) => {
    setView(v);
  };
  return (
    <div className="flex flex-row divide-x-2 divide-secondary font-primary-font">
      <div className="flex-1/5 min-h-screen">
        <Sidebar />
      </div>
      <div className="flex-4/5">
        <div className="flex flex-col divide-y-2 divide-secondary">
          <Header user={user} setView={handleSetView} />
          {view === "dashboard" && <Dashboard />}
          {view === "profile" && <Profile />}
        </div>
      </div>
    </div>
  );
}
