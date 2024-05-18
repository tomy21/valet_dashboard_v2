"use client";

import React, { useState, useEffect } from "react";
import { MdOutlineRefresh } from "react-icons/md";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import { ScaleLoader } from "react-spinners";

const FormLogin = () => {
  const [captcha, setCaptcha] = useState("");
  const [textCaptcha, setTextCaptcha] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const key = "PARTNER_KEY";

  const refreshString = () => {
    setCaptcha(Math.random().toString(36).slice(2, 8));
  };

  useEffect(() => {
    refreshString();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (textCaptcha === captcha) {
      setLoading(true);
      setValid(true);
      try {
        const dataLogin = {
          email: email,
          password: password,
        };

        const encrypData = CryptoJS.AES.encrypt(
          JSON.stringify(dataLogin),
          key
        ).toString();

        await axios.post(
          "http://localhost:3008/api/login",
          {
            data: encrypData,
          },
          { withCredentials: true }
        );

        router.push("/dashboard");
        setLoading(false);
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.msg || "Login failed");
        } else {
          // Handle other errors (network issues, etc.)
          setErrorMessage("An error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    } else {
      setValid(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full px-3 py-2">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-2 text-sm">
          <label htmlFor="email" className="mb-1">
            Email
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-slate-400 px-3 py-2 rounded-md"
            placeholder="Enter email"
          />
        </div>

        <div className="flex flex-col mb-5 text-sm">
          <label htmlFor="email" className="mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-slate-400 px-3 py-2 rounded-md"
            placeholder="*************"
          />
        </div>

        <div className="flex flex-row space-x-5 mb-2">
          <div
            className={`text-base rounded-sm p-1 ${
              valid ? "bg-green-500" : "bg-black text-white"
            } font-semibold w-[50%] text-center`}
          >
            {captcha}
          </div>
          <button
            type="button"
            className="rounded-md p-2 bg-white shadow-md shadow-slate-400"
            onClick={refreshString}
          >
            <MdOutlineRefresh />
          </button>
        </div>

        <div className="flex flex-col mb-5 text-sm">
          <input
            type="text"
            className={`border px-3 py-2 rounded-md ${
              valid ? "border-green-500" : "border-red-500"
            }`}
            placeholder="Enter Captcha"
            value={textCaptcha}
            onChange={(e) => setTextCaptcha(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="text-center bg-emerald-500 py-2 rounded-md w-full text-sm hover:bg-emerald-400 hover:shadow-md"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      {errorMessage && (
        <div className="mb-5 text-red-500 text-sm">{errorMessage}</div>
      )}

      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-md shadow-lg">
            <div className="flex items-center justify-center mb-3">
              <ScaleLoader size={150} color={"#333"} loading={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormLogin;
