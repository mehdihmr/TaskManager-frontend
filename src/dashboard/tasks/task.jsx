import { getDaysDifference } from "../../utilities/dateUtils";

export default function Task({ id, title, description, status, priority, comments, creation }) {
  const numComments = comments.length;
  const diffDays = getDaysDifference(creation);
  return (
    <div className="flex flex-col m-10 rounded-xl py-4 px-8 border-2 border-secondary space-y-2">
      <div className="flex flex-row items-center justify-between">
        <p className="text-xl">{title}</p>
        <p className="bg-accent w-20 text-center rounded-xl text-black">{priority}</p>
      </div>
      <div className="flex flex-row items-center space-x-2">
        <div className="flex flex-row items-center space-x-2 bg-secondary px-2 rounded-xl">
          <span class="material-symbols-outlined text-[15px]!">mode_comment</span>
          <span>{numComments}</span>
        </div>
        <div className="flex flex-row items-center space-x-2 bg-secondary px-2 rounded-xl">
          <span class="material-symbols-outlined text-[15px]!">history_2</span>
          <span>{diffDays === 0 ? "Created today" : `Created ${diffDays} days ago`}</span>
        </div>
      </div>
    </div>
  );
}
