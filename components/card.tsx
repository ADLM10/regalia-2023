import Image from 'next/image'
import BandBash from './../public/images/regalia-bandbash.jpg'
const card = (
    {
        heading,
        description,
        imageSrc,
        button,
        transform='1',
        lineHeight='',
        className = '',
        backgroundColor = '',
        color = 'white',
        style = {},
        fontSizeClassName = 'text-3xl',
        fontWeight = '600',
        shadow = false,
        borderRadius = '55px',
    }: {
        // gradientStyle?: React.CSSProperties ;
        heading?:string|JSX.Element;
        lineHeight?:string;
        price?: string | JSX.Element;
        button?: string | JSX.Element;
        imageSrc?: string;
        assetimage?:string;
        description?:string | JSX.Element;
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
    }
) => {
  return (
    <div>
    <div className="card">
      <Image src={BandBash} alt='' />
      <div>
        <h2>{heading}</h2>
        <p>
            {description}
        </p>
        <button onClick={() => {}}>Show the property project</button>
      </div>
    </div>
    </div>
  )
}

export default card