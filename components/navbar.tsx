import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { login } from "@/utils/login";

export default function NavBar({ user }: { user: User | null }) {
  console.log(typeof user);
  const [navbar, setNavbar] = useState(false);

  return (
    <nav className="w-full bg-transparent shadow fixed z-20 bg-gradient-to-tr from-black to-fuchsia-950">
      <div className="justify-between px-4 mx-auto lg:max-wfull md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <a href="#">
              <Image
                src="https://i.imgur.com/cEHsdDm.png"
                alt="rcciit"
                width={250}
                height={100}
              />
            </a>
            <div className="md:hidden">
              <div
                className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden"
                onClick={() => setNavbar(!navbar)}
              >
                <span
                  className={`h-1 w-full bg-white rounded-lg transform transition duration-300 ease-in-out ${
                    navbar ? "rotate-45 translate-y-3.5" : ""
                  }`}
                />
                <span
                  className={`h-1 w-full bg-white rounded-lg transition-all duration-300 ease-in-out ${
                    navbar ? "w-0 translate-x-14" : "w-full"
                  }`}
                />
                <span
                  className={`h-1 w-full bg-white rounded-lg transform transition duration-300 ease-in-out ${
                    navbar ? "-rotate-45 -translate-y-3.5" : ""
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center px-5 md:block md:px-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul
              className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0"
              style={{
                fontFamily: "Unbounded, cursive",
              }}
            >
              <li className="text-white hover:text-blue-600">
                <Link href="/">Home</Link>
              </li>
              <li className="text-white hover:text-blue-600">
                <Link href="/#about">About</Link>
              </li>
              <li className="text-white hover:text-blue-600">
                <Link href="/events">Events</Link>
              </li>

              <li className="text-white hover:text-blue-600">
                <Link href="/#contact">Sponsors</Link>
              </li>
              <li className="text-white hover:text-blue-600">
                <Link href="/#contact">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
        {user ? (
          <button
            className="hidden md:block bg-white text-black px-4 py-2 rounded-lg font-semibold text-sm md:text-base hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
            style={{
              fontFamily: "Unbounded, cursive",
            }}
          >
            Dashboard
          </button>
        ) : (
          <button
            className="hidden md:block bg-white text-black px-4 py-2 rounded-lg font-semibold text-sm md:text-base hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
            style={{
              fontFamily: "Unbounded, cursive",
            }}
            onClick={async () => {
              await login();
            }}
          >
            Register
          </button>
        )}
      </div>
    </nav>
  );
}
