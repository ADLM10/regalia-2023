import { Database } from "@/types/supabase";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import EventRulesModal from "./Modals/EventRulesModal";

const Card = ({
  eventData,
  setEventData,
  setOpen,
  isLoggedIn,
  isParticipated,
  id,
}: {
  eventData: Database["public"]["Tables"]["events"]["Row"];
  setEventData: (
    eventData: Database["public"]["Tables"]["events"]["Row"]
  ) => void;
  setOpen: (open: boolean) => void;
  isLoggedIn: boolean;
  isParticipated: boolean;
  id?: string;
}) => {
  const { name, details, poster_image, multiple_registrations_allowed } =
    eventData;

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="card z-10" id={id}>
        <Image src={poster_image ?? ""} alt="" width={200} height={200} />
        <div>
          <h2 className="text-3xl font-bold">{name}</h2>
          <p>{details}</p>
          {isLoggedIn ? (
            isParticipated ? (
              multiple_registrations_allowed ? (
                <button
                  className="hover:bg-[blueviolet]"
                  onClick={() => {
                    setEventData(eventData);
                    setOpen(true);
                  }}
                >
                  Register Now
                </button>
              ) : (
                <span className="bg-green-700 rounded-2xl py-3 px-5 text-white mt-5">
                  Registered
                </span>
              )
            ) : (
              <button
                className="hover:bg-[blueviolet]"
                onClick={() => {
                  setEventData(eventData);
                  setOpen(true);
                }}
              >
                Register Now
              </button>
            )
          ) : (
            <button
              className="hover:bg-[blueviolet]"
              onClick={() => {
                setShowModal(true);
              }}
            >
              View Details
            </button>
          )}
        </div>
      </div>
      <EventRulesModal
        eventData={eventData}
        showModal={showModal}
        closeModal={() => {
          setShowModal(false);
        }}
      />
    </>
  );
};

export default Card;
