import Sidebar from "./sidebar/sidebar";
import Dashboard from "./dashboard/dashboard";
import Header from "./header/header";

function App() {
  return (
    <div className="flex flex-row divide-x-2 divide-secondary font-primary-font">
      <div className="flex-1/5 min-h-screen">
        <Sidebar />
      </div>
      <div className="flex-4/5">
        <div className="flex flex-col divide-y-2 divide-secondary">
          <Header />
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default App;
