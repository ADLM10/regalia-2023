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

export default function Home({
  events,
  user,
  isLoading,
}: {
  events: Database["public"]["Tables"]["events"]["Row"][];
  user: User | null;
  isLoading: boolean;
}): JSX.Element {
  return (
    <>
      <Head>
        <title>{data["title"]}</title>
        <meta name="description" content="Cultural Fest of RCCIIT, Kolkata" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gradient-to-tl from-fuchsia-950 to-black pt-32">
        <Hero isLoggedIn={user ? true : false} />
        <div className="flex flex-col justify-start items-left mb-20">
          <h1 className="text-5xl text-left font-normal text-white px-10 pt-10">
            Events.
          </h1>
          <span className="text-2xl text-left font-thin text-white px-10 "
          style={{fontFamily: "Unbounded,cursive"}}
          >
            Participate and emerge victorious in these eyegrabbing events.
          </span>
        </div>
        <div className="event-card">
          {events.map(
            (
              item: Database["public"]["Tables"]["events"]["Row"],
              index: number
            ) => (
              <Card key={`events__${index}`} eventData={item} />
            )
          )}
        </div>
        <ContactUs />
        <Footer />
        <Image
          src="https://i.imgur.com/G42sxIN.png"
          alt="Background"
          width={700}
          height={700}
          className="fixed md:top-40 md:right-5 opacity-10 top-24 -right-16"
          style={{
            zIndex: 0,
          }}
        />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  let data;

  try {
    data = await getEvents(
      "name, details, poster_image,rules_regulations,fees,prize_pool,team_size,min_members,type"
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
