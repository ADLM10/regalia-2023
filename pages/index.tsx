import Head from "next/head";
import Hero from "./../components/hero";
import data from "../public/data.json";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import { getEvents } from "@/utils/getEvents";
import { Database } from "@/types/supabase";
import Card from "@/components/card";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Sponsors from "@/components/Sponsors";
import { ParticipatedEvents } from "@/types/ParticipatedEvents";
import { supabase } from "@/utils/supabaseClient";
import { getRegisteredEvents } from "@/utils/getRegisteredEvents";
import { useRouter } from "next/router";
import { getUserProfile, isUserDetailsEmpty } from "@/utils/UserFunctions";
import { ToastContainer } from "react-toastify";
import Link from "next/link";

const EventRegistrationModal = dynamic(
  () => import("@/components/EventRegistrationModal/EventRegistrationModal"),
  {
    ssr: false,
    loading: () => <></>,
  }
);

export default function Home({
  events,
  user,
  isLoading,
}: {
  events: Database["public"]["Tables"]["events"]["Row"][];
  user: User | null;
  isLoading: boolean;
}): JSX.Element {
  const [eventData, setEventData] = useState<
    Database["public"]["Tables"]["events"]["Row"]
  >({
    id: 0,
    name: "",
    poster_image: "",
    multiple_registrations_allowed: false,
    min_members: 0,
    fees: 0,
    type: "",
    team_size: 0,
    rules_regulations: "",
  } as Database["public"]["Tables"]["events"]["Row"]);

  const [open, setOpen] = useState<boolean>(false);

  const [amount, setAmount] = useState<number>(0);
  const [showPaymentBtn, setShowPaymentBtn] = useState(false);
  const [showCoordinatorPage, setShowCoordinatorPage] = useState(false);
  // TODO: Add types
  const [registeredEvents, setRegisteredEvents] = useState<any[]>([]);
  const [participatedEvents, setParticipatedEvents] = useState<
    ParticipatedEvents[]
  >([]);

  const router = useRouter();

  function checkIfParticipatedInEvent(id: number) {
    const tempEventId = participatedEvents.map((item) => item.event_id);
    return tempEventId.includes(id);
  }

  useEffect(() => {
    !isLoading &&
      user &&
      user.email &&
      Promise.all([
        isUserDetailsEmpty().then((val) => {
          if (val) {
            router.push("/profile");
          }
        }),
        getUserProfile(user!.id, "role").then((profile) => {
          if (profile[0].role !== "participant" && profile[0].role)
            setShowCoordinatorPage(true);
        }),
        supabase
          .rpc("search_email_in_registered_event", {
            email: user.email,
          })
          .then((val) => {
            setParticipatedEvents(val.data);
          }),
        getRegisteredEvents({
          select: `events(id, fees),registration_cancelled,transaction_id`,
          email: user!.email!,
        }).then((data) => {
          let amount = 0;
          if (data) {
            const temp = data.map(
              (item: Database["public"]["Tables"]["participation"]["Row"]) =>
                item.events!.id
            );
            data.forEach(
              (item: Database["public"]["Tables"]["participation"]["Row"]) => {
                if (
                  !item.registration_cancelled &&
                  item.transaction_id === null
                )
                  amount += item.events!.fees!;
              }
            );
            if (amount > 0) {
              setShowPaymentBtn(true);
            }
            setAmount(amount);
            setRegisteredEvents(temp);
          }
        }),
      ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <>
      <Head>
        <title>{data["title"]}</title>
        <meta name="description" content="Cultural Fest of RCCIIT, Kolkata" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gradient-to-tl from-fuchsia-950 to-black pt-32">
        {showPaymentBtn && (
          <div className="fixed bottom-10 w-full flex justify-center z-40">
            <button
              onClick={() => {
                router.push({
                  pathname: "/registered-events",
                });
              }}
              className="bg-white p-5 px-10 right-20 bottom-20 z-20 rounded-2xl hover:bg-[blueviolet] hover:text-white transition duration-300 ease-in-out "
              style={{
                fontFamily: "Unbounded,cursive",
              }}
            >
              Pay ₹ {amount}
            </button>
          </div>
        )}
        <Hero isLoggedIn={user ? true : false} />
        {showCoordinatorPage && (
          <div className="flex justify-center ">
            <Link
              className=" h-full bg-white hover:bg-blue-600 action:bg-blue-600 rounded py-2 px-4"
              href="/coordinator"
            >
              Coordinator Page
            </Link>
          </div>
        )}
        <div className="flex flex-col justify-start items-left mb-20">
          <h1 className="text-5xl text-left font-normal text-white px-10 pt-10">
            Events.
          </h1>
          <span
            className="text-2xl text-left font-thin text-white px-10 "
            style={{ fontFamily: "Unbounded,cursive" }}
          >
            Participate and emerge victorious in these eyegrabbing events.
          </span>
        </div>
        <div className="event-card relative">
          {events.map(
            (
              item: Database["public"]["Tables"]["events"]["Row"],
              index: number
            ) => (
              <Card
                key={`events__${index}`}
                eventData={item}
                setEventData={setEventData}
                setOpen={setOpen}
                isLoggedIn={user ? true : false}
                isParticipated={checkIfParticipatedInEvent(item.id)}
              />
            )
          )}
        </div>
        <Sponsors />
        <ContactUs />
        <Footer />
        <Image
          src="https://i.imgur.com/G42sxIN.png"
          alt="Background"
          width={700}
          height={700}
          className="fixed md:top-40 md:right-5 opacity-10 top-24 right-10"
          style={{
            zIndex: 0,
          }}
        />
        <ToastContainer />
      </main>
      <EventRegistrationModal
        open={open}
        setOpen={setOpen}
        event={eventData}
        setShowPayment={setShowPaymentBtn}
        setAmount={setAmount}
        registeredEvents={registeredEvents}
        participatedEvents={participatedEvents}
        setParticipatedEvents={setParticipatedEvents}
        setRegisteredEvents={setRegisteredEvents}
        registeredByEmail={user?.email ?? ""}
      />
    </>
  );
}

export async function getServerSideProps() {
  let data;

  try {
    data = await getEvents(
      "id,name,details,poster_image,rules_regulations,fees,prize_pool,team_size,min_members,type, faculty_coordinator ,multiple_registrations_allowed"
    );
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      events: data,
    },
  };
}
