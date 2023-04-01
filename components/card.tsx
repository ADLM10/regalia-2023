import Image from "next/image";
import BandBash from "./../public/images/regalia-bandbash.jpg";
const card = ({
  heading,
  description,
  imageSrc,
  button,
  transform = "1",
  lineHeight = "",
  className = "",
  style = {},
  shadow = false,
  borderRadius = "55px",
}: {
  // gradientStyle?: React.CSSProperties ;
  heading?: string | JSX.Element;
  lineHeight?: string;
  price?: string | JSX.Element;
  button?: string | JSX.Element;
  imageSrc?: string;
  assetimage?: string;
  description?: string | JSX.Element;
  text?: string | JSX.Element;
  className?: string;
  disabled?: boolean;
  backgroundColor?: string;
  color?: string;
  style?: React.CSSProperties;
  fontSizeClassName?: string;
  fontWeight?: string;
  shadow?: boolean;
  borderRadius?: string;
  transform?: string;
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
