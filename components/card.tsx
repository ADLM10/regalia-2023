import Image from "next/image";
import BandBash from "./../public/images/regalia-bandbash.jpg";
const card = ({
  heading,
  description,
  imageSrc,
  button,
  className = "",
  style = {},
}: {
  // gradientStyle?: React.CSSProperties ;
  heading?: string | JSX.Element;
  button?: string | JSX.Element;
  imageSrc?: string;
  description?: string | JSX.Element;
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <div className="card">
      <Image src={BandBash} alt="" />
      <div>
        <h2 className="text-3xl font-bold">{heading}</h2>
        <p>{description}</p>
        <button onClick={() => {}}>Register Now</button>
      </div>
    </div>
  );
};

export default card;
