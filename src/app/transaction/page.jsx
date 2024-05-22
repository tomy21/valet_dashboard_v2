"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { DateTime } from "luxon";
import Table from "./Components/Table";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function Transaction() {
  const [token, setToken] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Menghapus atribut `bis_skin_checked` dari semua elemen
    document.querySelectorAll("[bis_skin_checked]").forEach((el) => {
      el.removeAttribute("bis_skin_checked");
    });
  }, []);

  useEffect(() => {
    const getToken = async () => {
      try {
        const tokenResponse = await axios.get(
          "https://dev-valetapi.skyparking.online/api/token",
          { withCredentials: true }
        );
        const newToken = tokenResponse.data.accessToken;
        setToken(newToken);
        const decodedJwt = jwtDecode(newToken);
        setUserName(decodedJwt.name);
        setEmail(decodedJwt.email);
        setExpired(decodedJwt.exp);
      } catch (error) {
        setIsLoading(false);
        if (error.response && error.response.status === 401) {
          // Unauthorized error, redirect to login
          router.push("/");
        }
      }
    };

    getToken();
  }, []);
  return (
    <>
      <Navbar username={username} email={email} />
      <div className="container mx-auto h-[89vh] min-w-screen">
        <div className="flex justify-between mx-auto items-center ">
          <div className="flex flex-col my-2">
            <p className="text-base text-stone-500 font-medium">Transaction</p>
            <h1 className="text-sm">
              {DateTime.local().toFormat("EEEE, dd LLLL yyyy")}
            </h1>
          </div>
        </div>
        <div className="bg-white rounded-md p-2 mx-auto mt-2 w-full h-[76vh]">
          <Table />
        </div>
      </div>
    </>
  );
}
