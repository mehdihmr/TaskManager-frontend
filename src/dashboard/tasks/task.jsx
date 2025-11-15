import { useState } from "react";
import { getDaysDifference } from "../../utilities/dateUtils";
import axios from "axios";
import ENDPOINT from "../../config";
import Comment from "./comment";
import Comments from "./comments";
import Description from "./description";

export default function Task({ id, title, description, status, priority, comments, creation, onAddComment, onDelete, onDeleteTask, onUpdateComment }) {
  const numComments = comments.length;
  const diffDays = getDaysDifference(creation);
  const [isExpanded, setIsExpanded] = useState(false);
  let statusInfo;
  switch (status) {
    case "todo":
      statusInfo = { name: "To Do", color: "bg-todo" };
      break;
    case "in_progress":
      statusInfo = { name: "In Progress", color: "bg-inprogress" };
      break;
    case "done":
      statusInfo = { name: "Done", color: "bg-success" };
      break;
    default:
      statusInfo = { name: "To Do", color: "bg-todo" };
  }

  const handleDelete = async () => {
    try {
      await axios.post(`${ENDPOINT}/delete`, { id: id });
      onDeleteTask(id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-row items-start rounded-xl py-4 px-8 border-2 border-secondary">
      <div className="flex-1 flex flex-col  space-y-2">
        <div className="flex flex-row items-center justify-start space-x-4">
          <p className="text-xl">{title}</p>
          <p className="bg-accent w-20 text-center rounded-xl text-black">{priority}</p>
          <p className={`${statusInfo.color} min-w-20 px-2 text-center rounded-xl text-black`}>{statusInfo.name}</p>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <div className="flex flex-row items-center space-x-2 bg-secondary px-2 rounded-xl">
            <span className="material-symbols-outlined text-[15px]!">mode_comment</span>
            <span>{numComments}</span>
          </div>
          <div className="flex flex-row items-center space-x-2 bg-secondary px-2 rounded-xl">
            <span className="material-symbols-outlined text-[15px]!">history_2</span>
            <span>{diffDays === 0 ? "Created today" : `Created ${diffDays} days ago`}</span>
          </div>
        </div>
        <div className={`space-y-2 mx-6 overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-full opacity-100" : "max-h-0 opacity-0"}`}>
          <Description description={description} />
          <Comments comments={comments} id={id} onAddComment={onAddComment} onDelete={onDelete} onUpdateComment={onUpdateComment} />
          <div className="flex justify-end">
            <button className="hover:bg-secondary flex justify-center items-center p-2 rounded-full cursor-pointer" onClick={handleDelete}>
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        </div>
      </div>
      <button className="hover:bg-secondary flex items-center rounded-full p-2 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <span className={`material-symbols-outlined transition-all duration-300 ease-in-out ${isExpanded ? "rotate-180" : "rotate-0"}`}>keyboard_arrow_down</span>
      </button>
    </div>
  );
}
