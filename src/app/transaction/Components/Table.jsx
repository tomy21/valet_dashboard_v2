"use client";
import RangeDate from "../../components/RangeDate";
import React, { useEffect, useState } from "react";
import LocationList from "../../dashboard/component/LocationList";
import { DateTime } from "luxon";
import axios from "axios";
import { formatNumber } from "../../components/function";
import ReactPagination from "react-paginate";
import ModalDetail from "../Components/Modaldetail";
import { HiOutlineDownload } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loading";
import { ScaleLoader } from "react-spinners";

export default function Table() {
  const [token, setToken] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [locationData, setLocation] = useState("");
  const [selectLocation, setSelectLocation] = useState("");
  const [transaction, setTransaction] = useState([]);
  const [limit, setLimit] = useState(10);
  const [countData, setCountData] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pages, setPages] = useState(0);
  const [search, setSearch] = useState("");
  const [isModal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const startDateFormat = startDate
    ? DateTime.fromJSDate(new Date(startDate)).toFormat("yyyy-MM-dd")
    : "";
  const endDateFormat = endDate
    ? DateTime.fromJSDate(new Date(endDate)).toFormat("yyyy-MM-dd")
    : "";

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationResponse = await axios.get(
          `http://localhost:3008/api/getAllLocation`
        );
        setLocation(locationResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const tokenResponse = await axios.get(
          "http://localhost:3008/api/token",
          { withCredentials: true }
        );
        const newToken = tokenResponse.data.accessToken;
        const responseData = await axios.get(
          `http://localhost:3008/api/transaction?limit=${limit}&location=${selectLocation}&page=${pages}&keyword=${search}&startDate=${
            startDateFormat ? startDateFormat : ""
          }&endDate=${endDateFormat ? endDateFormat : ""}`,
          {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          }
        );
        setTransaction(responseData.data.data);
        setTotalPages(responseData.data.totalPages);
        setCountData(responseData.data.totalItems);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTransaction();
  }, [
    limit,
    pages,
    selectLocation,
    search,
    startDateFormat,
    endDateFormat,
    token,
  ]);

  const handleLimit = (event) => {
    const selectedLimit = parseInt(event.target.value);
    const newTotalPages = Math.ceil(countData / selectedLimit); // Calculate new total pages based on total data count

    setLimit(selectedLimit);

    // Update current page if it exceeds new total pages
    if (pages > newTotalPages) {
      setPages(1); // Reset to first page
    } else {
      // Ensure first page has active class when changing limit
      changePage({ selected: 0 }); // Set to first page
    }
  };

  const openModal = (transaction) => {
    setSelectedTransaction(transaction);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setSelectedTransaction(null);
  };

  const changePage = ({ selected }) => {
    setPages(selected + 1);
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleExport = async () => {
    // if (selectLocation) {
    try {
      setIsLoading(true); // Memulai loading sebelum mengambil data
      const response = await axios.get(
        `http://localhost:3008/api/exportdata?LocationCode=${selectLocation}`,
        { responseType: "arraybuffer" } // Mengatur responseType sebagai arraybuffer
      );

      // Membuat link untuk mengunduh file
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const fileName = `${selectLocation}_alldata.xlsx`;
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      if (response.data) {
        toast.success("Data berhasil diunduh!", {
          position: "top-right",
        });
      } else {
        toast.error("Gagal mengunduh data.", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan saat mengunduh data.", {
        position: "top-right",
      });
      setIsLoading(false); // Menghentikan loading jika terjadi kesalahan
    } finally {
      setIsLoading(false);
    }
    // } else {
    //   toast.error("Location wajib diisi.", {
    //     position: "top-right",
    //   });
    // }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-row gap-2 justify-start items-center">
          <h1 className="text-xs">Show</h1>
          <select
            name="limit"
            value={limit}
            onChange={handleLimit}
            className="border border-slate-300 rounded-md p-1 text-xs"
          >
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <h1 className="text-xs">entries</h1>
        </div>
        <div className="flex flex-row gap-3 z-10">
          <LocationList
            data={locationData}
            onSelectLocation={(locCode) => setSelectLocation(locCode)}
          />
          <RangeDate
            startDate={startDate}
            endDate={endDate}
            handleDateChange={handleDateChange}
          />

          <button
            type="button"
            onClick={handleExport}
            className="inline-flex gap-2 justify-center items-center w-full px-4 py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none text-xs"
          >
            Export
            <HiOutlineDownload />
          </button>

          <input
            type="search"
            value={search}
            onChange={handleSearchChange}
            className="border border-slate-300 px-3 py-2 rounded-xl text-sm"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="overflow-x-auto max-h-[56vh] w-full">
        <table className="table table-zebra table-xs table-pin-rows table-pin-cols text-xs cursor-pointer">
          <thead className="">
            <tr className="font-semibold p-2">
              <th className="bg-slate-100">No</th>
              <th className="bg-slate-100">Date</th>
              <th className="bg-slate-100">Transaction No</th>
              <th className="bg-slate-100">Ticket No</th>
              <th className="bg-slate-100">Vehicle Plate</th>
              <th className="bg-slate-100">ParkingType</th>
              <th className="bg-slate-100">Tariff</th>
              <th className="bg-slate-100">Status</th>
            </tr>
          </thead>
          <tbody>
            {transaction?.map((list, index) => (
              <tr key={index} onClick={() => openModal(list.Id)}>
                <td>{index + 1}</td>
                <td>{DateTime.fromISO(list.InTime).toFormat("ff")}</td>
                <td>{list.TrxNo}</td>
                <td>{list.TicketNumber ? list.TicketNumber : "-"}</td>
                <td>{list.VehiclePlate}</td>
                <td>
                  <div
                    className={`${
                      list.ParkingType === 1
                        ? "bg-green-100"
                        : list.ParkingType === 2
                        ? "bg-amber-100"
                        : list.ParkingType === 3
                        ? "bg-sky-100"
                        : "other"
                    } rounded-xl ${
                      list.ParkingType === 1
                        ? "text-success"
                        : list.ParkingType === 2
                        ? "text-amber-500"
                        : list.ParkingType === 3
                        ? "text-sky-500"
                        : "other"
                    } text-center py-1 w-[50%]`}
                  >
                    {list.ParkingType === 1
                      ? "Valet"
                      : list.ParkingType === 2
                      ? "VIP"
                      : list.ParkingType === 3
                      ? "VVIP"
                      : "other"}
                  </div>
                </td>
                <td>IDR {formatNumber(list.Tariff)}</td>
                <td className="flex flex-row justify-start items-start gap-5 ">
                  <div>
                    <div
                      className={`absolute rounded-full w-4 h-4 ${
                        list.OutTime === null && list.PaymentOn === null
                          ? "bg-sky-100"
                          : list.OutTime === null && list.PaymentOn != null
                          ? "bg-amber-100"
                          : "bg-green-100"
                      }`}
                    >
                      <div
                        className={`relative rounded-full top-1 left-1 w-2 h-2 ${
                          list.OutTime === null && list.PaymentOn === null
                            ? "bg-sky-500"
                            : list.OutTime === null && list.PaymentOn != null
                            ? "bg-amber-500"
                            : "bg-green-500"
                        }`}
                      ></div>
                    </div>
                  </div>
                  <h1>
                    {list.OutTime === null && list.PaymentOn === null
                      ? "IN"
                      : list.OutTime === null && list.PaymentOn != null
                      ? "PAID"
                      : "OUT"}
                  </h1>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className=" flex items-center justify-between border-t border-gray-200 bg-white py-3  text-xs">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div className="flex flex-row gap-x-3 items-center justify-center">
            <p className=" text-gray-700">
              Showing
              <span className="font-medium px-1">1</span>
              to
              <span className="font-medium px-1">{limit}</span>
              of
              <span className="font-medium px-1">{countData}</span>
              results
            </p>
          </div>
          <div>
            <nav aria-label="Page navigation">
              <ul className="justify-content-center">
                <ReactPagination
                  previousLabel={"Prev"}
                  nextLabel={"Next"}
                  pageCount={totalPages}
                  onPageChange={changePage}
                  containerClassName={
                    "isolate inline-flex -space-x-px rounded-md shadow-sm "
                  }
                  activeClassName={"bg-yellow-500 text-white focus:z-20"}
                  previousClassName={
                    "inline-flex items-center rounded-l-md px-4 py-1 text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  }
                  nextClassName={
                    "inline-flex items-center rounded-r-md px-4 py-1 text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  }
                  pageLinkClassName={
                    "inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 "
                  }
                  disabledLinkClassName={"text-gray-400"}
                />
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-md shadow-lg">
            <div className="flex items-center justify-center mb-3">
              <ScaleLoader size={150} color={"#333"} loading={true} />
            </div>
          </div>
        </div>
      )}

      <ModalDetail
        isOpen={isModal}
        onClose={closeModal}
        id={selectedTransaction}
      />
    </>
  );
}
