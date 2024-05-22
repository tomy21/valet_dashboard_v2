import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import axios from "axios";
import Image from "next/image";

function ModalDetail({ id, isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(true); // Ubah nilai awal menjadi true
  const [TrxNo, setTrxNo] = useState("");
  const [VehiclePlate, setVehiclePlate] = useState("");
  const [InTime, setdInTime] = useState("");
  const [foto1, setdFoto1] = useState("");
  const [fotoBuktiPayment1, setdfFotoBuktiPayment1] = useState("");

  useEffect(() => {
    const getDataDetail = async () => {
      try {
        const data = await axios.get(
          `https://dev-valetapi.skyparking.online/api/getTransactionById/${id}`
        );
        setTrxNo(data.data.data.TrxNo);
        setVehiclePlate(data.data.data.VehiclePlate);
        setdInTime(data.data.data.InTime);
        setdFoto1(data.data.data.foto1);
        setdfFotoBuktiPayment1(data.data.data.fotoBuktiPayment1);
        setIsLoading(false); // Atur isLoading menjadi false setelah data selesai dimuat
      } catch (error) {
        console.log(error);
        setIsLoading(false); // Atur isLoading menjadi false jika terjadi kesalahan
      }
    };

    getDataDetail();
  }, [id]);

  console.log(foto1);
  const handleClose = () => {
    onClose();
  };

  const downloadImage = (src) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = src.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-md shadow-lg">
            <div className="flex items-center justify-center mb-3">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          </div>
        </div>
      )}
      <div className="fixed inset-0 flex items-start justify-center z-40 ">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex flex-col items-center justify-center gap-5 bg-white rounded-lg top-12 p-8 max-w-[39vw] w-full">
          <div className="flex flex-col items-start gap-2">
            <div className="flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col">
                <h1>No Transaction</h1>
                <h1 className="text-base font-semibold text-black">{TrxNo}</h1>
              </div>
              <div className="flex flex-col">
                <h1>Plate Number</h1>
                <h1 className="text-base font-semibold text-black">
                  {VehiclePlate}
                </h1>
              </div>
            </div>
            <div className="flex justify-between items-center gap-10 w-full">
              <div className="flex flex-col">
                <h1>Entry Date</h1>
                <h1 className="text-base font-semibold text-slate-400">
                  {DateTime.fromISO(InTime).toFormat("ff")}
                </h1>
              </div>
            </div>
            <div className="flex justify-between items-center gap-10 w-full bg-slate-100 p-5 rounded-md">
              <div className="flex flex-col">
                <h1>Photo Plate</h1>

                <div className="w-40 h-40 bg-black text-white rounded-md flex justify-center items-center mx-auto ">
                  <Image
                    src={
                      foto1
                        ? `https://dev-valetapi.skyparking.online/${foto1.replace(
                            /\\/g,
                            "/"
                          )}`
                        : "/notfound.png"
                    }
                    width={100}
                    height={50}
                    alt="foto bukti"
                    className="w-[100%] h-[100%] rounded-md"
                  ></Image>
                </div>
                {foto1 && (
                  <button
                    onClick={() =>
                      downloadImage(
                        `https://dev-valetapi.skyparking.online/${foto1.replace(
                          /\\/g,
                          "/"
                        )}`
                      )
                    }
                    className="mt-2 bg-blue-500 text-white px-3 py-2 rounded-md"
                  >
                    Download
                  </button>
                )}
              </div>
              <div className="flex flex-col">
                <h1>Photo Payment</h1>
                <div className="w-40 h-40 bg-black text-white rounded-md flex justify-center items-center mx-auto">
                  <Image
                    src={
                      fotoBuktiPayment1
                        ? `https://dev-valetapi.skyparking.online/${fotoBuktiPayment1.replace(
                            /\\/g,
                            "/"
                          )}`
                        : "/notfound.png"
                    }
                    width={100}
                    height={100}
                    alt="foto bukti"
                    className="w-[100%] h-[100%] rounded-md"
                  ></Image>
                </div>
                {fotoBuktiPayment1 && (
                  <button
                    onClick={() =>
                      downloadImage(
                        `https://dev-valetapi.skyparking.online/${foto1.replace(
                          /\\/g,
                          "/"
                        )}`
                      )
                    }
                    className="mt-2 bg-blue-500 text-white px-3 py-2 rounded-md"
                  >
                    Download
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <button
              className="bg-red-500 px-3 py-3 rounded-md text-white hover:bg-red-700"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDetail;
