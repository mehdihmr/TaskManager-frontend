import axios from "axios";
import ENDPOINT from "../../config";
import { useState } from "react";

export default function Comment({ children, index, id, onDelete, onUpdateComment }) {
  const [isEditActive, setIsEditActive] = useState(false);
  const [newComment, setNewComment] = useState(children);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${ENDPOINT}/comment/delete`, { id: id, comment: children });
      onDelete(id, index);
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${ENDPOINT}/comment/update`, { id: id, comment: children, newComment: newComment });
      onUpdateComment(id, index, newComment);
      setIsEditActive(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex flex-row items-center space-x-2 ms-8 border border-white/50 px-4 py-1 rounded-xl">
      {isEditActive ? (
        <form className="flex flex-row flex-1 space-x-2" onSubmit={handleUpdate}>
          <input type="text" className="flex-1 bg-secondary py-2 rounded-xl px-2" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
          <button className="hover:bg-secondary hover:text-white text-white/50 flex justify-center items-center p-2 rounded-full cursor-pointer" type="submit">
            <span className="material-symbols-outlined">check</span>
          </button>
        </form>
      ) : (
        <p className="flex-1 wrap-break-word">{children}</p>
      )}
      <button
        className="hover:bg-secondary hover:text-white text-white/50 flex justify-center items-center p-2 rounded-full cursor-pointer"
        onClick={() => {
          setIsEditActive(!isEditActive);
        }}
      >
        <span className="material-symbols-outlined">edit</span>
      </button>
      <button className="hover:bg-secondary hover:text-white text-white/50 flex justify-center items-center p-2 rounded-full cursor-pointer" onClick={handleDelete}>
        <span className="material-symbols-outlined">delete</span>
      </button>
    </div>
  );
}
