import Link from "next/link";

const hero = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <>
      <div className="landing-page pb-10">
        <div className="hero-section gap-5 md:gap-32">
          <div
            className="hero-text "
            style={{
              backgroundColor: "white",
              backgroundSize: "contain",
              backgroundClip: "text",
            }}
          >
            Regalia
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
          {isLoggedIn ? (
            <Link href="/registered-events" className="primary-button mb-10">
              Registered Events
            </Link>
          ) : (
            <button className="primary-button mb-10">Register Now</button>
          )}
        </div>
      </div>
    </>
  );
};

export default hero;
