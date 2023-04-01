import Image from "next/image";
import BandBash from "./../public/images/regalia-bandbash.jpg";
import Pass from "./../components/pass";
import Card from "./../components/card";
import ContactUs from "./ContactUs";

import Tabs from "./../components/Tabs";
import { Data } from "./../utils/data/Data";

interface Item {
  heading: string;
  description: string;
  imageSrc?: string;
}
const hero = () => {
  return (
    <>
      <div className="landing-page">
        <div className="hero-section">
          <div
            className="hero-text"
            style={{
              backgroundImage: `url(/images/regalia.jpg)`,
              backgroundSize: "cover",
              backgroundClip: "text",
            }}
          >
            regalia
            <br />
            2023
          </div>
          <div id="circle">
            <svg
              className="text-circle"
              xmlns="http://www.w3.org/2000/svg"
              xmlLang="en"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 500 500"
            >
              <path
                d="M984.08,540.5V499.25h28.5v93.33H919.25v-28.5H960.5l-53.08-53.25,23.41-23.41Z"
                transform="translate(-713 -300)"
                style={{ fill: "#fff" }}
              />
              <defs>
                <path
                  id="textcircle"
                  d="M250,400
                          a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z"
                  transform="rotate(12,250,250)"
                />
              </defs>
              <g className="textcircle">
                <text textLength="900">
                  <textPath
                    xlinkHref="#textcircle"
                    aria-label="regalia-tagline"
                    textLength="900"
                  >
                    rhythm. rhmye. reverb.
                  </textPath>
                </text>
              </g>
            </svg>
          </div>
        </div>
        <button className="primary-button">Register Now</button>
        <div className="content">
          <p className="content-box1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="5"
              height="5"
              viewBox="0 0 20 20"
            >
              <path
                fill="white"
                d="m7 6l1-2H6C3.79 4 2 6.79 2 9v7h7V9H5c0-3 2-3 2-3zm7 3c0-3 2-3 2-3l1-2h-2c-2.21 0-4 2.79-4 5v7h7V9z"
              />
            </svg>
            Regalia 2023 is the annual cultural fest of RCCIIT, which is a
            highly anticipated event among the college students and faculties.
            The fest is scheduled to be held in the month of April.The
            organizing committee of Regalia 2023 has put in months of effort and
            planning to ensure that the fest is a grand success and provides a
            memorable experience for all participants. Regalia 2023 promises to
            be a celebration of art, culture, creativity, and talent.
          </p>
          <Image
            className="image"
            // Absolute URL
            src={BandBash}
            alt="User profile picture"
            width={1500}
          />
          <p className="content-box2">
            The theme of Regalia 2023 is Rhyme . Rhythm . Reverb and the fest
            promises to be an exciting and colorful extravaganza of music,
            dance, drama, fashion show and more . There will be a wide range of
            events and activities, including a fashion show, a group dance
            competition, a battle of bands, an instrumental competition and
            more.The fest will also feature performances by renowned artists and
            celebrities.
          </p>
          {/* <p className='content-box'>
        The fest will also feature performances by renowned artists and
  celebrities. The organizing committee of Regalia 2023 has put in
  months of effort and planning to ensure that the fest is a grand
  success and provides a memorable experience for all participants.
  Regalia 2023 promises to be a celebration of art, culture, creativity,
  and talent.
      </p> */}
        </div>
        <Pass />
        <header className="text-3xl font-bold underline">Events</header>
        </div>
        <Pass />
        <header>Events</header>
        <div className="event-card">
          {Data.map((item: Item, index: number) => (
            <Card
            key={index}
            imageSrc={item.imageSrc}
            heading={item.heading}
            description={item.description}
            />
            ))}
        </div>
            <ContactUs />
        <Tabs />
    </>
  );
};

export default hero;
