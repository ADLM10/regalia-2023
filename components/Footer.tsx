import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="z-10 flex relative mt-6 w-full flex-wrap justify-between items-center bg-black rounded-tr-3xl rounded-tl-3xl p-6 shadow md:flex md:items-center md:justify-between md:px-12 text-white">
      <span className="text-min-sm text-accent sm:text-center md:text-max-sm text-violet-600 font-normal">
        © 2023
        <a href="#" className="neon">
          Regalia™
        </a>
        . All Rights Reserved.
      </span>

      <main className="mt-3 md:mt-0">
        <p className="text-min-sm font-light text-gray md:text-max-sm">
          Made with <span className="text-red-600">&hearts;</span> by Regalia
          tech team
        </p>
      </main>

      <ul className="mt-3 flex flex-wrap items-center text-min-sm text-text md:mt-0 md:text-max-sm">
        <li>
          <a
            href="https://www.facebook.com/regalia.rccfests"
            target="_blank"
            rel="noreferrer"
            className="mr-4 neon md:mr-6 hover:color-[blueviolet]"
          >
            Facebook
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/regalia_rcciit/"
            className="mr-4 neon md:mr-6 hover:color-[blueviolet]"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </li>
        <li>
          <Link href="/#contact" className="hover:color-[blueviolet]">
            Contact
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
