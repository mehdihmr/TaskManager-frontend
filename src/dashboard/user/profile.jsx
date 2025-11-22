import { useState } from "react";
import api from "../../api/axios";

export default function Profile() {
  const [passInfo, setPassInfo] = useState({ old: "", new: "", confirm: "" });
  const [errorInfo, setErrorInfo] = useState({ isError: false, msg: "" });
  const handleUpdatePass = async (e) => {
    e.preventDefault();
    setErrorInfo({ isError: false, msg: "" });
    try {
      await api.post("/user/update-pass", passInfo);
    } catch (e) {
      console.log(e);
      setErrorInfo({ isError: true, msg: e.response.data.message });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="w-2/3 mx-auto my-10 rounded-xl p-4 border border-secondary">
      <h1 className="text-4xl text-center mb-4 font-header-font">Profile</h1>
      <form className="flex flex-col space-y-2">
        <div className="flex flex-row items-center justify-center w-2/3 mx-auto">
          <label className="flex-1/4">Username:</label>
          <input type="text" placeholder="Username" className="flex-3/4 px-3 py-2 bg-secondary border border-accent rounded-xl outline-hidden" />
        </div>
        <div className="flex flex-row items-center justify-center w-2/3 mx-auto">
          <label className="flex-1/4">Email:</label>
          <input type="email" placeholder="Email" className="flex-3/4 px-3 py-2 bg-secondary border border-accent rounded-xl outline-hidden" />
        </div>
        <button className="bg-accent w-1/3 mx-auto py-2 rounded-xl hover:bg-accent/50 cursor-pointer">Update profile</button>
      </form>
      <hr className="text-secondary w-2/3 mx-auto my-4" />
      <form className="flex flex-col space-y-2" onSubmit={handleUpdatePass}>
        <div className="flex flex-row items-center justify-center w-2/3 mx-auto">
          <label className="flex-1/4">Old password:</label>
          <input type="password" placeholder="Old password" className="flex-3/4 px-3 py-2 bg-secondary border border-accent rounded-xl outline-hidden" name="old" value={passInfo.old} onChange={handleChange} />
        </div>
        <div className="flex flex-row items-center justify-center w-2/3 mx-auto">
          <label className="flex-1/4">New password:</label>
          <input type="password" placeholder="New password" className="flex-3/4 px-3 py-2 bg-secondary border border-accent rounded-xl outline-hidden" name="new" value={passInfo.new} onChange={handleChange} />
        </div>
        <div className="flex flex-row items-center justify-center w-2/3 mx-auto">
          <label className="flex-1/4">Confirm:</label>
          <input type="password" placeholder="Confirm" className="flex-3/4 px-3 py-2 bg-secondary border border-accent rounded-xl outline-hidden" name="confirm" value={passInfo.confirm} onChange={handleChange} />
        </div>
        <button type="submit" className="bg-accent w-1/3 mx-auto py-2 rounded-xl hover:bg-accent/50 cursor-pointer">
          Update password
        </button>

        <div className="flex w-2/3 justify-end mx-auto">{errorInfo.isError && <p className="w-3/4 self-end border-2 font-bold rounded-xl border-error text-error text-center py-2 bg-red-50">{errorInfo.msg}</p>}</div>
      </form>
    </div>
  );
}
