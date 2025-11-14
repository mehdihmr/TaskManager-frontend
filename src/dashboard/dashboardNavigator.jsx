export default function DashboardNavigator({ setDashboardView }) {
  return (
    <div className="flex flex-row items-center justify-between mx-10 py-2">
      <button className="py-1 px-4 rounded-xl hover:bg-secondary cursor-pointer border-2 border-secondary" onClick={() => setDashboardView("overview")}>
        Overview
      </button>
      <button className="flex flex-row items-center py-1 px-4 rounded-xl hover:bg-secondary cursor-pointer border-2 border-secondary" onClick={() => setDashboardView("add")}>
        <span className="material-symbols-outlined">add</span>
        <span>Add Task</span>
      </button>
    </div>
  );
}
