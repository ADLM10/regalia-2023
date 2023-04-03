import { Database } from "@/types/supabase";
import { getNumberWithOrdinal } from "@/utils/dataHelper";
import { newSoloRegistration } from "@/utils/newRegistration";
import Image from "next/image";
import React, { useState } from "react";

const EventRegistrationModal = ({
  open,
  setOpen,
  event,
  setShowPayment,
  setAmount,
  registeredEvents,
  setRegisteredEvents,
  registeredByEmail,
  participatedEvents,
  setParticipatedEvents,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  event: Database["public"]["Tables"]["events"]["Row"];
  setShowPayment: any;
  setAmount: any;
  /* ID of registered Events
   * Modified after new registration */
  registeredEvents: number[];
  setRegisteredEvents: any;
  registeredByEmail: string;
  participatedEvents: Database["public"]["Tables"]["participation"]["Row"][];
  setParticipatedEvents: (
    participatedEvents: Database["public"]["Tables"]["participation"]["Row"][]
  ) => void;
}) => {
  const renderFormFields = (size: number) => {
    return Array(size)
      .fill(0)
      .map((_, index) => {
        return (
          <div className="sm:col-span-4 mt-2" key={`input__field__${index}`}>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white font-sans"
            >
              {getNumberWithOrdinal(index + 1)} Member Email
            </label>
            <div className="mt-2 ">
              <input
                id="email"
                name="email"
                type="email"
                readOnly={index === 0}
                defaultValue={
                  registeredByEmail && index === 0 ? registeredByEmail : ""
                }
                className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 font-sans"
                placeholder="Email address"
                required={index <= event.min_members - 1}
                onChange={(e) => {
                  const newTeam = [...team];
                  newTeam[index] = e.target.value;
                  setTeam(newTeam);
                }}
              />
            </div>
          </div>
        );
      });
  };

  const [isRulesVisible, setIsRulesVisible] = React.useState(true);
  // To check if the rules are visible or not

  const [teamName, setTeamName] = useState<string>("");
  const [team, setTeam] = useState<any[]>([""]);

  return (
    <>
      {open && (
        <div className="fixed top-0 left-0 w-full h-full  bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center">
          <div className=" w-full  max-h-[40rem] rounded-lg shadow-lg flex flex-col bg-gradient-to-br from-black to-fuchsia-950 justify-evenly items-center mx-5 p-5 md:w-1/2 event-modal  backdrop-blur-sm ">
            <div className="w-full flex flex-row justify-between items-center p">
              <div className="w-24 h-24 relative">
                <Image
                  src="https://i.imgur.com/G42sxIN.png"
                  alt="regalia logo"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <h1 className="text-lg font-normal text-white py-3 text-left md:text-4xl">
                {event.name}
              </h1>
              <button
                type="button"
                className="inline-flex justify-center p-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                onClick={() => {
                  setOpen(false);
                  setIsRulesVisible(true);
                }}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {event.type === "SOLO" ? (
              <div className="w-full h-96 flex flex-col justify-evenly items-center">
                <span
                  className="text-sm font-normal text-white text-left"
                  style={{ fontFamily: "Unbounded, cursive" }}
                >
                  <b>Registration Fees : </b>₹ {event.fees}
                </span>
                <span
                  className="text-sm font-normal text-white text-left"
                  style={{ fontFamily: "Unbounded, cursive" }}
                >
                  <b>Prize Pool : </b>₹ {event.prize_pool}
                </span>
                <div
                  className="h-96 mt-10 w-full text-white text-left text-sm font-extralight overflow-y-scroll leading-7"
                  style={{
                    fontFamily: "Unbounded, cursive",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: event.rules_regulations,
                  }}
                ></div>
              </div>
            ) : (
              isRulesVisible && (
                <div className="w-full h-96 flex flex-col justify-evenly items-center">
                  <span
                    className="text-sm font-normal text-white text-left"
                    style={{ fontFamily: "Unbounded, cursive" }}
                  >
                    <b>Registration Fees : </b>₹ {event.fees}
                  </span>
                  <span
                    className="text-sm font-normal text-white text-left"
                    style={{ fontFamily: "Unbounded, cursive" }}
                  >
                    <b>Prize Pool : </b>₹ {event.prize_pool}
                  </span>
                  <div
                    className="h-96 mt-10 w-full text-white text-left text-sm font-extralight overflow-y-scroll leading-7"
                    style={{
                      fontFamily: "Unbounded, cursive",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: event.rules_regulations,
                    }}
                  ></div>
                </div>
              )
            )}
            {event.type === "SOLO" && !isRulesVisible && (
              <button
                type="submit"
                className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-3 sm:text-sm"
                onClick={() => {
                  newSoloRegistration({
                    event_id: event.id,
                    email: registeredByEmail,
                  }).then(() => {
                    // toast.success("Registration Successful!");
                    setOpen(false);
                    setShowPayment(true);
                    // setAmount((prev: number) => prev + parseInt(event.fees));
                    setRegisteredEvents((prev: any) => [...prev, event.id]);
                    // updateParticipatedEvents(event.id);
                  });
                }}
              >
                Register Now!
              </button>
            )}
            {event.type === "TEAM" && !isRulesVisible && (
              <p className="text-red-700 mt-4 text-sm">
                All the emails should be registered on platform to continue
                registration!
              </p>
            )}
            {!isRulesVisible && (
              <p className="mt-2 overflow-y-scroll w-full">
                {event.type === "TEAM" && (
                  <form
                    className="w-full"
                    // onSubmit={handleSubmit}
                  >
                    <div className="sm:col-span-3 mt-4">
                      <label
                        htmlFor="Team Name"
                        className="block text-sm font-medium leading-6 text-white font-sans"
                      >
                        Team Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="TeamName"
                          required={true}
                          id="TeamName"
                          autoComplete="off"
                          className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full font-sans"
                          placeholder="Team Name"
                          onChange={(e) => setTeamName(e.target.value)}
                        />
                      </div>
                    </div>
                    {renderFormFields(event.team_size)}
                    <div className="sm:col-span-6 flex flex-row justify-center mt-8 gap-x-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-3 sm:text-sm"
                        onClick={() => {
                          setOpen(false);
                          setIsRulesVisible(true);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-3 sm:text-sm"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                )}
              </p>
            )}
            {isRulesVisible && (
              <span className="mt-4">
                <input
                  type="checkbox"
                  name="rules"
                  id="rules"
                  className="w-5 h-5 mx-5 font-sans"
                  onChange={() => {
                    setIsRulesVisible(!isRulesVisible);
                  }}
                />
                <label
                  htmlFor="rules"
                  className="text-white text-sm font-normal"
                >
                  I have read the rules and regulations
                </label>
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EventRegistrationModal;
