import Login from "./login";
import Register from "./register";
import { useState } from "react";
import background from "../../assets/background3.png";

export default function Auth() {
  const [isLoginView, setIsLoginView] = useState(true);
  localStorage.removeItem("token");
  return (
    <>
      <h1 className="text-8xl font-header-font text-center my-10">Taskio</h1>
      <div className="flex flex-row justify-center relative w-2/3 mx-auto">
        <Login
          onSetView={(view) => {
            setIsLoginView(view);
          }}
        />
        <Register
          onSetView={(view) => {
            setIsLoginView(view);
          }}
        />
        <div className={`absolute bg-accent h-full w-1/2 ${isLoginView ? "left-1/2" : "left-0"} rounded-xl transition-all duration-500 ease-in-out`}>
          <img src={background} className="h-full w-full object-cover inset-0 p-1 rounded-xl" />
        </div>
      </div>
    </>
  );
}
