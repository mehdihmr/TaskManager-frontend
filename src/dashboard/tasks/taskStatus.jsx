import api from "../../api/axios";

export default function TaskStatus({ id, status, onStatusChange }) {
  const handleStatusChange = async (e) => {
    e.preventDefault();
    try {
      await api.post("/task/update", { id: id, status: e.target.value });
      onStatusChange(e.target.value);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex flex-row items-center space-x-2 border border-secondary rounded-xl py-2 px-4 flex-1">
      <label>Status:</label>
      <select name="selectedStatus" defaultValue={status} className="bg-secondary px-2 py-1 flex-1 rounded-xl" onChange={handleStatusChange}>
        <option value="todo">To Do</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
}
