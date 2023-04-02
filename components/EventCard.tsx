import Image from "next/image";
import { useState } from "react";
import EventDataModal from "./Modals/EventDataModal";

const EventCard = ({ eventData }: any) => {
  const { name, details, poster_image, id } = eventData;

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex flex-col justify-start items-center w-96 h-[550px] m-16 bg-white rounded-3xl shadow-lg p-4 z-10">
        <div
          className="w-full h-80  rounded-3xl relative "
          style={{
            overflow: "hidden",
          }}
        >
          <Image
            src={poster_image}
            alt="Event Poster"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-3xl event_poster"
            onClick={() => {
              setShowModal(true);
            }}
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-black mt-4">{name}</h1>
          <p
            className="text-sm text-black mt-2 font-normal"
            style={{
              fontFamily: "Unbounded, cursive",
            }}
          >
            {details}
          </p>
        </div>
      </div>
      <EventDataModal
        eventData={eventData}
        showModal={showModal}
        closeModal={() => {
          setShowModal(false);
        }}
      />
    </>
  );
};

export default EventCard;
