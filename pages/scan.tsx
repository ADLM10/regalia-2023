import Head from "next/head";
import React, { useRef } from "react";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserProfile } from "@/utils/UserFunctions";
import { useZxing } from "react-zxing";
import Image from "next/image";
import { checkEntry } from "@/utils/checkEntry";
import { validateEmail } from "@/utils/validateEmail";
import { ToastContainer, toast } from "react-toastify";
import { updateEntryDetails } from "@/utils/updateEntryDetails";
import _ from "lodash";
import { checkEntryWithPhone } from "@/utils/checkEntryWithPhone";

const Scanner = ({
  user,
  isLoading,
}: {
  user: User | null;
  isLoading: boolean;
}) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [entryDetail, setEntryDetail] = useState({
    id: "",
    name: "",
    phone: 0,
    entryDays: [],
    email: "",
  });

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const captured = useRef(false);
  const [showScanner, setShowScanner] = useState(true);

  const d = new Date();
  const date = d.getDate();

  const handleClick = async () => {
    if (date === 27) {
      const entryStatus = [true, entryDetail.entryDays[1]];
      const res = await updateEntryDetails(entryDetail.id, entryStatus);
      if (
        Array.isArray(res) &&
        res.length > 0 &&
        _.isEqual(res[0]?.entry || [], entryStatus)
      ) {
        toast.success("Entry Success");
        setOpen(false);
        captured.current = false;
      } else {
        toast.error("Something went wrong");
        setOpen(false);
        captured.current = false;
      }
    } else if (date === 28) {
      const entryStatus = [entryDetail.entryDays[0], true];
      const res = await updateEntryDetails(entryDetail.id, entryStatus);
      if (
        Array.isArray(res) &&
        res.length > 0 &&
        _.isEqual(res[0]?.entry || [], entryStatus)
      ) {
        toast.success("Entry Success");
        setOpen(false);
        captured.current = false;
      } else {
        toast.error("Something went wrong");
        setOpen(false);
        captured.current = false;
      }
    }
  };

  const Modal = () => {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <div className=" w-full rounded-lg shadow-lg flex flex-col justify-evenly items-center mx-5 p-5 md:w-1/2 bg-white">
          <div className="w-full h-10 flex flex-row justify-between items-center p-5">
            <div className="w-24 h-24 relative">
              <Image
                src="https://i.imgur.com/G42sxIN.png"
                alt="regalia logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
              onClick={() => {
                setOpen(false);
                captured.current = false;
              }}
            >
              Close
            </button>
          </div>
          <div>
            <h1 className="text-lg font-sans font-normal py-3 text-left text-black md:text-4xl mx-4">
              {entryDetail.name}
              <br></br>
              {entryDetail.email.split("@")[0]}
            </h1>
            <div className="flex flex-col justify-evenly items-center w-full md:flex-row">
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded font-sans"
                onClick={() => handleClick()}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const { ref } = useZxing({
    onResult(result) {
      try {
        if (captured.current) return;
        else captured.current = true;
        const arr = result
          .getText()
          .replace(/[\[\]']+/g, "")
          .split(", ");
        if (!validateEmail(arr[1])) {
          toast.error("Invalid Email!");
          return;
        }

        Array.isArray(arr) &&
          arr.length > 1 &&
          checkEntry(arr[1]).then((res) => {
            if (res.length === 0) {
              toast.error("Pass Not Available!");
              return;
            }
            if (date === 27 && !res[0].entry[0]) {
              setOpen(true);
              setEntryDetail({
                id: res[0].id,
                name: res[0].name,
                phone: res[0].phone,
                entryDays: res[0].entry,
                email: res[0].email,
              });
            } else if (date === 28 && !res[0].entry[1]) {
              setOpen(true);
              setEntryDetail({
                id: res[0].id,
                name: res[0].name,
                phone: res[0].phone,
                entryDays: res[0].entry,
                email: res[0].email,
              });
            } else {
              toast.error("Already Scanned!");
            }
          });
      } catch (e) {
        toast.error("Invalid QR Code!");
        console.error(e);
      }
    },
  });

  useEffect(() => {
    try {
      if (navigator.userAgent.indexOf("Firefox") != -1) {
        setShowScanner(false);
      } else {
        if (!isLoading) {
          if (user) {
            getUserProfile(user.id, "role,id,coordinating_event_id").then(
              (profile) => {
                if (profile[0].role === "participant") router.replace("/");
              }
            );
          } else {
            router.replace("/");
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  function checkPhone(phone: string) {
    checkEntryWithPhone(phone).then((res) => {
      if (res.length === 0) {
        toast.error("Pass Not Available!");
        return;
      }
      if (date === 27 && !res[0].entry[0]) {
        setOpen(true);
        setEntryDetail({
          id: res[0].id,
          name: res[0].name,
          phone: res[0].phone,
          entryDays: res[0].entry,
          email: res[0].email,
        });
      } else if (date === 28 && !res[0].entry[1]) {
        setOpen(true);
        setEntryDetail({
          id: res[0].id,
          name: res[0].name,
          phone: res[0].phone,
          entryDays: res[0].entry,
          email: res[0].email,
        });
      } else {
        toast.error("Already Scanned!");
      }
      setPhone("");
    });
  }

  function checkEmail(email: string) {
    checkEntry(email).then((res) => {
      if (res.length === 0) {
        toast.error("Pass Not Available!");
        return;
      }
      if (date === 27 && !res[0].entry[0]) {
        setOpen(true);
        setEntryDetail({
          id: res[0].id,
          name: res[0].name,
          phone: res[0].phone,
          entryDays: res[0].entry,
          email: res[0].email,
        });
      } else if (date === 28 && !res[0].entry[1]) {
        setOpen(true);
        setEntryDetail({
          id: res[0].id,
          name: res[0].name,
          phone: res[0].phone,
          entryDays: res[0].entry,
          email: res[0].email,
        });
      } else {
        toast.error("Already Scanned!");
      }
      setEmail("");
    });
  }

  return (
    <>
      <Head>
        <title>Scanner</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="pt-32">
        <div className="flex flex-col gap-4 items-center">
          {showScanner && <video className="h-64  rounded-3xl" ref={ref} />}
          <p className="font-sans">---- OR ----</p>
          <form className="flex flex-col items-center">
            <input
              type="email"
              className="bg-white p-2 rounded-2xl w-64 font-sans w-full"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="bg-green-700 text-white p-2 rounded-2xl w-64 my-2 transition duration-300 ease-in-out font-sans"
              onClick={(e) => {
                e.preventDefault();
                checkEmail(email);
              }}
            >
              Submit
            </button>
          </form>
          <p className="font-sans">---- OR ----</p>
          <form className="flex flex-col items-center">
            <input
              type="tel"
              className="bg-white p-2 rounded-2xl w-64 font-sans"
              placeholder="Enter Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button
              className="bg-green-700 text-white p-2 rounded-2xl w-64 my-2 transition duration-300 ease-in-out font-sans
                "
              onClick={(e) => {
                e.preventDefault();
                checkPhone(phone);
              }}
            >
              Submit
            </button>
          </form>
        </div>
        {open && <Modal />}
        <ToastContainer />
      </main>
    </>
  );
};

export default Scanner;
