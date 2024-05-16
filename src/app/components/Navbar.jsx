"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { usePathname, useRouter } from "next/navigation";
import Loading from "./Loading";
import axios from "axios";

export default function Navbar({ username, email }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef();
  const pathName = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "Transaction",
      path: "/transaction",
    },
    // {
    //   title: "Users",
    //   path: "/dashboard",
    // },
  ];

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await axios.get("http://147.139.135.195:8090/api/logout");
      router.push("/");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-base-100 border-b">
      <div className="container navbar mx-auto">
        <div className="container flex flex-row space-x-10 justify-end items-end">
          <div className="flex">
            <div className="flex flex-row items-end justify-start space-x-2">
              <Image src={"/logo.png"} width={40} height={40} alt="Logo Sky" />
              <h1 className="text-xl font-semibold">SKY Parking</h1>
            </div>
          </div>
          <div className="flex-auto flex-row">
            <ul className="flex flex-row gap-2">
              {menuItems.map((list) => (
                <li
                  key={list.title}
                  className={`hover:bg-slate-100 py-1 px-2 rounded-md ${
                    pathName === list.path ? "bg-slate-100" : ""
                  }`}
                >
                  <Link href={list.path}>{list.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-row justify-center items-center gap-x-3">
          <div className="flex flex-col justify-end items-end">
            <h1 className="text-sm font-semibold">{username}</h1>
            <h1 className="text-xs text-slate-400">{email}</h1>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <Image
                  alt="Poto profile"
                  src={"/logo.png"}
                  width={40}
                  height={40}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-20 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between" onClick={handleLogout}>
                  Logout
                  <CiLogout />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
