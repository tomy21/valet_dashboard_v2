"use client";

import React, { Suspense, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "./component/Card";
import { DateTime } from "luxon";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt, FaAngleDown } from "react-icons/fa";
import LocationList from "./component/LocationList";
import { formatNumber } from "../components/function";
import LabelChart from "./component/labelChart";
import ChartDashboaard from "./component/ChartDashboard";
import ListLocation from "./component/ListLocation";
import PieDashboard from "./component/PiePayment";
import ListOfficer from "./component/ListPetugas";
import Dropdown from "../components/Dropdown";
import { jwtDecode } from "jwt-decode";
import { LoadingCard, LoadingLable } from "../components/LoadingCard";
import { useRouter } from "next/navigation";
import { ScaleLoader } from "react-spinners";

export default function Dashboard() {
  const [token, setToken] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [expired, setExpired] = useState("");
  const [valet, setValet] = useState(0);
  const [vip, setVIP] = useState(0);
  const [vvip, setVVIP] = useState(0);
  const [income, setIncome] = useState(0);
  const [trx, setTrx] = useState(0);
  const [avgValet, setAvgValet] = useState(0);
  const [avgVip, setAvgVip] = useState(0);
  const [avgVvip, setAvgVvip] = useState(0);
  const [avgInTrx, setAvgInTrx] = useState(0);
  const [inTrx, setInTrx] = useState(0);
  const [out, setOut] = useState(0);
  const [overNight, setOverNight] = useState(0);
  const [overDay, setOverDay] = useState(0);
  const [avgIncome, setAvgIncome] = useState(0);
  const [locationData, setLocation] = useState("");
  const [activeButton, setActiveButton] = useState("daily");
  const [startDate, setStartDate] = useState(new Date());
  const [selectLocation, setSelectLocation] = useState("");
  const [detail, setDetail] = useState([]);
  const [listLocation, setListLocation] = useState([]);
  const [listOfficer, setListOfficer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const dateTime = DateTime.fromJSDate(startDate, { zone: "Asia/Jakarta" });
  const Navbar = () => {
    useEffect(() => {
      // Menghapus atribut `bis_skin_checked` dari semua elemen
      document.querySelectorAll("[bis_skin_checked]").forEach((el) => {
        el.removeAttribute("bis_skin_checked");
      });
    }, []);
  };
  const formattedDate = dateTime.toFormat("yyyy-MM-dd");
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const tokenResponse = await axios.get(
          "http://localhost:3008/api/token",
          { withCredentials: true }
        );
        const newToken = tokenResponse.data.accessToken;
        setToken(newToken);
        const decodedJwt = jwtDecode(newToken);
        setUserName(decodedJwt.name);
        setEmail(decodedJwt.email);
        setExpired(decodedJwt.exp);

        // Fetch dashboard data using the new token
        const response = await axios.get(
          `http://localhost:3008/api/dailyDashboard?locationCode=${selectLocation}&date=${formattedDate}`,
          {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          }
        );
        setListLocation(response.data.response.listLocation);
        setListOfficer(response.data.response.listOfficer);
        setValet(response.data.response.summary.Valet);
        setVIP(response.data.response.summary.VIP);
        setVVIP(response.data.response.summary.VVIP);
        setIncome(response.data.response.summary.totalTariff);
        setTrx(response.data.response.summary.totalTrxIn);
        setAvgValet(response.data.response.average.valet);
        setAvgInTrx(response.data.response.average.trxIn);
        setAvgVip(response.data.response.average.vip);
        setAvgVvip(response.data.response.average.vvip);
        setAvgIncome(response.data.response.average.tariff);
        setInTrx(response.data.response.summary.totalTrxIn);
        setOut(response.data.response.summary.totalTrxOut);
        setOverDay(response.data.response.summary.totalOverDay);
        setOverNight(response.data.response.summary.totalON);
        setDetail(response.data.response.detail);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (error.response && error.response.status === 401) {
          // Unauthorized error, redirect to login
          router.push("/");
        }
      }
    };

    fetchData();
  }, [router, selectLocation, startDate, formattedDate]);

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  const handleChange = (selectedOption) => {
    onSelectLocation(selectedOption.value);
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationResponse = await axios.get(
          "http://localhost:3008/api/getAllLocation"
        );
        setLocation(locationResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLocations();
  }, []);

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <div className="relative">
      <input
        type="text"
        ref={ref}
        defaultValue={value}
        onClick={onClick}
        className="border border-gray-300 text-start text-xs items-center w-40 h-10 pl-8 pr-3 py-1 rounded-md"
      />
      <FaRegCalendarAlt className="absolute top-3 left-2 text-gray-500" />
      <FaAngleDown className="absolute top-3 right-1 text-gray-500" />
    </div>
  ));

  CustomInput.displayName = "CustomInput";

  return (
    <>
      <Navbar username={username} email={email} />
      <div className="container mx-auto h-[89vh] min-w-screen">
        <div className="flex justify-between mx-auto items-center w-full ">
          <div className="flex flex-col my-2">
            <p className="text-base text-stone-500 font-medium">Dashboard</p>
            <h1 className="text-sm">
              {DateTime.local().toFormat("EEEE, dd LLLL yyyy")}
            </h1>
          </div>

          <div className="flex flex-row items-center gap-3 z-10">
            <LocationList
              data={locationData}
              onSelectLocation={(locCode) => setSelectLocation(locCode)}
            />

            {activeButton === "daily" && (
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd-MMMM-yyyy"
                popperPlacement="bottom-start"
                className="custom-date-picker"
                customInput={<CustomInput />}
              />
            )}
            {activeButton === "monthly" && (
              <DatePicker
                showMonthYearPicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MMMM-yyyy"
                popperPlacement="bottom-start"
                className="custom-date-picker"
                customInput={<CustomInput />}
              />
            )}
            {activeButton === "yearly" && (
              <DatePicker
                showYearPicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy"
                popperPlacement="bottom-start"
                className="custom-date-picker"
                customInput={<CustomInput />}
              />
            )}

            <Dropdown />

            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className={`px-4 py-[10px] text-xs font-medium ${
                  activeButton === "daily"
                    ? "bg-black text-white border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white rounded-s-md"
                    : "text-gray-400 bg-transparent border border-gray-400 rounded-s-md"
                }`}
                onClick={() => {
                  handleButtonClick("daily");
                }}
              >
                Daily
              </button>
              <button
                type="button"
                className={`px-4 py-[10px] text-xs font-medium ${
                  activeButton === "monthly"
                    ? " bg-black text-white border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
                    : "text-gray-400 bg-transparent border-t border-b border-gray-400"
                }`}
                onClick={() => {
                  handleButtonClick("monthly");
                }}
              >
                Monthly
              </button>
              <button
                type="button"
                className={`px-4 py-[10px] text-xs font-medium ${
                  activeButton === "yearly"
                    ? "bg-black text-white border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white rounded-e-md"
                    : "text-gray-400 bg-transparent border border-gray-400 rounded-e-md"
                }`}
                onClick={() => {
                  handleButtonClick("yearly");
                }}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-start gap-2 w-full mx-auto">
          <div className="flex flex-col space-y-2">
            {isLoading ? (
              <LoadingCard />
            ) : (
              <Card
                title={"Total Income"}
                value={formatNumber(income) ? formatNumber(income) : 0}
                status={"day"}
                avg={avgIncome}
              />
            )}

            {isLoading ? (
              <LoadingCard />
            ) : (
              <Card
                title={"Total Transaction"}
                value={formatNumber(trx) ? formatNumber(trx) : 0}
                status={"day"}
                avg={avgInTrx}
              />
            )}

            {isLoading ? (
              <LoadingCard />
            ) : (
              <Card
                title={"Valet"}
                value={valet ? valet : 0}
                status={"day"}
                avg={avgValet}
              />
            )}

            {isLoading ? (
              <LoadingCard />
            ) : (
              <Card title={"VIP"} value={vip} status={"day"} avg={avgVip} />
            )}

            {isLoading ? (
              <LoadingCard />
            ) : (
              <Card title={"VVIP"} value={vvip} status={"day"} avg={avgVvip} />
            )}
          </div>
          <div className="flex flex-col w-[65%] gap-y-2">
            <Suspense fallback={<LoadingCard />}>
              {isLoading ? (
                <div className="h-[40vh] w-full bg-white flex flex-col px-2 py-2 gap-y-2 rounded-md mx-auto justify-center items-center">
                  <ScaleLoader size={50} color={"#333"} loading={true} />
                </div>
              ) : (
                <div className="h-[40vh] w-full bg-white flex flex-col px-2 py-2 gap-y-2 rounded-md">
                  <div className="flex flex-row justify-between items-end">
                    <LabelChart value={trx} title={"In"} avg={avgInTrx} />
                    <LabelChart value={out} title={"Out"} avg={0.999} />
                    <LabelChart
                      value={overNight}
                      title={"Over Night"}
                      avg={0.999}
                    />
                    <LabelChart
                      value={overDay}
                      title={"Over Days"}
                      avg={0.999}
                    />
                    {/* <LabelChart value={900} title={"Avg Duration"} avg={0.999} /> */}
                    <div className="bg-white rounded-sm py-1">
                      <div className="flex flex-row justify-start items-center gap-x-3">
                        <div className="flex flex-row items-center gap-x-2">
                          <div className="relative bg-blue-100 w-4 h-4 rounded-full">
                            <div className="absolute bg-blue-700 w-2 h-2 rounded-full top-1 left-1"></div>
                          </div>
                          <h1 className="text-xs">In</h1>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                          <div className="relative bg-red-100 w-4 h-4 rounded-full">
                            <div className="absolute bg-red-700 w-2 h-2 rounded-full top-1 left-1"></div>
                          </div>
                          <h1 className="text-xs">Out</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ChartDashboaard detailData={detail} />
                </div>
              )}
            </Suspense>
            {/* <Suspense fallback={<LoadingCard />}>
              {isLoading ? (
                <div className="h-full w-full bg-white px-2 py-2 rounded-md flex mx-auto justify-center items-center">
                  <ScaleLoader size={50} color={"#333"} loading={true} />
                </div>
              ) : (
                <div className="h-full bg-white px-2 py-2 rounded-md">
                  <PieDashboard />
                </div>
              )}
            </Suspense> */}
          </div>
          <div className="flex flex-col w-[40%] gap-y-2">
            <Suspense>
              {isLoading ? (
                <div className="h-[40vh] w-full bg-white flex flex-col px-2 py-2 gap-y-2 rounded-md mx-auto justify-center items-center ">
                  <ScaleLoader size={50} color={"#333"} loading={true} />
                </div>
              ) : (
                <div className="h-[40vh] bg-white flex flex-col px-2 py-2 gap-y-2 rounded-md ">
                  <h1 className="text-xs">List Location by Amount</h1>
                  <ListLocation listLocation={listLocation} />
                </div>
              )}
            </Suspense>
            <Suspense>
              {isLoading ? (
                <div className="h-[36vh] w-full bg-white flex flex-col px-2 py-2 gap-y-2 rounded-md mx-auto justify-center items-center">
                  <ScaleLoader size={50} color={"#333"} loading={true} />
                </div>
              ) : (
                <div className="h-[36vh] bg-white flex flex-col px-2 py-2 gap-y-2 rounded-md ">
                  <h1 className="text-xs">List officer</h1>
                  <ListOfficer listOfficer={listOfficer} />
                </div>
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
