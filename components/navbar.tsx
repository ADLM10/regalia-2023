import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { login } from "@/utils/login";
import { signOut } from "@/utils/signout";
import { useRouter } from "next/router";

export default function NavBar({ user }: { user: User | null }) {
  const [navbar, setNavbar] = useState(false);

  const [showSignOut, setShowSignOut] = useState(false);

  useEffect(() => {
    if (user === null) {
      setShowSignOut(false);
    }
    else {
      setShowSignOut(true);
    }
  }, [user]);

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
              className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 py-3"
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
              {user ? (
                <div className="flex flex-col md:hidden my-3 w-full items-center gap-3">
                  <Link
                    className="block md:hidden bg-white text-black px-4 py-2 rounded-lg font-semibold text-sm md:text-base hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
                    style={{
                      fontFamily: "Unbounded, cursive",
                    }}
                    href="/registered-events"
                  >
                    Registered Events
                  </Link>
                  {showSignOut && (
                    <button
                      className="block md:hidden text-center bg-white text-black px-4 py-2 rounded-lg font-semibold text-sm md:text-base hover:bg-red-800 hover:text-white transition duration-300 ease-in-out"
                      style={{
                        fontFamily: "Unbounded, cursive",
                      }}
                      onClick={() => {
                        signOut()
                        .then(() => {
                          window.location.reload();
                        })
                      }}
                    >
                      Sign Out
                    </button>
                  )}
                </div>
              ) : (
                <button
                  className="block md:hidden mt-3  bg-white text-black px-4 py-2 rounded-lg font-semibold text-sm md:text-base hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
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
            </ul>
          </div>
        </div>
        {user ? (
          <div className="hidden md:flex gap-2">
            <Link
              className="hidden md:block bg-white text-black px-4 py-2 rounded-lg font-semibold text-sm md:text-base hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out"
              style={{
                fontFamily: "Unbounded, cursive",
              }}
              href="/registered-events"
            >
              Registered Events
            </Link>
            {showSignOut && (
              <button
                className="hidden md:block bg-white text-black px-4 py-2 rounded-lg font-semibold text-sm md:text-base hover:bg-red-800 hover:text-white transition duration-300 ease-in-out"
                style={{
                  fontFamily: "Unbounded, cursive",
                }}
                onClick={() => {
                  signOut()
                  .then(() => {
                    window.location.reload();
                  })
                }}
              >
                Sign Out
              </button>
            )}
          </div>
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
