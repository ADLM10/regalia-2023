import { Database } from "@/types/supabase";
import Image from "next/image";

const Card = ({
  eventData,
}: {
  eventData: Database["public"]["Tables"]["events"]["Row"];
}) => {
  const { name, details, poster_image } = eventData;

  return (
    <div className="card">
      <Image src={poster_image ?? ""} alt="" width={200} height={200} />
      <div>
        <h2 className="text-3xl font-bold">{name}</h2>
        <p>{details}</p>
        <button onClick={() => {}}>Register Now</button>
      </div>
    </div>
  );
};

export default Card;
