import { Database } from "@/types/supabase";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

const Card = ({
  eventData,
  setEventData,
  setOpen,
}: {
  eventData: Database["public"]["Tables"]["events"]["Row"];
  setEventData: (
    eventData: Database["public"]["Tables"]["events"]["Row"]
  ) => void;
  setOpen: (open: boolean) => void;
}) => {
  const { name, details, poster_image } = eventData;

  return (
    <div className="card z-10">
      <Image src={poster_image ?? ""} alt="" width={200} height={200} />
      <div>
        <h2 className="text-3xl font-bold">{name}</h2>
        <p>{details}</p>
        <button
          className="hover:bg-[blueviolet]"
          onClick={() => {
            setEventData(eventData);
            setOpen(true);
          }}
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

export default Card;
