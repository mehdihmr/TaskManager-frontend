import { useState } from "react";
import ProfileMenu from "./profileMenu";

export default function Header({ user, setView }) {
  const [isNotificationSelected, setIsNotificationSelected] = useState(false);
  const [isProfileSelected, setIsProfileSelected] = useState(false);
  return (
    <div className="flex flex-row items-center justify-between py-3 px-10">
      <div>
        <h1
          className="font-header-font text-xl cursor-pointer"
          onClick={() => {
            setView("dashboard");
          }}
        >
          Taskio
        </h1>
      </div>
      <div className="flex flex-row">
        <span className="material-symbols-outlined bg-secondary py-1 ps-4 pe-3 rounded-s-xl">search</span>
        <input placeholder="Search..." className="bg-secondary rounded-e-xl outline-hidden w-lg" />
      </div>
      <div className="flex flex-row items-center justify-center space-x-4">
        <div className="relative">
          <button
            className={`flex items-center justify-center p-2 rounded-full cursor-pointer ${isNotificationSelected ? "bg-secondary" : "hover:bg-secondary"}`}
            onClick={() => {
              setIsNotificationSelected(!isNotificationSelected);
              setIsProfileSelected(false);
            }}
          >
            <span className="material-symbols-outlined scale-125">notifications</span>
          </button>
          <div className={`absolute flex justify-center items-center top-full right-0 bg-secondary w-60 min-h-50 z-50 rounded-xl border border-white/50 text-center ${isNotificationSelected ? "opacity-100" : "hidden"}`}>You have no notifications</div>
        </div>
        <div className="relative">
          <button
            className={`flex items-center justify-center p-2 rounded-full cursor-pointer ${isProfileSelected ? "bg-secondary" : "hover:bg-secondary"}`}
            onClick={() => {
              setIsProfileSelected(!isProfileSelected);
              setIsNotificationSelected(false);
            }}
          >
            <span className="material-symbols-outlined scale-125">account_circle</span>
          </button>
          <div className={`absolute top-full right-0 bg-secondary w-60 z-50 rounded-xl border border-white/50 ${isProfileSelected ? "opacity-100" : "hidden"}`}>
            <ProfileMenu user={user} setView={setView} />
          </div>
        </div>
      </div>
    </div>
    // <span class="material-symbols-outlined">
    //  notifications_unread
    // </span>
  );
}
