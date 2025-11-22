import TasksOverview from "./tasksOverview";
import DashboardNavigator from "./dashboardNavigator";
import { useState } from "react";
import AddTask from "./tasks/addTask";
import Notification from "../utilities/notification";

export default function Dashboard() {
  const [view, setView] = useState("overview");
  const [isSuccess, setIsSuccess] = useState({ flag: false, message: "" });
  const setDashboardView = (value) => {
    setView(value);
  };
  return (
    <div className="">
      <DashboardNavigator setDashboardView={setDashboardView} actualView={view} />
      <div className="m-10">
        {view === "overview" && <TasksOverview />}
        {view === "add" && <AddTask setDashboardView={setDashboardView} onSuccess={(s) => setIsSuccess(s)} />}
      </div>
      {isSuccess.flag ? <Notification message={isSuccess.message} type="info" /> : null}
    </div>
  );
}
