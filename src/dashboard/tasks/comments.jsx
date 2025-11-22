import { useState } from "react";
import Comment from "./comment";
import Notification from "../../utilities/notification";
import api from "../../api/axios";

export default function Comments({ comments, id, onAddComment, onDelete, onUpdateComment }) {
  const [comment, setComment] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (comment === "") {
      return;
    }
    try {
      setIsError(false);
      setIsLoading(true);
      await api.post("/task/update", { id: id, comment: comment });
      onAddComment(comment, id);
      setComment("");
    } catch (e) {
      setIsError(true);
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="border border-secondary rounded-xl py-2 px-4">
      <h1 className="mb-2">Comments:</h1>
      {comments.length === 0 ? (
        <p className="ms-8">No Comments yet</p>
      ) : (
        <div className="flex flex-col space-y-2">
          {comments.map((comment, index) => (
            <Comment key={index} index={index} id={id} onDelete={onDelete} onUpdateComment={onUpdateComment}>
              {comment}
            </Comment>
          ))}
        </div>
      )}
      <form className="flex flex-row space-x-4 mt-2" onSubmit={handleAddComment}>
        <input required placeholder="Add new comment" type="text" className="bg-secondary ms-8 flex-1 rounded-xl py-1 px-3" value={comment} onChange={(e) => setComment(e.target.value)} />
        <button type="submit" className={`px-2 py-2 rounded-xl ${isLoading ? "cursor-auto bg-accent/50" : "bg-accent hover:bg-accent/50 cursor-pointer"}`}>
          Add Comment
        </button>
      </form>
      {isError && <Notification message="Adding comment failed!" type="error" />}
    </div>
  );
}
