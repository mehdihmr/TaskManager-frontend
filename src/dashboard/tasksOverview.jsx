import { useEffect, useState } from "react";
import Task from "./tasks/task";
import Loader from "../utilities/loader";
import Notification from "../utilities/notification";
import api from "../api/axios";

export default function TasksOverview() {
  const [tasks, setTasks] = useState([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchTasks = async () => {
    try {
      setIsError(false);
      setIsLoadingTasks(true);
      const response = await api.get("/task/fetch");
      setTasks(response.data.tasks);
    } catch (e) {
      setIsError(true);
      console.log(e);
    } finally {
      setIsLoadingTasks(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddComment = (comment, taskId) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, comments: [...t.comments, comment] } : t)));
  };

  const handleDeleteComment = (taskId, index) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, comments: t.comments.filter((_, i) => i !== index) } : t)));
  };

  const handleUpdateComment = (taskId, index, newComment) => {
    setTasks((prev) => prev.map((t) => (t.id == taskId ? { ...t, comments: t.comments.map((c, i) => (i === index ? newComment : c)) } : t)));
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id != taskId));
  };

  const handleUpdateDescription = (taskId, newDescription) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, description: newDescription } : t)));
  };

  const handleUpdateTitle = (taskId, newTitle) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, title: newTitle } : t)));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-4xl text-center mb-4 font-header-font">Task overview</h1>
      {isLoadingTasks ? (
        <Loader width="w-52" />
      ) : tasks.length == 0 && !isError ? (
        <div className="text-xl text-center">No tasks yet!</div>
      ) : (
        tasks.map((task, index) => {
          return (
            <Task
              key={task.id ?? index}
              onDeleteTask={handleDeleteTask}
              onAddComment={handleAddComment}
              onDelete={handleDeleteComment}
              onUpdateComment={handleUpdateComment}
              onUpdateDescription={handleUpdateDescription}
              onUpdateTitle={handleUpdateTitle}
              id={task.id}
              title={task.title}
              description={task.description}
              priority={task.priority}
              status={task.status}
              creation={task.creation}
              comments={task.comments}
            />
          );
        })
      )}
      {isError && <Notification message="Error fetching the tasks" type="error" />}
    </div>
  );
}
