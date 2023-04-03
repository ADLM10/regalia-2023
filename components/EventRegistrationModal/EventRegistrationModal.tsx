import { getNumberWithOrdinal } from "@/utils/dataHelper";
import Image from "next/image";
import React from "react";

const EventRegistrationModal = ({
  showModal,
  eventData,
  closeModal,
}: {
  showModal: any;
  eventData: any;
  closeModal: any;
}) => {
  console.log(eventData);

  const {
    type,
    rules_regulations,
    fees,
    min_members,
    name,
    prize_pool,
    team_size,
  } = eventData;

  const renderFormFields = (size: number) => {
    return Array(size)
      .fill(0)
      .map((_, index) => {
        return (
          <div
            className="sm:col-span-4 mt-1 md:w-96"
            key={`input__field__${index}`}
          >
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white"
              style={{
                fontFamily: "Unbouded,cursive",
              }}
            >
              {getNumberWithOrdinal(index + 1)} Member Email
            </label>
            <div className="mt-2 ">
              <input
                id="email"
                name="email"
                type="email"
                readOnly={index === 0}
                //   defaultValue={
                //     registeredByEmail && index === 0 ? registeredByEmail : ""
                //   }
                className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Email address"
                required={index <= min_members - 1}
                //   onChange={(e) => {
                //     const newTeam = [...team];
                //     newTeam[index] = e.target.value;
                //     setTeam(newTeam);
                //   }}
              />
            </div>
          </div>
        );
      });
  };

  const [isRulesVisible, setIsRulesVisible] = React.useState(true);
  // To check if the rules are visible or not

  return (
    <>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center">
          <div
            className=" w-full h-3/4 rounded-lg shadow-lg flex flex-col justify-evenly items-center mx-5 p-5 md:w-1/2 event-modal bg-gradient-to-br from-balck to-fuchsia-200 backdrop-blur-sm "
            //   style={{overflowY: "scroll"}}
          >
            <div className="w-full h-10 flex flex-row justify-between items-center p">
              <div className="w-24 h-24 relative">
                <Image
                  src="https://i.imgur.com/G42sxIN.png"
                  alt="regalia logo"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <h1 className="text-lg font-normal text-white py-3 text-left md:text-4xl">
                {name}
              </h1>
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                onClick={() => {
                  closeModal();
                  setIsRulesVisible(true);
                }}
              >
                Close
              </button>
            </div>
            {type === "SOLO" ? (
              <div className="w-full h-96 flex flex-col justify-evenly items-center">
                <span
                  className="text-sm font-normal text-white text-left"
                  style={{ fontFamily: "Unbounded, cursive" }}
                >
                  <b>Registration Fees : </b>₹ {fees}
                </span>
                <span
                  className="text-sm font-normal text-white text-left"
                  style={{ fontFamily: "Unbounded, cursive" }}
                >
                  <b>Prize Pool : </b>₹ {prize_pool}
                </span>
                <div
                  className="h-96 mt-10 w-full text-white text-left text-sm font-extralight overflow-y-scroll leading-7"
                  style={{
                    fontFamily: "Unbounded, cursive",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: rules_regulations,
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
                    <b>Registration Fees : </b>₹ {fees}
                  </span>
                  <span
                    className="text-sm font-normal text-white text-left"
                    style={{ fontFamily: "Unbounded, cursive" }}
                  >
                    <b>Prize Pool : </b>₹ {prize_pool}
                  </span>
                  <div
                    className="h-96 mt-10 w-full text-white text-left text-sm font-extralight overflow-y-scroll leading-7"
                    style={{
                      fontFamily: "Unbounded, cursive",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: rules_regulations,
                    }}
                  ></div>
                </div>
              )
            )}
            {type === "SOLO" && !isRulesVisible && (
              <button
                type="submit"
                className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-3 sm:text-sm"
                onClick={() => {
                  //   newSoloRegistration({
                  //     event_id: event.id,
                  //   }).then(() => {
                  //     toast.success("Registration Successful!");
                  //     setOpen(false);
                  //     setShowPayment(true);
                  //     setAmount(
                  //       (prev: number) =>
                  //         prev + parseInt(event.fees)
                  //     );
                  //     setRegisteredEvents((prev: any) => [
                  //       ...prev,
                  //       event.id,
                  //     ]);
                  //     updateParticipatedEvents(event.id);
                  //   });
                }}
              >
                Register Now!
              </button>
            )}
            {type === "TEAM" && !isRulesVisible && (
              <p className="text-red-700 mt-4 text-sm">
                All the emails should be registered on platform to continue
                registration!
              </p>
            )}
            {!isRulesVisible && (
              <p className="mt-2 overflow-y-scroll px-3">
                {type === "TEAM" && (
                  <form
                    className="grid grid-cols-1 gap-y-6 sm:grid-cols-6"
                    // onSubmit={handleSubmit}
                  >
                    <div className="sm:col-span-3 mt-4 md:w-96">
                      <label
                        htmlFor="Team Name"
                        className="block text-sm font-medium leading-6 text-white"
                        style={{
                          fontFamily: "Unbouded,cursive",
                        }}
                      >
                        Team Name
                      </label>
                      <div className="mt-2 ">
                        <input
                          type="text"
                          name="TeamName"
                          required={true}
                          id="TeamName"
                          autoComplete="off"
                          className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="Team Name"
                          //   onChange={(e) =>
                          //     setTeamName(e.target.value)
                          //   }
                        />
                      </div>
                    </div>
                    {renderFormFields(team_size)}
                    <div className="sm:col-span-6">
                      <button
                        type="submit"
                        className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-3 sm:text-sm"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="mt-4 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-3 sm:text-sm"
                        onClick={() => {
                          closeModal();
                          setIsRulesVisible(true);
                        }}
                        // ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </p>
            )}

            {isRulesVisible && (
              <span>
                <input
                  type="checkbox"
                  name="rules"
                  id="rules"
                  className="w-5 h-5 mx-5"
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
