import Head from "next/head";
import Hero from "./../components/hero";
import data from "../public/data.json";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import { getEvents } from "@/utils/getEvents";
import { Database } from "@/types/supabase";
import Card from "@/components/card";
import { User } from "@supabase/supabase-js";
import Sponsors from "@/components/Sponsors";

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
        <Sponsors />
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
      </main>
    </>
  );
}

export async function getServerSideProps() {
  let data;

  try {
    data = await getEvents("name, details, poster_image,rules_regulations");
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      events: data,
    },
  };
}
