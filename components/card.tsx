import Image from "next/image";
const card = ({ eventData }: { eventData: any }) => {
  const { name, details, poster_image } = eventData;

  return (
    <div className="card">
      <Image src={poster_image} alt="" />
      <div>
        <h2 className="text-3xl font-bold">{name}</h2>
        <p>{details}</p>
        <button onClick={() => {}}>Register Now</button>
      </div>
    </div>
  );
};

export default card;
