import axios from "axios";
import ENDPOINT from "../../config";

export default function TaskPriority({ id, priority, onPriorityChange }) {
  const handlePriorityChange = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${ENDPOINT}/update`, { id: id, priority: e.target.value });
      onPriorityChange(e.target.value);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex flex-row items-center space-x-2 border border-secondary rounded-xl py-2 px-4 flex-1">
      <label>Priority:</label>
      <select name="selectedPriority" defaultValue={priority} className="bg-secondary px-2 py-1 flex-1 rounded-xl" onChange={handlePriorityChange}>
        <option value="low">Low</option>
        <option value="mid">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}
