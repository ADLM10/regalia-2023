import { Database } from "@/types/supabase";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

const EventRegistrationModal = dynamic(
  () => import("./EventRegistrationModal/EventRegistrationModal"),
  {
    ssr: false,
    loading: () => <></>,
  }
);

const Card = ({
  eventData,
}: {
  eventData: Database["public"]["Tables"]["events"]["Row"];
}) => {
  const { name, details, poster_image } = eventData;

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="card z-10">
        <Image src={poster_image ?? ""} alt="" width={200} height={200} />
        <div>
          <h2 className="text-3xl font-bold">{name}</h2>
          <p>{details}</p>
          <button
            className="hover:bg-[blueviolet]"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Register Now
          </button>
        </div>
      </div>
      <EventRegistrationModal
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
