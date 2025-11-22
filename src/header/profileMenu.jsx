import { useNavigate } from "react-router-dom";

export default function ProfileMenu({ user }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="flex flex-col space-y-2 mx-4 my-2 overflow-hidden">
      <div className="flex flex-row items-center space-x-4 px-2">
        <span className="material-symbols-outlined scale-125">account_circle</span>
        <div className="flex flex-col items-start">
          <p className="text-md font-bold">{user.username}</p>
          <p className="text-xs">{user.email}</p>
        </div>
      </div>
      <hr className="text-white/50" />
      <div className="flex flex-col space-y-2 ">
        <button className="flex flex-row items-center space-x-4 p-2 cursor-pointer hover:bg-white/10 rounded-xl">
          <span className="material-symbols-outlined scale-125">person</span>
          <p>Profile</p>
        </button>
        <button className="flex flex-row items-center space-x-4 p-2 cursor-pointer hover:bg-white/10 rounded-xl">
          <span className="material-symbols-outlined scale-125">settings</span>
          <p>Settings</p>
        </button>
      </div>
      <hr className="text-white/50" />
      <button className="flex flex-row items-center space-x-4 p-2 cursor-pointer hover:bg-white/10 rounded-xl" onClick={handleLogout}>
        <span className="material-symbols-outlined scale-125">logout</span>
        <p>Log out</p>
      </button>
    </div>
  );
}
