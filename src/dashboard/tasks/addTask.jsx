import { useState } from "react";
import Loader from "../../utilities/loader";
import Notification from "../../utilities/notification";
import api from "../../api/axios";

export default function AddTask({ setDashboardView, onSuccess }) {
  const [taskInfo, setTaskInfo] = useState({
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsError(false);
      onSuccess({ flag: false, message: "" });
      setIsLoading(true);
      await api.post("/task/add", taskInfo);
      onSuccess({ flag: true, message: "Task added!" });
      setDashboardView("overview");
    } catch (e) {
      setIsError(true);
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-2/3 mx-auto">
      <h1 className="text-4xl text-center mb-4 font-header-font">Add Task</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <div className="flex flex-row items-center space-x-2">
          <label className="text-xl w-1/4">Title:</label>
          <input type="text" className="bg-secondary text-xl py-1 px-3 rounded-xl w-3/4" name="title" required value={taskInfo.title} onChange={handleChange} />
        </div>
        <div className="flex flex-row items-start space-x-2">
          <label className="text-xl w-1/4">Description:</label>
          <textarea type="text" className="bg-secondary text-xl py-1 px-3 rounded-xl w-3/4" name="description" value={taskInfo.description} onChange={handleChange} />
        </div>
        <div className="w-1/3 mx-auto mt-4">
          <button type="submit" className="w-full bg-success py-2 rounded-xl text-xl cursor-pointer">
            {isLoading ? <Loader width="w-[70px]" /> : "Add task"}
          </button>
        </div>
      </form>
      {isError && <Notification message="Error adding task!" type="error" />}
    </div>
  );
}
