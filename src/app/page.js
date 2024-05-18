"use client";
import Image from "next/image";
import IntroPage from "./components/introPage";
import FormLogin from "./components/formLogin";
import { useEffect } from "react";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-20">
        <div className="container w-[80%] h-full ">
          <div className="flex flex-row justify-center items-center text-black bg-white rounded-md p-6 shadow shadow-white">
            <div className="w-full h-full p-5">
              <IntroPage />
            </div>
            <div className="w-[70%] h-full p-5">
              <h1 className="text-base font-semibold">Welcome back, </h1>
              <h1 className="text-sm text-slate-400">
                Please login to your account
              </h1>

              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500"></div>

              <FormLogin />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
