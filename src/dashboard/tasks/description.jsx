import { useState, useRef, useEffect } from "react";
import api from "../../api/axios";

export default function Description({ description, id, onUpdateDescription }) {
  const [isEditActive, setIsEditActive] = useState(false);
  const [newDescription, setNewDescription] = useState(description);
  const ref = useRef(null);

  const handleUpdateComment = async (e) => {
    e.preventDefault();
    try {
      await api.post("/task/update", { id: id, description: newDescription });
      onUpdateDescription(id, newDescription);
      setIsEditActive(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isEditActive && ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }, [isEditActive]);

  return (
    <div className="border border-secondary rounded-xl py-2 px-4">
      <div className="flex flex-row">
        <h1 className="flex-1">Description:</h1>
        <button
          className="hover:bg-secondary hover:text-white text-white/50 flex justify-center items-center p-2 rounded-full cursor-pointer"
          onClick={() => {
            setIsEditActive(!isEditActive);
          }}
        >
          <span className="material-symbols-outlined">edit</span>
        </button>
      </div>
      {isEditActive ? (
        <form className="flex flex-row flex-1 space-x-2 mx-8 justify-center items-center" onSubmit={handleUpdateComment}>
          <textarea
            ref={ref}
            type="text"
            placeholder="Add description"
            className="flex-1 bg-secondary py-2 rounded-xl px-2 resize-none overflow-hidden whitespace-pre-wrap"
            value={newDescription}
            onChange={(e) => {
              if (ref.current) {
                ref.current.style.height = "auto";
                ref.current.style.height = ref.current.scrollHeight + "px";
              }
              setNewDescription(e.target.value);
            }}
          />
          <button className="hover:bg-secondary hover:text-white text-white/50 flex justify-center items-center p-2 rounded-full cursor-pointer" type="submit">
            <span className="material-symbols-outlined">check</span>
          </button>
        </form>
      ) : (
        <p className="ms-8 whitespace-pre-wrap" onClick={() => setIsEditActive(true)}>
          {description === "" ? "No description provided yet" : description}
        </p>
      )}
    </div>
  );
}
