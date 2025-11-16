import axios from "axios";
import { useState } from "react";
import ENDPOINT from "../../config";
import Loader from "../../utilities/loader";
import Notification from "../../utilities/notification";

export default function Register({ onSetView }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState({ password: false, confirmPassword: false });
  const [registrationInfo, setRegistrationInfo] = useState({ username: "", email: "", password: "", confirmPassword: "", acceptedTerms: false });
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [isUserNameEmpty, setIsUserNameEmpty] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "password") {
      setIsPasswordMatch(true);
      setIsPasswordError(false);
    }
    if (name === "confirmPassword") {
      setIsPasswordMatch(true);
      setIsConfirmPasswordError(false);
    }
    if (name === "acceptedTerms") {
      setIsChecked(true);
    }
    if (name === "username") {
      setIsUserNameEmpty(false);
    }
    if (name === "email") {
      setIsEmailEmpty(false);
    }
    setRegistrationInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSuccess(false);
    setIsError(false);
    let passwordEmpty = false;
    console.log("Registration Info:", registrationInfo);
    if (registrationInfo.username.trim() === "" || registrationInfo.email.trim() === "" || registrationInfo.password !== registrationInfo.confirmPassword || !registrationInfo.acceptedTerms) {
      if (registrationInfo.username.trim() === "") {
        setIsUserNameEmpty(true);
      }
      if (registrationInfo.email.trim() === "") {
        setIsEmailEmpty(true);
      }
      if (registrationInfo.password.trim() === "") {
        setIsPasswordError(true);
        passwordEmpty = true;
      }
      if (registrationInfo.confirmPassword.trim() === "") {
        setIsConfirmPasswordError(true);
        passwordEmpty = true;
      }
      if (registrationInfo.password !== registrationInfo.confirmPassword && !passwordEmpty) {
        setIsPasswordMatch(false);
      }
      if (!registrationInfo.acceptedTerms) {
        setIsChecked(false);
      }
      return;
    }

    try {
      setIsLoading(true);
      let response = await axios.post(`${ENDPOINT}/register`, registrationInfo);
      console.log("Registration successful:", response.data);
      setIsSuccess(true);
      onSetView(true);
    } catch (e) {
      setIsError(true);
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 ms-5 my-2 me-2">
      <h1 className="text-4xl text-center mb-8 font-header-font">Register</h1>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        {/* User name */}
        <input type="text" placeholder="Username" name="username" value={registrationInfo.username} className={`w-full py-3 px-4 bg-secondary border focus:border outline-hidden rounded-xl ${isUserNameEmpty ? "border-error" : "border-transparent focus:border-accent"}`} onChange={handleChange} />

        {/* Email */}
        <input type="email" placeholder="Email" name="email" value={registrationInfo.email} className={`w-full py-3 px-4 bg-secondary border focus:border outline-hidden rounded-xl ${isEmailEmpty ? "border-error" : "border-transparent focus:border-accent"}`} onChange={handleChange} />

        {/* Password */}
        <div className="relative w-full">
          <input
            type={isPasswordVisible.password ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={registrationInfo.password}
            className={`w-full py-3 px-4 bg-secondary border outline-hidden rounded-xl ${!isPasswordMatch || isPasswordError ? "border-error" : "border-transparent focus:border-accent"}`}
            onChange={handleChange}
          />
          <span className="material-symbols-outlined absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-[#303c4f] rounded-full p-1 cursor-pointer select-none" onClick={() => setIsPasswordVisible((prev) => ({ ...prev, password: !prev.password }))}>
            {isPasswordVisible.password ? "visibility_off" : "visibility"}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="relative w-full">
          <input
            type={isPasswordVisible.confirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            name="confirmPassword"
            value={registrationInfo.confirmPassword}
            className={`w-full py-3 px-4 bg-secondary border outline-hidden rounded-xl ${!isPasswordMatch || isConfirmPasswordError ? "border-error" : "border-transparent focus:border-accent"}`}
            onChange={handleChange}
          />
          <span className="material-symbols-outlined absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-[#303c4f] rounded-full p-1 cursor-pointer select-none" onClick={() => setIsPasswordVisible((prev) => ({ ...prev, confirmPassword: !prev.confirmPassword }))}>
            {isPasswordVisible.confirmPassword ? "visibility_off" : "visibility"}
          </span>
        </div>

        {/* Terms and conditions */}
        <div className="flex flex-row space-x-2 ms-3">
          <label className="relative flex items-center cursor-pointer">
            <input type="checkbox" className="peer sr-only" checked={registrationInfo.acceptedTerms} onChange={handleChange} name="acceptedTerms" />
            <div className={`w-4 h-4 rounded border peer-checked:bg-accent peer-checked:border-accent transition ${isChecked ? "border-accent" : "border-error"}`}></div>
          </label>
          <label htmlFor="terms">
            I agree to the{" "}
            <span>
              <button type="button" className="underline cursor-pointer text-accent">
                terms & conditions
              </button>
            </span>
          </label>
        </div>
        <button type="submit" className={`bg-accent rounded-xl py-3  hover:bg-accent/50 ${isLoading ? "cursor-not-allowed bg-accent/50" : "cursor-pointer"}`} disabled={isLoading}>
          {isLoading ? <Loader width="w-[60px]" /> : "Register"}
        </button>
      </form>
      <p className="mt-2">
        Already have an account?{" "}
        <span>
          <button type="button" className="underline cursor-pointer text-accent" onClick={() => onSetView(true)}>
            Log in
          </button>
        </span>
      </p>
      <div className="flex flex-row items-center space-x-2 my-4">
        <span className="h-0.5 flex-1 bg-white/40"></span>
        <span className="text-xs text-white/40">Or register with</span>
        <span className="h-0.5 flex-1 bg-white/40"></span>
      </div>
      <div className="flex flex-row mx-4 space-x-4">
        <button type="button" className="flex-1 flex flex-row items-center justify-center space-x-2 border-2 border-white/40 rounded-xl py-2 cursor-pointer">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="38" height="38" viewBox="0 0 48 48">
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>
          </span>
          <span>Google</span>
        </button>
        <button type="button" className="flex-1 flex flex-row items-center justify-center space-x-2 border-2 border-white/40 rounded-xl py-2 cursor-pointer">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="38" height="38" viewBox="0 0 50 50">
              <path d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"></path>
            </svg>
          </span>
          <span>Apple</span>
        </button>
      </div>
      {isSuccess && <Notification message="Registration successful!" type="info" />}
      {isError && <Notification message="Registration failed. Please try again." type="error" />}
    </div>
  );
}
