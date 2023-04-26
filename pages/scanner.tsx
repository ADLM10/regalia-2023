import data from "../public/data.json";
import Head from "next/head";
import React from "react";
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
import { sleep } from "@/utils/sleep";

const Scanner = ({
  user,
  isLoading,
}: {
  user: User | null;
  isLoading: boolean;
}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

  const [entryDetail, setEntryDetail] = useState({
    id: "",
    name: "",
    entryDays: [],
  });

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const d = new Date();
  const date = d.getDate();

  const handleClick = async () => {
    if (date === 26) {
      const entryStatus = [true, entryDetail.entryDays[1]];
      const res = await updateEntryDetails(entryDetail.id, entryStatus);
      if (
        Array.isArray(res) &&
        res.length > 0 &&
        _.isEqual(res[0]?.entry || [], entryStatus)
      ) {
        toast.success("Entry Success");
        setOpen(false);
      } else {
        toast.error("Something went wrong");
        setOpen(false);
      }
    } else if (date === 27) {
      const entryStatus = [entryDetail.entryDays[0], true];
      const res = await updateEntryDetails(entryDetail.id, entryStatus);
      if (
        Array.isArray(res) &&
        res.length > 0 &&
        _.isEqual(res[0]?.entry || [], entryStatus)
      ) {
        toast.success("Entry Success");
        setOpen(false);
      } else {
        toast.error("Something went wrong");
        setOpen(false);
      }
    }
  };

  const Modal = () => {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center">
        <div
          className=" w-full h-1/2 rounded-lg shadow-lg flex flex-col justify-evenly items-center mx-5 p-5 md:w-1/2 event-modal bg-gradient-to-br from-black to-fuchsia-950 backdrop-blur-sm "
          //   style={{overflowY: "scroll"}}
        >
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
              }}
            >
              Close
            </button>
          </div>
          <div>
            <h1 className="text-lg font-normal text-white py-3 text-left md:text-4xl m-5">
              {entryDetail.name}
            </h1>
            <div className="flex flex-col justify-evenly items-center w-full h-20 md:flex-row">
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded "
                style={{ fontFamily: "Unbounded,cursive" }}
                onClick={() => handleClick()}
              >
                Approve
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-5"
                style={{ fontFamily: "Unbounded,cursive" }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const { ref } = useZxing({
    onResult(result) {
      const arr = result
        .getText()
        .replace(/[\[\]']+/g, "")
        .split(", ");
      if (validateEmail(arr[1])) {
        toast.error("Invalid Email!");
        return;
      }
      Array.isArray(arr) &&
        arr.length > 1 &&
        checkEntry(arr[1]).then((res) => {
          if (date === 26 && !res[0].entry[0]) {
            setOpen(true);
            setEntryDetail({
              id: res[0].id,
              name: res[0].name,
              entryDays: res[0].entry,
            });
          } else if (date === 27 && !res[0].entry[1]) {
            setOpen(true);
            setEntryDetail({
              id: res[0].id,
              name: res[0].name,
              entryDays: res[0].entry,
            });
          } else {
            toast.error("Already Scanned!");
          }
        });
    },
  });

  useEffect(() => {
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
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <>
      <Head>
        <title>Scanner</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gradient-to-tl from-fuchsia-950 to-black pt-32">
        <div className="flex flex-col gap-4 items-center h-screen ">
          <div className="rounded-3xl p-4 w-96 h-fit flex flex-col gap-3 items-center justify-evenly m-4 shadow-2xl">
            <video className="h-64  rounded-3xl" ref={ref} />
            <form
              action=""
              className="flex flex-col gap-3 items-center justify-center"
            >
              <input
                type="email"
                className="bg-white p-2 rounded-2xl w-64"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  fontFamily: "Unbounded, cursive",
                }}
              />
              <input
                type="tel"
                className="bg-white p-2 rounded-2xl w-64"
                placeholder="Enter Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  fontFamily: "Unbounded, cursive",
                }}
              />
              <button
                className="bg-white p-2 rounded-2xl w-64
                hover:bg-[blueviolet] hover:text-white transition duration-300 ease-in-out
                "
                onClick={(e) => {
                  e.preventDefault();
                  console.log(email, phone);
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        {open && <Modal />}
        <ToastContainer />
      </main>
    </>
  );
};

export default Scanner;
