import { useEffect, useState } from "react";
import Task from "./tasks/task";
import axios from "axios";
import ENDPOINT from "../config";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoadingTasks(true);
        const response = await axios.get(`${ENDPOINT}/fetch`);
        setTasks(response.data.tasks);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoadingTasks(false);
      }
    };
    fetchTasks();
  }, []);
  return (
    <div>
      {isLoadingTasks
        ? null
        : tasks.map((task, index) => {
            console.log(task.status);
            return <Task key={task.id ?? index} id={task.id} title={task.title} description={task.description} priority={task.priority} status={task.status} creation={task.creation} comments={task.comments} />;
          })}
    </div>
  );
}
