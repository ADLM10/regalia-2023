import Link from "next/link";
import React from "react";

const ContactUs = () => {
  return (
    <div className="w-full md:w-3/4 bg-black text-white rounded-lg py-4">
      <h1 className="text-3xl mx-auto mb-3" style={{ width: "90%" }}>
        Contact Us
      </h1>
      <div
        className="text-3xl flex mx-auto gap-5 flex-wrap items-center justify-between"
        style={{ width: "90%" }}
      >
        <div className="w-full sm:w-full md:w-full lg:w-1/2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.9155003677106!2d88.33170321744385!3d22.58226349999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0278bd07a563ab%3A0xee87bfb4a1de28cb!2sSarat%20Sadan!5e0!3m2!1sen!2sin!4v1680331547473!5m2!1sen!2sin"
            // width="600"
            height="300"
            style={{ border: "0" }}
            className="rounded-lg w-full"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div>
          <div className="">
            <h3 className="text-violet-600">Email</h3>
            <Link
              href={"mailto:rcciit.regalia.official@gmail.com"}
              className="md:font-medium text-base"
            >
              Mail Us
            </Link>
          </div>
          <div className="mt-4">
            <h3 className="text-violet-600">Coordinators</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              <div className="">
                <h4 className="font-bold text-base tracking-wider">Pritam Sarkar</h4>
                <a
                  href={"tel:+91 89189 69446"}
                  className="md:font-medium text-base"
                >
                  +91 89189 69446
                </a>
              </div>
              <div className="">
                <h4 className="font-bold text-base tracking-wider">Sanmoy Mallick</h4>
                <a
                  href={"tel:+91 94330 18776"}
                  className="md:font-medium text-base"
                >
                  +91 94330 18776
                </a>
              </div>
              <div className="">
                <h4 className="font-bold text-base tracking-wider">Adrita Dutta</h4>
                <a
                  href={"tel:+91 98364 45449"}
                  className="md:font-medium text-base"
                >
                  +91 98364 45449
                </a>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ContactUs;
