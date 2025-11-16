import { useState, useEffect } from "react";
import { getDaysDifference } from "../../utilities/dateUtils";
import axios from "axios";
import ENDPOINT from "../../config";
import Comments from "./comments";
import Description from "./description";
import TaskPriority from "./taskPriority";
import TaskStatus from "./taskStatus";

export default function Task({ id, title, description, status, priority, comments, creation, onAddComment, onDelete, onDeleteTask, onUpdateComment, onUpdateDescription, onUpdateTitle }) {
  const numComments = comments.length;
  const diffDays = getDaysDifference(creation);
  const [isExpanded, setIsExpanded] = useState(false);
  const [statusInfo, setStatusInfo] = useState({ name: "", color: "" });
  const [currentStatus, setCurrentStatus] = useState(status);
  const [priorityInfo, setPriorityInfo] = useState({ name: "", color: "" });
  const [currentPriority, setCurrentPriority] = useState(priority);
  const [isEditActive, setIsEditActive] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  useEffect(() => {
    switch (currentStatus) {
      case "todo":
        setStatusInfo({ name: "To Do", color: "bg-todo" });
        break;
      case "in_progress":
        setStatusInfo({ name: "In Progress", color: "bg-inprogress" });
        break;
      case "done":
        setStatusInfo({ name: "Done", color: "bg-success" });
        break;
      default:
        setStatusInfo({ name: "To Do", color: "bg-todo" });
    }
  }, [currentStatus]);

  useEffect(() => {
    switch (currentPriority) {
      case "low":
        setPriorityInfo({ name: "Low", color: "bg-[#4BE38C]" });
        break;
      case "mid":
        setPriorityInfo({ name: "Medium", color: "bg-[#FFB02E]" });
        break;
      case "high":
        setPriorityInfo({ name: "High", color: "bg-[#FF4D4F]" });
        break;
      default:
        setPriorityInfo({ name: "Low", color: "bg-[#6EE7B7]" });
    }
  }, [currentPriority]);

  const handleDelete = async () => {
    try {
      await axios.post(`${ENDPOINT}/delete`, { id: id });
      onDeleteTask(id);
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateTitle = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${ENDPOINT}/update`, { id: id, title: newTitle });
      onUpdateTitle(id, newTitle);
      setIsEditActive(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-row items-start rounded-xl py-4 px-8 border-2 border-secondary">
      <div className="flex-1 flex flex-col  space-y-2">
        <div className="flex flex-row items-center justify-between">
          {isEditActive ? (
            <form onSubmit={handleUpdateTitle} className="w-full me-4">
              <input type="text" className="text-xl bg-secondary w-full px-2 rounded-xl py-1" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} maxLength={60} />
              <button type="submit"></button>
            </form>
          ) : (
            <p
              className="text-xl cursor-text px-2 py-1"
              onClick={() => {
                setIsEditActive(!isEditActive);
              }}
            >
              {title}
            </p>
          )}
          <div className="flex flex-row space-x-4">
            <p className={`${priorityInfo.color} w-20 text-center rounded-xl text-black`}>{priorityInfo.name}</p>
            <p className={`${statusInfo.color} min-w-20 px-2 text-center rounded-xl text-black`}>{statusInfo.name}</p>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-2 ms-2">
          <div className="flex flex-row items-center space-x-2 bg-secondary px-2 rounded-xl">
            <span className="material-symbols-outlined text-[15px]!">mode_comment</span>
            <span>{numComments}</span>
          </div>
          <div className="flex flex-row items-center space-x-2 bg-secondary px-2 rounded-xl">
            <span className="material-symbols-outlined text-[15px]!">history_2</span>
            <span>{diffDays === 0 ? "Created today" : `Created ${diffDays} day(s) ago`}</span>
          </div>
        </div>
        <div className={`space-y-2 ms-6 me-2 overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-full opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="flex flex-row space-x-2">
            <TaskPriority
              id={id}
              priority={priority}
              onPriorityChange={(newPriority) => {
                setCurrentPriority(newPriority);
              }}
            />
            <TaskStatus
              id={id}
              status={status}
              onStatusChange={(newStatus) => {
                setCurrentStatus(newStatus);
              }}
            />
          </div>
          <Description description={description} id={id} onUpdateDescription={onUpdateDescription} />
          <Comments comments={comments} id={id} onAddComment={onAddComment} onDelete={onDelete} onUpdateComment={onUpdateComment} />
          <div className="flex justify-end">
            <button className="hover:bg-secondary flex justify-center items-center p-2 rounded-full cursor-pointer" onClick={handleDelete}>
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        </div>
      </div>
      <button className="hover:bg-secondary flex items-center rounded-full p-2 cursor-pointer ms-4" onClick={() => setIsExpanded(!isExpanded)}>
        <span className={`material-symbols-outlined transition-all duration-300 ease-in-out ${isExpanded ? "rotate-180" : "rotate-0"}`}>keyboard_arrow_down</span>
      </button>
    </div>
  );
}
